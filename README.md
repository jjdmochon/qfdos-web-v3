# QFDOS v3 — Química Farmacéutica II

Plataforma docente del curso 2627 (grupos C y E), Facultad de Farmacia,
Universidad de Granada.

---

## Arrancar el proyecto

```powershell
.\dev.ps1
```

Abre `http://localhost:3001`. Para generar el build de producción:

```powershell
.\dev.ps1 -Build
```

### Por qué hay un script en lugar de `npm run dev`

El proyecto vive en Google Drive (`K:`), y el sistema de ficheros virtual de
Drive no soporta lo que npm y Vite necesitan: escritura masiva de ficheros
pequeños, enlaces simbólicos y detección fiable de cambios. Un `npm install`
sobre `K:` falla con `EBADF: bad file descriptor` y deja `node_modules` a
medias, con paquetes corruptos que producen errores desconcertantes (por
ejemplo, un `tsc` que devuelve éxito sin comprobar nada).

`dev.ps1` separa los dos papeles: el código fuente se queda en Drive, y
`node_modules` y el servidor viven en `C:\Users\Juanjo\qfdos-v3-node`. El
script copia el código a la carpeta local antes de arrancar.

Si editas ficheros directamente en la copia local, recupéralos con:

```powershell
.\dev.ps1 -Back
```

---

## Acceso

La autenticación es Google OAuth 2.0, sin backend: el token de identidad se
decodifica en el navegador para leer el correo.

| Perfil | Dominios aceptados |
|---|---|
| Alumnado | `@correo.ugr.es`, `@go.ugr.es` |
| Profesorado | `juandiaz@ugr.es`, `juandiaz@go.ugr.es` |

Sólo esas dos direcciones de profesor abren el panel de gestión. El resto de
cuentas UGR entran como alumnado.

El Client ID se lee de `.env.local` (ver `.env.example`). Debe crearse con una
cuenta Gmail personal: Google Workspace no permite crear proyectos OAuth desde
cuentas institucionales administradas. En Google Cloud Console hay que añadir
`http://localhost:3001` a *Authorized JavaScript origins*.

---

## Política de publicación de temas (Regla Docente Obligatoria)

> **AVISO OBLIGATORIO:** Los temas configurados como `Próximamente` (Temas 02 a 10 en `qfdosData.ts`) **NUNCA** deben cambiarse a `Publicado` en el repositorio ni durante el push a GitHub. La publicación y desbloqueo de contenidos para el alumnado la gestiona exclusivamente el profesor Juanjo desde su perfil docente autenticado (`juandiaz@ugr.es` / `juandiaz@go.ugr.es`).

---

Como profesor, hay dos accesos: el botón **Gestionar curso** de la cabecera y
**Subir materiales** en el panel azul del inicio. Ambos abren el CMS en la
pestaña *Materiales*, con arrastrar y soltar para PDF, PPTX, DOCX, imágenes y
audio (hasta 50 MB por fichero).

**Los ficheros se suben a Drive.** Van a la carpeta «QFDOS · Materiales del
curso» de tu Drive (se crea la primera vez), se comparten con «cualquier
persona con el enlace» y con un clic quedan asignados al módulo elegido como
*Apuntes*, *Diapositivas* o *Material complementario*. Después hay que pulsar
**Publicar** para que el alumnado lo vea. La subida se hace en fragmentos de
3 MiB a una sesión de subida reanudable de Drive (`iniciarSubida`,
`subirFragmento`, `materiales` en `Codigo.gs`), así que el script nunca tiene
el fichero entero en memoria.

Configuración única en el proyecto de Apps Script de `Codigo.gs`:

1. Sustituir el manifiesto por `google-apps-script/appsscript.json`, que añade
   el permiso `drive.file` (el script solo puede tocar los ficheros y la
   carpeta que crea él mismo, no el resto del Drive) y el servicio avanzado
   de Drive.
2. Ejecutar una vez `autorizarDrive` desde el editor y aceptar el permiso. Crea
   la carpeta y deja su enlace en el Registro de ejecución.
3. Publicar una versión nueva de la implementación.

