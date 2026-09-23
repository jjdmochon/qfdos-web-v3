/**
 * QFDOS · Recepción de entregas y publicación de contenido
 * Química Farmacéutica II — Universidad de Granada
 *
 * Hace cuatro cosas:
 *   0. Verifica el ID token de Google y emite una sesión firmada, que es lo
 *      que acredita quién hace cada petición a partir de ahí.
 *   1. Recibe entregas del alumnado y las anota en la hoja correspondiente.
 *   2. Guarda el contenido del curso que publica el profesor, para que sus
 *      cambios los vea todo el mundo y no sólo su navegador.
 *   3. Devuelve a cada estudiante lo que él mismo ha entregado.
 *
 * ---------------------------------------------------------------------------
 * DESPLIEGUE
 * ---------------------------------------------------------------------------
 *  1. Hoja: https://docs.google.com/spreadsheets/d/1RrMzWJPFOKKH76vJh70pQw9vbiQZNOGOJH7vNaTGkso
 *  2. Extensiones → Apps Script. Pega este fichero entero y guarda.
 *  3. Configura la clave secreta fuera del código:
 *       · Icono de engranaje (⚙️ Configuración del proyecto) a la izquierda.
 *       · Sección "Propiedades de la secuencia de comandos" → "Añadir propiedad".
 *       · Nombre: CLAVE_PUBLICACION
 *       · Valor:  <tu_clave_secreta_privada>
 *     Y dos propiedades más para las sesiones (ver sección 0):
 *       · SESION_SECRETO   — una cadena aleatoria larga (≥ 32 caracteres).
 *                            La MISMA en el proyecto de Calificaciones.gs.
 *       · GOOGLE_CLIENT_ID — opcional; por defecto, el de la plataforma.
 *       · PROFESORES       — opcional; correos separados por comas.
 *  4. Implementar → Gestionar implementaciones (o Nueva implementación) → Editar:
 *       · Versión:             Nueva versión
 *       · Ejecutar como:       Yo
 *       · Quién tiene acceso:  CUALQUIER USUARIO
 *  5. Copia la URL /exec en .env.local (VITE_PRACTICAS_WEBAPP_URL).
 *
 * IMPORTANTE: al editar este script, guardar NO basta. Hay que crear una
 * IMPLEMENTACIÓN NUEVA, o la URL seguirá sirviendo la versión anterior.
 * ---------------------------------------------------------------------------
 */

var HOJA_ID = '1RrMzWJPFOKKH76vJh70pQw9vbiQZNOGOJH7vNaTGkso';

/**
 * Clave de publicación segura del curso.
 *
 * Para máxima seguridad y evitar exponer secretos en repositorios públicos,
 * la clave se almacena en las "Propiedades de la secuencia de comandos"
 * (Script Properties) del proyecto de Google Apps Script:
 *
 * Configuración del proyecto (icono ⚙️) → Propiedades de la secuencia de comandos
 *   Nombre: CLAVE_PUBLICACION
 *   Valor:  <tu_clave_secreta_aqui>
 *
 * Si no está definida en las propiedades, el servidor rechazará la publicación.
 */
function obtenerClavePublicacion_() {
  var props = PropertiesService.getScriptProperties();
  return (props.getProperty('CLAVE_PUBLICACION') || '').trim();
}

/** Pestaña donde vive el contenido publicado. */
var HOJA_CONTENIDO = '_Contenido';

function doGet(e)  { return manejar(e); }
function doPost(e) { return manejar(e); }

