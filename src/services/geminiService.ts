// ==========================================================================
// Gemini AI Academic Services — QFDOS Web v3
// Generación de preguntas de examen y exportación de documentos.
// La función de transcripción de audio fue eliminada en v3.
// ==========================================================================

import { TestQuestion, INITIAL_TOPICS, QfdosTopic } from '../data/qfdosData';

const GEMINI_API_KEY_STORAGE_KEY = 'qfdos_gemini_api_key_v3';

export const getStoredGeminiApiKey = (): string =>
  localStorage.getItem(GEMINI_API_KEY_STORAGE_KEY) || '';

export const setStoredGeminiApiKey = (key: string): void =>
  localStorage.setItem(GEMINI_API_KEY_STORAGE_KEY, key.trim());

const DEFAULT_CANDIDATE_MODELS = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash',
  'gemini-1.5-flash-8b',
  'gemini-1.5-flash-latest',
  'gemini-1.5-pro-latest'
];

let cachedAvailableModels: string[] | null = null;

export const getAvailableGeminiModels = async (apiKey: string): Promise<string[]> => {
  if (cachedAvailableModels && cachedAvailableModels.length > 0) return cachedAvailableModels;
  if (!apiKey) return DEFAULT_CANDIDATE_MODELS;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.models)) {
        const supported = data.models
          .filter((m: any) => m.supportedGenerationMethods?.includes('generateContent'))
          .map((m: any) => m.name.replace(/^models\//, ''))
          .filter((m: string) => m !== 'gemini-1.5-pro');

        if (supported.length > 0) {
          const priority = DEFAULT_CANDIDATE_MODELS;
          const sorted = [
            ...priority.filter(m => supported.includes(m)),
            ...supported.filter((m: string) => !priority.includes(m))
          ];
          cachedAvailableModels = sorted;
          return sorted;
        }
      }
    }
  } catch (err) {
    console.warn('Could not query ListModels, using defaults:', err);
  }
  return DEFAULT_CANDIDATE_MODELS;
};

// Low-level caller with multi-model fallback
async function callGeminiWithFallback(apiKey: string, systemInstruction: string, promptText: string): Promise<string> {
  let lastError = '';
  const modelsToTry = await getAvailableGeminiModels(apiKey);

  for (const model of modelsToTry) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ role: 'user', parts: [{ text: `${systemInstruction}\n\n${promptText}` }] }],
        generationConfig: { temperature: 0.3, maxOutputTokens: 4000 }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        const rawMsg = errorJson.error?.message || `HTTP ${response.status}`;
        if (response.status === 400 && rawMsg.includes('API_KEY_INVALID')) {
          throw new Error('La clave API de Google Gemini no es válida.');
        }
        if (response.status === 429 || rawMsg.includes('RESOURCE_EXHAUSTED')) {
          throw new Error('Límite de cuota alcanzado. Espera unos minutos.');
        }
        lastError = rawMsg;
        continue;
      }

      const result = await response.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) return text;
    } catch (err: any) {
      if (err.message?.includes('clave API') || err.message?.includes('cuota')) throw err;
      lastError = err.message || String(err);
    }
  }
  throw new Error(`Gemini API Error: ${lastError || 'Ningún modelo respondió.'}`);
}

export function cleanRawLatexArtifacts(text: string): string {
  if (!text) return '';
  return text
    .replace(/\$\$\\Delta G\^0\$\$/g, 'ΔG°').replace(/\$\\Delta G\^\\circ\$/g, 'ΔG°')
    .replace(/\$K_d\$/g, 'Kd').replace(/\$K_i\$/g, 'Ki').replace(/\$K_m\$/g, 'Km')
    .replace(/\$IC_\{50\}\$/g, 'IC50').replace(/\$\\beta\$/g, 'β').replace(/\$\\alpha\$/g, 'α')
    .replace(/\$\\gamma\$/g, 'γ').replace(/\$\\mu\$/g, 'μ').replace(/\$GABA_A\$/g, 'GABA-A')
    .replace(/\$\$/g, '').replace(/\$/g, '');
}

