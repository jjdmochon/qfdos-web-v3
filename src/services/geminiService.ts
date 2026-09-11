// ==========================================================================
// Gemini AI Academic Services — QFDOS Web v3
// Generación de preguntas de examen y exportación de documentos.
// La función de transcripción de audio fue eliminada en v3.
// ==========================================================================

import { TestQuestion, INITIAL_TOPICS, QfdosTopic } from '../data/qfdosData';
import {
  getFirQuestionsByTopic,
  convertFirToTestQuestion,
  generateFirExamSlice,
  getAllFirQuestions
} from '../data/firQuestionsData';

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

export type ExamFocusArea = 'sintesis_reactividad' | 'sar_farmacoforos' | 'mecanismos_dianas' | 'general';

export interface GenerateExamParams {
  topicId: string;
  topicTitle: string;
  questionCount?: number;
  difficulty?: 'Fácil' | 'Medio' | 'Avanzado';
  customApiKey?: string;
  focusArea?: ExamFocusArea;
  topic?: QfdosTopic;
  uploadedMaterialsContext?: string;
}

/**
 * Compila el Dossier Vivo de Conocimiento Docente de la unidad.
 * Permite al generador de preguntas alimentarse y auto-mejorarse continuamente
 * conforme el profesor sube diapositivas, apuntes, fármacos o enlaces a la plataforma.
 */
export function buildTopicKnowledgeContext(topic?: QfdosTopic, customContext?: string): string {
  if (!topic && !customContext) return '';

  const sections: string[] = [];

  if (topic) {
    sections.push(`=== DOSSIER VIVO DE MATERIALES DOCENTES (UNIDAD: ${topic.number} - ${topic.title}) ===`);
    if (topic.subtitle) sections.push(`Orientación y Subtítulo: ${topic.subtitle}`);
    if (topic.description) sections.push(`Objetivos Docentes: ${topic.description}`);

    if (topic.keyConcepts && topic.keyConcepts.length > 0) {
      sections.push(`Conceptos Clave Subidos: ${topic.keyConcepts.join(' · ')}`);
    }

    if (topic.targetName || topic.pdbTargetId) {
      sections.push(`Diana Farmacológica Principal: ${topic.targetName || 'N/A'} (Código PDB: ${topic.pdbTargetId || 'N/A'})`);
    }

    if (topic.drugs && topic.drugs.length > 0) {
      sections.push(`Catálogo de Fármacos Registrados en la Unidad (${topic.drugs.length} moléculas):`);
      topic.drugs.forEach(d => {
        const props = [
          d.role ? `Función: ${d.role}` : '',
          d.smiles ? `SMILES: ${d.smiles}` : '',
          d.formula ? `Fórmula: ${d.formula}` : '',
          d.mw ? `PM: ${d.mw} Da` : '',
          d.logP !== undefined ? `LogP: ${d.logP}` : '',
          d.tpsa !== undefined ? `TPSA: ${d.tpsa} Å²` : ''
        ].filter(Boolean).join(', ');
        sections.push(`  - ${d.name}: ${props}`);
      });
    }

    if (topic.attachments && topic.attachments.length > 0) {
      sections.push(`Materiales y Documentos Adjuntos Subidos (${topic.attachments.length} archivos):`);
      topic.attachments.forEach(att => {
        sections.push(`  - [${att.type || 'documento'}] ${att.title}`);
      });
    }

    if (topic.slidesPdfName || topic.notesPdfName) {
      sections.push(`Recursos Oficiales de Cátedra:`);
      if (topic.slidesPdfName) sections.push(`  - Diapositivas: ${topic.slidesPdfName} (${topic.slideCount || 0} diapositivas)`);
      if (topic.notesPdfName) sections.push(`  - Apuntes de Cátedra: ${topic.notesPdfName}`);
    }

    if (topic.testQuestions && topic.testQuestions.length > 0) {
      sections.push(`Banco de Preguntas Previas ya Validadas en este Tema (${topic.testQuestions.length} preguntas):`);
      topic.testQuestions.slice(0, 5).forEach((tq, i) => {
        const sol = typeof tq.options[tq.correctIndex] === 'string' ? tq.options[tq.correctIndex] : (tq.options[tq.correctIndex] as any)?.text;
        sections.push(`  * [Referencia prev. #${i + 1}] ${tq.question.substring(0, 110)}... (Respuesta: ${sol})`);
      });
      sections.push(`  -> DIRECTIVA: No repitas estas preguntas. Utilízalas como calibrador de estilo y evalúa aspectos complementarios de los nuevos materiales subidos.`);
    }

    if (topic.lectureAudios && topic.lectureAudios.length > 0) {
      sections.push(`Notas de Síntesis y Transcripciones:`);
      topic.lectureAudios.forEach(la => {
        if (la.synthesizedNotesMarkdown) {
          sections.push(`  - Síntesis docente: ${la.synthesizedNotesMarkdown.substring(0, 250)}...`);
        }
      });
    }
  }

  if (customContext && customContext.trim()) {
    sections.push(`Documentos y archivos docentes subidos recientemente a la plataforma:`);
    sections.push(customContext.trim());
  }

  return sections.join('\n');
}

