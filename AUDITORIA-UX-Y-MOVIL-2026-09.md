# Auditoría UX (profesor y alumnado) y viabilidad de app móvil nativa — qfods-web-v3

**Fecha:** 23-sep-2026 · **HEAD auditado:** `e642100` · Solo lectura: esta auditoría no modifica código.
**Verificación técnica:** `npm ci && npm run build` pasa (bundle único de 1,31 MB, 338 KB gzip); `tsc --noEmit` compila limpio.

Este documento sigue a `informe-arquitectura-qfods-web-v3.md.txt` (11-sep). Primero va el estado de aquel informe, después los problemas por perfil y al final la propuesta móvil.

---

## 0. Antes de cualquier mejora de UX: cuatro fallos que hay que cerrar ya

| # | Problema | Evidencia | Impacto |
|---|---|---|---|
| S1 | ~~El botón «Acceso de revisión / Modo demo» daba rol de profesor sin autenticarse.~~ **Resuelto en `c610a11`** (eliminado de `src/` y del bundle de `docs/`). Queda abierto el fondo: el rol se decide en el cliente, con el JWT solo decodificado y la sesión en localStorage (`AuthContext.tsx:54-118`). | `AuthContext.tsx:74, 94, 118` | Editando localStorage aún se abre el CMS. Publicar sigue exigiendo la clave del servidor, pero la interfaz del profesor queda expuesta. |
| S2 | **Acceso por enlace cerrado por el profesor (23-sep; la exportación ya responde 401).** Pendiente: `EvaluationSection` sigue intentando descargar el CSV completo; con la hoja cerrada fallará en silencio. Era: la hoja de evaluación estaba compartida por enlace y se descargaba entera en el navegador de cada alumno. | `EvaluationSection.tsx:23-24, 163-166`; el filtrado por correo es solo visual (`:268-278`). Hemos comprobado que `…/export?format=csv` responde 200 sin autenticación (hoy solo tiene cabecera y una fila). | En cuanto se rellene con notas, toda la clase verá las notas de todos (RGPD). |
| S3 | **Corregido en esta rama (pendiente de desplegar el script).** Era: **`anotarFila` escribe sin clave en cualquier pestaña, incluida `_Contenido`, y acepta cualquier `sheetId`.** | `google-apps-script/Codigo.gs:86-87` | Anula la protección de `guardarContenido`: un tercero puede inyectar trozos en el temario publicado (enlaces falsos, JSON roto). |
| S4 | **Corregido en esta rama (pendiente de desplegar los scripts).** Era: **`misEntregas` y `misCalificaciones` devuelven los datos de cualquier correo, y `doPost` de Calificaciones acepta notas con cualquier `studentEmail`.** | `Codigo.gs:192`, `Calificaciones.gs:71-148`, `googleSheetsService.ts:108, 223-235` | Lectura y falsificación de notas ajenas. |

**Arreglo mínimo, en 1–2 días:**
1. ~~Eliminar `loginAsGuest`~~ (hecho en `c610a11`).
2. Quitar el acceso por enlace a la hoja de evaluación y servir a cada alumno solo su fila desde Apps Script.
3. En `anotarFila`, fijar `HOJA_ID`, ignorar `p.sheetId`, poner en lista blanca los `sheetName` permitidos y rechazar cualquiera que empiece por `_`.
4. Enviar el **ID token de Google** en todas las llamadas y verificarlo en Apps Script (`https://oauth2.googleapis.com/tokeninfo?id_token=…`: comprobar `aud` = Client ID, `email_verified`, dominio UGR). El correo se toma del token, nunca de un parámetro. El rol de profesor también se decide ahí.

Esta verificación del token en servidor es además **prerrequisito de la app móvil** (sección 4).

---

## 1. Estado del informe del 11-sep

