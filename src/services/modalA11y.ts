// ==========================================================================
// Comportamiento común de todos los modales
//
// Los 14 modales de la plataforma comparten el mismo esqueleto
// (`.modal-overlay > .modal-container`, con `onClick={onClose}` en el fondo),
// pero ninguno se anunciaba como diálogo, ni atrapaba el foco, ni se cerraba
// con Escape, ni devolvía el foco al botón que lo abrió. En lugar de repetir
// esa lógica en cada componente, este módulo observa el DOM y se la da a
// cualquier `.modal-overlay` que aparezca:
//
//   · role="dialog", aria-modal y aria-labelledby (primer titular)
//   · nombre accesible «Cerrar» en los botones que solo llevan el icono X
//   · foco inicial dentro del modal y Tab/Mayús+Tab atrapados en él
//   · Escape cierra el modal superior (mismo camino que un clic en el fondo,
//     así respeta las guardas que tenga cada modal, p. ej. un examen en curso)
//   · al cerrarse, el foco vuelve al control que lo abrió
//   · animación de salida: una copia congelada se desvanece 160 ms
// ==========================================================================

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), ' +
  'textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

interface Abierto {
  overlay: HTMLElement;
  trigger: HTMLElement | null;
}

const abiertos: Abierto[] = [];
let contador = 0;
// Último control enfocado fuera de cualquier modal: cuando el modal monta su
// propio autoFocus, activeElement ya está dentro y no sirve como disparador.
let ultimoFocoFuera: HTMLElement | null = null;

const reduceMotion = () =>
  typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function visibles(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    el => el.offsetParent !== null || el.getClientRects().length > 0
  );
}

function contenedor(overlay: HTMLElement): HTMLElement {
  return (overlay.querySelector<HTMLElement>('.modal-container') ?? overlay.firstElementChild ?? overlay) as HTMLElement;
}

function etiquetar(overlay: HTMLElement) {
  const box = contenedor(overlay);
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  if (!box.hasAttribute('aria-labelledby') && !box.hasAttribute('aria-label')) {
    const titulo = box.querySelector<HTMLElement>('h1, h2, h3, h4');
    if (titulo) {
      if (!titulo.id) titulo.id = `modal-titulo-${++contador}`;
      box.setAttribute('aria-labelledby', titulo.id);
    }
  }
  box.querySelectorAll<HTMLButtonElement>('button').forEach(b => {
    if (b.getAttribute('aria-label') || b.textContent?.trim()) return;
    if (b.querySelector('svg.lucide-x, svg.lucide-circle-x, svg.lucide-x-circle')) {
      b.setAttribute('aria-label', 'Cerrar');
      if (!b.title) b.title = 'Cerrar (Esc)';
    }
  });
}

function abrir(overlay: HTMLElement) {
  if (overlay.classList.contains('modal-exit') || abiertos.some(a => a.overlay === overlay)) return;
  const activo = document.activeElement as HTMLElement | null;
  const fuera = activo && activo !== document.body && !activo.closest('.modal-overlay') ? activo : ultimoFocoFuera;
  abiertos.push({ overlay, trigger: fuera });
  etiquetar(overlay);
  // Tras el primer render: si el propio modal no ha colocado el foco (autoFocus), se coloca aquí
  requestAnimationFrame(() => {
    if (!overlay.isConnected) return;
    const box = contenedor(overlay);
    if (box.contains(document.activeElement)) return;
    const primero = visibles(box).find(el => !el.matches('[aria-label="Cerrar"]')) ?? visibles(box)[0];
    (primero ?? box).focus({ preventScroll: true });
    if (!primero) box.setAttribute('tabindex', '-1');
  });
  // Los modales montan contenido en diferido (pestañas, datos): se vuelve a etiquetar
  new MutationObserver((_, obs) => {
    if (!overlay.isConnected) return obs.disconnect();
    etiquetar(overlay);
  }).observe(overlay, { childList: true, subtree: true });
}

function cerrar(overlay: HTMLElement) {
  const i = abiertos.findIndex(a => a.overlay === overlay);
  if (i === -1) return;
  const [{ trigger }] = abiertos.splice(i, 1);
  if (!reduceMotion()) animarSalida(overlay);
  requestAnimationFrame(() => {
    // Solo si nadie más ha movido el foco (p. ej. otro modal que se abre)
    const a = document.activeElement;
    if (trigger?.isConnected && (!a || a === document.body)) trigger.focus({ preventScroll: true });
  });
}

function animarSalida(overlay: HTMLElement) {
  const copia = overlay.cloneNode(true) as HTMLElement;
  copia.querySelectorAll('iframe, video, audio, model-viewer, canvas').forEach(n => n.remove());
  copia.classList.add('modal-exit');
  copia.setAttribute('aria-hidden', 'true');
  copia.removeAttribute('id');
  copia.querySelectorAll('[id]').forEach(n => n.removeAttribute('id'));
  document.body.appendChild(copia);
  window.setTimeout(() => copia.remove(), 170);
}

function recorrer(node: Node, fn: (el: HTMLElement) => void) {
  if (!(node instanceof HTMLElement)) return;
  if (node.classList.contains('modal-exit')) return;
  if (node.classList.contains('modal-overlay')) fn(node);
  node.querySelectorAll<HTMLElement>('.modal-overlay').forEach(fn);
}

function onKeyDown(e: KeyboardEvent) {
  const top = abiertos[abiertos.length - 1];
  if (!top || !top.overlay.isConnected) return;
  if (e.key === 'Escape' && !e.defaultPrevented) {
    e.preventDefault();
    // Mismo camino que el clic en el fondo: el handler de React ve target === currentTarget
    top.overlay.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    return;
  }
  if (e.key !== 'Tab') return;
  const box = contenedor(top.overlay);
  const lista = visibles(box);
  if (lista.length === 0) {
    e.preventDefault();
    box.focus();
    return;
  }
  const primero = lista[0];
  const ultimo = lista[lista.length - 1];
  const actual = document.activeElement as HTMLElement | null;
  if (!actual || !box.contains(actual)) {
    e.preventDefault();
    (e.shiftKey ? ultimo : primero).focus();
  } else if (e.shiftKey && actual === primero) {
    e.preventDefault();
    ultimo.focus();
  } else if (!e.shiftKey && actual === ultimo) {
    e.preventDefault();
    primero.focus();
  }
}

let instalado = false;

export function instalarModalA11y(): void {
  if (instalado || typeof document === 'undefined') return;
  instalado = true;
  new MutationObserver(muts => {
    for (const m of muts) {
      m.removedNodes.forEach(n => recorrer(n, cerrar));
      m.addedNodes.forEach(n => recorrer(n, abrir));
    }
  }).observe(document.body, { childList: true, subtree: true });
  document.querySelectorAll<HTMLElement>('.modal-overlay').forEach(abrir);
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('focusin', e => {
    const t = e.target as HTMLElement | null;
    if (t && t !== document.body && !t.closest('.modal-overlay')) ultimoFocoFuera = t;
  });
  // Un clic también cuenta como disparador aunque el botón no reciba foco (Safari)
  document.addEventListener('pointerdown', e => {
    const t = (e.target as HTMLElement | null)?.closest<HTMLElement>('button, a[href], [role="button"], [tabindex]');
    if (t && !t.closest('.modal-overlay')) ultimoFocoFuera = t;
  }, true);
}

/** ¿Hay algún modal abierto? (para no apilar atajos como Ctrl+K encima) */
export function hayModalAbierto(): boolean {
  return abiertos.some(a => a.overlay.isConnected);
}