export const generateExamQuestionsWithGemini = async ({
  topicId,
  topicTitle,
  questionCount = 3,
  difficulty = 'Medio',
  customApiKey,
  focusArea = 'sintesis_reactividad',
  topic,
  uploadedMaterialsContext
}: GenerateExamParams): Promise<TestQuestion[]> => {
  const activeKey = customApiKey || getStoredGeminiApiKey();
  if (!activeKey) return generateFallbackExamQuestions(topicId, topicTitle, questionCount, difficulty, focusArea, topic);

  const isSynthesisFocus = focusArea === 'sintesis_reactividad';
  const topicKnowledge = buildTopicKnowledgeContext(topic, uploadedMaterialsContext);

  const systemInstruction = `Eres el evaluador principal de Química Farmacéutica II (UGR).
Genera exactamente ${questionCount} preguntas tipo test de nivel ${difficulty} para el módulo "${topicTitle}".

${topicKnowledge ? `MATERIALES Y RECURSOS DOCENTES ACTUALIZADOS EN LA PLATAFORMA (APRENDIZAJE CONTINUO DEL CURSO):
${topicKnowledge}

INSTRUCCIONES DE ALINEACIÓN CON LOS MATERIALES SUBIDOS POR EL PROFESOR:
- Basa prioritariamente tus preguntas en los fármacos, conceptos, apuntes, diapositivas y documentos que el profesorado ha incorporado en el dossier anterior.
- Si hay fármacos registrados con estructuras SMILES en el tema, selecciona preferentemente esas moléculas para preguntas de síntesis, reactividad, diana o SAR.
- Si existen preguntas previas validadas en el tema, no las repitas literalmente: úsalas para calibrar la profundidad y evalúa aspectos complementarios o mecanismos avanzados.
` : ''}
${isSynthesisFocus ? `
ENFOQUE TEMÁTICO OBLIGATORIO: REACTIVIDAD Y SÍNTESIS QUÍMICA FARMACÉUTICA CON ESTRUCTURAS MOLECULARES:
1. Formula preguntas rigurosas sobre rutas de síntesis química de fármacos, quimioselectividad, reactivos necesarios para transformaciones, apertura nucleófila de anillos (epóxidos, heterociclos), ciclocondensaciones (Hantzsch, ciclaciones a diazepinas o β-lactamas), acoplamientos amídicos, grupos protectores ortogonales (Boc, Fmoc, Cbz) y oxidaciones/reducciones quimioselectivas.
2. OBLIGATORIO: Incluye la estructura SMILES canónica válida del reactivo de partida, intermedio o fármaco en "questionSmiles" para su renderizado con RDKit MinimalLib.
3. OBLIGATORIO: En las 4 opciones de respuesta ("options"), cuando se comparen reactivos, intermedios o productos de reacción, incluye objetos con { "text": "Nombre del reactivo/producto y justificación", "smiles": "SMILES_CANONICO_VALIDO" } para que el alumno identifique visualmente la estructura molecular 2D.
4. Explica detalladamente el mecanismo químico de la reacción en "explanation" (control cinético vs termodinámico, tipo de ataque nucleófilo/electrófilo, grupos salientes y quimioselectividad).
` : `
CRITERIOS DOCENTES (INSPIRADOS EN EL RIGOR OFICIAL DEL EXAMEN FIR - MINISTERIO DE SANIDAD):
1. Formula preguntas rigurosas sobre relaciones estructura-actividad (SAR), farmacóforos, bioisósteros, mecanismos de bioactivación (profármacos, latenciación) y dianas moleculares.
2. Cuando la pregunta mencione un fármaco o molécula clave, incluye su estructura en formato SMILES válido en el campo "questionSmiles" (o en las opciones si compara estructuras) para su renderizado con RDKit MinimalLib.
3. Si la pregunta compara reactivos o análogos estructurales, incluye en las opciones objetos con { "text": "...", "smiles": "SMILES_VALIDO" }.
`}
4. Responde ÚNICAMENTE con un bloque JSON válido con un array de objetos TestQuestion.
5. Formato exacto de cada objeto:
{
  "question": "Enunciado claro y preciso...",
  "questionSmiles": "SMILES_CANONICO_VALIDO",
  "options": [
    { "text": "Opción A...", "smiles": "SMILES_OPCIONAL" },
    { "text": "Opción B...", "smiles": "SMILES_OPCIONAL" },
    { "text": "Opción C...", "smiles": "SMILES_OPCIONAL" },
    { "text": "Opción D...", "smiles": "SMILES_OPCIONAL" }
  ],
  "correctIndex": 0,
  "explanation": "Mecanismo y justificación química razonada...",
  "difficulty": "${difficulty}",
  "block": "${isSynthesisFocus ? 'Reactividad & Síntesis Química' : 'SAR & Dianas'}"
}
6. CERO SINTAXIS LATEX: Usa caracteres Unicode limpios (ΔG°, IC50, Kd, Ki, Km, pKa, Å, µM, β-lactámico, Zn²⁺). No uses $ ni fórmulas crudas de LaTeX.`;

  try {
    const userPrompt = isSynthesisFocus
      ? `Genera ${questionCount} preguntas de reactividad y síntesis química con estructuras SMILES en el enunciado y en las opciones para ${topicTitle}. Solo el bloque JSON.`
      : `Genera ${questionCount} preguntas tipo test para ${topicTitle}. Solo el bloque JSON.`;

    const responseText = await callGeminiWithFallback(activeKey, systemInstruction, userPrompt);
    const cleaned = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed)) {
      return parsed.map((q, idx) => ({
        id: `gemini-q-${Date.now()}-${idx}`,
        topicId,
        question: cleanRawLatexArtifacts(q.question),
        questionSmiles: q.questionSmiles?.trim() || undefined,
        options: Array.isArray(q.options) ? q.options.map((o: any) => typeof o === 'string' ? cleanRawLatexArtifacts(o) : { text: cleanRawLatexArtifacts(o.text), smiles: o.smiles }) : [],
        correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
        explanation: cleanRawLatexArtifacts(q.explanation || 'Explicación oficial de cátedra.'),
        difficulty: q.difficulty || difficulty,
        block: q.block || (isSynthesisFocus ? 'Reactividad & Síntesis Química' : 'Evaluación Oficial & FIR')
      }));
    }
  } catch (e) {
    console.warn('Gemini exam generation failed, using fallback:', e);
  }
  return generateFallbackExamQuestions(topicId, topicTitle, questionCount, difficulty, focusArea);
};

