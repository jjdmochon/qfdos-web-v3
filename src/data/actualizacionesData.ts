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
