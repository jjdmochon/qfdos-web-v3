# App nativa QFDOS · Android

La app empaqueta la web compilada (`dist/`) con Capacitor 8. El mismo proyecto servirá para iOS en la fase 2 (`npx cap add ios`, en un Mac).

- **Paquete:** `es.ugr.qfdos`
- **Nombre:** QFDOS UGR
- **Android mínimo:** 7.0 (API 24) · **objetivo:** API 36

## Qué resuelve la capa nativa (`src/native/`)

| Problema en WebView | Solución |
|---|---|
| Google bloquea el botón web de inicio de sesión | Selector de cuentas nativo (Credential Manager) con `@capgo/capacitor-social-login`. El ID token se emite para el Client ID web, así que Apps Script lo verifica igual que en el navegador |
| `<a download>` con blob/data no descarga | Se guarda en la caché de la app y se abre la hoja de compartir (Archivos, Drive, correo…) |
| Enlaces externos y `window.open` | Navegador del sistema (Custom Tabs) |
| Botón atrás | Cierra el modal superior; si no hay, retrocede o sale |
| Barra de estado y splash | Colores de la plataforma (#070e18) |

## Permisos declarados

| Permiso | Uso |
|---|---|
| `INTERNET`, `ACCESS_NETWORK_STATE` | Apps Script, PubChem, RDKit, Gemini, vídeos; detección de conexión |
| `CAMERA` | Hacer fotos al subir material o entregas desde el selector de ficheros |
| `READ_MEDIA_IMAGES`, `READ_MEDIA_VIDEO`, `READ_MEDIA_VISUAL_USER_SELECTED` (Android 13+), `READ_EXTERNAL_STORAGE` (≤ 12) | Adjuntar imágenes y vídeos de la galería |
| `WRITE_EXTERNAL_STORAGE` (≤ 9) | Guardar descargas en dispositivos antiguos |
| `MODIFY_AUDIO_SETTINGS` | Reproducción de vídeo y pódcast embebidos |
| `WAKE_LOCK` | Mantener la pantalla durante vídeos a pantalla completa |
| `POST_NOTIFICATIONS` (Android 13+) | Reservado para avisos del curso |

Si se publica en Google Play, `READ_MEDIA_*` exige justificarlo en la ficha. Si no se usa la galería, se pueden quitar: el selector de ficheros del sistema funciona sin ellos.

## Paso manual imprescindible: cliente OAuth de Android

Sin esto, el inicio de sesión en la app devuelve error (código 10 / `DEVELOPER_ERROR`).

1. Obtener la huella SHA-1 del certificado de firma:
   - Depuración (keystore de este equipo): `23:C2:06:51:FD:9A:C0:9A:A8:D0:A3:60:4B:F2:F2:84:08:0C:93:3D`. En otro equipo: `cd android; .\gradlew signingReport`.
   - Publicación: la huella de la keystore de release, o la de «App signing» en Play Console.
2. En Google Cloud Console, mismo proyecto que el Client ID web (`161581301082-…`):
   **APIs y servicios → Credenciales → Crear credenciales → ID de cliente OAuth → Android**.
   - Nombre del paquete: `es.ugr.qfdos`
   - Huella SHA-1: la del paso 1 (una credencial por cada huella: debug y release).
3. No hace falta tocar el código: la app sigue pidiendo el token para el Client ID **web**, que es el que valida `Codigo.gs`.

## Compilar

Requisitos: Node 22+, JDK 21 (el de Android Studio vale), Android SDK 36.

**npm no funciona sobre Google Drive** (errores EBADF/EPERM). Se compila en una copia local y se devuelven al repositorio solo los fuentes:

```powershell
$d = "$env:USERPROFILE\dev\qfdos-web-v3-app"
robocopy . $d /E /XD node_modules node_modules_backup .git "Prácticas v4" dist .claude android\app\build /XF "video header*.mp4"
cd $d; npm install
```

Desde esa copia:

```powershell
npm run build:app          # vite build + cap sync
npm run android:open       # abre Android Studio
```

APK de depuración desde terminal:

```powershell
$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
cd android; .\gradlew assembleDebug
```

La salida de Gradle se escribe fuera de Google Drive (`%USERPROFILE%\.qfdos-android-build\`), porque la sincronización de Drive bloquea ficheros durante la compilación. El APK queda en `%USERPROFILE%\.qfdos-android-build\app\outputs\apk\debug\app-debug.apk`.

Iconos y splash se regeneran desde `assets/` con `npm run android:icons`.

## Publicar (release)

1. Crear una keystore fuera del repositorio: `keytool -genkey -v -keystore qfdos-release.jks -alias qfdos -keyalg RSA -keysize 2048 -validity 10000`
2. Android Studio → Build → Generate Signed App Bundle (`.aab`) para Google Play.
3. Registrar la SHA-1 de release (paso manual anterior).

## Fase 2 · iOS

En un Mac con Xcode: `npm i -D @capacitor/ios; npx cap add ios`. Crear un Client ID OAuth de tipo iOS (bundle `es.ugr.qfdos`), guardarlo en `VITE_GOOGLE_IOS_CLIENT_ID` y añadir su esquema invertido a `Info.plist`. El código de `src/native/` ya contempla iOS.
