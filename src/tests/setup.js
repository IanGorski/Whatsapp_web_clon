/**
 * Configuración global para tests con Vitest
 * Este archivo se ejecuta antes de cada suite de tests
 */

// Agregar aquí cualquier configuración global necesaria
// Por ejemplo: mocks de localStorage, fetch, etc.

// Mock de localStorage si es necesario
globalThis.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
  clear: () => {},
};

// Mock de window.matchMedia para tests de responsive
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
