import type React from 'react';

/**
 * Props para que un elemento que no es <button> (tarjeta, opción de test,
 * resultado de búsqueda) se pueda alcanzar con Tab y activar con Enter o
 * Espacio, igual que con el ratón. Se esparce junto al onClick existente:
 *
 *   <div onClick={elegir} {...pulsable(elegir)}>
 */
export function pulsable(onActivate: () => void, disabled = false) {
  return {
    role: 'button' as const,
    tabIndex: disabled ? -1 : 0,
    'aria-disabled': disabled || undefined,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (disabled || e.target !== e.currentTarget) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onActivate();
      }
    }
  };
}

/** Quita tildes y pasa a minúsculas: «colinérgico» y «colinergico» coinciden. */
export function normalizarBusqueda(texto: string): string {
  return (texto || '').normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}