Los campos de enlace de **Diapositivas** y **Apuntes** del formulario de cada
módulo (Módulos → Añadir/Editar, y el editor rápido de la ficha del tema) tienen
un botón **Subir a Drive** que sube el fichero y escribe su enlace en el campo.

Las audios de las píldoras del curso siguen viviendo en `public/audio/` (el
reproductor de la web necesita un fichero directo, no un enlace de Drive). Hay
un apartado plegado, «Guardar solo en este navegador», con el almacenamiento
local de antes (IndexedDB), que el alumnado no ve.

---

## Identidad verificada en el servidor

El navegador sólo decodifica el token de Google para leer el nombre y la foto.
Quién es cada cual lo decide Apps Script:

1. Tras el login, el cliente envía el ID token a `Codigo.gs`
   (`accion=iniciarSesion`). El script lo comprueba contra Google (`tokeninfo`:
   `aud`, emisor, caducidad, `email_verified`) y el dominio.
2. Devuelve una **sesión firmada** (HMAC-SHA256 con `SESION_SECRETO`) con el
   correo y el rol. Dura 30 días y se renueva sola al pasar la mitad.
3. Toda lectura o escritura de datos personales lleva esa sesión. El correo y
   el rol salen de ella, nunca de un parámetro:
   - `anotarFila` sólo escribe en `Cuaderno de parejas`, `normas de seguridad`
     y `Material` de la hoja fija, y añade la columna `cuentaVerificada`.
   - `misEntregas` y `misCalificaciones` devuelven lo de la propia cuenta
     (el profesorado puede consultar la de cualquiera).
   - `evaluacion` lee la hoja de evaluación continua (privada): el profesor
     recibe todas las filas; cada estudiante, sólo la suya. Otra hoja se
     configura con la propiedad `EVALUACION_HOJA_ID`.
   - `guardarEvaluacion` (sólo profesor) escribe en esa hoja las notas que se
     editan en la matriz: actualiza la fila del correo o añade una nueva. La
     hoja necesita columnas de correo, examen final, parcial, prácticas y
     trabajos.
   - **Buzón de dudas**: `enviarDuda`, `misDudas`, `responderDuda` y
     `borrarDuda` guardan las consultas en la pestaña oculta `_Dudas` de la
     hoja de entregas. El alumno ve sólo las suyas, con la respuesta cuando la
     haya; el profesor las ve todas en *Gestionar curso → Dudas de Alumnos*.
     Máximo 4000 caracteres por duda y 20 pendientes por alumno.
   - **Correo desde la plataforma** (v10): `enviarRecordatorio` (sólo profesor)
     manda un correo a cada persona desde la cuenta del profesor (MailApp, con
     su dirección como respuesta): sólo a correos de la UGR o personales, sin
     repetidos, máximo 300 por envío y dentro de la cuota diaria (unos 100 en
     cuentas personales, 1500 en Workspace). Cada envío queda en la pestaña
     oculta `_Correos`. Se usa desde *Seguimiento → Enviar ahora*, y
     `responderDuda` puede avisar al alumno (casilla «Avisar al alumno por
     correo»; si el correo falla, la respuesta se guarda igualmente). Exige el
     permiso `script.send_mail` del manifiesto y ejecutar una vez
     `autorizarCorreo` desde el editor.
   - **Notas del cuaderno al alumnado** (v9): `publicarNotasCuaderno` (sólo
     profesor) activa o desactiva la propiedad `NOTAS_CUADERNO_PUBLICAS`.
     Mientras esté desactivada (por defecto) `misEntregas` oculta al alumnado
     `notaProfesor`, `comentarioProfesor` y `calificadoEn`; al publicarlas, cada
     pareja ve su nota y su comentario en *Prácticas → Mi progreso* y en *Mis
     entregas*. El interruptor está en el panel del profesor del cuaderno.
   - **Progreso sincronizado** (v8): `leerProgreso` y `guardarProgreso` guardan
     las valoraciones de flashcards de cada alumno en la pestaña oculta
     `_Progreso` (una fila por correo y clave). Cada valoración lleva su marca
     de tiempo y el cliente fusiona por tarjeta: gana la más reciente, así que
     se puede estudiar en el móvil y seguir en el ordenador. Sin sesión o sin
     red, el progreso queda en el navegador y se sincroniza en la siguiente
     apertura. Claves admitidas: `flashcards_<tema>` y `fir` (respuestas del simulador
     FIR; un borrado también lleva su marca, para que no reaparezca desde otro
     dispositivo).
   - **Cuaderno de parejas**: `cuaderno` (sólo profesor) devuelve todas las
     entregas de la pestaña «Cuaderno de parejas» con su número de fila, y
     `calificarCuaderno` (sólo profesor) escribe en esa fila las columnas
     `notaProfesor`, `comentarioProfesor` y `calificadoEn` (las crea si no
     existen). Comprueba `recibidoEn` antes de escribir, para no calificar a
     otra pareja si se han borrado o insertado filas. Esas tres columnas no
     las puede escribir el alumnado ni las ve en «Mis entregas». Si una pareja
     entrega varias veces, el panel muestra la última.
   - **Seguimiento** (`seguimiento`, sólo profesor): una fila por estudiante
     con normas firmadas, cuaderno (y su nota), mejor nota e intentos de cada
     test, sesiones de flashcards y última actividad. Cruza la pestaña
     `normas de seguridad` y `Cuaderno de parejas` de la hoja de entregas, la
     hoja de calificaciones de los tests (`CALIFICACIONES_HOJA_ID`, por defecto
     la actual) y la hoja de evaluación, que hace de **lista de matriculados**:
     sin correos ahí no se puede saber quién no ha hecho nada. Si esa hoja
     tiene una columna «Grupo», el panel permite filtrar por grupo.
   - Un estudiante sólo registra notas a su nombre y solo con los modos `alumno_evaluado` o `flashcards_autoevaluacion` (`docente_sesion` es exclusivo del profesor); publicar exige sesión de
     profesor **y** la clave.
   - **Corrección en el servidor**: el navegador envía qué opción marcó en cada
     pregunta (`respuestas: [{ id, opcion }]`) y Calificaciones.gs corrige contra
     las claves de la pestaña oculta `_Claves`, que el profesor publica desde
     *Gestión docente → Seguimiento → Publicar claves de corrección* (hay que
     repetirlo al añadir o cambiar preguntas). La nota, los aciertos y el total
     que se anotan son los del servidor; la columna «Corrección» indica
     `servidor` o `cliente (sin verificar)`. Con `EXIGIR_CORRECCION_SERVIDOR = 1`
     el alumnado solo puede registrar tests corregidos en el servidor. Límite:
     las preguntas viajan con su solución (se enseña la explicación al
     responder), así que esto impide falsificar la nota, no conocerla de antemano.