| Punto | Estado | Nota |
|---|---|---|
| P1 Caché remota pegajosa | **Parcial** | Ya se purga `qfdos_v3_contenido_remoto` (`App.tsx:59`) y se descartan publicaciones más antiguas que el build (`contenidoRemoto.ts:101,128`). Pero los topics remotos se siguen copiando en `qfdos_v3_topics` (`App.tsx:272`), no hay botón «Restablecer», y `COURSE_BUILD_TIMESTAMP` (`qfdosData.ts:334`) se edita a mano: tras cada build, lo publicado antes se descarta sin avisar al profesor. |
| P2 Buzón de dudas | **Abierto** | El alumno escribe en `qfdos_v2_student_questions` de su propio navegador (`StudentQuestionModal.tsx:26,61`), el profesor lee `qfdos_v3_*` (`App.tsx:247`) y ve dudas de ejemplo. Nada viaja por red. |
| P3 Endpoints abiertos | **Abierto y peor** | Ver S1–S4. |
| P4 Scripts duplicados | **Abierto** | Siguen `google-apps-script-receiver.gs` y un tercer despliegue, `Calificaciones.gs`, cuya URL puede sobrescribirse desde localStorage (`googleSheetsService.ts:31`). |
| P5 Sin CI | **Abierto** | No existe `.github/`; `docs/` se compila y sube a mano. |
| P6 Escombros | **Abierto** | `qfdosData.ts.bak`, `utils/fileStorage.ts`, `vercel.json`, dos lockfiles (`bun.lock` y `package-lock.json`) y tres lanzadores (`dev.ps1`, `run-local.ps1`, `serve.ps1`). |

---

## 2. Experiencia del profesor

### Alta
- **Los materiales no llegan al alumnado.** `MaterialUploader` guarda en IndexedDB del propio navegador (`services/fileStorage.ts:8`), así que cada fichero se sube dos veces: aquí y en Drive, y luego se pega el enlace a mano. **Propuesta:** subir directamente a una carpeta de Drive vía Apps Script (`DriveApp.createFile`) y guardar el enlace en el módulo automáticamente. Así desaparece el paso manual.
- **Las notas del cuaderno de parejas y las ediciones de evaluación son locales.** `PracticasPairReport.tsx:52-61, 441-463` lee el localStorage del profesor o, si está vacío, datos de demostración (`LAB_PAIR_REPORTS_DEFAULT`). La interfaz promete ver las entregas «en tiempo real» (`:611`), pero no lee la hoja. Si se borra el navegador o se cambia de equipo, las notas se pierden sin posibilidad de recuperarlas.
- **Las dudas del alumnado no llegan** (P2). Hace falta una acción `guardarDuda` y otra `listarDudas` (solo profesor, con token verificado), más un contador de dudas pendientes en la cabecera del profesor.

### Media
- **No hay un panel de seguimiento.** Nada cruza lista de matriculados × entregas × tests. **Propuesta:** una pestaña «Seguimiento» con:
  - matriz alumno × práctica/test, con estados entregado / pendiente / tarde;
  - filtros por grupo (C/E) y pareja;
  - exportación CSV;
  - botón «recordatorio por correo» para pendientes (`MailApp` en Apps Script).
- **Publicar es «todo o nada».** `guardarContenido` borra y reescribe `_Contenido` entero (`Codigo.gs:141`). Si el profesor publica desde otro equipo con datos viejos, machaca lo anterior. La clave viaja en la URL (`contenidoRemoto.ts:161`) y se guarda en claro. **Propuesta:**
  - indicador de «cambios sin publicar»;
  - control de versión optimista: enviar la marca de la última versión leída y rechazar si hay otra más nueva;
  - historial de las últimas N publicaciones con botón de restaurar;
  - clave por POST, o sustituirla por verificación del token del profesor.
- **Generador de exámenes (Gemini).** La clave se guarda en localStorage y va en la URL (`geminiService.ts:15-21, 39, 72`). La lista de modelos por defecto incluye `1.5-*`, ya retirados (`:24-29`). Si la llamada falla, se usan preguntas predefinidas **sin avisar** (`:220`). **Propuesta:**
  - avisar explícitamente cuando se usa el banco de reserva;
  - actualizar la lista de modelos;
  - a medio plazo, mover la llamada a Apps Script para que la clave no salga del servidor.
