# -*- coding: utf-8 -*-
"""
QFDOS - Generador de estructuras y propiedades: Tema 4 (Serotonina e inhibidores de la
recaptación de aminas biógenas)
=====================================================================================
Genera en esta carpeta:
  - estructuras_qfdos.csv      maestro del tema (mismo formato que Tema 3 + estado regulatorio)
  - propiedades_qfdos.csv      descriptores RDKit
  - estructuras_qfdos.xlsx     hojas Propiedades y Estructuras (con imágenes)
  - img/QFDOS-xxx_*.png        estructura individual con rótulo (acentos correctos, fuente TTF)
  - svg/QFDOS-xxx_*.svg        la misma estructura en vectorial
  - slide/QFDOS-xxx.png        estructura sin rótulo, fondo transparente, longitud de enlace
                               fija (todas a la misma escala) para las diapositivas
  - QFDOS_T4_*.png             figuras compuestas por bloque, con estado regulatorio
  - chembl_tema4.json          verificación por InChIKey contra ChEMBL (caché)

Uso:  python generar_tema4_completo.py [--sin-chembl]
Requisitos: rdkit, pillow, openpyxl
"""

import csv
import json
import os
import re
import sys
import unicodedata
import urllib.request

from PIL import Image, ImageDraw, ImageFont
from rdkit import Chem, RDLogger
from rdkit.Chem import QED, AllChem, Crippen, Descriptors, Lipinski, rdMolDescriptors
from rdkit.Chem.Draw import rdMolDraw2D

RDLogger.DisableLog('rdApp.*')
if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

DIR = os.path.dirname(os.path.abspath(__file__))
for sub in ('img', 'svg', 'slide'):
    os.makedirs(os.path.join(DIR, sub), exist_ok=True)

FUENTE = 'C:/Windows/Fonts/arial.ttf' if os.path.exists('C:/Windows/Fonts/arial.ttf') else None
FUENTE_B = 'C:/Windows/Fonts/arialbd.ttf' if os.path.exists('C:/Windows/Fonts/arialbd.ttf') else FUENTE

# Paleta QFDOS para los átomos: carbono y enlaces en azul marino, N teal oscuro.
PALETA = {
    0: (0.118, 0.227, 0.541), 1: (0.118, 0.227, 0.541), 6: (0.118, 0.227, 0.541),
    7: (0.059, 0.463, 0.431), 8: (0.800, 0.110, 0.110), 9: (0.016, 0.471, 0.341),
    16: (0.706, 0.325, 0.035), 17: (0.016, 0.471, 0.341), 35: (0.553, 0.098, 0.098),
}

# Estado regulatorio abreviado (la explicación va en estado_regulatorio_farmacos_tema4.md).
EN_USO = 'En uso'
EN_USO_FUERA = 'En uso fuera de España'
RESTRINGIDO = 'En uso con restricciones'
RETIRADO = 'Retirado'
NUNCA = 'Nunca comercializado'
HERRAMIENTA = 'Herramienta de investigación'
CONTROLADA = 'Sustancia controlada'
ENDOGENO = 'Endógeno'
INTERMEDIO = 'Intermedio / reactivo'

COLOR_ESTADO = {
    EN_USO: '#047857', EN_USO_FUERA: '#0f766e', RESTRINGIDO: '#b45309',
    RETIRADO: '#b91c1c', NUNCA: '#6d28d9', HERRAMIENTA: '#1e3a8a',
    CONTROLADA: '#7f1d1d', ENDOGENO: '#334155', INTERMEDIO: '#334155',
}


def c(id_, nombre, nombre_en, bloque, familia, smiles, ph74, cas, estado, notas, etiqueta=None):
    return {'id': id_, 'nombre': nombre, 'nombre_en': nombre_en, 'tema': bloque,
            'familia': familia, 'smiles': smiles, 'smiles_ph74': ph74, 'cas': cas,
            'chembl_id': '', 'estado_regulatorio': estado, 'notas': notas,
            'etiqueta': etiqueta or nombre}


B1 = 'Antidepresivos tricíclicos'
B2 = 'Inhibidores de la MAO'
B3 = 'Serotonina: biosíntesis y metabolismo'
B4 = 'ISRS'
B5 = 'Ergolinas y triptanes (antimigraña)'
B6 = 'Síntesis de Fischer y del sumatriptán'
B7 = 'Agonistas 5-HT1A (ansiolíticos)'
B8 = 'Antagonistas 5-HT3 (setrones)'
B9 = 'Ejercicio 4.4: ciproheptadina'
B10 = 'Ejercicio 4.7: almotriptán'