**Propiedades de Apps Script** (⚙️ → Propiedades de la secuencia de comandos):

| Propiedad | Codigo.gs | Calificaciones.gs |
|---|---|---|
| `SESION_SECRETO` (≥ 32 caracteres aleatorios) | Sí | Sí, **el mismo valor** |
| `CLAVE_PUBLICACION` | Sí | — |
| `GOOGLE_CLIENT_ID` | Opcional (por defecto, el de la plataforma) | — |
| `PROFESORES` | Opcional (correos separados por comas) | — |
| `EVALUACION_HOJA_ID` | Opcional (por defecto, la hoja de evaluación actual) | — |
| `MATERIALES_CARPETA_ID` | Se rellena sola al crear la carpeta de materiales; se puede fijar a mano | — |
| `CALIFICACIONES_HOJA_ID` | Opcional (por defecto, la hoja de calificaciones actual; la lee el seguimiento) | — |
| `EXIGIR_CORRECCION_SERVIDOR` (`1`) | — | Opcional: rechaza los tests del alumnado que el servidor no pueda corregir |
| `NOTAS_CUADERNO_PUBLICAS` | La gestiona el botón del panel del cuaderno | — |

El manifiesto del proyecto de Codigo.gs está en `google-apps-script/appsscript.json`:
sin el permiso `script.external_request`, `iniciarSesion` no puede verificar el
token con Google.

**Orden de despliegue** tras cambiar los scripts: nueva implementación de los
dos scripts y, justo después, compilar y publicar `docs/`. Cada mitad sola deja
de funcionar con la otra. Al actualizar, todo el mundo tiene que volver a
iniciar sesión una vez.

---

## Recepción de entregas