function manejar(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var accion = p.accion || '';

    if (accion === 'iniciarSesion')    return iniciarSesion(e);
    if (accion === 'renovarSesion')    return renovarSesion(p);
    if (accion === 'leerContenido')    return leerContenido();
    if (accion === 'guardarContenido') return guardarContenido(p, e);
    if (accion === 'misEntregas')      return misEntregas(p);
    if (accion === 'evaluacion')       return evaluacion(p);
    if (accion === 'guardarEvaluacion') return guardarEvaluacion(p, e);

    if (!p.sheetName) {
      return json({
        ok: true,
        servicio: 'QFDOS',
        version: 3,
        acciones: ['iniciarSesion', 'renovarSesion', 'leerContenido', 'guardarContenido', 'misEntregas', 'evaluacion', 'guardarEvaluacion'],
        mensaje: 'Endpoint operativo.'
      });
    }
    return anotarFila(p);
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/* ------------------------------------------------------------------ */
/* 0. Identidad y sesiones                                             */
/* ------------------------------------------------------------------ */

/**
 * Por qué una sesión propia y no el ID token de Google directamente
 * -----------------------------------------------------------------
 * El ID token caduca a la hora. Un alumno que entra, rellena el cuaderno
 * durante la práctica y envía hora y media después se encontraría con un
 * rechazo y, en el peor caso, perdería lo escrito. Así que el token de Google
 * se verifica UNA vez, al iniciar sesión, y a cambio se emite una sesión
 * firmada con SESION_SECRETO que dura 30 días y se renueva sola mientras se
 * use la plataforma.
 *
 * Calificaciones.gs es otro proyecto y otro despliegue: verifica la misma
 * sesión con el mismo secreto, así que SESION_SECRETO tiene que coincidir en
 * los dos.
 *
 * Formato: base64url(JSON) + '.' + base64url(HMAC-SHA256(JSON)).
 * El JSON lleva { e: correo, r: rol, i: institucional, x: caducidad (s) }.
 */

var CLIENT_ID_POR_DEFECTO = '161581301082-q9o3bm5gtqrp5h2rs59h67bjaafhejot.apps.googleusercontent.com';
var PROFESORES_POR_DEFECTO = ['juandiaz@ugr.es', 'juandiaz@go.ugr.es', 'jjdiaz@ugr.es', 'jjdiaz@go.ugr.es'];
var DOMINIOS_UGR = ['@correo.ugr.es', '@ugr.es', '@go.ugr.es'];
var DOMINIOS_PERSONALES = ['@gmail.com', '@googlemail.com'];
var DURACION_SESION_S = 30 * 24 * 3600;

function propiedad_(nombre) {
  return (PropertiesService.getScriptProperties().getProperty(nombre) || '').trim();
}

function terminaEn_(correo, dominios) {
  return dominios.some(function (d) { return correo.slice(-d.length) === d; });
}

function listaProfesores_() {
  var p = propiedad_('PROFESORES');
  if (!p) return PROFESORES_POR_DEFECTO;
  return p.split(',').map(function (c) { return c.trim().toLowerCase(); }).filter(String);
}

function firmar_(texto) {
  var secreto = propiedad_('SESION_SECRETO');
  if (secreto.length < 32) throw new Error('SESION_SECRETO no está configurado (mínimo 32 caracteres).');
  return Utilities.base64EncodeWebSafe(Utilities.computeHmacSha256Signature(texto, secreto)).replace(/=+$/, '');
}

function emitirSesion_(correo, institucional) {
  // El rol de profesor exige cuenta institucional, igual que en el cliente
  var rol = (institucional && listaProfesores_().indexOf(correo) !== -1) ? 'profesor' : 'estudiante';
  var caduca = Math.floor(Date.now() / 1000) + DURACION_SESION_S;
  var cuerpo = JSON.stringify({ e: correo, r: rol, i: institucional, x: caduca });
  var cuerpo64 = Utilities.base64EncodeWebSafe(cuerpo, Utilities.Charset.UTF_8).replace(/=+$/, '');
  return {
    ok: true,
    sesion: cuerpo64 + '.' + firmar_(cuerpo64),
    email: correo,
    rol: rol,
    institucional: institucional,
    caduca: caduca
  };
}

/**
 * Devuelve { e, r, i, x } si la sesión es auténtica y está vigente, o null.
 * Nunca lanza: una sesión mal formada es simplemente una sesión inválida.
 */
function verificarSesion_(sesion) {
  try {
    var partes = String(sesion || '').split('.');
    if (partes.length !== 2) return null;
    if (firmar_(partes[0]) !== partes[1]) return null;
    var relleno = partes[0] + '===='.slice(0, (4 - partes[0].length % 4) % 4);
    var datos = JSON.parse(Utilities.newBlob(Utilities.base64DecodeWebSafe(relleno)).getDataAsString('UTF-8'));
    if (!datos.e || !datos.x || datos.x < Math.floor(Date.now() / 1000)) return null;
    return datos;
  } catch (err) {
    return null;
  }
}

function sesionInvalida_() {
  return json({ ok: false, codigo: 'sesion_invalida', error: 'Sesión caducada o no válida. Vuelve a iniciar sesión.' });
}

/**
 * Recibe por POST { idToken } y lo comprueba contra Google: firma (lo hace
 * tokeninfo), destinatario (aud = nuestro Client ID), emisor, caducidad y
 * correo verificado. El correo sale del token, nunca de un parámetro.
 */
function iniciarSesion(e) {
  var cuerpo = {};
  try { cuerpo = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { cuerpo = {}; }
  var idToken = String(cuerpo.idToken || '');
  if (!idToken) return json({ ok: false, codigo: 'token_invalido', error: 'Falta el token de Google.' });

  var resp = UrlFetchApp.fetch(
    'https://oauth2.googleapis.com/tokeninfo?id_token=' + encodeURIComponent(idToken),
    { muteHttpExceptions: true }
  );
  if (resp.getResponseCode() !== 200) {
    return json({ ok: false, codigo: 'token_invalido', error: 'Google no reconoce el token.' });
  }

  var info = JSON.parse(resp.getContentText());
  var clientId = propiedad_('GOOGLE_CLIENT_ID') || CLIENT_ID_POR_DEFECTO;
  var emisorOk = info.iss === 'accounts.google.com' || info.iss === 'https://accounts.google.com';
  var vigente = Number(info.exp) > Math.floor(Date.now() / 1000);
  var verificado = info.email_verified === true || info.email_verified === 'true';

  if (info.aud !== clientId || !emisorOk || !vigente || !verificado) {
    return json({ ok: false, codigo: 'token_invalido', error: 'El token de Google no es válido para esta plataforma.' });
  }

  var correo = String(info.email || '').toLowerCase().trim();
  var institucional = terminaEn_(correo, DOMINIOS_UGR);
  if (!institucional && !terminaEn_(correo, DOMINIOS_PERSONALES)) {
    return json({ ok: false, codigo: 'dominio_no_admitido', error: 'Cuenta no admitida: ' + correo });
  }

  return json(emitirSesion_(correo, institucional));
}

/** Cambia una sesión vigente por otra nueva, sin volver a pasar por Google. */
function renovarSesion(p) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  return json(emitirSesion_(s.e, s.i === true));
}

/* ------------------------------------------------------------------ */
/* 1. Entregas                                                         */
/* ------------------------------------------------------------------ */

/**
 * Pestañas que admiten entregas. Cualquier otra se rechaza: antes se aceptaba
 * cualquier nombre (incluida `_Contenido`, que es el temario publicado) y
 * cualquier `sheetId`, así que el endpoint servía para escribir donde fuera.
 */
var HOJAS_ENTREGA = ['Cuaderno de parejas', 'normas de seguridad', 'Material'];

/** Campos que se descartan del formulario; `cuentaVerificada` la pone el servidor. */
var CAMPOS_RESERVADOS = ['sheetId', 'sheetName', 'callback', 'accion', 'sesion', 'cuentaVerificada', 'recibidoEn'];

var MAX_CAMPOS = 80;
var MAX_LONGITUD = 20000;

/**
 * Sheets interpreta como fórmula un texto que empiece por =, + o @ (y por -
 * si no es un número). Un apóstrofo delante lo deja como texto literal.
 */
function textoSeguro_(v) {
  var t = String(v).slice(0, MAX_LONGITUD);
  if (/^[=+@]/.test(t) || (/^-/.test(t) && isNaN(Number(t)))) return "'" + t;
  return t;
}

function anotarFila(p) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();

  if (HOJAS_ENTREGA.indexOf(p.sheetName) === -1) {
    return json({ ok: false, codigo: 'hoja_no_admitida', error: 'Hoja no admitida: ' + p.sheetName });
  }

  var claves = Object.keys(p).filter(function (k) { return CAMPOS_RESERVADOS.indexOf(k) === -1; });
  if (claves.length > MAX_CAMPOS) return json({ ok: false, error: 'Demasiados campos.' });

  var datos = {};
  for (var n = 0; n < claves.length; n++) {
    var k = claves[n];
    if (!/^[A-Za-z][A-Za-z0-9_]{0,59}$/.test(k)) return json({ ok: false, error: 'Campo no válido: ' + k });
    datos[k] = textoSeguro_(p[k]);
  }

  // La identidad la acredita la sesión, no lo que se teclee en el formulario.
  // En las hojas individuales el alumno sólo puede firmar con su propia cuenta;
  // en el cuaderno de parejas email1/email2 se conservan (el compañero puede
  // ser otro), pero `cuentaVerificada` deja constancia de quién envió.
  if (s.r !== 'profesor' && datos.email !== undefined) datos.email = s.e;
  if (datos.cuentaDeEnvio !== undefined) datos.cuentaDeEnvio = s.e;
  datos.cuentaVerificada = s.e;
  datos.recibidoEn = new Date();

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var libro = SpreadsheetApp.openById(HOJA_ID);
    var hoja = libro.getSheetByName(p.sheetName) || libro.insertSheet(p.sheetName);

    var cabeceras = leerCabeceras(hoja);
    Object.keys(datos).forEach(function (c) {
      if (cabeceras.indexOf(c) === -1) cabeceras.push(c);
    });
    hoja.getRange(1, 1, 1, cabeceras.length).setValues([cabeceras]).setFontWeight('bold');
    hoja.setFrozenRows(1);

    hoja.appendRow(cabeceras.map(function (c) {
      return datos[c] !== undefined ? datos[c] : '';
    }));

    return json({
      ok: true,
      hoja: p.sheetName,
      fila: hoja.getLastRow(),
      recibidoEn: datos.recibidoEn.toISOString()
    });
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------------------------------------------ */
/* 2. Contenido del curso                                              */
/* ------------------------------------------------------------------ */

/**
 * El contenido se guarda por trozos porque una celda admite 50 000
 * caracteres y el temario completo los supera con holgura.
 */
function guardarContenido(p, e) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (s.r !== 'profesor') return json({ ok: false, error: 'Sólo el profesorado puede publicar.' });

  var claveEsperada = obtenerClavePublicacion_();
  if (!claveEsperada) {
    return json({ ok: false, error: 'La clave de publicación no está configurada en Script Properties de Apps Script.' });
  }

  if (!p.clave || String(p.clave).trim() !== claveEsperada) {
    return json({ ok: false, error: 'Clave de publicación incorrecta.' });
  }

  // El contenido llega por POST: en la URL no cabría
  var cuerpo = (e && e.postData && e.postData.contents) ? e.postData.contents : (p.datos || '');
  if (!cuerpo) return json({ ok: false, error: 'No se recibió contenido.' });

  var libro = SpreadsheetApp.openById(HOJA_ID);
  var hoja = libro.getSheetByName(HOJA_CONTENIDO);
  if (hoja) { libro.deleteSheet(hoja); }
  hoja = libro.insertSheet(HOJA_CONTENIDO);
  hoja.hideSheet();

  hoja.getRange(1, 1, 1, 3)
      .setValues([['trozo', 'contenido', 'publicadoEn']])
      .setFontWeight('bold');

  var TAM = 45000;
  var filas = [];
  for (var i = 0; i * TAM < cuerpo.length; i++) {
    filas.push([i, cuerpo.substr(i * TAM, TAM), i === 0 ? new Date() : '']);
  }
  hoja.getRange(2, 1, filas.length, 3).setValues(filas);

  return json({ ok: true, trozos: filas.length, bytes: cuerpo.length });
}