COMPUESTOS = [
    # ── 1. Tricíclicos y síntesis de la imipramina ──────────────────────────────
    c('QFDOS-170', 'o-Nitrotolueno', '2-Nitrotoluene', B1, 'Nitroareno (material de partida)',
      'Cc1ccccc1[N+](=O)[O-]', 'Cc1ccccc1[N+](=O)[O-]', '88-72-2', INTERMEDIO,
      'Material de partida de la síntesis de la imipramina. El metilo en orto al nitro es ácido: el carbanión bencílico deslocaliza la carga sobre el grupo nitro. Con EtONa y aire se oxida a radical, que dimeriza a 2,2\'-dinitrobibencilo.'),
    c('QFDOS-171', "2,2'-Dinitrobibencilo", "2,2'-Dinitrobibenzyl", B1, 'Intermedio de síntesis',
      '[O-][N+](=O)c1ccccc1CCc1ccccc1[N+](=O)[O-]', '[O-][N+](=O)c1ccccc1CCc1ccccc1[N+](=O)[O-]', '16968-19-7', INTERMEDIO,
      'Dímero del radical o-nitrobencilo. Se reduce con H₂/PtO₂ a la diamina.'),
    c('QFDOS-172', "2,2'-Diaminobibencilo", "2,2'-Ethylenedianiline", B1, 'Intermedio de síntesis',
      'Nc1ccccc1CCc1ccccc1N', 'Nc1ccccc1CCc1ccccc1N', '34124-14-6', INTERMEDIO,
      'Diamina que cicla con H₃PO₄ a 300 °C (pérdida de NH₃) para dar el iminodibencilo.'),
    c('QFDOS-173', 'Iminodibencilo', 'Iminodibenzyl (10,11-dihydro-5H-dibenz[b,f]azepine)', B1, 'Dibenzoazepina',
      'C1Cc2ccccc2Nc2ccccc21', 'C1Cc2ccccc2Nc2ccccc21', '494-19-9', INTERMEDIO,
      'Núcleo tricíclico de la imipramina. El NH (diarilamina, poco básico) se desprotona con NaNH₂ y se alquila con 3-cloro-N,N-dimetilpropilamina.'),
    c('QFDOS-174', '3-Cloro-N,N-dimetilpropilamina', '3-Chloro-N,N-dimethylpropan-1-amine', B1, 'Agente alquilante',
      'CN(C)CCCCl', 'C[NH+](C)CCCCl', '109-54-6', INTERMEDIO,
      'Aporta la cadena de tres carbonos con amina terciaria, la misma de la clorpromazina.'),
    c('QFDOS-175', 'Imipramina', 'Imipramine', B1, 'Dibenzoazepina (ATC)',
      'CN(C)CCCN1c2ccccc2CCc2ccccc21', 'C[NH+](C)CCCN1c2ccccc2CCc2ccccc21', '50-49-7', EN_USO,
      'Prototipo de los antidepresivos tricíclicos. Isóstero de la clorpromazina: el puente -S- de la fenotiazina se sustituye por -CH₂-CH₂- y se pierde el Cl. Inhibe la recaptación de 5-HT y NA. Su N-desmetilación hepática da desipramina, también activa. España: Tofranil (CIMA).'),
    c('QFDOS-176', 'Clorpromazina', 'Chlorpromazine', B1, 'Fenotiazina (neuroléptico)',
      'CN(C)CCCN1c2ccccc2Sc2ccc(Cl)cc21', 'C[NH+](C)CCCN1c2ccccc2Sc2ccc(Cl)cc21', '50-53-3', EN_USO,
      'Repetida del Tema 3 (QFDOS-146) con notas propias: punto de partida del diseño de la imipramina. España: Largactil.'),
    c('QFDOS-177', 'Desipramina', 'Desipramine', B1, 'Dibenzoazepina (ATC, amina secundaria)',
      'CNCCCN1c2ccccc2CCc2ccccc21', 'C[NH2+]CCCN1c2ccccc2CCc2ccccc21', '50-47-5', EN_USO_FUERA,
      'Metabolito N-desmetilado de la imipramina. Más selectiva por el transportador de noradrenalina. Sin registro en CIMA; en EE. UU. sigue comercializada (Norpramin y genéricos).'),
    c('QFDOS-178', 'Opipramol', 'Opipramol', B1, 'Dibenzoazepina insaturada (5H-dibenz[b,f]azepina)',
      'OCCN1CCN(CCCN2c3ccccc3C=Cc3ccccc32)CC1', 'OCCN1CC[NH+](CCCN2c3ccccc3C=Cc3ccccc32)CC1', '315-72-0', EN_USO_FUERA,
      'Doble enlace C10=C11 en el puente y cadena de hidroxietilpiperazina (como la de la flufenazina). No inhibe de forma relevante la recaptación: actúa sobre receptores sigma y se usa como ansiolítico. Sin registro en CIMA ni en la FDA; comercializado en Alemania y Europa central (Insidon).'),
    c('QFDOS-179', 'Amitriptilina', 'Amitriptyline', B1, 'Dibenzocicloheptadieno (ATC)',
      'CN(C)CCC=C1c2ccccc2CCc2ccccc21', 'C[NH+](C)CCC=C1c2ccccc2CCc2ccccc21', '50-48-6', EN_USO,
      'Sustitución isostérica del N cíclico de la imipramina por un carbono sp² (grupo metilideno): la cadena sale de un doble enlace exocíclico. Hoy se usa sobre todo en dolor neuropático y profilaxis de migraña.'),
    # ── 2. IMAO ────────────────────────────────────────────────────────────────
    c('QFDOS-180', 'Isoniazida', 'Isoniazid', B2, 'Hidrazida (tuberculostático)',
      'NNC(=O)c1ccncc1', 'NNC(=O)c1ccncc1', '54-85-3', EN_USO,
      'Tuberculostático del que deriva la iproniazida. En uso (Cemidon B6, Rifinah, Tisobrif).'),
    c('QFDOS-181', 'Iproniazida', 'Iproniazid', B2, 'Hidrazida (IMAO irreversible no selectivo)',
      'CC(C)NNC(=O)c1ccncc1', 'CC(C)NNC(=O)c1ccncc1', '54-92-2', RETIRADO,
      'N\'-isopropil derivado de la isoniazida. Su efecto euforizante en tuberculosos llevó al primer IMAO antidepresivo. Retirada por hepatotoxicidad (EE. UU., 1961). Sin registros en CIMA ni en la FDA.'),
    c('QFDOS-182', 'Pargilina', 'Pargyline', B2, 'Propargilamina (IMAO irreversible)',
      'CN(CC#C)Cc1ccccc1', 'C[NH+](CC#C)Cc1ccccc1', '555-57-7', RETIRADO,
      'N-metil-N-propargilbencilamina, prototipo de las 2-propinilaminas. El grupo propargilo forma un aducto covalente con el FAD de la MAO. Se usó como antihipertensivo (Eutonyl); hoy no figura en CIMA ni en Drugs@FDA.'),
    c('QFDOS-183', 'Clorgilina', 'Clorgyline', B2, 'Propargilamina (IMAO-A irreversible selectivo)',
      'CN(CCCOc1ccc(Cl)cc1Cl)CC#C', 'C[NH+](CCCOc1ccc(Cl)cc1Cl)CC#C', '17780-72-2', NUNCA,
      'Inhibidor irreversible y selectivo de la MAO-A. No llegó a comercializarse: es la herramienta farmacológica que define la MAO-A (y la selegilina, la MAO-B). El borrador decía que «se emplea como antidepresivo»: corregido.'),
    c('QFDOS-184', 'Meclobemida', 'Moclobemide', B2, 'Benzamida (RIMA: IMAO-A reversible)',
      'O=C(NCCN1CCOCC1)c1ccc(Cl)cc1', 'O=C(NCC[NH+]1CCOCC1)c1ccc(Cl)cc1', '71320-77-9', EN_USO,
      '4-Cloro-N-(2-morfolinoetil)benzamida. La imagen del borrador ponía F en lugar de Cl: corregido. Inhibidor reversible de la MAO-A: la tiramina de la dieta desplaza al inhibidor y el riesgo de crisis hipertensiva es mucho menor. España: Manerix 150 y 300 mg (CIMA). No autorizada en EE. UU.'),
    c('QFDOS-185', 'Tiramina', 'Tyramine', B2, 'Feniletilamina (amina dietética)',
      'NCCc1ccc(O)cc1', '[NH3+]CCc1ccc(O)cc1', '51-67-2', ENDOGENO,
      'Amina presora de quesos curados, embutidos y vino. Sustrato de MAO-A y MAO-B. Con un IMAO irreversible no se degrada en el intestino, libera noradrenalina y produce la crisis hipertensiva del «efecto queso».'),
    # ── 3. Serotonina ──────────────────────────────────────────────────────────
    c('QFDOS-186', 'L-Triptófano', 'L-Tryptophan', B3, 'Aminoácido esencial',
      'N[C@@H](Cc1c[nH]c2ccccc12)C(=O)O', '[NH3+][C@@H](Cc1c[nH]c2ccccc12)C(=O)[O-]', '73-22-3', ENDOGENO,
      'Precursor de la serotonina. La triptófano hidroxilasa (TPH, dependiente de tetrahidrobiopterina) es la etapa limitante.'),
    c('QFDOS-187', '5-Hidroxi-L-triptófano', '5-Hydroxy-L-tryptophan (oxitriptan)', B3, 'Aminoácido',
      'N[C@@H](Cc1c[nH]c2ccc(O)cc12)C(=O)O', '[NH3+][C@@H](Cc1c[nH]c2ccc(O)cc12)C(=O)[O-]', '4350-09-8', ENDOGENO,
      'Producto de la TPH. Lo descarboxila la descarboxilasa de L-aminoácidos aromáticos (AADC), la misma enzima que convierte la L-DOPA en dopamina (Tema 3).'),
    c('QFDOS-188', 'Serotonina', 'Serotonin (5-HT)', B3, 'Indoletilamina (neurotransmisor)',
      'NCCc1c[nH]c2ccc(O)cc12', '[NH3+]CCc1c[nH]c2ccc(O)cc12', '50-67-9', ENDOGENO,
      '5-Hidroxitriptamina. Cerca del 90 % está fuera del SNC, en las células enterocromafines del intestino, y las plaquetas la captan y almacenan. Siete familias de receptores (5-HT1 a 5-HT7); todas son GPCR salvo 5-HT3, que es un canal iónico.'),
    c('QFDOS-189', 'Ácido 5-hidroxiindolacético', '5-Hydroxyindoleacetic acid (5-HIAA)', B3, 'Metabolito',
      'OC(=O)Cc1c[nH]c2ccc(O)cc12', '[O-]C(=O)Cc1c[nH]c2ccc(O)cc12', '54-16-0', ENDOGENO,
      'Metabolito principal de la serotonina: desaminación oxidativa por MAO-A al aldehído y oxidación por aldehído deshidrogenasa. Su excreción urinaria es el marcador de los tumores carcinoides.'),
    c('QFDOS-190', 'N-Acetilserotonina', 'N-Acetylserotonin', B3, 'Metabolito (precursor de melatonina)',
      'CC(=O)NCCc1c[nH]c2ccc(O)cc12', 'CC(=O)NCCc1c[nH]c2ccc(O)cc12', '1210-83-9', ENDOGENO,
      'Producto de la arilalquilamina N-acetiltransferasa (AANAT) en la glándula pineal. La estructura que el borrador rotulaba como melatonina era esta: le falta la O-metilación.'),
    c('QFDOS-191', 'Melatonina', 'Melatonin', B3, 'Indol (hormona pineal)',
      'COc1ccc2[nH]cc(CCNC(C)=O)c2c1', 'COc1ccc2[nH]cc(CCNC(C)=O)c2c1', '73-31-4', EN_USO,
      'N-Acetil-5-metoxitriptamina: N-acetilación (AANAT) y después O-metilación del 5-OH (acetilserotonina O-metiltransferasa, ASMT/HIOMT). Medicamento en la UE: Circadin (insomnio en mayores de 55 años) y Slenyto (pediatría); en EE. UU. es suplemento.'),
    # ── 4. ISRS ────────────────────────────────────────────────────────────────
    c('QFDOS-192', 'Fluoxetina', 'Fluoxetine', B4, 'Ariloxipropilamina (ISRS)',
      'CNCCC(Oc1ccc(cc1)C(F)(F)F)c1ccccc1', 'C[NH2+]CCC(Oc1ccc(cc1)C(F)(F)F)c1ccccc1', '54910-89-3', EN_USO,
      'Prozac (Lilly, 1987 en EE. UU.), racémica. El CF₃ en para del ariloxi da selectividad por SERT; su metabolito N-desmetilado (norfluoxetina) tiene semivida de 1-2 semanas.'),
    c('QFDOS-193', 'Citalopram', 'Citalopram', B4, 'Ftalano (ISRS)',
      'CN(C)CCCC1(OCc2cc(C#N)ccc21)c1ccc(F)cc1', 'C[NH+](C)CCCC1(OCc2cc(C#N)ccc21)c1ccc(F)cc1', '59729-33-8', RESTRINGIDO,
      'Racémico. Prolonga el QT de forma dosis-dependiente: desde 2011 (FDA y AEMPS) dosis máxima 40 mg/día y 20 mg/día en mayores de 65 años o con insuficiencia hepática.'),
    c('QFDOS-194', 'Escitalopram', 'Escitalopram', B4, 'Ftalano (ISRS, eutómero)',
      'CN(C)CCC[C@]1(OCc2cc(C#N)ccc21)c1ccc(F)cc1', 'C[NH+](C)CCC[C@]1(OCc2cc(C#N)ccc21)c1ccc(F)cc1', '128196-01-0', EN_USO,
      'Enantiómero (S) del citalopram: ejemplo de cambio quiral («chiral switch»). Añadido en 2026/27; no estaba en el borrador.'),
    c('QFDOS-195', 'Sertralina', 'Sertraline', B4, 'Aminotetralina (ISRS)',
      'CN[C@H]1CC[C@H](C2=CC=CC=C12)C3=CC(=C(C=C3)Cl)Cl', 'C[NH2+][C@H]1CC[C@H](C2=CC=CC=C12)C3=CC(=C(C=C3)Cl)Cl', '79617-96-2', EN_USO,
      '(1S,4S)-Sertralina, isómero cis. Fenilalquilamina con la cadena cerrada en un anillo de tetralina; el 3,4-diclorofenilo da la afinidad por SERT.'),
    # ── 5. Ergolinas y triptanes ───────────────────────────────────────────────
    c('QFDOS-196', 'Ergolina', 'Ergoline', B5, 'Esqueleto ergolínico',
      'C1C[C@H]2[C@@H](Cc3c[nH]c4cccc2c34)NC1', 'C1C[C@H]2[C@@H](Cc3c[nH]c4cccc2c34)[NH2+]C1', '478-88-5', INTERMEDIO,
      'Esqueleto tetracíclico de los alcaloides del cornezuelo. Contiene una triptamina rígida (por eso se une a receptores 5-HT) y una feniletilamina (receptores dopaminérgicos y adrenérgicos).'),
    c('QFDOS-197', 'LSD (lisergida)', 'Lysergic acid diethylamide', B5, 'Ergolina (dietilamida del ácido lisérgico)',
      'CCN(CC)C(=O)[C@H]1CN([C@@H]2CC3=CNC4=CC=CC(=C34)C2=C1)C', 'CCN(CC)C(=O)[C@H]1C[NH+]([C@@H]2CC3=CNC4=CC=CC(=C34)C2=C1)C', '50-37-3', CONTROLADA,
      '(5R,8R). Dietilamida: el borrador dibujaba una dimetilamida (CONMe₂), corregido. Agonista 5-HT2A, alucinógeno. Sin uso médico autorizado; el MM120 (tartrato de LSD, MindMed) está en fase 3 en ansiedad generalizada con designación de terapia innovadora de la FDA (marzo de 2024).'),
    c('QFDOS-198', 'Metisergida', 'Methysergide', B5, 'Ergolina (antagonista 5-HT2)',
      'CC[C@@H](CO)NC(=O)[C@H]1CN([C@@H]2CC3=CN(C4=CC=CC(=C34)C2=C1)C)C', 'CC[C@@H](CO)NC(=O)[C@H]1C[NH+]([C@@H]2CC3=CN(C4=CC=CC(=C34)C2=C1)C)C', '361-37-5', RETIRADO,
      'N1-metil y amida de (S)-2-aminobutanol. Antagonista 5-HT2 y, a través de su metabolito metilergometrina, agonista 5-HT1. Profilaxis de la migraña. Fibrosis retroperitoneal, pleural y valvular: la EMA restringió su uso en 2014 (art. 31). Sin registro en CIMA ni en Drugs@FDA.'),
    c('QFDOS-199', '5-Carboxamidotriptamina (5-CT)', '5-Carboxamidotryptamine', B5, 'Triptamina (agonista 5-HT1/5-HT7)',
      'NCCc1c[nH]c2ccc(C(N)=O)cc12', '[NH3+]CCc1c[nH]c2ccc(C(N)=O)cc12', '74885-09-9', HERRAMIENTA,
      'El OH de la serotonina se sustituye por carboxamida: potente pero no selectiva (hipotensión por 5-HT7 y otros subtipos).'),
    c('QFDOS-200', '5-(N-Metilcarbamoilmetil)triptamina', '2-[3-(2-Aminoethyl)-1H-indol-5-yl]-N-methylacetamide', B5, 'Triptamina (precursor del sumatriptán)',
      'CNC(=O)Cc1ccc2[nH]cc(CCN)c2c1', 'CNC(=O)Cc1ccc2[nH]cc(CC[NH3+])c2c1', '', HERRAMIENTA,
      'Un CH₂ entre el indol y la amida, con N-metilo: gana selectividad 5-HT1B/1D, pero no tiene biodisponibilidad oral.'),
    c('QFDOS-201', 'N,N-Didesmetilsumatriptán', 'N,N-Didesmethylsumatriptan', B5, 'Triptamina (precursor del sumatriptán)',
      'CNS(=O)(=O)Cc1ccc2[nH]cc(CCN)c2c1', 'CNS(=O)(=O)Cc1ccc2[nH]cc(CC[NH3+])c2c1', '', INTERMEDIO,
      'La sulfonamida (N-metilsulfamoilmetilo) es el bioisóstero de la amida. Selectivo, pero la amina primaria se desamina rápido por la MAO-A. También es el intermedio de síntesis tras reducir el nitrilo.'),
    c('QFDOS-202', 'Sumatriptán', 'Sumatriptan', B5, 'Triptán (agonista 5-HT1B/1D)',
      'CNS(=O)(=O)Cc1ccc2[nH]cc(CCN(C)C)c2c1', 'CNS(=O)(=O)Cc1ccc2[nH]cc(CC[NH+](C)C)c2c1', '103628-46-2', EN_USO,
      'Primer triptán (Glaxo, 1991). La N,N-dimetilamina reduce la desaminación. Biodisponibilidad oral baja (≈14 %); también vía subcutánea e intranasal.'),
    c('QFDOS-203', 'Zolmitriptán', 'Zolmitriptan', B5, 'Triptán (agonista 5-HT1B/1D)',
      'CN(C)CCc1c[nH]c2ccc(C[C@H]3COC(=O)N3)cc12', 'C[NH+](C)CCc1c[nH]c2ccc(C[C@H]3COC(=O)N3)cc12', '139264-17-8', EN_USO,
      '(S)-Oxazolidinona en posición 5. Más lipófilo que el sumatriptán y mejor biodisponibilidad oral (≈40 %).'),
    c('QFDOS-204', 'Almotriptán', 'Almotriptan', B5, 'Triptán (agonista 5-HT1B/1D)',
      'CN(C)CCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12', 'C[NH+](C)CCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12', '154323-57-6', EN_USO,
      'Almirall (España). Sulfonamida terciaria con pirrolidina. Biodisponibilidad oral cercana al 70 % (ficha técnica de Almogran), de las más altas del grupo junto con el naratriptán. Almogran y genéricos en CIMA.'),
    c('QFDOS-205', 'Lasmiditán', 'Lasmiditan', B5, 'Ditán (agonista 5-HT1F)',
      'CN1CCC(CC1)C(=O)c1cccc(NC(=O)c2c(F)cc(F)cc2F)n1', 'C[NH+]1CCC(CC1)C(=O)c1cccc(NC(=O)c2c(F)cc(F)cc2F)n1', '439239-90-4', EN_USO,
      'Agonista 5-HT1F sin indol ni actividad vasoconstrictora: alternativa a los triptanes en pacientes cardiovasculares. UE y España: Rayvow (autorizado en 2022). Produce mareo y somnolencia: no conducir en 8 h. Añadido en 2026/27.'),
    # ── 6. Fischer y síntesis del sumatriptán ─────────────────────────────────
    c('QFDOS-206', 'Fenilhidrazina', 'Phenylhydrazine', B6, 'Arilhidrazina',
      'NNc1ccccc1', 'NNc1ccccc1', '100-63-0', INTERMEDIO,
      'Reactivo de la síntesis de indoles de Fischer: con un aldehído o cetona forma la fenilhidrazona.'),
    c('QFDOS-207', '4-Amino-N-metilbencenometanosulfonamida', '4-Amino-N-methylbenzenemethanesulfonamide', B6, 'Intermedio de síntesis',
      'CNS(=O)(=O)Cc1ccc(N)cc1', 'CNS(=O)(=O)Cc1ccc(N)cc1', '', INTERMEDIO,
      'Anilina de partida del sumatriptán, con el grupo N-metilsulfamoilmetilo en para.'),
    c('QFDOS-208', '4-Hidrazino-N-metilbencenometanosulfonamida', '4-Hydrazinyl-N-methylbenzenemethanesulfonamide', B6, 'Intermedio de síntesis',
      'CNS(=O)(=O)Cc1ccc(NN)cc1', 'CNS(=O)(=O)Cc1ccc(NN)cc1', '', INTERMEDIO,
      'Diazotación (HNO₂) y reducción de la sal de diazonio con SnCl₂.'),
    c('QFDOS-209', '3-Cianopropanal', '4-Oxobutanenitrile', B6, 'Aldehído',
      'O=CCCC#N', 'O=CCCC#N', '3515-93-3', INTERMEDIO,
      'Aporta los dos carbonos C2-C3 del indol y el CH₂CN que se reduce a la cadena etilamínica.'),
    c('QFDOS-210', 'Hidrazona del sumatriptán', 'Sumatriptan hydrazone intermediate', B6, 'Intermedio de síntesis',
      'CNS(=O)(=O)Cc1ccc(NN=CCCC#N)cc1', 'CNS(=O)(=O)Cc1ccc(NN=CCCC#N)cc1', '', INTERMEDIO,
      'Fenilhidrazona que, en medio ácido, sufre la transposición sigmatrópica [3,3] de Fischer.'),
    c('QFDOS-211', '5-(N-Metilsulfamoilmetil)indol-3-acetonitrilo', '[3-(Cyanomethyl)-1H-indol-5-yl]-N-methylmethanesulfonamide', B6, 'Intermedio de síntesis',
      'CNS(=O)(=O)Cc1ccc2[nH]cc(CC#N)c2c1', 'CNS(=O)(=O)Cc1ccc2[nH]cc(CC#N)c2c1', '', INTERMEDIO,
      'Indol formado en la ciclación de Fischer. La reducción del nitrilo (H₂) da la amina primaria (QFDOS-201), que la aminación reductora con HCHO/NaBH₄ convierte en sumatriptán.'),
    # ── 7. 5-HT1A ──────────────────────────────────────────────────────────────
    c('QFDOS-212', '8-OH-DPAT', '8-Hydroxy-2-(di-n-propylamino)tetralin', B7, 'Aminotetralina (agonista 5-HT1A)',
      'CCCN(CCC)C1CCc2cccc(O)c2C1', 'CCC[NH+](CCC)C1CCc2cccc(O)c2C1', '78950-78-4', HERRAMIENTA,
      'Agonista 5-HT1A completo de referencia, con afinidad nanomolar. También agonista 5-HT7. Herramienta farmacológica, sin uso clínico.'),
    c('QFDOS-213', 'Buspirona', 'Buspirone', B7, 'Azapirona (agonista parcial 5-HT1A)',
      'O=C1CC2(CCCC2)CC(=O)N1CCCCN1CCN(c2ncccn2)CC1', 'O=C1CC2(CCCC2)CC(=O)N1CCCC[NH+]1CCN(c2ncccn2)CC1', '36505-84-7', EN_USO_FUERA,
      'Pirimidinilpiperazina unida por un puente de cuatro carbonos a una imida (8-azaspiro[4.5]decano-7,9-diona). El borrador omitía los dos C=O de la imida: corregido. Ansiolítico sin sedación ni dependencia, de inicio lento. Antagonista débil D2 presináptico (no agonista). Sin registro en CIMA; en EE. UU. genéricos.'),
    c('QFDOS-214', 'Ipsapirona', 'Ipsapirone', B7, 'Azapirona (agonista parcial 5-HT1A)',
      'O=C1c2ccccc2S(=O)(=O)N1CCCCN1CCN(c2ncccn2)CC1', 'O=C1c2ccccc2S(=O)(=O)N1CCCC[NH+]1CCN(c2ncccn2)CC1', '95847-70-4', NUNCA,
      'Misma pirimidinilpiperazina y puente de cuatro carbonos; la imida se cambia por sacarina. No llegó a comercializarse.'),
    c('QFDOS-215', '1-(2-Pirimidinil)piperazina (1-PP)', '1-(2-Pyrimidinyl)piperazine', B7, 'Metabolito común de las azapironas',
      'C1CN(CCN1)c1ncccn1', 'C1C[NH2+]CCN1c1ncccn1', '20980-22-7', ENDOGENO,
      'Metabolito activo de buspirona e ipsapirona (N-desalquilación). Antagonista α2-adrenérgico: explica parte de los efectos noradrenérgicos de la buspirona.'),
    # ── 8. 5-HT3 ───────────────────────────────────────────────────────────────
    c('QFDOS-216', 'Cocaína', 'Cocaine', B8, 'Tropano (éster)',
      'CN1[C@H]2CC[C@@H]1[C@H]([C@H](C2)OC(=O)C3=CC=CC=C3)C(=O)OC', 'C[NH+]1[C@H]2CC[C@@H]1[C@H]([C@H](C2)OC(=O)C3=CC=CC=C3)C(=O)OC', '50-36-2', CONTROLADA,
      'Antagonista 5-HT3 débil (Fozard y cols., 1979): cabeza de serie de los setrones. Sustancia controlada; en EE. UU. existe una solución nasal tópica al 4 % para anestesia local (Goprelto). No figura como medicamento en CIMA.'),
    c('QFDOS-217', 'Tropina', 'Tropine', B8, 'Tropano (alcohol endo)',
      'CN1[C@@H]2CC[C@H]1C[C@H](C2)O', 'C[NH+]1[C@@H]2CC[C@H]1C[C@H](C2)O', '120-29-6', INTERMEDIO,
      'Tropan-3α-ol (endo). Es el alcohol del tropisetrón; la cocaína deriva en cambio de la ecgonina, que lleva además el CO₂Me en C2.'),
    c('QFDOS-218', 'Tropisetrón', 'Tropisetron', B8, 'Setrón (éster indol-3-carboxílico de la tropina)',
      'CN1[C@@H]2CC[C@H]1C[C@H](C2)OC(=O)c1c[nH]c2ccccc12', 'C[NH+]1[C@@H]2CC[C@H]1C[C@H](C2)OC(=O)c1c[nH]c2ccccc12', '89565-68-4', RETIRADO,
      'Éster del ácido indol-3-carboxílico con tropina. El borrador conservaba el CO₂Me de la cocaína: corregido. Sin registro en CIMA ni aprobación de la FDA; retirado en Irlanda (2000) y mantenido en algunos países europeos (Navoban).'),
    c('QFDOS-219', 'Granisetrón', 'Granisetron', B8, 'Setrón (indazol-3-carboxamida)',
      'CN1[C@@H]2CCC[C@H]1C[C@H](C2)NC(=O)c1nn(C)c2ccccc12', 'C[NH+]1[C@@H]2CCC[C@H]1C[C@H](C2)NC(=O)c1nn(C)c2ccccc12', '109889-09-0', EN_USO,
      'Amida del ácido 1-metilindazol-3-carboxílico con 9-metil-9-azabiciclo[3.3.1]nonan-3-amina endo (homólogo superior del tropano). Oral, IV y parche transdérmico.'),
    c('QFDOS-220', 'Ondansetrón', 'Ondansetron', B8, 'Setrón (carbazolona)',
      'Cc1nccn1CC1CCc2c(C1=O)c1ccccc1n2C', 'Cc1[nH+]ccn1CC1CCc2c(C1=O)c1ccccc1n2C', '99614-02-5', EN_USO,
      'Racémico. Base de Mannich de la N-metiltetrahidrocarbazolona con HCHO, con el 2-metilimidazol como nucleófilo (en realidad, adición de Michael del imidazol a la metilencetona formada). La FDA retiró en 2012 la dosis IV única de 32 mg por prolongación del QT.'),
    c('QFDOS-221', 'Palonosetrón', 'Palonosetron', B8, 'Setrón de segunda generación',
      'O=C1N([C@@H]2CN3CCC2CC3)C[C@H]2CCCc3cccc1c32', 'O=C1N([C@@H]2C[NH+]3CCC2CC3)C[C@H]2CCCc3cccc1c32', '135729-61-2', EN_USO,
      '(3aS,3S). Quinuclidina y lactama tricíclica rígida. Semivida de unas 40 h y eficacia en la fase tardía de la emesis. Añadido en 2026/27.'),
    c('QFDOS-222', 'Metoclopramida', 'Metoclopramide', B8, 'Ortopramida (antagonista D2 y 5-HT3)',
      'CCN(CC)CCNC(=O)c1cc(Cl)c(N)cc1OC', 'CC[NH+](CC)CCNC(=O)c1cc(Cl)c(N)cc1OC', '364-62-5', RESTRINGIDO,
      'Repetida del Tema 3. Su componente antagonista 5-HT3 (a dosis altas) inspiró la búsqueda de antagonistas 5-HT3 puros. EMA (2013): máximo 5 días y 0,5 mg/kg/día.'),
    c('QFDOS-223', '9-Metil-1,2,3,9-tetrahidro-4H-carbazol-4-ona', '9-Methyl-1,2,3,9-tetrahydro-4H-carbazol-4-one', B8, 'Intermedio de síntesis',
      'Cn1c2ccccc2c2C(=O)CCCc21', 'Cn1c2ccccc2c2C(=O)CCCc21', '27387-31-1', INTERMEDIO,
      'Cetona de partida del ondansetrón.'),
    c('QFDOS-224', '2-Metilimidazol', '2-Methylimidazole', B8, 'Heterociclo (reactivo)',
      'Cc1ncc[nH]1', 'Cc1ncc[nH]1', '693-98-1', INTERMEDIO,
      'Nucleófilo que se incorpora en la etapa final de la síntesis del ondansetrón.'),
    # ── 9. Ejercicio 4.4: ciproheptadina ───────────────────────────────────────
    c('QFDOS-225', 'Ácido 2-(2-feniletil)benzoico (2)', '2-(2-Phenylethyl)benzoic acid', B9, 'Intermedio de síntesis',
      'OC(=O)c1ccccc1CCc1ccccc1', '[O-]C(=O)c1ccccc1CCc1ccccc1', '4890-85-1', INTERMEDIO,
      'Material de partida del ejercicio 4.4.'),
    c('QFDOS-226', 'Dibenzosuberona (3)', 'Dibenzosuberone', B9, 'Intermedio de síntesis',
      'O=C1c2ccccc2CCc2ccccc21', 'O=C1c2ccccc2CCc2ccccc21', '1210-35-1', INTERMEDIO,
      'Acilación de Friedel-Crafts intramolecular con ácido polifosfórico.'),
    c('QFDOS-227', '10-Bromodibenzosuberona (4)', '10-Bromodibenzosuberone', B9, 'Intermedio de síntesis',
      'O=C1c2ccccc2CC(Br)c2ccccc21', 'O=C1c2ccccc2CC(Br)c2ccccc21', '', INTERMEDIO,
      'Bromación bencílica radicalaria con NBS.'),
    c('QFDOS-228', 'Dibenzosuberenona (5)', 'Dibenzosuberenone', B9, 'Intermedio de síntesis',
      'O=C1c2ccccc2C=Cc2ccccc21', 'O=C1c2ccccc2C=Cc2ccccc21', '2222-33-5', INTERMEDIO,
      'Eliminación E2 de HBr con Et₃N: aparece el doble enlace C10=C11.'),
    c('QFDOS-229', '4-Cloro-1-metilpiperidina', '4-Chloro-1-methylpiperidine', B9, 'Reactivo (precursor del Grignard)',
      'CN1CCC(Cl)CC1', 'C[NH+]1CCC(Cl)CC1', '5570-77-4', INTERMEDIO,
      'Con Mg en éter forma el cloruro de 1-metilpiperidin-4-ilmagnesio.'),
    c('QFDOS-230', 'Alcohol terciario (6)', '5-(1-Methylpiperidin-4-yl)-5H-dibenzo[a,d]cyclohepten-5-ol', B9, 'Intermedio de síntesis',
      'CN1CCC(CC1)C1(O)c2ccccc2C=Cc2ccccc21', 'C[NH+]1CCC(CC1)C1(O)c2ccccc2C=Cc2ccccc21', '', INTERMEDIO,
      'Adición del Grignard al carbonilo. La deshidratación en medio ácido da la ciproheptadina.'),
    c('QFDOS-231', 'Ciproheptadina (1)', 'Cyproheptadine', B9, 'Dibenzocicloheptatrieno (antihistamínico H1 y antagonista 5-HT2)',
      'CN1CCC(CC1)=C1c2ccccc2C=Cc2ccccc21', 'C[NH+]1CCC(CC1)=C1c2ccccc2C=Cc2ccccc21', '129-03-3', EN_USO,
      'Antihistamínico H1 con actividad antagonista 5-HT2 y anticolinérgica. El enunciado del borrador le atribuía «actividad antidepresiva»: corregido. Ficha española (Periactin 4 mg): manifestaciones alérgicas y coadyuvante en anafilaxia; fuera de ficha, en el síndrome serotoninérgico.'),
    # ── 10. Ejercicio 4.7: almotriptán ─────────────────────────────────────────
    c('QFDOS-232', 'Pirrolidina', 'Pyrrolidine', B10, 'Amina cíclica (reactivo)',
      'C1CCNC1', 'C1CC[NH2+]C1', '123-75-1', INTERMEDIO, 'Nucleófilo que forma la sulfonamida terciaria.'),
    c('QFDOS-233', 'Cloruro de (4-nitrofenil)metanosulfonilo', '(4-Nitrophenyl)methanesulfonyl chloride', B10, 'Reactivo',
      'O=[N+]([O-])c1ccc(CS(=O)(=O)Cl)cc1', 'O=[N+]([O-])c1ccc(CS(=O)(=O)Cl)cc1', '4025-75-6', INTERMEDIO,
      'Electrófilo de la primera etapa.'),
    c('QFDOS-234', 'Nitro-sulfonamida (16)', '1-[(4-Nitrobenzyl)sulfonyl]pyrrolidine', B10, 'Intermedio de síntesis',
      'O=[N+]([O-])c1ccc(CS(=O)(=O)N2CCCC2)cc1', 'O=[N+]([O-])c1ccc(CS(=O)(=O)N2CCCC2)cc1', '', INTERMEDIO,
      'Sulfonamida de pirrolidina.'),
    c('QFDOS-235', 'Anilina (17)', '4-[(Pyrrolidin-1-ylsulfonyl)methyl]aniline', B10, 'Intermedio de síntesis',
      'Nc1ccc(CS(=O)(=O)N2CCCC2)cc1', 'Nc1ccc(CS(=O)(=O)N2CCCC2)cc1', '', INTERMEDIO,
      'Reducción del nitro con H₂ / Ni Raney.'),
    c('QFDOS-236', 'Sal de diazonio (18)', '4-[(Pyrrolidin-1-ylsulfonyl)methyl]benzenediazonium', B10, 'Intermedio de síntesis',
      'N#[N+]c1ccc(CS(=O)(=O)N2CCCC2)cc1', 'N#[N+]c1ccc(CS(=O)(=O)N2CCCC2)cc1', '', INTERMEDIO,
      'Diazotación con NaNO₂ / HCl a 0 °C.'),
    c('QFDOS-237', 'Arilhidrazina del almotriptán', '1-[(4-Hydrazinylbenzyl)sulfonyl]pyrrolidine', B10, 'Intermedio de síntesis',
      'NNc1ccc(CS(=O)(=O)N2CCCC2)cc1', 'NNc1ccc(CS(=O)(=O)N2CCCC2)cc1', '', INTERMEDIO,
      'Reducción de la sal de diazonio con SnCl₂ (paso a del esquema).'),
    c('QFDOS-238', '4-Clorobutanal', '4-Chlorobutanal', B10, 'Aldehído',
      'O=CCCCCl', 'O=CCCCCl', '6139-84-0', INTERMEDIO,
      'Variante de Grandberg: el cloro terminal lo desplaza el nitrógeno que la ciclación de Fischer deja libre, y se obtiene directamente la triptamina primaria.'),
    c('QFDOS-239', 'Hidrazona del almotriptán', 'Almotriptan hydrazone intermediate', B10, 'Intermedio de síntesis',
      'ClCCCC=NNc1ccc(CS(=O)(=O)N2CCCC2)cc1', 'ClCCCC=NNc1ccc(CS(=O)(=O)N2CCCC2)cc1', '', INTERMEDIO,
      'Fenilhidrazona del 4-clorobutanal.'),
    c('QFDOS-240', 'Triptamina primaria (19)', '2-[5-[(Pyrrolidin-1-ylsulfonyl)methyl]-1H-indol-3-yl]ethanamine', B10, 'Intermedio de síntesis',
      'NCCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12', '[NH3+]CCc1c[nH]c2ccc(CS(=O)(=O)N3CCCC3)cc12', '', INTERMEDIO,
      'Aminación reductora final con HCHO / NaBH₄ (paso b) para dar almotriptán (QFDOS-204).'),
]


