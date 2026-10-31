<#
    preparar-historias.ps1 — Prepara los vídeos de las Historias (Tema 1 por defecto; -Tema 2, -Tema 4 o -Tema 5 para esos temas).

    Copia desde las carpetas de Drive los dos vídeos que usan las Historias y los
    deja en public\historias con el tamaño adecuado para la web:

      tema-01-video-podcast.mp4   Resumen en vídeo del tema. La historia solo
                                  enseña 30 s, así que se recorta a 30 s.
      tema-01-clip.mp4            Clip completo del tema (vertical). Se recomprime
                                  a 720 x 1280.

    Necesita ffmpeg (winget install Gyan.FFmpeg). Sin ffmpeg copia los ficheros
    tal cual, pero el vídeo podcast pesa ~35 MB: conviene instalarlo.

    Uso, desde la raíz del proyecto:
        .\scripts\preparar-historias.ps1
        .\scripts\preparar-historias.ps1 -Drive 'I:\Mi unidad\Classroom\2627 QFDOS E\Temas 2627'

    Después: git add public/historias; commit y push (o dev.ps1 -Pages).
    Hasta que los ficheros existan, esas dos historias no se muestran.
#>

param(
    [int]$Tema = 1,
    [string]$Drive = 'K:\Mi unidad\Classroom\2627 QFDOS E\1. Temas 2627'
)

$ErrorActionPreference = 'Stop'
$destino = Join-Path $PSScriptRoot '..\public\historias'
New-Item -ItemType Directory -Force $destino | Out-Null

if ($Tema -eq 1) {
$videoPodcast = Get-ChildItem -LiteralPath (Join-Path $Drive 'Presentaciones Finales\Video Resumen') -Filter 'Video_Resumen_QFDOS_Tema_1*.mp4' | Select-Object -First 1
$clip = Join-Path $Drive 'brag\Tema 1\brag-output\brag-vertical.mp4'

if (-not $videoPodcast) { throw "No encuentro el vídeo resumen del Tema 1 en '$Drive\Presentaciones Finales\Video Resumen'." }
if (-not (Test-Path -LiteralPath $clip)) { throw "No encuentro el clip: $clip" }
}

$ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue

function Convertir($origen, $salida, $args2) {
    if ($ffmpeg) {
        & ffmpeg -y -loglevel error -i $origen @args2 -c:v libx264 -preset slow -crf 27 -pix_fmt yuv420p -c:a aac -b:a 96k -movflags +faststart $salida
        if ($LASTEXITCODE -ne 0) { throw "ffmpeg ha fallado con $origen" }
    } else {
        Write-Warning "ffmpeg no está instalado: se copia sin recortar ni comprimir ($origen)"
        Copy-Item -LiteralPath $origen -Destination $salida -Force
    }
    $mb = [math]::Round((Get-Item $salida).Length / 1MB, 1)
    Write-Host ("  {0}  {1} MB" -f (Split-Path $salida -Leaf), $mb) -ForegroundColor Green
}

# --- Tema 2: carpeta 'Video Resumen' (resumen, clip vertical y cartel) ---
if ($Tema -eq 2) {
    $carpeta = Join-Path $Drive 'Presentaciones Finales\Video Resumen'
    $resumen2 = Get-ChildItem -LiteralPath $carpeta -Filter 'Video_Resumen_QFDOS_Tema_2*.mp4' | Select-Object -First 1
    $clip2 = Get-ChildItem -LiteralPath $carpeta -Filter 'Video_Presentacion_QFDOS_Tema_2*vertical.mp4' | Select-Object -First 1
    $cartel2 = Get-ChildItem -LiteralPath $carpeta -Filter 'Video_Presentacion_QFDOS_Tema_2*portada.jpg' | Select-Object -First 1
    if (-not $resumen2 -or -not $clip2 -or -not $cartel2) { throw "Faltan ficheros del Tema 2 en '$carpeta'." }
    $ffmpeg = Get-Command ffmpeg -ErrorAction SilentlyContinue
    Write-Host 'Preparando Historias del Tema 2...' -ForegroundColor Cyan
    Copy-Item -LiteralPath $cartel2.FullName (Join-Path $destino 'tema-02-brag.jpg') -Force
    Convertir $resumen2.FullName (Join-Path $destino 'tema-02-video-podcast.mp4') @('-t', '30', '-vf', 'scale=min(1280\,iw):-2')
    Convertir $clip2.FullName (Join-Path $destino 'tema-02-clip.mp4') @('-vf', 'scale=720:-2')
    Write-Host 'Listo. La píldora de audio (public/audio) se convierte aparte con ffmpeg -c:a libmp3lame -b:a 96k.' -ForegroundColor Cyan
    return
}

