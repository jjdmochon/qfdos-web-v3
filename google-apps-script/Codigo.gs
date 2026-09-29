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
    if (accion === 'enviarDuda')       return enviarDuda(p, e);
    if (accion === 'misDudas')         return misDudas(p);
    if (accion === 'responderDuda')    return responderDuda(p, e);
    if (accion === 'borrarDuda')       return borrarDuda(p, e);
    if (accion === 'cuaderno')         return cuaderno(p);
    if (accion === 'calificarCuaderno') return calificarCuaderno(p, e);
    if (accion === 'seguimiento')      return seguimiento(p);
    if (accion === 'iniciarSubida')    return iniciarSubida(p, e);
    if (accion === 'subirFragmento')   return subirFragmento(p, e);
    if (accion === 'materiales')       return materiales(p);
    // Entregas por POST: los datos personales viajan en el cuerpo, no en la URL
    if (accion === 'anotarFila')       return anotarFila(cuerpoJson_(e));

    if (!p.sheetName) {
      return json({
        ok: true,
        servicio: 'QFDOS',
        version: 7,
        acciones: ['iniciarSesion', 'renovarSesion', 'leerContenido', 'guardarContenido', 'misEntregas', 'evaluacion', 'guardarEvaluacion', 'enviarDuda', 'misDudas', 'responderDuda', 'borrarDuda', 'cuaderno', 'calificarCuaderno', 'seguimiento', 'iniciarSubida', 'subirFragmento', 'materiales', 'anotarFila'],
        mensaje: 'Endpoint operativo.'
      });
    }
    // Formato antiguo (GET con los campos en la URL). Se mantiene mientras
    // queden navegadores con la versión anterior de la web en caché; retirar
    // cuando todos hayan actualizado.
    return anotarFila(p);
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/**
 * Cuerpo JSON de un POST enviado como text/plain (sin preflight CORS).
 * Solo se aceptan valores de texto o número, como en un formulario.
 */