- **Fechas del calendario escritas en el código** (`calendarioIcs.ts`). Cambiar una fecha obliga a recompilar. Deberían ir en la hoja, con el resto del contenido publicado.

### Baja
- Sin CI, sin tests y sin lint. Un GitHub Action con `tsc --noEmit`, `vite build` y despliegue a Pages eliminaría la compilación manual de `docs/` (y el problema de Drive/`K:`).
- Unificar en un solo lanzador y un solo gestor de paquetes.

---

## 3. Experiencia del alumnado

### Alta
- **Riesgo de perder un test a medias.** Test, FIR, flashcards y tema se cierran al tocar fuera del modal, sin confirmación (`QuizModal.tsx:281,616`; `FirSimulatorModal.tsx:180`; `FlashcardsModal.tsx:33,74`; `TopicDetailModal.tsx:200,241`). En móvil basta un toque en el margen. El botón Atrás del sistema también cierra el test y cambia de sección (`App.tsx:325-360`).
  **Propuesta:** un componente `<Modal>` común con:
  - cierre por overlay desactivable;
  - confirmación si hay progreso;
  - entrada propia en el historial (Atrás cierra el modal, no la sección);
  - Escape y trampa de foco.
- **El progreso no persiste.** Las flashcards viven en memoria y eligen la siguiente al azar (`FlashcardsModal.tsx:29,64`): no hay repetición espaciada. El simulador FIR no guarda nada. Solo los tests tienen historial.
  **Propuesta:**
  - repetición espaciada tipo SM-2/Leitner por tarjeta, guardada en localStorage y sincronizada con la hoja;
  - historial del FIR con evolución de la nota y fallos por tema;
  - una tarjeta «Mi progreso» en el Hub: temas vistos, % de acierto por tema y tarjetas pendientes hoy.
  Es la mejora de mayor valor docente.
- **Google Analytics sin consentimiento ni texto de privacidad** (`index.html:5-12`). Además se envía un `page_view` con la URL completa en cada cambio de sección (`App.tsx:182-193`). **Propuesta:** banner de consentimiento (Consent Mode v2 con `analytics_storage: denied` por defecto) y una página breve de privacidad: qué se guarda y dónde (Sheets, localStorage, GA). Es obligatorio antes de publicar en las tiendas (sección 4).

### Media
- **Navegación móvil.** Hay 9 pestañas en una barra con desplazamiento horizontal y el scrollbar oculto, sin ninguna pista de que hay más (`Header.tsx:70-78`, `index.css:1121-1135`). **Propuesta:** barra inferior con 4–5 destinos (Inicio, Temas, Practicar, Prácticas, Más) en ≤768px.
- **Enlaces directos.** Existen para sección y tema, pero no para un test ni para las flashcards de un tema. Al cerrar el FIR o el visor 3D se hace `pushState('#/hub')` en vez de volver atrás (`App.tsx:497, 538`), y el historial crece. Las pestañas son `<button>`: no se pueden abrir en otra pestaña del navegador.
- **Modales en pantallas pequeñas.**
  - Alturas fijas de 85–90vh sin `dvh` (`App.css:290-315`, `TopicDetailModal.tsx:244`), que en iOS quedan tapadas por la barra del navegador.
  - Rejillas con `minmax(340px,1fr)` que generan scroll horizontal por debajo de unos 372px (`AdmetCalculator.tsx:219`, `AffinitySimulator.tsx:55`, `CourseInfoSection.tsx:193`).
  - Mucho estilo inline, que impide ajustar por breakpoint.
- **Accesibilidad.**
  - Ningún modal tiene `role="dialog"` ni `aria-modal`.
  - Escape solo funciona en 3 modales.
  - Los botones de cierre son un icono `<X>` sin `aria-label`.
  - No hay bloqueo del scroll de fondo (salvo en el lightbox).
  - Bien resuelto: `alt` en las imágenes, `aria-current` en la navegación y respeto de `prefers-reduced-motion`.
