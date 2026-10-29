// ==========================================================================
// Actualizaciones de la plataforma
//
// Alimentan el grupo «Actualizaciones» de las Historias. La más reciente va
// primero. Para anunciar un arreglo o una mejora, se añade una entrada arriba
// con un id nuevo (el id es lo que apaga el anillo cuando ya se ha visto).
// ==========================================================================

export interface ActualizacionPlataforma {
  id: string;
  version: string;
  fecha: string;
  titulo: string;
  texto: string;
  /** Captura a 1080×1920 bajo public/ (p. ej. historias/…jpg) */
  imagen?: string;
  /** Botón opcional de la historia */
  enlace?: { label: string; href: string };
}

export const CORREO_PROFESOR = 'juandiaz@go.ugr.es';

const correoTests = {
  label: `Escribir a ${CORREO_PROFESOR}`,
  href: `mailto:${CORREO_PROFESOR}?subject=${encodeURIComponent('QFDOS · No se graba la nota del test')}`
};

export const ACTUALIZACIONES: ActualizacionPlataforma[] = [
  {
    id: 'act-3.70.0-gemini-exploracion',
    version: 'v3.70.0',
    fecha: '29 Octubre 2026',
    titulo: 'Nueva exploración inmersiva con Gemini en Enlaces',
    texto: 'En cuanto a los Enlaces de interés, hemos añadido una exploración inmersiva preparada con Gemini para repasar el contenido de forma interactiva. La encontrarás destacada al principio de la sección.',
    enlace: { label: 'Abrir la exploración', href: 'https://gemini.google.com/immersive-explorations/cd2bffbf-6342-5d3c-b010-9ad5672cda84' }
  },
  {
    id: 'act-3.69.0-tema5-revision',
    version: 'v3.69.0',
    fecha: '28 Octubre 2026',
    titulo: 'El Tema 5 ya está abierto, en revisión',
    texto: 'Respecto al Tema 5 (Sistema GABAérgico), ya puedes entrar en él. Mientras está en revisión verás solo los materiales que ya se han subido, que irán apareciendo según estén listos, y la baraja de 35 cartas GABAérgicas. El test y las flashcards se abrirán cuando se publique el tema.'
  },
  {
    id: 'act-3.68.0-pildoras-audio',
    version: 'v3.68.0',
    fecha: '22 Octubre 2026',
    titulo: 'Los podcasts de audio, cada uno con su tema',
    texto: 'Respecto al reproductor de los podcasts de audio, ahora muestra el título y los contenidos clave del tema que estás escuchando; antes salían siempre los del Tema 1. Además ya puedes escuchar directamente en la web los podcasts de audio de los Temas 3 y 4, de unos nueve minutos cada uno.'
  },
  {
    id: 'act-3.63.0-revision-test',
    version: 'v3.63.0',
    fecha: '19 Octubre 2026',
    titulo: 'Al entregar el test, revisa tus aciertos y fallos',
    texto: 'Al entregar verás qué preguntas has acertado, cuáles has fallado o dejado en blanco y la respuesta correcta, con su explicación. Puedes repetir el test cuantas veces quieras: es una herramienta para preparar el examen.',
    imagen: 'historias/actualizacion-revision-test.jpg'
  },
  {
    id: 'act-3.63.1-entregar-movil',
    version: 'v3.63.1',
    fecha: '19 Octubre 2026',
    titulo: 'El botón «Entregar Examen» ya se ve entero en el móvil',
    texto: 'En el móvil, «Anterior» y «Siguiente» quedan en una fila y «Entregar Examen» va debajo, a todo el ancho, con el número de preguntas respondidas a la vista.'
  },
  {
    id: 'act-3.60.1-notas-tests',
    version: 'v3.60.1',
    fecha: '15 Octubre 2026',
    titulo: 'Las notas de los tests ya se graban',
    texto: 'Hemos solucionado el fallo que impedía registrar algunas notas de los tests de los Temas 2 y 3. Si alguno no se te grabó, recarga la página (Ctrl+F5 en el ordenador; en el móvil, cierra y vuelve a abrir la web) y repite el test. Si aun así no se graba, escríbeme indicando el tema, el modelo y el mensaje que te aparece al terminar.',
    enlace: correoTests
  },
  {
    id: 'act-3.60.1-cola-envios',
    version: 'v3.60.1',
    fecha: '15 Octubre 2026',
    titulo: 'Si falla el envío, la nota no se pierde',
    texto: 'Respecto a los envíos, si al terminar un test falla la conexión o tu sesión ha caducado, la nota queda guardada en tu navegador con la etiqueta «Pendiente de registrar» y se envía sola en cuanto es posible, sin duplicarse. Si el servidor está saturado porque entrega toda la clase a la vez, lo reintenta solo.'
  },
  {
    id: 'act-3.58.2-movil',
    version: 'v3.58.2',
    fecha: '15 Octubre 2026',
    titulo: 'Arreglos en el móvil y la tableta',
    texto: 'En cuanto al móvil, el reverso de las cartas y de las flashcards ya no sale en espejo en el iPad, las Historias se pasan con flechas y deslizando a los lados, y Android ya no agranda el texto por su cuenta.'
  },
  {
    id: 'act-3.55.0-recarga',
    version: 'v3.55.0',
    fecha: '14 Octubre 2026',
    titulo: 'La web se actualiza sola',
    texto: 'Cuando publicamos una versión nueva, la plataforma se recarga sola a los pocos segundos para que todos trabajemos con la misma. Si estás haciendo un examen, espera a que lo entregues. La versión que tienes aparece al pie de la página.'
  }
];