function cuerpoJson_(e) {
  var d;
  try { d = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { d = {}; }
  var p = {};
  Object.keys(d || {}).forEach(function (k) {
    var v = d[k];
    if (typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean') p[k] = String(v);
  });
  return p;
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
var HOJAS_ENTREGA = ['Cuaderno de parejas', 'normas de seguridad', 'Material', 'Opiniones'];

/** Pestañas que reciben filas pero no son entregas: no salen en «Mis entregas». */
var HOJAS_NO_ENTREGA = ['Opiniones'];

/**
 * Columnas con la nota del profesorado en «Cuaderno de parejas». Se descartan
 * del formulario (un alumno no puede escribirlas mandando el campo a mano) y
 * no se devuelven a los estudiantes en `misEntregas`.
 */
var CAMPOS_NOTA = ['notaProfesor', 'comentarioProfesor', 'calificadoEn'];

/** Campos que se descartan del formulario; `cuentaVerificada` la pone el servidor. */
var CAMPOS_RESERVADOS = ['sheetId', 'sheetName', 'callback', 'accion', 'sesion', 'cuentaVerificada', 'recibidoEn']
  .concat(CAMPOS_NOTA);

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
    if (HOJAS_NO_ENTREGA.indexOf(nombre) !== -1) return; // feedback, no entregas
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
        if (s.r !== 'profesor' && CAMPOS_NOTA.indexOf(String(c)) !== -1) return;
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
/* 5. Buzón de dudas                                                   */
/* ------------------------------------------------------------------ */

/**
 * Antes la duda se guardaba sólo en el navegador del alumno y el profesor
 * nunca la veía. Ahora vive en la pestaña oculta `_Dudas` de la hoja de
 * entregas (fuera de la lista blanca de anotarFila y del barrido de
 * misEntregas, que ignora las pestañas que empiezan por `_`):
 *   · enviarDuda    — cualquier sesión; el correo sale de la sesión
 *   · misDudas      — estudiante: las suyas; profesor: todas
 *   · responderDuda — sólo profesor
 *   · borrarDuda    — sólo profesor
 */
var HOJA_DUDAS = '_Dudas';
var CABECERAS_DUDAS = ['id', 'recibidaEn', 'correo', 'nombre', 'temaId', 'temaTitulo', 'pregunta', 'estado', 'respuesta', 'respondidaEn'];
var MAX_PREGUNTA = 4000;
var MAX_PENDIENTES_POR_ALUMNO = 20;

function hojaDudas_() {
  var libro = SpreadsheetApp.openById(HOJA_ID);
  var hoja = libro.getSheetByName(HOJA_DUDAS);
  if (!hoja) {
    hoja = libro.insertSheet(HOJA_DUDAS);
    hoja.getRange(1, 1, 1, CABECERAS_DUDAS.length).setValues([CABECERAS_DUDAS]).setFontWeight('bold');
    hoja.setFrozenRows(1);
    hoja.hideSheet();
  }
  return hoja;
}

function filasDudas_(hoja) {
  if (hoja.getLastRow() < 2) return [];
  return hoja.getRange(2, 1, hoja.getLastRow() - 1, CABECERAS_DUDAS.length).getValues();
}

function dudaAObjeto_(f) {
  var fecha = function (v) { return (v instanceof Date) ? v.toISOString() : String(v || ''); };
  return {
    id: String(f[0]),
    recibidaEn: fecha(f[1]),
    correo: String(f[2]),
    nombre: String(f[3]),
    temaId: String(f[4]),
    temaTitulo: String(f[5]),
    pregunta: String(f[6]),
    estado: String(f[7]) === 'respondida' ? 'respondida' : 'pendiente',
    respuesta: String(f[8] || ''),
    respondidaEn: fecha(f[9])
  };
}

function cuerpoJson_(e) {
  try { return JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return {}; }
}

function enviarDuda(p, e) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();

  var d = cuerpoJson_(e);
  var pregunta = String(d.pregunta || '').trim();
  if (!pregunta) return json({ ok: false, error: 'La duda está vacía.' });
  if (pregunta.length > MAX_PREGUNTA) return json({ ok: false, error: 'La duda es demasiado larga (máximo ' + MAX_PREGUNTA + ' caracteres).' });

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var hoja = hojaDudas_();
    var pendientes = filasDudas_(hoja).filter(function (f) {
      return String(f[2]) === s.e && String(f[7]) !== 'respondida';
    }).length;
    if (pendientes >= MAX_PENDIENTES_POR_ALUMNO) {
      return json({ ok: false, error: 'Tienes ' + pendientes + ' dudas sin responder. Espera a que se respondan antes de enviar más.' });
    }

    var id = 'd_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
    var ahora = new Date();
    hoja.appendRow([
      id, ahora, s.e,
      textoSeguro_(String(d.nombre || '').slice(0, 120)),
      textoSeguro_(String(d.temaId || '').slice(0, 60)),
      textoSeguro_(String(d.temaTitulo || '').slice(0, 200)),
      textoSeguro_(pregunta),
      'pendiente', '', ''
    ]);
    return json({ ok: true, duda: dudaAObjeto_([id, ahora, s.e, d.nombre || '', d.temaId || '', d.temaTitulo || '', pregunta, 'pendiente', '', '']) });
  } finally {
    lock.releaseLock();
  }
}

function misDudas(p) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();

  var dudas = filasDudas_(hojaDudas_())
    .filter(function (f) { return f[0] !== '' && (s.r === 'profesor' || String(f[2]) === s.e); })
    .map(dudaAObjeto_);
  dudas.reverse(); // la más reciente primero
  return json({ ok: true, dudas: dudas });
}

/** Localiza la fila (base 1) de una duda por su id, o -1. */
function filaDeDuda_(hoja, id) {
  var ids = hoja.getLastRow() < 2 ? [] : hoja.getRange(2, 1, hoja.getLastRow() - 1, 1).getValues();
  for (var i = 0; i < ids.length; i++) if (String(ids[i][0]) === id) return i + 2;
  return -1;
}

