# Cartas de fármacos · Tema 1 · QFDOS

Quince fármacos: agonistas directos, anticolinesterásicos, el reactivador de la enzima y los antagonistas muscarínicos y nicotínicos.

Componente de cartas coleccionables para `qfdos-web-v3`. Sin dependencias: HTML, CSS y un módulo ES.

## Contenido

```
cartas/
├── farmacos-tema01.json     Datos de los diez fármacos (índices, acción, indicación, SMILES)
├── estructuras/*.svg        Estructuras generadas con RDKit desde los SMILES del JSON
├── cartas.css               Estilos; leen los tokens del sistema QFDOS con respaldo literal
├── cartas.js                Módulo ES: montarCartas() y montarFiltros()
└── demo.html                Página de ejemplo, abrible tal cual
```

## Integración

1. Copia la carpeta `cartas/` dentro de los activos estáticos del proyecto.
2. Enlaza `tokens.css` del sistema de diseño **antes** de `cartas.css`. Sin él, las cartas usan los literales de respaldo y se ven igual, pero pierden el vínculo con el sistema: cualquier cambio de paleta dejaría de propagarse.
3. Carga las fuentes Montserrat y Roboto Mono si la página no las tiene ya.
4. Monta el componente:

```js
import { montarCartas, montarFiltros } from './cartas/cartas.js';

const api = await montarCartas(
  document.querySelector('#cartas'),
  '/cartas/farmacos-tema01.json'
);
montarFiltros(document.querySelector('#filtros'), api);
```

`montarCartas` devuelve `{ datos, filtrar(diana), cerrarTodas() }`. Los grupos son `todos`, `agonista`, `ache` (anticolinesterásicos), `antidoto` y `antagonista`.

El JSON se sirve por `fetch`, así que en desarrollo hay que abrir la página desde un servidor, no con `file://`.

## Añadir temas

Duplica el JSON como `farmacos-temaNN.json`, manteniendo el esquema de cada fármaco:

```
id, nombre, relevancia, rol, grupo, badge, clase,
formula, masa, smiles, estructura,
indices { AFI, SEL, EST, ORA, SNC, DUR },
accion, indicacion, diseno, examen
```

Un índice a `null` se dibuja como guion, sin barra. AFI mide la afinidad sobre la diana de cada fármaco, que puede ser un receptor o la propia acetilcolinesterasa.

Las estructuras se regeneran desde los SMILES con RDKit; la paleta de átomos es blanco para carbono, azul claro para nitrógeno, salmón para oxígeno y ámbar para azufre, que es la que funciona sobre el fondo navy de la carta.

## Advertencia docente

Los índices de 0 a 99 son una escala comparativa construida para el curso, no valores experimentales. Debe aparecer visible en la página que los use, como en `demo.html`. Fórmulas, masas, acciones farmacológicas e indicaciones clínicas sí son datos reales.

## Identidad

Colores, radios, sombras, tipografías y curva de movimiento salen del sistema **QFDOS Structural Affinity Identity**. Las cartas son diseño propio: no reproducen el formato de ninguna marca comercial de cromos.