- **Rendimiento.** Estas medidas bajan la carga inicial en móvil a menos de la mitad:
  - dividir el bundle con `React.lazy` por sección: el 1,31 MB actual incluye `qfdosData` (187 KB), `firQuestionsData` (143 KB) y `practicasData` (92 KB) aunque el alumno solo abra el Hub;
  - cargar RDKit (script **síncrono** desde unpkg en `<head>`, `index.html:31`) y model-viewer solo cuando se abre una estructura o el 3D;
  - usar `video-header-mobile.mp4` (343 KB, hoy sin uso) en lugar de ocultar por CSS los de 4,0 MB y 3,3 MB, que llevan `autoPlay` y pueden descargarse igualmente;
  - reducir los pesos de Google Fonts: hoy se cargan 11.
- **PWA a medias.**
  - No hay service worker, así que no hay modo offline.
  - Los iconos del manifest son una URL externa de i.ibb.co repetida para 192 y 512 y marcada `maskable`.
  - `start_url: "/"` no funciona bajo `/qfods-web-v3/`.

### Baja
- El texto del login anuncia «@go.ugr.es o @gmail.com», pero se aceptan también `@correo.ugr.es` y `@ugr.es` (`LoginPage.tsx:103,169`; `AuthContext.tsx:39`). El alumnado real usa `@correo.ugr.es`.
- Datos falsos en la hoja de tests: `sin-email@ugr.es` y el nombre del profesor como evaluador por defecto (`QuizModal.tsx:388-390`).
- El atajo ⌘K no se anuncia en la interfaz y no existe en móvil. Conviene un botón de búsqueda visible.
- Las pestañas vacías («Exámenes oficiales (0)», «Trabajos (0)») deberían ocultarse mientras no tengan contenido.

---

## 4. ¿App nativa para Android e iOS?

### Respecto a la viabilidad

**Sí es viable, pero no como reescritura.** Tenemos 42.000 líneas de React, y la química depende de **RDKit en WASM** y de **model-viewer** (WebGL). Ni React Native ni Flutter ejecutan esto de forma nativa: habría que reimplementar el dibujo 2D, los descriptores y el visor 3D. Reescribir costaría meses y no aportaría nada al alumno.

La ruta adecuada es **PWA completa → Capacitor**, reutilizando el 100 % del código web:

| Fase | Qué | Esfuerzo | Resultado |
|---|---|---|---|
| **A. PWA real** | `vite-plugin-pwa` (Workbox); iconos locales 192/512 + maskable propio; `start_url`/`scope` relativos; precache de temario, FIR, flashcards y RDKit servido desde `public/` en lugar de unpkg; página offline | 2–3 días | Instalable desde el navegador en Android e iOS, sin tiendas ni cuotas. Estudio offline en el móvil. En iOS ≥16.4 las PWA instaladas admiten notificaciones push. |
| **B. Capacitor** | Envolver el mismo `dist/` en proyectos Android/iOS | 1–2 semanas | Apps en Google Play y App Store con el mismo código. |

### Respecto a los bloqueos técnicos de la fase B

1. **Google Sign-In no funciona en WebView.** Google bloquea OAuth en navegadores embebidos (error `403 disallowed_useragent`), así que `@react-oauth/google` no sirve dentro de la app. Hay que usar un plugin nativo (por ejemplo `@capgo/capacitor-social-login`) que devuelva un ID token, con Client IDs de Android (huella SHA-1) y de iOS, y **verificar ese token en Apps Script**: el mismo arreglo que S1–S4.
2. **Rol de profesor decidido en servidor.** Un APK se descompila en minutos. Con el rol en el cliente, la app nativa haría todavía más evidente el fondo de S1.
3. **Recursos locales.** RDKit (`RDKit_minimal.js` + `.wasm`), model-viewer y las fuentes deben ir empaquetados, no desde CDN, para que funcione offline y se cumplan las políticas de las tiendas. El GLB de 7,3 MB conviene descargarlo bajo demanda.
4. **CORS.** Las peticiones salen de `https://localhost` (Android) y de `capacitor://localhost` (iOS). Las respuestas JSON de Apps Script funcionan, pero conviene probar el flujo de redirección de `/exec` en ambos. Alternativa: `CapacitorHttp` nativo.
5. **Rutas.** El enrutado por hash ya es compatible. Hay que quitar la dependencia de `PAGES_BASE`.