function responderDuda(p, e) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (s.r !== 'profesor') return json({ ok: false, error: 'Sólo el profesorado puede responder dudas.' });

  var d = cuerpoJson_(e);
  var respuesta = String(d.respuesta || '').trim();
  if (!respuesta) return json({ ok: false, error: 'La respuesta está vacía.' });

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var hoja = hojaDudas_();
    var fila = filaDeDuda_(hoja, String(d.id || ''));
    if (fila === -1) return json({ ok: false, error: 'Esa duda ya no existe.' });
    // Columnas 8–10: estado, respuesta, respondidaEn
    hoja.getRange(fila, 8, 1, 3).setValues([['respondida', textoSeguro_(respuesta.slice(0, MAX_LONGITUD)), new Date()]]);
    return json({ ok: true, duda: dudaAObjeto_(hoja.getRange(fila, 1, 1, CABECERAS_DUDAS.length).getValues()[0]) });
  } finally {
    lock.releaseLock();
  }
}

function borrarDuda(p, e) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (s.r !== 'profesor') return json({ ok: false, error: 'Sólo el profesorado puede borrar dudas.' });

  var d = cuerpoJson_(e);
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var hoja = hojaDudas_();
    var fila = filaDeDuda_(hoja, String(d.id || ''));
    if (fila !== -1) hoja.deleteRow(fila);
    return json({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------------------------------------------ */
/* 6. Cuaderno de parejas: lectura y calificación (profesorado)        */
/* ------------------------------------------------------------------ */

var HOJA_CUADERNO = 'Cuaderno de parejas';

/**
 * Todas las entregas del cuaderno, con el número de fila de la hoja. Sólo
 * profesorado. Antes el panel del profesor leía el localStorage de su
 * navegador y no veía lo que enviaba el alumnado.
 */
function cuaderno(p) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (s.r !== 'profesor') return json({ ok: false, error: 'Sólo el profesorado puede ver el cuaderno de todas las parejas.' });

  var hoja = SpreadsheetApp.openById(HOJA_ID).getSheetByName(HOJA_CUADERNO);
  if (!hoja || hoja.getLastRow() < 2) return json({ ok: true, filas: [] });

  var datos = hoja.getDataRange().getValues();
  var cabeceras = datos[0].map(String);
  var filas = [];
  for (var f = 1; f < datos.length; f++) {
    var obj = { _fila: f + 1 };
    for (var c = 0; c < cabeceras.length; c++) {
      if (cabeceras[c] === '') continue;
      var v = datos[f][c];
      obj[cabeceras[c]] = (v instanceof Date) ? v.toISOString() : String(v);
    }
    filas.push(obj);
  }
  return json({ ok: true, filas: filas });
}

/** Devuelve el índice (base 1) de una columna, creándola al final si no existe. */
function columnaOCrear_(hoja, nombre) {
  var ancho = hoja.getLastColumn();
  var cab = ancho > 0 ? hoja.getRange(1, 1, 1, ancho).getValues()[0].map(String) : [];
  var i = cab.indexOf(nombre);
  if (i !== -1) return i + 1;
  hoja.getRange(1, ancho + 1, 1, 1).setValues([[nombre]]).setFontWeight('bold');
  return ancho + 1;
}

/**
 * Guarda la nota y el comentario del profesor en la fila de esa entrega.
 * Recibe por POST { fila, recibidoEn, nota, comentario }. `recibidoEn` sirve
 * de guarda: si alguien ha borrado o insertado filas y ya no coincide, se
 * rechaza en vez de calificar a otra pareja.
 */
function calificarCuaderno(p, e) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (s.r !== 'profesor') return json({ ok: false, error: 'Sólo el profesorado puede calificar.' });

  var d = cuerpoJson_(e);
  var fila = Number(d.fila);
  var nota = Number(d.nota);
  var comentario = String(d.comentario || '').slice(0, 4000);
  if (!(fila >= 2) || fila !== Math.floor(fila)) return json({ ok: false, error: 'Fila no válida.' });
  if (d.nota === '' || d.nota === null || d.nota === undefined || isNaN(nota) || nota < 0 || nota > 10) {
    return json({ ok: false, error: 'La nota tiene que estar entre 0 y 10.' });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var hoja = SpreadsheetApp.openById(HOJA_ID).getSheetByName(HOJA_CUADERNO);
    if (!hoja || fila > hoja.getLastRow()) return json({ ok: false, codigo: 'fila_cambiada', error: 'Esa entrega ya no existe. Recarga el panel.' });

    var colRecibido = columnaOCrear_(hoja, 'recibidoEn');
    var actual = hoja.getRange(fila, colRecibido, 1, 1).getValues()[0][0];
    var actualIso = (actual instanceof Date) ? actual.toISOString() : String(actual);
    if (String(d.recibidoEn || '') !== actualIso) {
      return json({ ok: false, codigo: 'fila_cambiada', error: 'La hoja ha cambiado desde que cargaste el panel. Recárgalo y vuelve a calificar.' });
    }

    var ahora = new Date();
    hoja.getRange(fila, columnaOCrear_(hoja, 'notaProfesor'), 1, 1).setValues([[Math.round(nota * 100) / 100]]);
    hoja.getRange(fila, columnaOCrear_(hoja, 'comentarioProfesor'), 1, 1).setValues([[textoSeguro_(comentario)]]);
    hoja.getRange(fila, columnaOCrear_(hoja, 'calificadoEn'), 1, 1).setValues([[ahora]]);
    return json({ ok: true, fila: fila, calificadoEn: ahora.toISOString() });
  } finally {
    lock.releaseLock();
  }
}

