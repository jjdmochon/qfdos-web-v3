---
version: 3.1
name: QFDOS Structural Affinity Identity (web v3)
description: >
  Sistema de diseño de la plataforma de Química Farmacéutica II (Grupo E, UGR).
  Este documento manda sobre el código: los tokens de `:root` en
  `src/index.css` son su traducción literal. Si un valor no encaja, se corrige
  aquí primero y después en el CSS, nunca al revés.
---

# QFDOS web v3 · Sistema de diseño

Identidad de atlas de química estructural: navy como ancla, teal de
continuidad con QFUNO y un único acento brillante, la menta. Neutros fríos,
nunca gris puro.

**Fuente de verdad:** `src/index.css` (`:root` y sus dos bloques de modo oscuro).
`App.css` solo contiene componentes; no redefine tokens, botones ni animaciones.

---

## 1. Color

### 1.1 Rellenos de marca (fondos, bordes, iconos; nunca texto pequeño)

| Token | Claro | Oscuro | Uso |
|---|---|---|---|
| `--primary` / `--navy` | #1e3a8a | igual | Botón primario, borde superior de tarjeta |
| `--primary-dark` | #172554 | igual | Hover del primario, bloques técnicos |
| `--secondary-dark` | #0f766e | igual | Relleno del botón secundario (5,5:1 con blanco) |
| `--secondary` / `--teal` | #0d9488 | igual | Bordes, barras, iconos. **No** como relleno con texto blanco (3,7:1) |
| `--tertiary` / `--mint` | #2dd4bf | igual | Acento brillante. Solo sobre fondo oscuro |

### 1.2 Tintas (lo único que puede ir como color de texto)

| Token | Claro | Oscuro |
|---|---|---|
| `--text-main` | #000000 | #f1f5f9 |
| `--text-title` | #1e3a8a | #e2e8f0 |
| `--text-muted` | #475569 | #94a3b8 |
| `--navy-ink` | #1e3a8a | #93c5fd |
| `--teal-ink` | #115e59 | #5eead4 |
| `--ok-ink` | #047857 | #6ee7b7 |
| `--warn-ink` | #b45309 | #fbbf24 |
| `--bad-ink` | #b91c1c | #fca5a5 |
| `--info-ink` | #1d4ed8 | #93c5fd |
| `--purple-ink` | #6d28d9 | #c4b5fd |

Regla: **un color de relleno (`--navy`, `--teal`, `--accent-*`) nunca va como
`color:`**. En oscuro cae por debajo de 2:1. Para texto se usa siempre la tinta
equivalente.

### 1.3 Fondos semánticos