# ─── Descriptores ────────────────────────────────────────────────────────────
def descriptores_cip(mol):
    from rdkit.Chem import rdCIPLabeler
    m = Chem.Mol(mol)
    try:
        rdCIPLabeler.AssignCIPLabels(m)
    except Exception:
        pass
    etiquetas = ['C%d:%s' % (a.GetIdx() + 1, a.GetProp('_CIPCode'))
                 for a in m.GetAtoms() if a.HasProp('_CIPCode')]
    sin = [i for i, cc in Chem.FindMolChiralCenters(m, includeUnassigned=True, useLegacyImplementation=False)
           if cc == '?' and m.GetAtomWithIdx(i).GetSymbol() in ('C', 'N')]
    if etiquetas:
        t = '; '.join(etiquetas)
        return t + (' | %d centro(s) sin definir' % len(sin) if sin else '')
    return '%d centro(s) sin definir' % len(sin) if sin else 'aquiral'


def analizar(smiles):
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise ValueError('SMILES no válido: %s' % smiles)
    d = {
        'smiles_canonico': Chem.MolToSmiles(mol),
        'formula': rdMolDescriptors.CalcMolFormula(mol),
        'mw': round(Descriptors.MolWt(mol), 2),
        'masa_exacta': round(Descriptors.ExactMolWt(mol), 4),
        'carga_formal': Chem.GetFormalCharge(mol),
        'logp': round(Crippen.MolLogP(mol), 2),
        'refractividad_molar': round(Crippen.MolMR(mol), 2),
        'tpsa': round(Descriptors.TPSA(mol), 2),
        'hbd': Lipinski.NumHDonors(mol),
        'hba': Lipinski.NumHAcceptors(mol),
        'enlaces_rotables': rdMolDescriptors.CalcNumRotatableBonds(mol),
        'atomos_pesados': mol.GetNumHeavyAtoms(),
        'anillos': rdMolDescriptors.CalcNumRings(mol),
        'anillos_aromaticos': rdMolDescriptors.CalcNumAromaticRings(mol),
        'fraccion_csp3': round(rdMolDescriptors.CalcFractionCSP3(mol), 3),
        'qed': round(QED.qed(mol), 3),
        'estereocentros_cip': descriptores_cip(mol),
        'inchi': Chem.MolToInchi(mol),
        'inchikey': Chem.MolToInchiKey(mol),
    }
    viol = sum([d['mw'] > 500, d['logp'] > 5, d['hbd'] > 5, d['hba'] > 10])
    d['lipinski_violaciones'] = viol
    d['cumple_lipinski'] = 'Si' if viol <= 1 else 'No'
    return mol, d


