# QFDOS v3 · Guía para Claude

Plataforma docente de Química Farmacéutica II (UGR, grupos C y E). React 19 + Vite + TypeScript, PWA, sin backend propio: los datos del alumnado viven en hojas de Google a través de dos Apps Script. El profesor es el Dr. Juan José Díaz-Mochón (Juanjo). Para el detalle de cada sistema, `README.md`; para el diseño visual, `DESIGN.md`.

## Forma de trabajar con Juanjo

- Español, voz de equipo («hemos», «planteamos»), directo, sin relleno.
- Proactividad: entrega el cambio completo y probado. Antes de abrir la PR, resume qué cambia y pregunta «¿Abro la PR y la fusiono?». Cuando diga que sí, ábrela y fusiónala tú (merge commit) y dile que Pages tarda 2-3 min.
- Si el trabajo de la rama ya se fusionó, empieza la siguiente tarea desde `origin/main` (`git checkout -B <rama> origin/main`).
- Las PR y los commits, en español. Commits estilo `fix(ámbito): …`, `feat(…)`, `chore(…)`.

## Publicar un cambio (siempre estos pasos)

1. Sube `COURSE_DATA_VERSION` en `src/data/qfdosData.ts` y añade la línea `* vX.Y.Z — …` encima de la última en el comentario de versiones de ese mismo fichero. Patch para arreglos, minor para funciones nuevas.
2. Si el cambio lo nota el alumnado, añade una entrada arriba en `src/data/actualizacionesData.ts`. Alimenta las Historias «Actualizaciones de la plataforma».
3. `npx tsc --noEmit -p tsconfig.app.json`.
4. Primer commit, con el código.
5. Compila para GitHub Pages y vuelca `dist/` en `docs/`. Pages sirve `docs/` desde `main`:
   ```bash
   PAGES_BASE=/qfdos-web-v3/ npx vite build
   find docs -mindepth 1 -maxdepth 1 ! -name .nojekyll -exec rm -rf {} +
   cp -a dist/. docs/ && cp docs/index.html docs/404.html && touch docs/.nojekyll
   ```
6. Segundo commit, `chore(docs): regenera la compilacion de GitHub Pages con … (vX.Y.Z)`.
7. Push, PR y fusión (con el visto bueno de Juanjo).

La web se recarga sola en los navegadores al cambiar `version.json`. Las copias anteriores a la v3.55.0 no se recargan solas: se ponen al día al abrir la web dos veces.

## Reglas que no se rompen

- **Estado de los temas**: nunca cambies en el código un tema de «Próximamente» a «Publicado». Lo publica Juanjo desde *Gestionar curso*.
- **Apps Script**: `google-apps-script/Calificaciones.gs` y `Codigo.gs` los despliega Juanjo a mano. Pega el código en el proyecto que ya existe y elige **Gestionar implementaciones → ✏️ → Nueva versión**. Nunca «Nueva implementación»: cambia la URL `/exec`, que va fija en `src/services/googleSheetsService.ts`. Cuando cambies un `.gs`, envíale el fichero y estos pasos.
- **Lo publicado desde el CMS manda sobre el código**. La excepción está en `src/services/contenidoRemoto.ts` → `normalizarTemas`, que fija tema a tema qué gana; por ejemplo, el test del Tema 4 y el podcast local siempre los manda el código.

## Mapa rápido

| Qué | Dónde |
|---|---|
| Temario, avisos, versión | `src/data/qfdosData.ts` (`INITIAL_TOPICS`, `INITIAL_ANNOUNCEMENTS`, `AVISOS_A_OFRECER`) |
| Tests por tema | `src/data/temaXXExamsData.ts`, `QuizModal.tsx` (`MODELOS_TEMAx`, selección por `topic.id`), `src/services/claves.ts` (lista de bancos) |
| Flashcards | `src/data/temaXXFlashcardsData.ts` |
| Cartas | `public/cartas/farmacos-temaXX.json`, ruta `#/cartas-tema-XX` en `App.tsx` |
| Historias | `HistoriasQfdos.tsx` (`MEDIOS_TEMA` con cartel, clip y vídeo en `public/historias/tema-XX-*`) y `actualizacionesData.ts` |
| Podcast de audio | MP3 en `public/audio/podcast_<sistema>.mp3` y `audioPodcastUrl` en el tema |
| Reproductor | `SpotifyPlayerModal.tsx`; los enlaces de Drive se traducen en `src/utils/audioReproducible.ts` |
| Notas de los tests | `googleSheetsService.ts`, `intentosPendientes.ts` (cola), `google-apps-script/Calificaciones.gs` |

### Tema nuevo con test

Crea `temaXXExamsData.ts` con ids únicos (`tXX-mN-qNN`). Añade los modelos en `QuizModal.tsx` y los bancos en `claves.ts`. Tras publicar, Juanjo pulsa **Publicar claves de corrección** en *Gestión docente → Seguimiento*. Sin claves, los intentos se anotan como «pendiente (faltan claves)» y se recorrigen solos al publicarlas.

### Podcast de audio de un tema

Siempre como MP3 dentro de la web (`public/audio/`), nunca como enlace de Drive: el reproductor no puede cargar Drive sin sesión de Google. Los MP3 de unos 10 MB a 160 kbps mono están bien. `conAudioDelCodigo` hace que el fichero local y su nombre manden sobre lo publicado.

### Avisos

- Los del código (`INITIAL_ANNOUNCEMENTS` + `AVISOS_A_OFRECER`) solo los ven las copias actualizadas de la web.
- Los que publica Juanjo desde *Gestionar curso → Noticias y Tablón de Avisos* los ve cualquier versión.
- Para avisar a quien tiene una copia antigua, el aviso tiene que ir por el CMS.
- Con `enHistorias: true` y `temaId`, el aviso entra en «Novedades del curso» con el clip del tema.

## Hoja de calificaciones

- Spreadsheet `1ha8QIAHQqK7PFm0wQJfeSsG3Y24_vovAlphvVfR7gME`, pestaña `Respuestas_QFDOS`, y la pestaña oculta `_Claves`.
- Columnas clave: «Corrección» (`servidor` / `pendiente (faltan claves)` / `cliente (sin verificar)`), «Id intento» (`rec_<ms>`, evita duplicados), «Respuestas» y «Versión web».
- Una fila sin «Id intento» ni «Versión web» viene de una copia de la web anterior a la v3.60.1.
- El conector de Google de Claude puede no tener acceso a esta hoja. Si da «Permission denied», hay que reconectarlo con la cuenta propietaria.

## Probar en local

```bash
npx vite build && npx vite preview --port 4173 --strictPort &
```

- Con Playwright y Chromium (`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`), simula la sesión antes de cargar la página. Guarda en `localStorage`:
  - `qfdos_v3_sesion`: `{ token: 'a.b', email, rol: 'estudiante' | 'profesor', institucional: true, caduca: <epoch + 29 días> }`
  - `qfdos_v3_user`: `{ name, email, role }`
- Para simular lo publicado, rellena `qfdos_v3_contenido_remoto`.
- Para móvil, `devices['Pixel 7']`.
- Para un tema en «Próximamente», entra con rol profesor.
- `pkill -f "vite preview"` devuelve 144 y corta la cadena de comandos: ejecútalo aparte.
- `tsx` no sirve para módulos que usan `import.meta.env`.