/* ------------------------------------------------------------------ */
/* 7. Seguimiento del alumnado (profesorado)                           */
/* ------------------------------------------------------------------ */

/**
 * Hoja de calificaciones de los tests (la escribe Calificaciones.gs). Se abre
 * por id porque es otro libro; este script corre con la cuenta del profesor,
 * que es la propietaria de los dos. Se puede cambiar con la propiedad
 * CALIFICACIONES_HOJA_ID.
 */
var CALIFICACIONES_HOJA_ID = '1ha8QIAHQqK7PFm0wQJfeSsG3Y24_vovAlphvVfR7gME';
var HOJA_TESTS = 'Respuestas_QFDOS';

function iso_(v) {
  return (v instanceof Date) ? v.toISOString() : String(v === undefined || v === null ? '' : v);
}

/**
 * «Marca Temporal» de la hoja de tests: la escribe el navegador como texto
 * («29/09/2026 11:38») y Sheets puede dejarla como texto o convertirla en
 * fecha. Se pasa a ISO para poder comparar; vacío si no se entiende.
 */
function marcaAIso_(v) {
  if (v instanceof Date) return v.toISOString();
  var m = String(v || '').match(/^\s*(\d{1,2})\/(\d{1,2})\/(\d{4})[\s,]*(?:(\d{1,2}):(\d{2})(?::(\d{2}))?)?/);
  if (!m) return '';
  var d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]), Number(m[4] || 0), Number(m[5] || 0), Number(m[6] || 0));
  return isNaN(d.getTime()) ? '' : d.toISOString();
}

function correoValido_(v) {
  var c = String(v || '').trim().toLowerCase();
  return c.indexOf('@') > 0 ? c : '';
}

/** Filas de una pestaña como objetos {cabecera: valor}; [] si no existe. */
function filasComoObjetos_(libro, nombre) {
  var hoja = libro.getSheetByName(nombre);
  if (!hoja || hoja.getLastRow() < 2) return [];
  var datos = hoja.getDataRange().getValues();
  var cab = datos[0].map(String);
  var filas = [];
  for (var f = 1; f < datos.length; f++) {
    var o = {};
    for (var c = 0; c < cab.length; c++) if (cab[c] !== '') o[cab[c]] = datos[f][c];
    filas.push(o);
  }
  return filas;
}

/**
 * Una fila por estudiante con lo que ha hecho: normas firmadas, cuaderno,
 * tests por tema y flashcards. La lista de matriculados es la hoja de
 * evaluación (correo, nombre y, si existe, una columna «Grupo»); quien aparece
 * en otras hojas y no está en ella se marca `enLista: false`. Sin esa lista no
 * se puede saber quién NO ha entregado nada.
 */