function leerContenido() {
  var libro = SpreadsheetApp.openById(HOJA_ID);
  var hoja = libro.getSheetByName(HOJA_CONTENIDO);
  if (!hoja || hoja.getLastRow() < 2) {
    return json({ ok: true, vacio: true });
  }

  var filas = hoja.getRange(2, 1, hoja.getLastRow() - 1, 3).getValues();
  filas.sort(function (a, b) { return a[0] - b[0]; });

  var texto = filas.map(function (f) { return f[1]; }).join('');
  var publicadoEn = filas.length ? filas[0][2] : '';

  try {
    return json({
      ok: true,
      vacio: false,
      publicadoEn: publicadoEn ? new Date(publicadoEn).toISOString() : '',
      contenido: JSON.parse(texto)
    });
  } catch (err) {
    return json({ ok: false, error: 'El contenido guardado no es JSON válido.' });
  }
}

/* ------------------------------------------------------------------ */
/* 3. Entregas de un estudiante                                        */
/* ------------------------------------------------------------------ */

/**
 * Devuelve las filas en las que aparece el correo de la sesión, mirando en
 * cualquier columna de correo. El correo sale de la sesión verificada, no de
 * un parámetro: antes bastaba con pedir `email=<compañero>` para leer sus
 * entregas. El profesorado sí puede consultar el de cualquier estudiante.
 */