# ─── Dibujo ──────────────────────────────────────────────────────────────────
def _opciones(drawer, legend_size=None):
    o = drawer.drawOptions()
    o.updateAtomPalette(PALETA)
    o.addStereoAnnotation = True
    o.bondLineWidth = 2.2
    o.padding = 0.06
    o.additionalAtomLabelPadding = 0.12
    if FUENTE:
        o.fontFile = FUENTE_B
    if legend_size:
        o.legendFontSize = legend_size
        o.legendFraction = 0.13
    return o


# Estereodescriptores (R/S) solo donde la quiralidad es parte del contenido docente;
# en los tropanos (C3 pseudoasimétrico r/s) y bicíclicos solo estorban.
CON_CIP = {'QFDOS-186', 'QFDOS-187', 'QFDOS-194', 'QFDOS-195', 'QFDOS-196', 'QFDOS-197',
           'QFDOS-198', 'QFDOS-203', 'QFDOS-221'}
SIN_COORDGEN = {'QFDOS-216', 'QFDOS-217', 'QFDOS-218', 'QFDOS-219'}

# Plantilla común para que todas las triptaminas salgan con la misma orientación.
_PLANTILLAS = {}


def _plantilla(smiles):
    from rdkit.Chem import rdDepictor
    if smiles not in _PLANTILLAS:
        t = Chem.MolFromSmiles(smiles)
        rdDepictor.SetPreferCoordGen(True)
        rdDepictor.Compute2DCoords(t)
        _PLANTILLAS[smiles] = t
    return _PLANTILLAS[smiles]