### Respecto al valor añadido nativo

Lo que justifica estar en la tienda y no solo ser una PWA:
- notificaciones locales de fechas de entrega, tests y sesiones de prácticas (a partir de `calendarioIcs.ts`);
- recordatorio diario de las flashcards pendientes (encaja con la repetición espaciada de la sección 3);
- cámara para adjuntar fotos del montaje o de la TLC al cuaderno de parejas;
- modo offline completo en el laboratorio.

### Respecto a las tiendas

- **Google Play:** 25 USD, pago único. Las cuentas personales nuevas tienen que pasar una prueba cerrada con al menos 12 testers durante 14 días antes de publicar; una cuenta de organización (UGR o DESTINA) evita ese paso. Hay que rellenar el formulario *Data safety* (GA, correo, notas).
- **App Store:** 99 USD al año (conviene consultar si la UGR tiene cuenta institucional de Apple Developer).
  - *Guideline 4.2 (funcionalidad mínima):* Apple rechaza los envoltorios web sin valor propio. Las notificaciones, el modo offline y la cámara son el argumento.
  - *Guideline 4.8 (inicio de sesión):* si se mantiene el acceso con `@gmail.com`, lo previsible es que Apple exija también «Sign in with Apple». Restringir el acceso a cuentas UGR lo evita: es un inicio de sesión exclusivamente institucional.
  - Requiere política de privacidad pública y *privacy manifest*.
- **Distribución sin tiendas:** en Android basta un APK firmado o Play en prueba interna para el grupo. En iOS no hay alternativa razonable para alumnado (TestFlight caduca a los 90 días por build). Por eso la PWA de la fase A es la vía más rápida para iPhone.

### Recomendación

1. **Esta semana:** cerrar S2–S4 (S1 ya resuelto) y verificar el token en servidor.
2. **Siguiente iteración:** fase A (PWA offline) junto con el componente `<Modal>`, el `React.lazy` y la barra inferior móvil. Con esto el alumnado ya tiene una «app» instalable en ambos sistemas.
3. **Después, si el uso lo justifica:** fase B con Capacitor. Primero en Android, que tiene menos barreras, y después en iOS con notificaciones y offline como valor nativo. No recomendamos React Native ni Flutter.

---

## 5. Hoja de ruta resumida

| Prioridad | Acción | Perfil |
|---|---|---|
| 1 | ~~Eliminar el modo demo~~ (hecho); cerrar la hoja de evaluación; blindar `anotarFila`; verificar el ID token en Apps Script | Ambos |
| 2 | Buzón de dudas real + contador en el panel del profesor | Ambos |
| 3 | Notas del cuaderno y de la evaluación persistidas en Sheets | Profesor |
| 4 | `<Modal>` común (confirmación, Atrás, Escape, foco, `dvh`) | Alumnado |
| 5 | Progreso persistente: repetición espaciada, historial FIR, «Mi progreso» | Alumnado |
| 6 | Consentimiento GA + página de privacidad | Ambos |
| 7 | PWA: service worker, iconos locales, RDKit local, `React.lazy` | Alumnado |
| 8 | Panel «Seguimiento» (matriz de entregas, pendientes, recordatorios) | Profesor |
| 9 | Subida de materiales directa a Drive | Profesor |
| 10 | GitHub Action (tsc + build + Pages); limpiar escombros y lanzadores | Profesor |
| 11 | Capacitor Android → iOS | Ambos |