# --- Tema 4: vídeo resumen (Video Resumen) + clip y cartel verticales de brag ---
if ($Tema -eq 4) {
    $resumen4 = Get-ChildItem -LiteralPath (Join-Path $Drive 'Presentaciones Finales\Video Resumen') -Filter 'Video_Resumen_QFDOS_Tema_4*.mp4' | Select-Object -First 1
    $clip4 = Join-Path $Drive 'brag\Tema 4\brag-output\qfdos_tema4_brag_vertical.mp4'
    $cartel4 = Join-Path $Drive 'brag\Tema 4\brag-output\qfdos_tema4_brag_vertical.jpg'
    if (-not $resumen4) { throw "No encuentro el vídeo resumen del Tema 4 en '$Drive\Presentaciones Finales\Video Resumen'." }
    foreach ($f in @($clip4, $cartel4)) { if (-not (Test-Path -LiteralPath $f)) { throw "No encuentro: $f" } }
    Write-Host 'Preparando Historias del Tema 4...' -ForegroundColor Cyan
    Copy-Item -LiteralPath $cartel4 (Join-Path $destino 'tema-04-brag.jpg') -Force
    Convertir $resumen4.FullName (Join-Path $destino 'tema-04-video-podcast.mp4') @('-t', '30', '-vf', 'scale=min(1280\,iw):-2')
    Convertir $clip4 (Join-Path $destino 'tema-04-clip.mp4') @('-vf', 'scale=720:-2')
    Write-Host 'Listo. Sube public/historias con git (add, commit y push).' -ForegroundColor Cyan
    return
}

# --- Tema 5: vídeo resumen (Video Resumen) + clip y cartel verticales de brag ---
if ($Tema -eq 5) {
    $resumen5 = Get-ChildItem -LiteralPath (Join-Path $Drive 'Presentaciones Finales\Video Resumen') -Filter 'Video_Resumen_QFDOS_Tema_5*.mp4' | Select-Object -First 1
    $clip5 = Join-Path $Drive 'brag\Tema 5\brag-output\qfdos_tema5_brag_vertical.mp4'
    $cartel5 = Join-Path $Drive 'brag\Tema 5\brag-output\qfdos_tema5_brag_vertical.jpg'
    if (-not $resumen5) { throw "No encuentro el vídeo resumen del Tema 5 en '$Drive\Presentaciones Finales\Video Resumen'." }
    foreach ($f in @($clip5, $cartel5)) { if (-not (Test-Path -LiteralPath $f)) { throw "No encuentro: $f" } }
    Write-Host 'Preparando Historias del Tema 5...' -ForegroundColor Cyan
    Copy-Item -LiteralPath $cartel5 (Join-Path $destino 'tema-05-brag.jpg') -Force
    Convertir $resumen5.FullName (Join-Path $destino 'tema-05-video-podcast.mp4') @('-t', '30', '-vf', 'scale=min(1280\,iw):-2')
    Convertir $clip5 (Join-Path $destino 'tema-05-clip.mp4') @('-vf', 'scale=720:-2')
    Write-Host 'Listo. Sube public/historias con git (add, commit y push).' -ForegroundColor Cyan
    return
}

if ($Tema -ne 1) { throw 'Tema no soportado: usa 1, 2, 4 o 5.' }
Write-Host 'Preparando vídeos de las Historias...' -ForegroundColor Cyan
# Vídeo podcast: 30 s, ancho máximo 1280 (suele ser apaisado)
Convertir $videoPodcast.FullName (Join-Path $destino 'tema-01-video-podcast.mp4') @('-t', '30', '-vf', 'scale=min(1280\,iw):-2')
# Clip vertical completo: 720 x 1280
Convertir $clip (Join-Path $destino 'tema-01-clip.mp4') @('-vf', 'scale=720:-2')

Write-Host 'Listo. Sube public/historias con git (add, commit y push).' -ForegroundColor Cyan