ALINEAR = ['NCCc1c[nH]c2ccc(C)cc12', 'CCc1c[nH]c2ccc(C)cc12', 'c1ccc2c(c1)CCc1ccccc1N2CCCN',
           'c1ccc2c(c1)C=Cc1ccccc1N2CCCN']


def _mol2d(mol, id_=None):
    from rdkit.Chem import rdDepictor
    m = Chem.Mol(mol)
    rdDepictor.SetPreferCoordGen(id_ not in SIN_COORDGEN)
    rdDepictor.Compute2DCoords(m)
    for smi in ALINEAR:
        t = _plantilla(smi)
        if m.HasSubstructMatch(t):
            try:
                rdDepictor.GenerateDepictionMatching2DStructure(m, t)
            except Exception:
                pass
            break
    rdDepictor.SetPreferCoordGen(True)
    return m


def dibujar_png(mol, ruta, leyenda='', ancho=600, alto=450, id_=None):
    m = _mol2d(mol, id_)
    dr = rdMolDraw2D.MolDraw2DCairo(ancho, alto)
    _opciones(dr, legend_size=26).addStereoAnnotation = id_ in CON_CIP
    rdMolDraw2D.PrepareAndDrawMolecule(dr, m, legend=leyenda)
    dr.FinishDrawing()
    with open(ruta, 'wb') as fh:
        fh.write(dr.GetDrawingText())