interface GenerateExamParams {
  topicId: string;
  topicTitle: string;
  questionCount?: number;
  difficulty?: 'Fácil' | 'Medio' | 'Avanzado';
  customApiKey?: string;
}

export const generateExamQuestionsWithGemini = async ({
  topicId,
  topicTitle,
  questionCount = 3,
  difficulty = 'Medio',
  customApiKey
}: GenerateExamParams): Promise<TestQuestion[]> => {
  const activeKey = customApiKey || getStoredGeminiApiKey();
  if (!activeKey) return generateFallbackExamQuestions(topicId, topicTitle, questionCount, difficulty);

  const systemInstruction = `Eres el evaluador principal de Química Farmacéutica II (UGR).
Genera exactamente ${questionCount} preguntas tipo test de nivel ${difficulty} para el módulo "${topicTitle}".

REGLAS:
1. Responde ÚNICAMENTE con un bloque JSON válido con un array de objetos TestQuestion.
2. Cada objeto: { "question": "...", "options": ["A","B","C","D"], "correctIndex": 0, "explanation": "...", "difficulty": "${difficulty}", "block": "SAR & Dianas" }
3. CERO SINTAXIS LATEX: Usa caracteres Unicode (ΔG°, IC50, Kd, Ki, β-bloqueantes). No uses $.`;

  try {
    const responseText = await callGeminiWithFallback(activeKey, systemInstruction, `Genera ${questionCount} preguntas para ${topicTitle}. Solo el JSON.`);
    const cleaned = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) {
      return parsed.map((q, idx) => ({
        id: `gemini-q-${Date.now()}-${idx}`,
        topicId,
        question: cleanRawLatexArtifacts(q.question),
        options: Array.isArray(q.options) ? q.options.map((o: string) => cleanRawLatexArtifacts(o)) : [],
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: cleanRawLatexArtifacts(q.explanation || 'Explicación oficial de cátedra.'),
        difficulty: q.difficulty || difficulty,
        block: q.block || 'Evaluación Oficial'
      }));
    }
  } catch (e) {
    console.warn('Gemini exam generation failed, using fallback:', e);
  }
  return generateFallbackExamQuestions(topicId, topicTitle, questionCount, difficulty);
};