`--ok-bg`, `--warn-bg`, `--bad-bg`, `--info-bg`, `--purple-bg` (10 % del acento
en claro, 16 % en oscuro) con su `--*-border` al 25–30 %. Cada fondo va con su
tinta: `--ok-bg` + `--ok-ink`, etc. Los hex pálidos fijos (#fef3c7, #ecfdf5…)
están prohibidos porque no tienen versión oscura.

### 1.4 Superficies

| Token | Claro | Oscuro |
|---|---|---|
| `--neutral-bg` (página) | #f8fafc | #070e18 |
| `--surface` (tarjeta) | #ffffff | #0e1a2b |
| `--surface-raised` | #f1f5f9 | #142339 |
| `--surface-alt` | #e9eff6 | #1a2d47 |

`.panel-claro` fuerza la versión clara de todas las tintas dentro de un panel
de fondo blanco fijo (lienzos RDKit, fichas imprimibles).

### 1.5 Contraste mínimo

Texto normal 4,5:1 y texto grande o iconos 3:1, en **los dos temas**. Todo par
nuevo se comprueba en claro y en oscuro antes de publicarse.

---

## 2. Tipografía

Montserrat para toda la interfaz; Roboto Mono solo para datos (SMILES, Kd, Ki,
pKa, LogP, notas).

| Token | Tamaño | Uso |
|---|---|---|
| `--fs-2xs` | 0,6875rem (11 px) | Mínimo absoluto: eyebrows y badges |
| `--fs-xs` | 0,75rem | Metadatos |
| `--fs-sm` | 0,8125rem | Interfaz densa, chips |
| `--fs-md` | 0,875rem | Botones e inputs |
| `--fs-base` | 1rem | Cuerpo |
| `--fs-lg` | 1,125rem | h4, título de tarjeta |
| `--fs-xl` | 1,375rem | h3 |
| `--fs-2xl` | 1,75rem | Título de página (`h1.page-title`) |
| `--fs-display` | clamp(1,9rem, 7vw + 0,6rem, 4rem) | Hero |

Pesos: 800 títulos, 700 etiquetas, 600 interfaz, 400 cuerpo.

- **Un único `h1` por página**: el hero en Inicio y Prácticas, `.page-title` en
  el resto. Dentro de cada sección, h2 → h3 → h4 sin saltos.
- `html { font-size: 100% }`: se respeta el tamaño de letra que el usuario
  tenga configurado. La maqueta debe aguantar el texto al 200 %.

---

## 3. Espaciado, radios y elevación

**Espaciado** (múltiplos de 4): `--space-1` 4 · `--space-2` 8 · `--space-3` 12 ·
`--space-4` 16 · `--space-5` 20 · `--space-6` 24 · `--space-8` 32 · `--space-12` 48.
2 y 6 px solo dentro de chips.

**Radios:** `--radius-sm` 4 (badges) · `--radius-md` 8 (botones, inputs) ·
`--radius-lg` 12 (tarjetas) · `--radius-xl` 16 (modales) · `--radius-full`
(chips, píldoras). No se usan 3, 6, 10 ni 20 px.

**Sombras:** `--shadow-sm` (reposo), `--shadow-md` (tarjeta), `--shadow-lg`
(modal), `--shadow-hover`, `--shadow-glass`, y `--ring` para el foco.

---

## 4. Componentes

### 4.1 Botones (`.btn` + variante)

| Variante | Cuándo |
|---|---|
| `.btn-primary` (= `.btn-navy`) | **La acción principal de la página. Una por pantalla.** |
| `.btn-secondary` (= `.btn-teal`) | Acción secundaria destacada |
| `.btn-outline` | Acciones de apoyo |
| `.btn-ghost` | Acciones terciarias, iconos |
| `.btn-mint` | Solo sobre fondo oscuro (hero) |
| `.btn-danger` | Acciones destructivas |

Tamaños: `.btn-xs`, `.btn-sm`, (base), `.btn-lg`; `.btn-icon` para solo icono,
siempre con `aria-label`.

Cada botón tiene **cinco estados**, todos definidos en `index.css`: reposo, `:hover`,
`:active` (pulsado: baja 1 px y escala 0,98), `:focus-visible` (anillo teal) y
`:disabled` / `aria-disabled` (48 % de opacidad, sin puntero). Mientras una
petición está en vuelo el botón va `disabled` + `aria-busy` y cambia su texto
(«Enviando…»). No se pinta un botón con `style={{ background… }}`.

### 4.2 Chips de filtro (`.chip`)

Un filtro no es una acción principal: nunca `btn-primary`. El seleccionado se
marca con `aria-pressed="true"`. No se ofrece un filtro con 0 resultados.

### 4.3 Tarjetas (`.qfdos-card` + `card-navy | card-teal | card-mint | card-amber`)

Superficie, borde fino, `--radius-lg`, borde superior de 4 px en el color de la
variante. Hover: sube 3 px y toma `--shadow-hover`. Única definición, en `App.css`.

### 4.4 Formularios

`.form-input`, `.form-select`, `.form-textarea`, con su `<label htmlFor>`
(`.form-label`). Un campo con error lleva `aria-invalid="true"` y
`aria-describedby` apuntando a un `.field-error` justo debajo. **No se usa
`alert()` para validar.**

### 4.5 Mensajes de estado (`.status-msg`)

`--info` (enviando), `--ok` (hecho), `--warn` (enviado sin confirmar, datos
locales), `--bad` (error). Siempre con `role="status"` o `role="alert"` y, si
hay error, un botón «Reintentar» dentro. Nunca se afirma que algo «se ha
registrado» si el servidor no lo ha confirmado.

### 4.6 Carga, vacío y error de una sección (`.state-panel`)

Cada lista o bloque que depende de red tiene tres pantallas: carga (esqueleto
`.chem-skeleton` o spinner `.spin`), vacío (qué significa y cómo salir) y error
(`.state-panel--bad` + Reintentar). Un `catch {}` sin interfaz no se admite.

### 4.7 Modales

Esqueleto único: `.modal-overlay > .modal-container`, con `onClick={onClose}` en
el fondo. `src/services/modalA11y.ts` da a todos, sin código por componente:
`role="dialog"`, `aria-modal`, `aria-labelledby`, foco inicial dentro, Tab
atrapado, Escape para cerrar, foco devuelto al disparador, bloqueo del scroll
de fondo y animación de entrada y salida. Un modal con trabajo sin guardar
(examen en curso) pregunta antes de cerrarse por el fondo o con Escape.

---

## 5. Movimiento

`--transition-fast` 150 ms, `--transition-spring` 200 ms con `--ease-out`.
Modales: `fadeIn` + `slideUp` al abrir, `fadeOut` + `slideDownOut` (160 ms) al
cerrar. Desplegables: `dropIn`. Cambio de pestaña: `.tab-panel-enter` (180 ms).
Con `prefers-reduced-motion` todo se reduce a 0,01 ms.

---

## 6. Móvil

- Nada desborda en horizontal a 320 px. Las rejillas usan
  `minmax(min(Npx, 100%), 1fr)` y las filas título + badge llevan `flex-wrap`.
- **Navegación móvil (≤ 768 px):** cabecera de una fila (marca, lupa, cuenta) y
  barra inferior fija con Inicio, Temario, Prácticas, Notas y **Menú**; «Menú»
  abre una hoja con todas las secciones y herramientas.
- Objetivos táctiles de 44 × 44 px como mínimo (`--tap-min`, regla `pointer: coarse`).
- Alturas de modal en `dvh`, no `vh`.

---

## 7. Contenido

- La portada (login) y el Inicio dicen en una línea qué es la plataforma:
  «Temas, prácticas, test de repaso y calificaciones de Química Farmacéutica II
  (Grupo E, UGR), todo en un sitio».
- Cada ruta fija su `document.title` y su `meta description` (`PAGE_META` en `App.tsx`).
- Sin texto de relleno ni datos de ejemplo visibles para el alumnado; las
  demostraciones quedan detrás del rol de profesor.