Las entregas del cuaderno, las firmas de las normas de seguridad y los partes de
material van a la hoja de cálculo del profesor mediante un Apps Script
desplegado como aplicación web (código en `google-apps-script/Codigo.gs`).

La URL del despliegue se lee de `VITE_PRACTICAS_WEBAPP_URL` en `.env.local`.
El script crea cada pestaña la primera vez que recibe datos y añade columnas
nuevas por su cuenta, así que ampliar un formulario no rompe lo ya registrado.

Hojas que se alimentan solas: **Cuaderno de parejas**, **normas de seguridad**
y **Material**.

A diferencia del envío a ciegas habitual con `no-cors`, aquí se lee la respuesta
del script: el alumno ve «Recibido y anotado en la hoja …, fila N». Si esa
lectura falla, la plataforma lo dice en lugar de dar por buena la entrega, y
ofrece el correo a juandiaz@ugr.es como alternativa.

Para volver a desplegar el script tras editarlo hay que crear una **implementación
nueva** (no basta con guardar): Google mantiene la URL antigua apuntando a la
versión anterior.

---

## Enlaces de interés

Pestaña **Enlaces** de la barra superior. Recopila material externo —artículos,
informes regulatorios, casos clínicos— para que el alumnado vea qué hace la
química farmacéutica fuera del aula.

Para añadir uno: *Gestionar curso* → pestaña **Enlaces de Interés**, o el botón
*Añadir o editar enlaces* que aparece en la propia sección cuando entras como
profesor. Basta con pegar la dirección (si olvidas el `https://` se completa
solo) y escribir el resumen.

**El resumen es el contenido principal de la tarjeta**, no un subtítulo: es lo
que orienta al alumnado sobre qué mirar y por qué importa. Los campos
opcionales —fuente, duración, módulo relacionado— sirven para que puedan
decidir si les cuadra ahora. Marcar un enlace como *destacado* lo coloca el
primero.

Las categorías están en `RESOURCE_CATEGORIES` (`src/data/qfdosData.ts`); sólo
se muestran como filtro las que tienen algún enlace dentro. Los seis enlaces
iniciales son ejemplos: cámbialos por los tuyos.

---

## Estructuras químicas

Las estructuras se dibujan con **RDKit MinimalLib** (WASM), cargado desde CDN
en `index.html`. La geometría, la aromaticidad y la estereoquímica las deduce
RDKit del SMILES, y los descriptores (peso molecular, cLogP, HBD/HBA, TPSA,
enlaces rotables) se calculan sobre la marcha: no hay valores tabulados que
puedan contradecir a la molécula mostrada.

### Verificación contra PubChem

Los 40 SMILES del temario se contrastaron con PubChem. Los resultados están en
`COURSE_DATA_VERSION` (`src/data/qfdosData.ts`):

**No eran moléculas válidas** — cualquier renderizador falla con ellas:
haloperidol (valencia 5 en el carbono cetónico), zolpidem (imposible de
kekulizar).

**Esqueleto equivocado** — misma etiqueta, otra molécula: donepezilo
(2-tetralona en vez de indan-1-ona, con un CH₂ de más), sumatriptán
(sustituyentes intercambiados entre C3 y C5 del indol), ondansetrón (faltaba
el metileno y el sustituyente estaba en C1 en vez de C3), flumazenil (anillo
de siete miembros mal cerrado), naloxona (puente epoxi y 14-OH mal situados),
losartán (propilo en vez de butilo, y Cl/CH₂OH intercambiados).

**Sin estereoquímica** — morfina (5 centros), enalapril (3), captopril (2),
levodopa, rivastigmina, valaciclovir, ranitidina y pralidoxima. En levodopa
esto importa especialmente: la D-DOPA es inactiva.

Se dejaron sin estereodescriptores los fármacos que se comercializan como
racematos y que PubChem también registra así: salbutamol, propranolol,
atenolol, fluoxetina, ibuprofeno, cetirizina, verapamilo, donepezilo y
ondansetrón.

### Versionado del contenido