function misEntregas(p) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();

  var correo = s.e;
  if (s.r === 'profesor' && p.email) correo = String(p.email).trim().toLowerCase();

  var libro = SpreadsheetApp.openById(HOJA_ID);
  var resultado = [];

  libro.getSheets().forEach(function (hoja) {
    var nombre = hoja.getName();
    if (nombre.charAt(0) === '_') return;          // hojas internas
    if (hoja.getLastRow() < 2) return;

    var datos = hoja.getDataRange().getValues();
    var cabeceras = datos[0];

    var columnasCorreo = [];
    cabeceras.forEach(function (c, i) {
      if (/email|correo|cuenta/i.test(String(c))) columnasCorreo.push(i);
    });
    if (!columnasCorreo.length) return;

    for (var f = 1; f < datos.length; f++) {
      var coincide = columnasCorreo.some(function (i) {
        return String(datos[f][i]).trim().toLowerCase() === correo;
      });
      if (!coincide) continue;

      var fila = {};
      cabeceras.forEach(function (c, i) {
        if (c === '') return;
        var v = datos[f][i];
        fila[String(c)] = (v instanceof Date) ? v.toISOString() : String(v);
      });
      resultado.push({ hoja: nombre, fila: f + 1, datos: fila });
    }
  });

  resultado.sort(function (a, b) {
    return String(b.datos.recibidoEn || '').localeCompare(String(a.datos.recibidoEn || ''));
  });

  return json({ ok: true, email: correo, total: resultado.length, entregas: resultado });
}