// Export utilities
export const exportToWordDoc = ({ prefix, subject, professor, date, time, classroom, content, baseFileName }: {
  prefix: string; subject: string; professor: string; date?: string; time?: string; classroom?: string; content: string; baseFileName: string;
}) => {
  const htmlContent = `
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
<head><meta charset='utf-8'><style>
body{font-family:Calibri,Arial,sans-serif;font-size:11pt;line-height:1.5;color:#1e293b;margin:2cm}
h1{font-size:18pt;color:#1e3a8a;border-bottom:2px solid #0d9488;padding-bottom:4px}
h2{font-size:14pt;color:#0f766e;margin-top:18px}h3{font-size:12pt;color:#1e3a8a}
.meta{background:#f1f5f9;border-left:4px solid #0d9488;padding:10px 14px;margin-bottom:18px}
table{border-collapse:collapse;width:100%}th,td{border:1px solid #cbd5e1;padding:6px 10px}
th{background:#f8fafc;color:#1e3a8a;font-weight:bold}code{background:#f1f5f9;padding:2px 5px}
</style></head><body>
<h1>${prefix} — ${subject}</h1>
<div class="meta"><p><strong>Profesor:</strong> Dr. ${professor}</p>
<p><strong>Fecha:</strong> ${date || 'N/A'} | <strong>Hora:</strong> ${time || 'N/A'}</p>
<p><em>${classroom || 'Facultad de Farmacia, UGR'}</em></p></div>
<hr/><div>${content.replace(/\n/g, '<br>')}</div></body></html>`;

  const blob = new Blob(['﻿', htmlContent], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${baseFileName}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const exportToPdfPrint = ({ prefix, subject, professor, date, time, classroom, content, baseFileName }: {
  prefix: string; subject: string; professor: string; date?: string; time?: string; classroom?: string; content: string; baseFileName: string;
}) => {
  const w = window.open('', '_blank');
  if (!w) { alert('Permite ventanas emergentes para generar el PDF.'); return; }
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${baseFileName}</title>
<style>@page{size:A4;margin:20mm}body{font-family:'Segoe UI',sans-serif;font-size:11pt;line-height:1.6;color:#0f172a}
.header{border-bottom:2px solid #1e3a8a;padding-bottom:12px;margin-bottom:20px}
.title{font-size:20pt;font-weight:700;color:#1e3a8a}
.content{white-space:pre-wrap;font-size:10.5pt;line-height:1.65}
table{border-collapse:collapse;width:100%;margin:14px 0}th,td{border:1px solid #cbd5e1;padding:6px 8px}
th{background:#f1f5f9;font-weight:600}</style></head><body>
<div class="header"><h1 class="title">${prefix} — ${subject}</h1>
<div>Prof. <strong>${professor}</strong> · ${date || ''} · ${classroom || 'UGR'}</div></div>
<div class="content">${content}</div>
<script>window.onload=()=>window.print();</script></body></html>`);
  w.document.close();
};

export const exportToMarkdownFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.md') ? filename : `${filename}.md`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

function generateFallbackExamQuestions(topicId: string, topicTitle: string, count: number, difficulty: string): TestQuestion[] {
  const matchedTopic = INITIAL_TOPICS.find((t: QfdosTopic) => t.id === topicId);
  const topicQuestions: TestQuestion[] = (matchedTopic?.testQuestions || []).map((q: TestQuestion, idx: number) => ({
    ...q,
    id: `topic-fb-${Date.now()}-${idx}`,
    topicId,
    difficulty: difficulty as any
  }));

  const generalPool: TestQuestion[] = [
    {
      id: `fallback-${Date.now()}-1`,
      topicId,
      question: `En el contexto de ${topicTitle}, ¿cuál es la ventaja fundamental de la Eficiencia de Ligando (LE = -ΔG° / Nheavy)?`,
      options: [
        'Permite medir la afinidad sin ensayos experimentales.',
        'Evalúa si la ganancia de afinidad compensa el incremento de peso molecular.',
        'Garantiza inhibición irreversible del target.',
        'Determina la velocidad de eliminación renal.'
      ],
      correctIndex: 1,
      explanation: 'LE normaliza la energía libre de unión por átomo pesado, evitando inflar innecesariamente el peso molecular durante la optimización.',
      difficulty: difficulty as any,
      block: 'Biofísica & SAR'
    },
    {
      id: `fallback-${Date.now()}-2`,
      topicId,
      question: '¿Cuál es la ecuación de Cheng-Prusoff para inhibición competitiva reversible?',
      options: [
        'IC50 = Ki · (1 + [S]/Km)',
        'IC50 = Ki · ln([S] · Km)',
        'IC50 = Ki / (1 + [S] · Km)',
        'IC50 = ΔG° · R · T'
      ],
      correctIndex: 0,
      explanation: 'IC50 = Ki · (1 + [S]/Km): demuestra que a mayor concentración de sustrato competidor, mayor será el IC50 experimental observado respecto a la afinidad intrínseca Ki.',
      difficulty: difficulty as any,
      block: 'Cinética Enzimática'
    },
    {
      id: `fallback-${Date.now()}-3`,
      topicId,
      question: '¿Qué relación termodinámica fundamental vincula la constante de disociación en el equilibrio (Kd) con la energía libre estándar de Gibbs (ΔG°)?',
      options: [
        'ΔG° = -R · T · ln(1 / Kd) = R · T · ln(Kd)',
        'ΔG° = Kd / (R · T)',
        'ΔG° = -R · T · Kd²',
        'ΔG° = e^(-Kd / RT)'
      ],
      correctIndex: 0,
      explanation: 'ΔG° = R · T · ln(Kd). Un valor de Kd en el rango nanomolar (10⁻⁹ M) equivale aproximadamente a una ganancia termodinámica de unión de -12,3 kcal/mol a 298 K.',
      difficulty: difficulty as any,
      block: 'Termodinámica de Unión'
    },
    {
      id: `fallback-${Date.now()}-4`,
      topicId,
      question: 'Según la Regla de 5 de Lipinski y los criterios de Veber, ¿cuáles son los límites que predicen buena biodisponibilidad oral?',
      options: [
        'PM ≤ 500 Da, LogP ≤ 5, HBD ≤ 5, HBA ≤ 10, Enlaces Rotables ≤ 10 y TPSA ≤ 140 Å²',
        'PM ≥ 800 Da, LogP ≥ 8, HBD ≥ 10, TPSA ≥ 200 Å²',
        'PM ≤ 200 Da, LogP = 0, HBD = 0, TPSA = 0 Å²',
        'Cualquier molécula con carga neta zwitteriónica a pH 7,4'
      ],
      correctIndex: 0,
      explanation: 'Lipinski delimitó PM ≤ 500, cLogP ≤ 5, HBD ≤ 5 y HBA ≤ 10. Veber demostró que un TPSA ≤ 140 Å² y ≤ 10 enlaces rotables son determinantes para la permeabilidad pasiva por membrana.',
      difficulty: difficulty as any,
      block: 'ADMET & Drug-likeness'
    },
    {
      id: `fallback-${Date.now()}-5`,
      topicId,
      question: '¿Cuál es el bioisóstero no clásico del ácido carboxílico más utilizado para mejorar la lipofilia y permeabilidad manteniendo acidez (pKa ≈ 4,5)?',
      options: [
        'Anillo de 1H-tetrazol',
        'Grupo metilo (-CH3)',
        'Grupo nitro (-NO2)',
        'Éter metílico (-OCH3)'
      ],
      correctIndex: 0,
      explanation: 'El anillo de tetrazol es un bioisóstero no clásico del carboxilato: deslocaliza la carga negativa de forma planar con similar pKa pero con diez veces mayor lipofilia, como se aplica en los ARA-II (Losartán).',
      difficulty: difficulty as any,
      block: 'Bioisosterismo & SAR'
    },
    {
      id: `fallback-${Date.now()}-6`,
      topicId,
      question: 'En el diseño de profármacos para atravesar la barrera hematoencefálica (BHE), ¿qué estrategia se emplea comúnmente?',
      options: [
        'Esterificación transitoria de grupos hidrofílicos para aumentar la lipofilia pasiva o mimetizar sustratos de transportadores SLC',
        'Introducción de sulfatos permanentes con carga negativa fija',
        'Incremento masivo del área superficial polar (TPSA > 200 Å²)',
        'Polimerización del principio activo'
      ],
      correctIndex: 0,
      explanation: 'La esterificación temporal enmascara grupos ionizables o polares aumentando LogP pasivo, o bien se diseñan análogos que utilicen transportadores activos (como L-DOPA vía LAT1).',
      difficulty: difficulty as any,
      block: 'Transporte y Barreras'
    }
  ];

  // Combinar primero las preguntas específicas del tema y completar con el pool general
  const combined = [...topicQuestions, ...generalPool];
  
  // Si no hay suficientes en el tema, aseguramos que siempre devuelva el número solicitado
  const results: TestQuestion[] = [];
  const seenQuestions = new Set<string>();

  for (const q of combined) {
    if (!seenQuestions.has(q.question)) {
      seenQuestions.add(q.question);
      results.push(q);
    }
    if (results.length >= count) break;
  }

  return results;
}