export interface SmartExamParams {
  topicId: string;
  topicTitle: string;
  questionCount?: number;
  difficulty?: 'Fácil' | 'Medio' | 'Avanzado';
  mode?: 'ai' | 'fir' | 'hybrid';
  focusArea?: ExamFocusArea;
  topic?: QfdosTopic;
  uploadedMaterialsContext?: string;
  customApiKey?: string;
}

export const generateSmartExamQuestions = async ({
  topicId,
  topicTitle,
  questionCount = 3,
  difficulty = 'Medio',
  mode = 'hybrid',
  focusArea = 'sintesis_reactividad',
  topic,
  uploadedMaterialsContext,
  customApiKey
}: SmartExamParams): Promise<TestQuestion[]> => {
  if (mode === 'fir') {
    const firQs = generateFirExamSlice(questionCount, topicId);
    if (firQs.length >= questionCount) return firQs;
    const fallback = generateFallbackExamQuestions(topicId, topicTitle, questionCount, difficulty, focusArea, topic);
    return [...firQs, ...fallback].slice(0, questionCount);
  }
  return generateExamQuestionsWithGemini({
    topicId,
    topicTitle,
    questionCount,
    difficulty,
    focusArea,
    topic,
    uploadedMaterialsContext,
    customApiKey
  });
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

export const SYNTHESIS_REACTIVITY_QUESTIONS: TestQuestion[] = [
  {
    id: 'syn-react-propranolol',
    topicId: 'tema-06',
    question: 'En la ruta sintética del Propranolol (bloqueante β-adrenérgico), el 1-naftol reacciona con epiclorhidrina en medio alcalino rindiendo el intermedio oxirano mostrado. ¿Qué reactivo nucleófilo produce la apertura regioselectiva del anillo de epóxido para generar el principio activo?',
    questionSmiles: 'C1=CC=C2C(=C1)C=CC=C2OCC3CO3',
    options: [
      { text: 'Isopropilamina: ataque SN2 sobre el carbono menos impedido del epóxido', smiles: 'CC(C)N' },
      { text: 'Dimetilamina: generaría un análogo N,N-dimetilado inactivo', smiles: 'CNC' },
      { text: 'Terc-butilamina: generaría un análogo voluminoso tipo bupranolol', smiles: 'CC(C)(C)N' },
      { text: 'Anilina: arilamina de escasa nucleofilia sin actividad biológica', smiles: 'c1ccccc1N' }
    ],
    correctIndex: 0,
    explanation: 'La isopropilamina (amina primaria voluminosa) ataca por un mecanismo SN2 al carbono metilénico menos impedido (C-3) del anillo de oxirano del 1-(oxiran-2-ilmetoxi)naftaleno, rindiendo con alta quimioselectividad la cadena de 1-(isopropilamino)propan-2-ol característica del Propranolol.',
    difficulty: 'Medio',
    block: 'Reactividad & Síntesis Química'
  },
  {
    id: 'syn-react-hantzsch',
    topicId: 'tema-06',
    question: 'Para la preparación de la 1,4-dihidropiridina antihipertensiva Nifedipino mediante la ciclocondensación multicomponente clásica de Hantzsch, ¿cuál es la combinación estequiométrica de reactivos de partida?',
    questionSmiles: 'COC(=O)C1=C(NC(=C(C1c2ccccc2[N+](=O)[O-])C(=O)OC)C)C',
    options: [
      { text: '2-Nitrobenzaldehído + 2 equiv. de acetoacetato de metilo + amoníaco (NH3)', smiles: 'O=Cc1ccccc1[N+](=O)[O-]' },
      { text: 'Benzaldehído no sustituido + 2 equiv. de malonato de dimetilo + hidrazina', smiles: 'O=Cc1ccccc1' },
      { text: '4-Nitrobenzaldehído + 1 equiv. de acetilacetona + urea', smiles: 'O=Cc1ccc([N+](=O)[O-])cc1' },
      { text: 'Ácido 2-nitrobenzoico + acetoacetato de etilo + metilamina', smiles: 'O=C(O)c1ccccc1[N+](=O)[O-]' }
    ],
    correctIndex: 0,
    explanation: 'La síntesis de Hantzsch clásica para Nifedipino condensa una molécula de 2-nitrobenzaldehído aromático con dos moléculas de éster β-dicarbonílico (acetoacetato de metilo) y una fuente de amoníaco (o acetato amónico), vía condensación de Knoevenagel y adición de Michael con ciclación deshidratante.',
    difficulty: 'Medio',
    block: 'Reactividad & Síntesis Química'
  },
  {
    id: 'syn-react-paracetamol',
    topicId: 'tema-04',
    question: 'En la síntesis de Paracetamol a partir de 4-aminofenol, ¿por qué la reacción con 1 equivalente de anhídrido acético en medio acuoso produce exclusivamente la N-acetilación (Paracetamol) y no la O-acetilación en el hidroxilo fenólico?',
    questionSmiles: 'Oc1ccc(N)cc1',
    options: [
      { text: 'El grupo amino (-NH2) posee un par de electrones más polarizable y nucleófilo que el oxígeno fenólico (-OH)', smiles: 'CC(=O)Nc1ccc(O)cc1' },
      { text: 'El grupo fenólico se oxida reversiblemente a quinona impidiendo el ataque del oxígeno', smiles: 'O=C1C=CC(=O)C=C1' },
      { text: 'El éster fenólico se hidroliza de forma espontánea durante la reacción rindiendo diacetato', smiles: 'CC(=O)Nc1ccc(OC(=O)C)cc1' },
      { text: 'El anhídrido acético solo es electrofílico frente a centros con carga formal negativa', smiles: 'CC(=O)OC(=O)C' }
    ],
    correctIndex: 0,
    explanation: 'El par solitario del nitrógeno es menos electronegativo y mucho más polarizable/nucleófilo que el par del oxígeno fenólico. Bajo control cinético a pH neutro o moderadamente ácido, el ataque nucleófilo sobre el anhídrido acético ocurre exclusivamente a través del grupo amino, obteniéndose Paracetamol con rendimiento cuantitativo sin necesidad de proteger el fenol.',
    difficulty: 'Fácil',
    block: 'Reactividad & Síntesis Química'
  },
  {
    id: 'syn-react-captopril',
    topicId: 'tema-06',
    question: 'En la síntesis asimétrica de Captopril (inhibidor de la ECA), el acoplamiento directo de la L-prolina con un derivado que contenga un tiol (-SH) libre provocaría oxidaciones a disulfuro y reacciones secundarias. ¿Qué precursor protegido de tiol se acopla a la prolina?',
    questionSmiles: 'CC(CS)C(=O)N1CCCC1C(=O)O',
    options: [
      { text: 'Ácido (2S)-3-(acetiltio)-2-metilpropanoico: el tioacetato enmascara el azufre y se hidroliza con NH4OH', smiles: 'CC(=O)SCC(C)C(=O)O' },
      { text: 'Ácido 3-mercaptoacético libre: reacciona sin necesidad de activación del carboxilo', smiles: 'SCC(=O)O' },
      { text: 'Ácido 2-cloropropanoico: requiere posterior desplazamiento con sulfuro de sodio a 150 °C', smiles: 'CC(Cl)C(=O)O' },
      { text: 'Cloruro de bencilsulfonilo: forma una sulfonamida irreversible', smiles: 'c1ccccc1CS(=O)(=O)Cl' }
    ],
    correctIndex: 0,
    explanation: 'El derivado tioacetato (ácido 3-acetiltio-2-metilpropanoico) enmascara temporalmente el grupo sulfhidrilo reactivo permitiendo la activación del carboxilo (vía cloruro de ácido o anhídrido mixto) y acoplamiento limpio con el nitrógeno pirrolidínico de la L-prolina. La desprotección final mediante aminólisis suave con hidróxido amónico libera el tiol libre del Captopril.',
    difficulty: 'Avanzado',
    block: 'Reactividad & Síntesis Química'
  },
  {
    id: 'syn-react-omeprazol',
    topicId: 'tema-05',
    question: 'El paso final en la síntesis industrial del antiulceroso Omeprazol es la oxidación quimioselectiva del puente tioéter entre el núcleo de piridina y el bencimidazol. ¿Qué condiciones de reactividad evitan la sobreoxidación irreversible a sulfona inactiva?',
    questionSmiles: 'COc1ccc2[nH]c(SCc3ncc(C)c(OC)c3C)nc2c1',
    options: [
      { text: 'Ácido m-cloroperbenzoico (m-CPBA, 1 equiv.) o NaIO4 a baja temperatura (0-5 °C)', smiles: 'COc1ccc2[nH]c(S(=O)Cc3ncc(C)c(OC)c3C)nc2c1' },
      { text: 'KMnO4 en medio sulfúrico concentrado a ebullición', smiles: '[O-][Mn](=O)(=O)=O' },
      { text: 'Hidruro de litio y aluminio (LiAlH4) en éter etílico anhidro', smiles: '[Li+].[AlH4-]' },
      { text: 'Mezcla sulfonítrica (HNO3/H2SO4) a temperatura ambiente', smiles: 'O=[N+]([O-])O' }
    ],
    correctIndex: 0,
    explanation: 'La transformación de sulfuro aromático a sulfóxido quiral en el Omeprazol requiere un agente oxidante electrófilo suave en estricta proporción estequiométrica (1.0 equivalente de m-CPBA o peroxiácidos/periodato sódico a 0 °C). Agentes oxidantes más enérgicos o exceso de peróxido sobreoxidan el azufre a sulfona (-SO2-), la cual carece de capacidad de reordenamiento para formar el ácido sulfénico activo.',
    difficulty: 'Avanzado',
    block: 'Reactividad & Síntesis Química'
  },
  {
    id: 'syn-react-sulfamidas',
    topicId: 'tema-08',
    question: 'En la síntesis de antibacterianos sulfonamídicos como el Sulfametoxazol, ¿cuál es la razón mecanística fundamental por la cual la anilina debe introducirse protegida como derivado N-acetilado (cloruro de N-acetilsulfanililo)?',
    questionSmiles: 'CC1=CC(=NO1)NS(=O)(=O)C2=CC=C(C=C2)N',
    options: [
      { text: 'El grupo -NH2 libre atacaría de forma intermolecular al cloruro de sulfonilo electrofílico generando polímeros', smiles: 'CC(=O)Nc1ccc(S(=O)(=O)Cl)cc1' },
      { text: 'El grupo N-acetilo actúa como catalizador básico para la desprotonación del isoxazol', smiles: 'Cc1cc(no1)N' },
      { text: 'Para inducir quiralidad axial sobre el átomo de azufre durante la sustitución', smiles: 'O=S(=O)(Cl)c1ccccc1' },
      { text: 'Porque el ácido clorhídrico liberado descarboxilaría el anillo de sulfonamida', smiles: 'Cl' }
    ],
    correctIndex: 0,
    explanation: 'Si la anilina estuviera desprotegida, el nitrógeno amino aromático nucleófilo atacaría de inmediato al grupo cloruro de sulfonilo de otra molécula, provocando policondensación descontrolada. La acetilación (amida) deslocaliza el par de electrones en el carbonilo y suprime su nucleofilia, permitiendo el acoplamiento selectivo con la 3-amino-5-metilisoxazol y posterior desprotección ácida.',
    difficulty: 'Medio',
    block: 'Reactividad & Síntesis Química'
  },
  {
    id: 'syn-react-lidocaina',
    topicId: 'tema-03',
    question: 'La síntesis clásica de la Lidocaína se realiza en dos etapas consecutivas a partir de 2,6-dimetilanilina. ¿Cuál es la secuencia de reactivos y el intermedio formado en la primera etapa?',
    questionSmiles: 'CCN(CC)CC(=O)NC1=C(C=CC=C1C)C',
    options: [
      { text: '1) Cloruro de cloroacetilo (forma 2-cloro-N-(2,6-dimetilfenil)acetamida); 2) Dietilamina (SN2)', smiles: 'Cc1cccc(C)c1NC(=O)CCl' },
      { text: '1) Cloruro de acetilo; 2) Bromación electrofílica con NBS', smiles: 'Cc1cccc(C)c1NC(=O)C' },
      { text: '1) Epiclorhidrina en NaOH; 2) Trietilamina a reflujo', smiles: 'OCC1CO1' },
      { text: '1) Cloroformiato de etilo; 2) Reducción con LiAlH4', smiles: 'CCOC(=O)Cl' }
    ],
    correctIndex: 0,
    explanation: 'La 2,6-dimetilanilina (con impedimento estérico orto que confiere resistencia a hidrólisis plasmática) reacciona con cloruro de cloroacetilo dando la α-cloroacetamida intermedia (SMILES: Cc1cccc(C)c1NC(=O)CCl). Seguidamente, el átomo de cloro alifático primario es desplazado por dietilamina mediante sustitución nucleófila bimolecular (SN2), incorporando el nitrógeno básico terminal.',
    difficulty: 'Medio',
    block: 'Reactividad & Síntesis Química'
  },
  {
    id: 'syn-react-diazepam',
    topicId: 'tema-01',
    question: 'En la síntesis de 1,4-benzodiazepinas como el Diazepam según la ruta clásica de Sternbach, ¿qué reactivo bifuncional permite acilar y ciclar sobre la 5-cloro-2-(metilamino)benzofenona?',
    questionSmiles: 'CN1C(=O)CN=C(C2=C1C=CC(=C2)Cl)C3=CC=CC=C3',
    options: [
      { text: 'Cloruro de cloroacetilo o éster etílico de glicina en piridina', smiles: 'ClCC(=O)Cl' },
      { text: 'Bromuro de fenilmagnesio seguido de nitrito de sodio', smiles: '[Mg+]Br' },
      { text: 'Ácido acético glacial en presencia de ácido sulfúrico concentrado', smiles: 'CC(=O)O' },
      { text: 'Ortoformiato de trietilo y azida de sodio', smiles: 'CCOC(OCC)OCC' }
    ],
    correctIndex: 0,
    explanation: 'La 5-cloro-2-(metilamino)benzofenona reacciona con cloruro de cloroacetilo dando una haloacetamida que seguidamente cicla intramolecularmente con una fuente de nitrógeno (amoníaco / urotropina), o bien cicla directamente por condensación con el clorhidrato del éster etílico de glicina a reflujo de piridina para rendir el heterociclo de diazepin-2-ona.',
    difficulty: 'Avanzado',
    block: 'Reactividad & Síntesis Química'
  },
  {
    id: 'syn-react-protecting-groups',
    topicId: 'tema-00',
    question: 'En la síntesis de fármacos peptídicos o conjugados biológicos, ¿cuál es el principio mecanístico de ortogonalidad entre los grupos protectores de amino Boc (terc-butoxicarbonilo) y Fmoc (9-fluorenilmetoxicarbonilo)?',
    questionSmiles: 'CC(C)(C)OC(=O)N',
    options: [
      { text: 'Boc es lábil a ácidos (TFA / carbocatión terc-butilo) y estable a bases; Fmoc es lábil a bases (piperidina / eliminación β) y estable a ácidos', smiles: 'c1ccc2c(c1)c3ccccc3c2COC(=O)N' },
      { text: 'Boc se escinde por hidrogenación catalítica con Pd/C y Fmoc por irradiación UV con láser', smiles: '[Pd]' },
      { text: 'Boc se desprotege exclusivamente con fluoruro de tetrabutilamonio (TBAF) y Fmoc con cloruro de tionilo', smiles: '[F-]' },
      { text: 'Ambos se escinden simultáneamente a pH 7.0 mediante enzimas esterasas plasmáticas', smiles: 'O' }
    ],
    correctIndex: 0,
    explanation: 'El grupo Boc se desprotege mediante catálisis ácida (TFA al 50% en diclorometano) generando isobuteno y CO2 tras formar el catión terc-butilo, permaneciendo inerte ante bases. Por contra, el grupo Fmoc posee un protón fuertemente acidificado en el C-9 del fluoreno, que es sustraído por una base secundaria no nucleófila (piperidina al 20% en DMF) produciendo dibenzofulveno por mecanismo E1cb, siendo 100% estable al ácido.',
    difficulty: 'Avanzado',
    block: 'Reactividad & Síntesis Química'
  },
  {
    id: 'syn-react-enalapril',
    topicId: 'tema-06',
    question: 'En la síntesis estereoselectiva del Enalapril (profármaco éster etílico del Enalaprilato), ¿qué reacción química ensambla el enlace C-N entre el 2-oxo-4-fenilbutanoato de etilo y el dipéptido L-alanil-L-prolina?',
    questionSmiles: 'CCOC(=O)C(CCc1ccccc1)NC(C)C(=O)N2CCCC2C(=O)O',
    options: [
      { text: 'Aminación reductiva quimioselectiva: formación in situ de imina y reducción con NaBH3CN o H2/Pd-C', smiles: 'CCOC(=O)C(=O)CCc1ccccc1' },
      { text: 'Sustitución nucleófila aromática (SNAr) catalizada por sales de cobre', smiles: 'c1ccccc1' },
      { text: 'Reacción de Wittig empleando un iluro de fósforo estabilizado', smiles: 'P(c1ccccc1)(c2ccccc2)c3ccccc3' },
      { text: 'Adición de Michael sobre un aceptor conjugado α,β-insaturado', smiles: 'C=CC(=O)O' }
    ],
    correctIndex: 0,
    explanation: 'La condensación del carbonilo electrofílico del α-cetoéster (2-oxo-4-fenilbutanoato de etilo) con el grupo amino primario de la L-Ala-L-Pro genera una base de Schiff (imina) intermedia. La reducción concomitante con cianoborohidruro sódico (NaBH3CN a pH 6) o hidrogenación catalítica sobre Pd/C rinde el diastereómero de configuración (S,S,S) característico del Enalapril.',
    difficulty: 'Avanzado',
    block: 'Reactividad & Síntesis Química'
  },
  {
    id: 'syn-react-ibuprofeno',
    topicId: 'tema-04',
    question: 'En la moderna síntesis "verde" del Ibuprofeno (proceso catalítico BHC de 3 etapas con alta economía atómica), ¿cuáles son las tres transformaciones consecutivas a partir de isobutilbenceno?',
    questionSmiles: 'CC(C)Cc1ccc(C(C)C(=O)O)cc1',
    options: [
      { text: '1) Acilación Friedel-Crafts con Ac2O (HF catalítico); 2) Hidrogenación catalítica con Raney-Ni; 3) Carbonilación con CO/Pd', smiles: 'CC(C)Cc1ccccc1' },
      { text: '1) Cloración radicalaria con Cl2/luz; 2) Eliminación E2 con KOH; 3) Ozonólisis oxidativa', smiles: 'CC(C)Cc1ccccc1' },
      { text: '1) Nitración aromática; 2) Reducción con Fe/HCl; 3) Reacción de Sandmeyer con KCN', smiles: 'N#C' },
      { text: '1) Alquilación con bromuro de isopropilo; 2) Formilación de Vilsmeier; 3) Oxidación de Jones', smiles: 'CC(C)Br' }
    ],
    correctIndex: 0,
    explanation: 'El método BHC desarrollado para Ibuprofeno es un modelo de Química Sostenible: 1) Acilación de Friedel-Crafts selectiva para dar 4-isobutilacetofenona; 2) Hidrogenación catalítica del carbonilo a alcohol secundario (1-(4-isobutilfenil)etanol); 3) Carbonilación directa asistida por complejos de Pd(0) con monóxido de carbono (CO) e incorporación del 100% de los átomos sin generar residuos.',
    difficulty: 'Medio',
    block: 'Reactividad & Síntesis Química'
  },
  {
    id: 'syn-react-salification',
    topicId: 'tema-01',
    question: 'En la formulación química de neurolépticos fenotiazínicos como la Clorpromazina para administración parenteral acuosa, ¿qué centro nucleófilo/básico de la estructura molecular reacciona estequiométricamente con ácido clorhídrico para formar el monoclorhidrato soluble?',
    questionSmiles: 'CN(C)CCCN1c2ccccc2Sc3ccc(Cl)cc13',
    options: [
      { text: 'El nitrógeno de la amina alifática terciaria terminal (-N(CH3)2, pKa ≈ 9.3)', smiles: 'CN(C)C' },
      { text: 'El átomo de nitrógeno heterocíclico N-10 del anillo de fenotiazina', smiles: 'c1ccc2[nH]c3ccccc3sc2c1' },
      { text: 'El átomo de azufre tioéter del núcleo tricíclico', smiles: 'CSC' },
      { text: 'El átomo de cloro aromático mediante adición-eliminación', smiles: 'Cl' }
    ],
    correctIndex: 0,
    explanation: 'El nitrógeno alifático terciario dimetilamino posee hibridación sp³ y un pKa de ~9.3, siendo el único centro fuertemente básico de la molécula. Por contra, el nitrógeno fenotiazínico N-10 deslocaliza intensamente su par de electrones solitarios en el sistema aromático conjugado de los dos anillos de benceno, careciendo de basicidad apreciable a pH ácido o fisiológico.',
    difficulty: 'Fácil',
    block: 'Reactividad & Síntesis Química'
  }
];

function generateFallbackExamQuestions(
  topicId: string, 
  topicTitle: string, 
  count: number, 
  difficulty: string,
  focusArea: ExamFocusArea = 'sintesis_reactividad',
  topic?: QfdosTopic
): TestQuestion[] {
  // 1. Preguntas especializadas de Reactividad y Síntesis Química con estructuras
  const synthesisForTopic = SYNTHESIS_REACTIVITY_QUESTIONS.filter(q => q.topicId === topicId);
  const otherSynthesis = SYNTHESIS_REACTIVITY_QUESTIONS.filter(q => q.topicId !== topicId);
  const prioritizedSynthesis = [...synthesisForTopic, ...otherSynthesis];

  // 2. Preguntas oficiales del FIR específicas para este tema de QFDOS
  const firForTopic = getFirQuestionsByTopic(topicId).map(convertFirToTestQuestion);

  // 3. Tema activo: usa el objeto vivo 'topic' (con materiales subidos por el profesor) si existe, o fallback a INITIAL_TOPICS
  const matchedTopic = topic || INITIAL_TOPICS.find((t: QfdosTopic) => t.id === topicId);
  const topicQuestions: TestQuestion[] = (matchedTopic?.testQuestions || []).map((q: TestQuestion, idx: number) => ({
    ...q,
    id: `topic-fb-${Date.now()}-${idx}`,
    topicId,
    difficulty: difficulty as any
  }));

  // 4. Preguntas dinámicas basadas en fármacos y materiales subidos a la web (RDKit)
  // Conforme el profesor sube nuevos fármacos con estructuras, se generan automáticamente preguntas de evaluación
  const drugQuestions: TestQuestion[] = (matchedTopic?.drugs || []).map((d, dIdx) => {
    // Si el enfoque es síntesis/reactividad, generamos pregunta de reactividad/transformación del fármaco subido
    if (focusArea === 'sintesis_reactividad') {
      return {
        id: `uploaded-drug-react-${Date.now()}-${dIdx}`,
        topicId,
        question: `En la estrategia de optimización química y síntesis de "${d.name}", ¿cuál es la modificación estructural o reactivo clave asociado a su perfil farmacológico (${d.role})?`,
        questionSmiles: d.smiles,
        options: [
          { text: `Optimización de afinidad y farmacocinética para actuar como ${d.role}`, smiles: d.smiles },
          { text: 'Sustitución inespecífica por grupo perfluoroalquilo sin retención de actividad', smiles: 'C(F)(F)F' },
          { text: 'Apertura desestabilizadora del núcleo aromático central', smiles: 'C=CC=C' },
          { text: 'Alquilación destructiva que suprime el farmacóforo', smiles: 'CC' }
        ],
        correctIndex: 0,
        explanation: `El fármaco ${d.name} (incorporado en los materiales docentes de la unidad) actúa como ${d.role}. Posee un peso molecular de ${d.mw || 'N/A'} Da, LogP de ${d.logP ?? 'N/A'} y TPSA de ${d.tpsa ?? 'N/A'} Å², siendo una diana clave en ${topicTitle}.`,
        difficulty: difficulty as any,
        block: 'Reactividad & Síntesis Química'
      };
    }

    return {
      id: `uploaded-drug-sar-${Date.now()}-${dIdx}`,
      topicId,
      question: `Considerando la estructura molecular y el farmacóforo de "${d.name}" (material docente de ${topicTitle}), ¿cuál es su diana o mecanismo molecular clave?`,
      questionSmiles: d.smiles,
      options: [
        d.role,
        'Inhibidor irreversible inespecífico de transportadores ABC.',
        'Agonista alostérico puro sin modulación termodinámica.',
        'Profármaco inactivo sin permeabilidad en membrana biológica.'
      ],
      correctIndex: 0,
      explanation: `El compuesto ${d.name} actúa como ${d.role}. Presenta un peso molecular de ${d.mw || 'N/A'} Da, LogP de ${d.logP ?? 'N/A'} y TPSA de ${d.tpsa ?? 'N/A'} Å², optimizado para su diana biológica.`,
      difficulty: difficulty as any,
      block: 'SAR Molecular & Dianas'
    };
  });

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

  // Ordenar según el enfoque pedagógico solicitado
  let combined: TestQuestion[] = [];
  if (focusArea === 'sintesis_reactividad') {
    combined = [...prioritizedSynthesis, ...firForTopic, ...drugQuestions, ...topicQuestions, ...generalPool];
  } else if (focusArea === 'sar_farmacoforos') {
    combined = [...drugQuestions, ...firForTopic, ...topicQuestions, ...prioritizedSynthesis, ...generalPool];
  } else {
    combined = [...firForTopic, ...prioritizedSynthesis, ...topicQuestions, ...drugQuestions, ...generalPool];
  }
  
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