def dibujar_svg(mol, ruta, leyenda='', ancho=600, alto=450, id_=None):
    m = _mol2d(mol, id_)
    dr = rdMolDraw2D.MolDraw2DSVG(ancho, alto)
    o = _opciones(dr, legend_size=26)
    o.addStereoAnnotation = id_ in CON_CIP
    o.fontFile = ''
    rdMolDraw2D.PrepareAndDrawMolecule(dr, m, legend=leyenda)
    dr.FinishDrawing()
    with open(ruta, 'w', encoding='utf-8') as fh:
        fh.write(dr.GetDrawingText())


def dibujar_slide(mol, ruta, resaltar=None, enlace=34, id_=None):
    """PNG transparente, sin rótulo, con longitud de enlace fija (misma escala en todas)."""
    m = _mol2d(mol, id_)
    dr = rdMolDraw2D.MolDraw2DCairo(1800, 1400)
    o = _opciones(dr)
    o.addStereoAnnotation = id_ in CON_CIP
    o.fixedBondLength = enlace * 2   # supermuestreo ×2 para proyección nítida
    o.bondLineWidth = 4.4
    o.minFontSize = 30
    o.maxFontSize = 44
    o.clearBackground = False
    o.setBackgroundColour((1, 1, 1, 0))
    kw = {}
    if resaltar:
        patt = Chem.MolFromSmarts(resaltar)
        hit = m.GetSubstructMatch(patt)
        if hit:
            bonds = [b.GetIdx() for b in m.GetBonds()
                     if b.GetBeginAtomIdx() in hit and b.GetEndAtomIdx() in hit]
            col = (0.18, 0.83, 0.75, 0.45)
            kw = dict(highlightAtoms=list(hit), highlightBonds=bonds,
                      highlightAtomColors={i: col for i in hit},
                      highlightBondColors={i: col for i in bonds})
            o.highlightRadius = 0.45
    rdMolDraw2D.PrepareAndDrawMolecule(dr, m, **kw)
    dr.FinishDrawing()
    with open(ruta, 'wb') as fh:
        fh.write(dr.GetDrawingText())
    im = Image.open(ruta).convert('RGBA')
    bbox = im.getchannel('A').getbbox()
    if bbox:
        pad = 16
        bbox = (max(0, bbox[0] - pad), max(0, bbox[1] - pad),
                min(im.width, bbox[2] + pad), min(im.height, bbox[3] + pad))
        im = im.crop(bbox)
    im.save(ruta)