function seguimiento(p) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (s.r !== 'profesor') return json({ ok: false, error: 'Sólo el profesorado puede ver el seguimiento.' });

  var alumnos = {};
  var alumno_ = function (correo, nombre) {
    var a = alumnos[correo];
    if (!a) {
      a = alumnos[correo] = {
        email: correo, nombre: '', grupo: '', enLista: false,
        normas: null, cuaderno: null, tests: {}, flashcards: 0, ultima: ''
      };
    }
    if (!a.nombre && nombre) a.nombre = String(nombre).trim();
    return a;
  };
  var actividad_ = function (a, cuando) {
    if (cuando && cuando > a.ultima) a.ultima = cuando;
  };

  var libro = SpreadsheetApp.openById(HOJA_ID);

  // 1. Lista de matriculados (hoja de evaluación)
  var hayLista = false;
  var libroEval = SpreadsheetApp.openById(propiedad_('EVALUACION_HOJA_ID') || EVALUACION_HOJA_ID);
  var hojaEval = libroEval.getSheets()[0];
  if (hojaEval && hojaEval.getLastRow() >= 2) {
    var de = hojaEval.getDataRange().getValues();
    var col = columnasEvaluacion_(de[0]);
    var colGrupo = -1;
    for (var g = 0; g < de[0].length; g++) if (/grupo/i.test(String(de[0][g]))) { colGrupo = g; break; }
    if (col.correo !== -1) {
      for (var i = 1; i < de.length; i++) {
        var ce = correoValido_(de[i][col.correo]);
        if (!ce) continue;
        var ae = alumno_(ce, col.nombre !== -1 ? de[i][col.nombre] : '');
        ae.enLista = true;
        if (colGrupo !== -1) ae.grupo = String(de[i][colGrupo] || '').trim();
        hayLista = true;
      }
    }
  }

  // 2. Normas de seguridad firmadas
  filasComoObjetos_(libro, 'normas de seguridad').forEach(function (r) {
    var c = correoValido_(r.cuentaVerificada || r.email);
    if (!c) return;
    var a = alumno_(c, r.nombre);
    var cuando = iso_(r.recibidoEn);
    if (!a.normas || cuando > a.normas) a.normas = cuando || 'firmada';
    actividad_(a, cuando);
  });

  // 3. Cuaderno de parejas: la entrega cuenta para los dos miembros y para quien la envió
  var porCuaderno = {};
  filasComoObjetos_(libro, HOJA_CUADERNO).forEach(function (r) {
    var cuando = iso_(r.recibidoEn);
    var miembros = {};
    [[r.email1, r.alumno1], [r.email2, r.alumno2], [r.cuentaVerificada, '']].forEach(function (par) {
      var c = correoValido_(par[0]);
      if (c) miembros[c] = par[1];
    });
    Object.keys(miembros).forEach(function (c) {
      var a = alumno_(c, miembros[c]);
      var previo = a.cuaderno;
      var nota = (r.notaProfesor === '' || r.notaProfesor === undefined) ? null : Number(r.notaProfesor);
      a.cuaderno = {
        entregas: (previo ? previo.entregas : 0) + 1,
        ultima: previo && previo.ultima > cuando ? previo.ultima : cuando,
        // La nota es la de la entrega más reciente
        nota: (previo && previo.ultima > cuando) ? previo.nota : (isNaN(nota) ? null : nota)
      };
      actividad_(a, cuando);
    });
  });

  // 4. Tests y flashcards (otro libro)
  var hayTests = true;
  try {
    var libroTests = SpreadsheetApp.openById(propiedad_('CALIFICACIONES_HOJA_ID') || CALIFICACIONES_HOJA_ID);
    filasComoObjetos_(libroTests, HOJA_TESTS).forEach(function (r) {
      var c = correoValido_(r['Correo UGR']);
      if (!c) return;
      var a = alumno_(c, r['Apellidos y Nombre']);
      var cuando = marcaAIso_(r['Marca Temporal']);
      var modo = String(r['Modo Evaluación'] || '');
      actividad_(a, cuando);
      if (modo === 'flashcards_autoevaluacion') { a.flashcards++; return; }
      var tema = String(r['Tema'] || '');
      if (!tema) return;
      var t = a.tests[tema] || (a.tests[tema] = { intentos: 0, mejor: null, ultima: '' });
      var nota = Number(r['Nota Final (/10)']);
      t.intentos++;
      if (!isNaN(nota) && (t.mejor === null || nota > t.mejor)) t.mejor = nota;
      if (cuando > t.ultima) t.ultima = cuando;
    });
  } catch (err) {
    hayTests = false;  // sin acceso a la hoja de tests: se sigue con el resto
  }

  var lista = Object.keys(alumnos).map(function (c) { return alumnos[c]; });
  lista.sort(function (x, y) {
    return (x.nombre || x.email).toLowerCase().localeCompare((y.nombre || y.email).toLowerCase());
  });
  return json({ ok: true, generado: new Date().toISOString(), hayLista: hayLista, hayTests: hayTests, alumnos: lista });
}