El temario se cachea en `localStorage`, así que un navegador que ya visitó la
plataforma conservaría indefinidamente las estructuras antiguas. Al arrancar,
la aplicación compara `COURSE_DATA_VERSION` con la versión guardada y descarta
la caché si difieren. **Sube esa constante cada vez que edites a mano los datos
del curso**; si no, los cambios no llegarán a quien ya haya entrado.

Hay dos tipos de contenido y sólo uno se purga (`App.tsx`):

| | Se regenera al subir la versión |
|---|---|
| `SHIPPED_KEYS` — temario, avisos, glosario | Sí: vienen del fichero de datos |
| Enlaces de interés y dudas del alumnado | **No**: los escribe el usuario |

Los enlaces se siembran con los ejemplos sólo la primera vez (`loadUserOwned`).
Si los borras todos, la lista se queda vacía en lugar de resucitarlos.

---

## Instalable y sin conexión (PWA)

La plataforma se instala como app desde el navegador: en Android, Chrome ofrece «Instalar aplicación»; en iPhone, Safari → Compartir → «Añadir a pantalla de inicio». La configuración está en `vite.config.ts` (`vite-plugin-pwa`).

- **Al instalar** solo se descarga la aplicación (~1,9 MB). Imágenes, modelos 3D, RDKit, fuentes y respuestas de PubChem se guardan la primera vez que se abren.
- **Sin cobertura** siguen disponibles los temas, el glosario, las flashcards, los cuestionarios y todo lo que ya se haya visto.
- **Nunca se cachean** Apps Script (login, entregas, datos personales) ni Gemini: van siempre a la red. Los vídeos tampoco, por su peso.
- **Al publicar una versión nueva**, quien tenga la plataforma abierta ve el aviso «Hay una versión nueva» y actualiza con un toque. No se fuerza la recarga para no perder una entrega a medio escribir.

La app nativa de Android (Capacitor) está aparcada en la rama `app-android`.

---

## Diseño

- **Tipografía** — Newsreader (titulares), Public Sans (interfaz),
  IBM Plex Mono (datos y códigos PDB).
- **Color** — navy institucional UGR profundizado con verde azulado de enlace;
  la menta es el único acento brillante. Los neutros tienen sesgo azul frío.
  El color semántico (correcto / aviso / error) es independiente del acento.
- **Temas** — claro y oscuro, incluyendo el estado «sistema» sin elección
  explícita. Las estructuras se redibujan con la paleta CPK adecuada al tema:
  sobre fondo oscuro, enlaces claros.

---

## Estructura

```
src/
  components/     Interfaz. Chem2DDrawer y MolPropertyStrip son la base química.
  context/        AuthContext (OAuth + roles) y ThemeContext.
  services/
    rdkitService  Carga de RDKit WASM, renderizado SVG y descriptores.
    fileStorage   Materiales del profesor en IndexedDB.
    geminiService Generación de exámenes.
  data/
    qfdosData.ts  Temario, fármacos, glosario, enlaces. COURSE_DATA_VERSION aquí.
```

Respecto a v2 se eliminaron el generador de apuntes por transcripción de audio
y el visor cristalográfico 3D. Los códigos PDB se conservan como enlaces al
RCSB.


## Instalar como app

La plataforma es una PWA. En el menú (☰ → Herramientas) aparece **Instalar la app**:
en Android y escritorio (Chrome, Edge) lanza el aviso de instalación del navegador;
en iPhone y iPad muestra los tres pasos de Safari (Compartir → Añadir a pantalla
de inicio). Una vez instalada, la opción desaparece. Empaquetarla para las tiendas
(Capacitor) no está hecho: requiere cuentas de desarrollador de Google y Apple.

## Historias QFDOS (vista previa del profesorado)

Banda rotatoria y visor 9:16 en el Hub, visibles solo para el perfil docente.
Grupos: **Tema 1** (clip y cartel), **Podcast** (píldora de audio y vídeo podcast,
30 s cada uno; el botón abre el reproductor de la ficha del tema), **Enlaces**
(los 2 enlaces de interés más recientes por `addedAt`) y **Materiales** (los
adjuntos de «Materiales varios»). El cartel está en `public/historias`; los dos
vídeos se preparan desde Drive con `scripts/preparar-historias.ps1` (recorta el
vídeo podcast a 30 s y comprime el clip) y hasta que estén subidos esas dos
historias no se muestran.