def slug(texto):
    t = unicodedata.normalize('NFKD', texto.lower())
    t = ''.join(ch for ch in t if not unicodedata.combining(ch))
    return re.sub(r'[^a-z0-9]+', '_', t).strip('_')


# Resaltados SAR para las diapositivas (SMARTS de la parte que cambia o que importa)
RESALTAR = {
    'QFDOS-175': 'c[CH2][CH2]c',                # puente etilénico frente al S de la fenotiazina
    'QFDOS-176': 'c[SX2]c',
    'QFDOS-177': '[NX3;H1](C)C',                # amina secundaria
    'QFDOS-178': 'c[CH]=[CH]c',
    'QFDOS-179': 'C=C(c)c',                     # metilideno exocíclico
    'QFDOS-181': 'NNC(=O)',
    'QFDOS-182': 'CC#C',
    'QFDOS-183': 'CC#C',
    'QFDOS-184': 'NCCN',
    'QFDOS-188': '[OH]c',
    'QFDOS-189': 'OC(=O)C',
    'QFDOS-190': 'CC(=O)N',
    'QFDOS-191': 'COc',
    'QFDOS-192': 'C(F)(F)F',
    'QFDOS-194': '[C@]1(OCc2ccccc21)',
    'QFDOS-195': 'c1ccc(Cl)c(Cl)c1',
    'QFDOS-197': 'C(=O)N(CC)CC',
    'QFDOS-198': 'C(=O)NC(CC)CO',
    'QFDOS-199': 'C(N)=O',
    'QFDOS-200': 'CNC(=O)C',
    'QFDOS-201': 'CNS(=O)(=O)C',
    'QFDOS-202': '[CH3][NX3][CH3]',
    'QFDOS-203': 'C1COC(=O)N1',
    'QFDOS-204': 'S(=O)(=O)N1CCCC1',
    'QFDOS-213': 'O=C1CCCC(=O)N1',
    'QFDOS-214': 'O=C1c2ccccc2S(=O)(=O)N1',
    'QFDOS-215': 'c1ncccn1',
    'QFDOS-216': '[CH3]OC(=O)[CH1]',
    'QFDOS-218': 'O=C(O)c1c[nH]c2ccccc12',
    'QFDOS-219': 'O=C(N)c1nn(C)c2ccccc12',
    'QFDOS-220': 'Cc1nccn1',
}


# ─── ChEMBL ──────────────────────────────────────────────────────────────────
def verificar_chembl(filas, cache_path):
    cache = {}
    if os.path.exists(cache_path):
        with open(cache_path, encoding='utf-8') as fh:
            cache = json.load(fh)
    base = 'https://www.ebi.ac.uk/chembl/api/data/molecule?format=json&'
    for f in filas:
        ik = f['inchikey']
        if ik in cache:
            continue
        res = {'exacto': [], 'conectividad': []}
        try:
            d = json.load(urllib.request.urlopen(base + 'molecule_structures__standard_inchi_key=' + ik, timeout=40))
            res['exacto'] = [(m['molecule_chembl_id'], m['pref_name']) for m in d['molecules']]
            if not res['exacto']:
                d = json.load(urllib.request.urlopen(
                    base + 'limit=5&molecule_structures__standard_inchi_key__startswith=' + ik[:14], timeout=40))
                res['conectividad'] = [(m['molecule_chembl_id'], m['pref_name']) for m in d['molecules']]
        except Exception as e:
            res['error'] = str(e)
        cache[ik] = res
        with open(cache_path, 'w', encoding='utf-8') as fh:
            json.dump(cache, fh, ensure_ascii=False, indent=1)
    for f in filas:
        r = cache.get(f['inchikey'], {})
        if r.get('exacto'):
            con_nombre = [x for x in r['exacto'] if x[1]] or r['exacto']
            f['chembl_id'] = con_nombre[0][0]
            f['chembl_verificacion'] = 'InChIKey exacto: %s' % (con_nombre[0][1] or 'sin nombre')
        elif r.get('conectividad'):
            f['chembl_verificacion'] = 'Solo conectividad (estereo distinta o sin definir): %s' % ', '.join(
                '%s %s' % (a, b or '') for a, b in r['conectividad'][:3])
        elif r.get('error'):
            f['chembl_verificacion'] = 'Error de red: ' + r['error'][:60]
        else:
            f['chembl_verificacion'] = 'No está en ChEMBL'


# ─── Figuras compuestas ──────────────────────────────────────────────────────
def _font(size, bold=False):
    path = FUENTE_B if bold else FUENTE
    return ImageFont.truetype(path, size) if path else ImageFont.load_default()