/* ------------------------------------------------------------------ */
/* 8. Materiales en Drive (profesorado)                                */
/* ------------------------------------------------------------------ */

/**
 * Antes los ficheros que subía el profesor se quedaban en el IndexedDB de su
 * navegador y había que subirlos otra vez a Drive y pegar el enlace. Ahora el
 * fichero va directamente a una carpeta de Drive y se devuelve el enlace.
 *
 * Cómo se sube: el navegador manda el fichero en fragmentos de 3 MiB
 * (`subirFragmento`) y este script los reenvía a una sesión de subida
 * reanudable de la API de Drive (`iniciarSubida`), de modo que nunca se carga
 * el fichero entero en memoria. Solo se necesita el permiso `drive.file`: el
 * script solo puede tocar los ficheros y la carpeta que ha creado él mismo, no
 * el resto del Drive.
 *
 * Requiere, en appsscript.json, el permiso `drive.file` y el servicio
 * avanzado de Drive (ver google-apps-script/appsscript.json), y haber
 * ejecutado una vez `autorizarDrive` desde el editor.
 */
var CARPETA_MATERIALES = 'QFDOS · Materiales del curso';
var FRAGMENTO_BYTES = 3 * 1024 * 1024;        // múltiplo de 256 KiB, como exige Drive
var MAX_SUBIDA_BYTES = 50 * 1024 * 1024;
var EXTENSIONES_PERMITIDAS = ['pdf', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'txt', 'png', 'jpg', 'jpeg', 'webp', 'svg', 'zip', 'mp3', 'm4a', 'wav'];
var DRIVE_API = 'https://www.googleapis.com/drive/v3';
var DRIVE_SUBIDA = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&supportsAllDrives=true';

function cabeceraDrive_(extra) {
  var h = { Authorization: 'Bearer ' + ScriptApp.getOAuthToken() };
  if (extra) Object.keys(extra).forEach(function (k) { h[k] = extra[k]; });
  return h;
}

/** Devuelve una cabecera de respuesta sin importar las mayúsculas. */
function cabeceraRespuesta_(resp, nombre) {
  var todas = resp.getAllHeaders ? resp.getAllHeaders() : resp.getHeaders();
  var buscada = nombre.toLowerCase();
  var claves = Object.keys(todas || {});
  for (var i = 0; i < claves.length; i++) if (claves[i].toLowerCase() === buscada) return String(todas[claves[i]]);
  return '';
}

function jsonDrive_(resp) {
  try { return JSON.parse(resp.getContentText()); } catch (err) { return {}; }
}

/** Mensaje legible de un error de la API de Drive. */
function errorDrive_(resp, contexto) {
  var cuerpo = jsonDrive_(resp);
  var msg = (cuerpo.error && (cuerpo.error.message || cuerpo.error)) || resp.getContentText().slice(0, 200);
  return contexto + ' (Drive ' + resp.getResponseCode() + '): ' + msg;
}

/** Carpeta donde caen los materiales; se crea la primera vez y se recuerda su id. */
function carpetaMateriales_() {
  var id = propiedad_('MATERIALES_CARPETA_ID');
  if (id) {
    var r = UrlFetchApp.fetch(DRIVE_API + '/files/' + id + '?fields=id,trashed&supportsAllDrives=true', {
      headers: cabeceraDrive_(), muteHttpExceptions: true
    });
    if (r.getResponseCode() === 200 && !jsonDrive_(r).trashed) return id;
  }
  var c = UrlFetchApp.fetch(DRIVE_API + '/files?fields=id&supportsAllDrives=true', {
    method: 'post',
    headers: cabeceraDrive_(),
    contentType: 'application/json; charset=UTF-8',
    payload: JSON.stringify({ name: CARPETA_MATERIALES, mimeType: 'application/vnd.google-apps.folder' }),
    muteHttpExceptions: true
  });
  if (c.getResponseCode() !== 200) throw new Error(errorDrive_(c, 'No se pudo crear la carpeta de materiales'));
  var nuevo = jsonDrive_(c).id;
  PropertiesService.getScriptProperties().setProperty('MATERIALES_CARPETA_ID', nuevo);
  return nuevo;
}