/* ------------------------------------------------------------------ */
/* 4. Matriz de evaluación                                             */
/* ------------------------------------------------------------------ */

/**
 * Hoja de evaluación continua (examen final, parcial, prácticas, trabajos).
 * Antes el navegador la descargaba entera como CSV público y filtraba después,
 * así que cualquier alumno tenía las notas de toda la clase. Ahora la hoja
 * es privada y la lee este script, que corre con la cuenta del profesor:
 *   · profesor   → todas las filas
 *   · estudiante → sólo la fila cuyo correo coincide con el de su sesión
 * Se puede cambiar de hoja con la propiedad EVALUACION_HOJA_ID.
 */
var EVALUACION_HOJA_ID = '1gbbet7PZavZQKffB3d7BUs3nhbg9dMJy4ZYGoh3q9yQ';

function evaluacion(p) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();

  var hoja = SpreadsheetApp.openById(propiedad_('EVALUACION_HOJA_ID') || EVALUACION_HOJA_ID).getSheets()[0];
  var datos = hoja.getDataRange().getValues();
  if (datos.length < 1) return json({ ok: true, cabeceras: [], filas: [] });

  var cabeceras = datos[0].map(String);
  var colCorreo = -1;
  for (var c = 0; c < cabeceras.length; c++) {
    if (/email|correo/i.test(cabeceras[c])) { colCorreo = c; break; }
  }

  var texto = function (v) { return (v instanceof Date) ? v.toISOString() : String(v); };
  var filas = datos.slice(1)
    .filter(function (f) { return f.some(function (v) { return String(v).trim() !== ''; }); })
    .map(function (f) { return f.map(texto); });

  if (s.r !== 'profesor') {
    // Sin columna de correo no hay forma de saber qué fila es suya: nada
    filas = colCorreo === -1 ? [] : filas.filter(function (f) {
      return String(f[colCorreo]).trim().toLowerCase() === s.e;
    });
  }

  return json({ ok: true, cabeceras: cabeceras, filas: filas });
}

/**
 * Localiza las columnas de nota con las mismas reglas que usa el cliente al
 * leer (EvaluationSection), para que lo que se escribe sea lo que se lee.
 * Devuelve índices base 0, o -1 si no existe.
 */