def figura(ids, nombre, por_fila=4, titulo=None):
    por_id = {f['id']: f for f in COMPUESTOS}
    celdas = []
    for i in ids:
        im = Image.open(os.path.join(DIR, 'slide', '%s.png' % i)).convert('RGBA')
        celdas.append((por_id[i], im))
    cw = max(im.width for _, im in celdas) + 40
    ch = max(im.height for _, im in celdas) + 150
    filas = (len(celdas) + por_fila - 1) // por_fila
    cols = min(por_fila, len(celdas))
    top = 110 if titulo else 20
    W, H = cols * cw, top + filas * ch
    lienzo = Image.new('RGB', (W, H), 'white')
    dr = ImageDraw.Draw(lienzo)
    if titulo:
        dr.text((30, 30), titulo, font=_font(48, True), fill='#1e3a8a')
        dr.line((30, 95, W - 30, 95), fill='#0d9488', width=4)
    for k, (f, im) in enumerate(celdas):
        x0, y0 = (k % por_fila) * cw, top + (k // por_fila) * ch
        lienzo.paste(im, (x0 + (cw - im.width) // 2, y0 + (ch - 150 - im.height) // 2), im)
        ty = y0 + ch - 140
        nombre_txt = f['etiqueta']
        fnt = _font(36, True)
        w = dr.textlength(nombre_txt, font=fnt)
        dr.text((x0 + (cw - w) / 2, ty), nombre_txt, font=fnt, fill='#1e3a8a')
        est = f['estado_regulatorio']
        fnt2 = _font(28, True)
        w2 = dr.textlength(est, font=fnt2)
        bx = x0 + (cw - w2) / 2 - 14
        dr.rounded_rectangle((bx, ty + 52, bx + w2 + 28, ty + 96), radius=8, fill=COLOR_ESTADO[est])
        dr.text((bx + 14, ty + 58), est, font=fnt2, fill='white')
        idt = f['id']
        fnt3 = _font(24)
        w3 = dr.textlength(idt, font=fnt3)
        dr.text((x0 + (cw - w3) / 2, ty + 104), idt, font=fnt3, fill='#334155')
    lienzo.save(os.path.join(DIR, nombre))
    print('  ->', nombre)


FIGURAS = [
    (['QFDOS-176', 'QFDOS-175', 'QFDOS-177', 'QFDOS-178', 'QFDOS-179'], 'QFDOS_T4_bloque1_triciclicos.png', 5,
     'Tema 4 · Antidepresivos tricíclicos'),
    (['QFDOS-170', 'QFDOS-171', 'QFDOS-172', 'QFDOS-173', 'QFDOS-174', 'QFDOS-175'], 'QFDOS_T4_sintesis_imipramina.png', 3,
     'Tema 4 · Síntesis de la imipramina'),
    (['QFDOS-180', 'QFDOS-181', 'QFDOS-182', 'QFDOS-183', 'QFDOS-184', 'QFDOS-185'], 'QFDOS_T4_bloque2_IMAO.png', 3,
     'Tema 4 · Inhibidores de la MAO y tiramina'),
    (['QFDOS-186', 'QFDOS-187', 'QFDOS-188', 'QFDOS-189', 'QFDOS-190', 'QFDOS-191'], 'QFDOS_T4_bloque3_serotonina.png', 3,
     'Tema 4 · Biosíntesis y metabolismo de la serotonina'),
    (['QFDOS-192', 'QFDOS-193', 'QFDOS-194', 'QFDOS-195'], 'QFDOS_T4_bloque4_ISRS.png', 4,
     'Tema 4 · Inhibidores selectivos de la recaptación de serotonina'),
    (['QFDOS-196', 'QFDOS-197', 'QFDOS-198'], 'QFDOS_T4_bloque5_ergolinas.png', 3, 'Tema 4 · Ergolinas'),
    (['QFDOS-202', 'QFDOS-203', 'QFDOS-204', 'QFDOS-205'], 'QFDOS_T4_bloque5_triptanes_lasmiditan.png', 4,
     'Tema 4 · Triptanes y lasmiditán'),
    (['QFDOS-188', 'QFDOS-199', 'QFDOS-200', 'QFDOS-201', 'QFDOS-202'], 'QFDOS_T4_diseno_sumatriptan.png', 5,
     'Tema 4 · De la serotonina al sumatriptán'),
    (['QFDOS-207', 'QFDOS-208', 'QFDOS-209', 'QFDOS-210', 'QFDOS-211', 'QFDOS-201', 'QFDOS-202'], 'QFDOS_T4_sintesis_sumatriptan.png', 4,
     'Tema 4 · Síntesis del sumatriptán (Fischer)'),
    (['QFDOS-212', 'QFDOS-213', 'QFDOS-214', 'QFDOS-215'], 'QFDOS_T4_bloque7_5HT1A.png', 4, 'Tema 4 · Agonistas 5-HT1A'),
    (['QFDOS-216', 'QFDOS-218', 'QFDOS-219', 'QFDOS-220', 'QFDOS-221', 'QFDOS-222'], 'QFDOS_T4_bloque8_setrones.png', 3,
     'Tema 4 · De la cocaína a los setrones'),
    (['QFDOS-225', 'QFDOS-226', 'QFDOS-227', 'QFDOS-228', 'QFDOS-230', 'QFDOS-231'], 'QFDOS_T4_ejercicio_4_4_ciproheptadina.png', 3,
     'Tema 4 · Ejercicio 4.4: síntesis de la ciproheptadina'),
    (['QFDOS-234', 'QFDOS-235', 'QFDOS-236', 'QFDOS-237', 'QFDOS-239', 'QFDOS-240', 'QFDOS-204'], 'QFDOS_T4_ejercicio_4_7_almotriptan.png', 4,
     'Tema 4 · Ejercicio 4.7: síntesis del almotriptán'),
]


def exportar_xlsx(salida, ruta):
    from openpyxl import Workbook
    from openpyxl.drawing.image import Image as XLImage
    from openpyxl.styles import Alignment, Font, PatternFill
    from openpyxl.utils import get_column_letter
    wb = Workbook()
    ws = wb.active
    ws.title = 'Propiedades'
    cols = [k for k in salida[0] if k not in ('inchi',)]
    ws.append(cols)
    cab = PatternFill('solid', fgColor='1E3A8A')
    for i in range(1, len(cols) + 1):
        cell = ws.cell(row=1, column=i)
        cell.font = Font(bold=True, color='FFFFFF')
        cell.fill = cab
        cell.alignment = Alignment(horizontal='center', vertical='center', wrap_text=True)
    for r in salida:
        ws.append([r[k] for k in cols])
    anchos = {'nombre': 30, 'nombre_en': 26, 'familia': 26, 'tema': 26, 'smiles_entrada': 36,
              'smiles_ph74': 36, 'smiles_canonico': 36, 'inchikey': 30, 'notas': 70,
              'estereocentros_cip': 20, 'imagen': 30, 'estado_regulatorio': 22, 'chembl_verificacion': 34}
    for i, k in enumerate(cols, 1):
        ws.column_dimensions[get_column_letter(i)].width = anchos.get(k, 14)
    ws.freeze_panes = 'C2'
    ws.auto_filter.ref = ws.dimensions
    ws2 = wb.create_sheet('Estructuras')
    ws2.append(['id', 'nombre', 'estado', 'formula', 'estructura'])
    for i in range(1, 6):
        ws2.cell(row=1, column=i).font = Font(bold=True, color='FFFFFF')
        ws2.cell(row=1, column=i).fill = cab
    for col, w in zip('ABCDE', (14, 32, 24, 16, 44)):
        ws2.column_dimensions[col].width = w
    for fila, r in enumerate(salida, start=2):
        ws2.cell(row=fila, column=1, value=r['id'])
        ws2.cell(row=fila, column=2, value=r['nombre'])
        ws2.cell(row=fila, column=3, value=r['estado_regulatorio'])
        ws2.cell(row=fila, column=4, value=r['formula'])
        ruta_img = os.path.join(DIR, r['imagen'])
        if os.path.exists(ruta_img):
            img = XLImage(ruta_img)
            img.width, img.height = 280, 210
            ws2.row_dimensions[fila].height = 162
            ws2.add_image(img, 'E%d' % fila)
    wb.save(ruta)
    print('->', ruta)


def main():
    sin_chembl = '--sin-chembl' in sys.argv
    print('=== TEMA 4 QFDOS: %d estructuras ===\n' % len(COMPUESTOS))
    ids = [f['id'] for f in COMPUESTOS]
    assert len(ids) == len(set(ids)), 'ids duplicados'

    salida = []
    for r in COMPUESTOS:
        mol, d = analizar(r['smiles'])
        if r['smiles_ph74'] and Chem.MolFromSmiles(r['smiles_ph74']) is None:
            raise ValueError('smiles_ph74 no válido en %s' % r['id'])
        base = '%s_%s' % (r['id'], slug(r['nombre']))
        img_rel = 'img/%s.png' % base
        dibujar_png(mol, os.path.join(DIR, img_rel), leyenda=r['nombre'], id_=r['id'])
        dibujar_svg(mol, os.path.join(DIR, 'svg', base + '.svg'), leyenda=r['nombre'], id_=r['id'])
        dibujar_slide(mol, os.path.join(DIR, 'slide', r['id'] + '.png'), RESALTAR.get(r['id']), id_=r['id'])
        m74 = Chem.MolFromSmiles(r['smiles_ph74']) if r['smiles_ph74'] else None
        fila = {
            'id': r['id'], 'nombre': r['nombre'], 'nombre_en': r['nombre_en'], 'tema': r['tema'],
            'familia': r['familia'], 'estado_regulatorio': r['estado_regulatorio'], 'cas': r['cas'],
            'chembl_id': '', 'chembl_verificacion': '', 'smiles_entrada': r['smiles'],
            'smiles_ph74': r['smiles_ph74'], 'carga_neta_ph74': Chem.GetFormalCharge(m74) if m74 else '',
        }
        fila.update(d)
        fila['imagen'] = img_rel
        fila['notas'] = r['notas']
        salida.append(fila)
        print('[OK] %-10s %-34s %-14s MW %7.2f  %s' % (r['id'], r['nombre'][:34], d['formula'], d['mw'],
                                                       d['estereocentros_cip']))

    if not sin_chembl:
        print('\nVerificando InChIKey contra ChEMBL...')
        verificar_chembl(salida, os.path.join(DIR, 'chembl_tema4.json'))
        for f in salida:
            print('  %-10s %-12s %s' % (f['id'], f['chembl_id'], f['chembl_verificacion']))
    por_id = {f['id']: f for f in salida}
    for r in COMPUESTOS:
        r['chembl_id'] = por_id[r['id']]['chembl_id']

    cab = ['id', 'nombre', 'nombre_en', 'tema', 'familia', 'smiles', 'smiles_ph74', 'cas',
           'chembl_id', 'estado_regulatorio', 'notas']
    with open(os.path.join(DIR, 'estructuras_qfdos.csv'), 'w', newline='', encoding='utf-8') as fh:
        w = csv.DictWriter(fh, fieldnames=cab, extrasaction='ignore', quoting=csv.QUOTE_MINIMAL)
        w.writeheader()
        w.writerows(COMPUESTOS)
    with open(os.path.join(DIR, 'propiedades_qfdos.csv'), 'w', newline='', encoding='utf-8-sig') as fh:
        w = csv.DictWriter(fh, fieldnames=list(salida[0].keys()))
        w.writeheader()
        w.writerows(salida)
    try:
        exportar_xlsx(salida, os.path.join(DIR, 'estructuras_qfdos.xlsx'))
    except Exception as e:
        print('[aviso] XLSX: %s' % e)

    print('\nFiguras compuestas:')
    for ids_f, nombre, por_fila, titulo in FIGURAS:
        figura(ids_f, nombre, por_fila, titulo)
    print('\nTema 4 completado.')


if __name__ == '__main__':
    main()