function extension_(nombre) {
  var m = String(nombre || '').toLowerCase().match(/\.([a-z0-9]{1,5})$/);
  return m ? m[1] : '';
}

function enlaceArchivo_(id) {
  return 'https://drive.google.com/file/d/' + id + '/view';
}

/**
 * Ejecutar UNA vez desde el editor (Ejecutar → autorizarDrive): pide el
 * permiso de Drive y comprueba que todo está bien creando la carpeta de
 * materiales. El resultado sale en el Registro de ejecución.
 */
function autorizarDrive() {
  var id = carpetaMateriales_();
  Logger.log('Drive listo. Carpeta de materiales: https://drive.google.com/drive/folders/' + id);
}

/**
 * Empieza una subida. Recibe por POST { nombre, mime, tamano } y devuelve el
 * id de subida y el tamaño de fragmento que debe usar el navegador.
 */
function iniciarSubida(p, e) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (s.r !== 'profesor') return json({ ok: false, error: 'Sólo el profesorado puede subir materiales.' });

  var d = cuerpoJson_(e);
  var nombre = String(d.nombre || '').replace(/[\\/\r\n]+/g, ' ').trim().slice(0, 180);
  var tamano = Number(d.tamano);
  if (!nombre) return json({ ok: false, error: 'Falta el nombre del fichero.' });
  if (EXTENSIONES_PERMITIDAS.indexOf(extension_(nombre)) === -1) {
    return json({ ok: false, error: 'Tipo de fichero no admitido (.' + extension_(nombre) + '). Admitidos: ' + EXTENSIONES_PERMITIDAS.join(', ') + '.' });
  }
  if (!(tamano > 0) || tamano !== Math.floor(tamano)) return json({ ok: false, error: 'Tamaño no válido.' });
  if (tamano > MAX_SUBIDA_BYTES) return json({ ok: false, error: 'El fichero pesa ' + Math.round(tamano / 1048576) + ' MB; el máximo es ' + Math.round(MAX_SUBIDA_BYTES / 1048576) + ' MB.' });
  var mime = String(d.mime || 'application/octet-stream').slice(0, 120);

  var carpeta = carpetaMateriales_();
  var resp = UrlFetchApp.fetch(DRIVE_SUBIDA, {
    method: 'post',
    headers: cabeceraDrive_({ 'X-Upload-Content-Type': mime, 'X-Upload-Content-Length': String(tamano) }),
    contentType: 'application/json; charset=UTF-8',
    payload: JSON.stringify({ name: nombre, parents: [carpeta] }),
    muteHttpExceptions: true
  });
  if (resp.getResponseCode() !== 200) return json({ ok: false, error: errorDrive_(resp, 'Drive no ha aceptado la subida') });
  var sesionSubida = cabeceraRespuesta_(resp, 'Location');
  if (!sesionSubida) return json({ ok: false, error: 'Drive no ha devuelto la sesión de subida.' });

  var id = 'sub_' + Date.now() + '_' + Math.floor(Math.random() * 1e6);
  CacheService.getScriptCache().put(id, JSON.stringify({
    url: sesionSubida, tamano: tamano, mime: mime, nombre: nombre, offset: 0, dueno: s.e
  }), 21600);
  return json({ ok: true, subida: id, fragmento: FRAGMENTO_BYTES });
}

/**
 * Recibe un fragmento (base64 en el cuerpo) de una subida empezada. `inicio`
 * es el byte en el que empieza y tiene que coincidir con lo ya recibido: si no
 * coincide se devuelve el punto real para que el navegador retome desde ahí.
 * Con el último fragmento, Drive devuelve el fichero y se comparte con enlace.
 */