function columnasEvaluacion_(cabeceras) {
  var h = cabeceras.map(function (c) { return String(c).toLowerCase(); });
  var buscar = function (fn) { for (var i = 0; i < h.length; i++) if (fn(h[i])) return i; return -1; };
  var tiene = function (t, trozos) { return trozos.some(function (x) { return t.indexOf(x) !== -1; }); };
  return {
    correo:   buscar(function (t) { return tiene(t, ['email', 'correo', 'ugr']); }),
    nombre:   buscar(function (t) { return tiene(t, ['nombre', 'alumno', 'estudiante']); }),
    final:    buscar(function (t) { return tiene(t, ['final', '70']) && t.indexOf('parcial') === -1; }),
    parcial:  buscar(function (t) { return tiene(t, ['parcial', '20']); }),
    practicas: buscar(function (t) { return tiene(t, ['lab', 'práct', 'pract', '5%']); }),
    trabajos: buscar(function (t) { return tiene(t, ['trabaj', 'semin', 'proyect']) && t.indexOf('lab') === -1; })
  };
}

/**
 * Escribe las notas de un estudiante en la hoja de evaluación. Sólo
 * profesorado. Recibe por POST { email, nombre?, examenFinal, parcial,
 * practicas, trabajos } (notas de 0 a 10). Si el correo ya figura se
 * actualiza su fila; si no, se añade una nueva.
 */
function guardarEvaluacion(p, e) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (s.r !== 'profesor') return json({ ok: false, error: 'Sólo el profesorado puede modificar la evaluación.' });

  var d;
  try { d = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { d = {}; }

  var correo = String(d.email || '').trim().toLowerCase();
  if (!correo || correo.indexOf('@') === -1) return json({ ok: false, error: 'Falta un correo válido.' });

  var notas = {};
  var campos = ['examenFinal', 'parcial', 'practicas', 'trabajos'];
  for (var n = 0; n < campos.length; n++) {
    var v = Number(d[campos[n]]);
    if (isNaN(v) || v < 0 || v > 10) return json({ ok: false, error: 'Nota fuera de rango (0–10): ' + campos[n] });
    notas[campos[n]] = Math.round(v * 100) / 100;
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var hoja = SpreadsheetApp.openById(propiedad_('EVALUACION_HOJA_ID') || EVALUACION_HOJA_ID).getSheets()[0];
    var datos = hoja.getDataRange().getValues();
    var col = columnasEvaluacion_(datos[0] || []);

    var faltan = [];
    if (col.correo === -1) faltan.push('correo');
    if (col.final === -1) faltan.push('examen final');
    if (col.parcial === -1) faltan.push('examen parcial');
    if (col.practicas === -1) faltan.push('prácticas');
    if (col.trabajos === -1) faltan.push('trabajos');
    if (faltan.length) return json({ ok: false, error: 'La hoja de evaluación no tiene columna de: ' + faltan.join(', ') + '.' });

    var fila = -1;
    for (var f = 1; f < datos.length; f++) {
      if (String(datos[f][col.correo]).trim().toLowerCase() === correo) { fila = f + 1; break; }
    }

    var ancho = datos[0].length;
    var nueva = fila === -1;
    var valores;
    if (nueva) {
      valores = [];
      for (var i = 0; i < ancho; i++) valores.push('');
      valores[col.correo] = correo;
      if (col.nombre !== -1) valores[col.nombre] = textoSeguro_(d.nombre || '');
    } else {
      valores = hoja.getRange(fila, 1, 1, ancho).getValues()[0];
    }
    valores[col.final] = notas.examenFinal;
    valores[col.parcial] = notas.parcial;
    valores[col.practicas] = notas.practicas;
    valores[col.trabajos] = notas.trabajos;

    if (nueva) {
      hoja.appendRow(valores);
      fila = hoja.getLastRow();
    } else {
      hoja.getRange(fila, 1, 1, ancho).setValues([valores]);
    }
    return json({ ok: true, fila: fila, nueva: nueva });
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------------------------------------------ */

function leerCabeceras(hoja) {
  if (hoja.getLastRow() === 0 || hoja.getLastColumn() === 0) return [];
  return hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0].filter(String);
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