function subirFragmento(p, e) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (s.r !== 'profesor') return json({ ok: false, error: 'Sólo el profesorado puede subir materiales.' });

  var cache = CacheService.getScriptCache();
  var estado = null;
  try { estado = JSON.parse(cache.get(String(p.subida || '')) || 'null'); } catch (err) { estado = null; }
  if (!estado || estado.dueno !== s.e) return json({ ok: false, codigo: 'subida_desconocida', error: 'La subida ha caducado. Empieza de nuevo.' });

  var inicio = Number(p.inicio);
  if (inicio !== estado.offset) return json({ ok: false, codigo: 'fuera_de_orden', offset: estado.offset, error: 'Fragmento fuera de orden.' });

  var bytes;
  try { bytes = Utilities.base64Decode(String((e && e.postData && e.postData.contents) || '')); } catch (err) { bytes = []; }
  if (!bytes.length) return json({ ok: false, error: 'Fragmento vacío.' });

  var fin = inicio + bytes.length - 1;
  var ultimo = fin + 1 === estado.tamano;
  if (fin + 1 > estado.tamano) return json({ ok: false, error: 'El fragmento se sale del tamaño anunciado.' });
  // Drive exige múltiplos de 256 KiB salvo en el último
  if (!ultimo && bytes.length % 262144 !== 0) return json({ ok: false, error: 'Tamaño de fragmento no válido.' });

  var resp = UrlFetchApp.fetch(estado.url, {
    method: 'put',
    headers: { 'Content-Range': 'bytes ' + inicio + '-' + fin + '/' + estado.tamano },
    contentType: 'application/octet-stream',
    payload: bytes,
    followRedirects: false,
    muteHttpExceptions: true
  });
  var codigo = resp.getResponseCode();

  if (codigo === 308) {
    // Drive indica hasta dónde ha recibido en la cabecera Range: bytes=0-N
    var rango = cabeceraRespuesta_(resp, 'Range').match(/-(\d+)$/);
    estado.offset = rango ? Number(rango[1]) + 1 : fin + 1;
    cache.put(String(p.subida), JSON.stringify(estado), 21600);
    return json({ ok: true, completo: false, offset: estado.offset });
  }
  if (codigo === 200 || codigo === 201) {
    cache.remove(String(p.subida));
    var f = jsonDrive_(resp);
    if (!f.id) return json({ ok: false, error: 'Drive no ha devuelto el fichero subido.' });

    var compartido = true;
    var perm = UrlFetchApp.fetch(DRIVE_API + '/files/' + f.id + '/permissions?supportsAllDrives=true', {
      method: 'post',
      headers: cabeceraDrive_(),
      contentType: 'application/json; charset=UTF-8',
      payload: JSON.stringify({ type: 'anyone', role: 'reader' }),
      muteHttpExceptions: true
    });
    if (perm.getResponseCode() !== 200) compartido = false;

    return json({
      ok: true, completo: true,
      archivo: { id: f.id, nombre: f.name || estado.nombre, mime: f.mimeType || estado.mime, tamano: estado.tamano, url: enlaceArchivo_(f.id), compartido: compartido }
    });
  }
  return json({ ok: false, error: errorDrive_(resp, 'Drive ha rechazado el fragmento') });
}

/** Ficheros de la carpeta de materiales, los más recientes primero. */
function materiales(p) {
  var s = verificarSesion_(p.sesion);
  if (!s) return sesionInvalida_();
  if (s.r !== 'profesor') return json({ ok: false, error: 'Sólo el profesorado puede ver los materiales.' });

  var id = propiedad_('MATERIALES_CARPETA_ID');
  if (!id) return json({ ok: true, carpeta: '', archivos: [] });
  var q = "'" + id + "' in parents and trashed = false";
  var r = UrlFetchApp.fetch(
    DRIVE_API + '/files?q=' + encodeURIComponent(q) + '&orderBy=createdTime%20desc&pageSize=100' +
    '&fields=' + encodeURIComponent('files(id,name,mimeType,size,createdTime)') + '&supportsAllDrives=true&includeItemsFromAllDrives=true',
    { headers: cabeceraDrive_(), muteHttpExceptions: true }
  );
  if (r.getResponseCode() !== 200) return json({ ok: false, error: errorDrive_(r, 'No se han podido listar los materiales') });
  var archivos = (jsonDrive_(r).files || []).map(function (f) {
    return { id: f.id, nombre: f.name, mime: f.mimeType, tamano: Number(f.size) || 0, creado: f.createdTime, url: enlaceArchivo_(f.id) };
  });
  return json({ ok: true, carpeta: 'https://drive.google.com/drive/folders/' + id, archivos: archivos });
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
