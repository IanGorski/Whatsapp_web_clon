/**
 * Test Helpers y Utilities para WhatsApp Clone
 * Funciones auxiliares para facilitar el testing de componentes
 */

/**
 * Crea un mock de conversación para testing
 * @param {Object} overrides - Propiedades personalizadas
 * @returns {Object} Conversación mock
 */
export const createMockConversation = (overrides = {}) => {
  return {
    id: 1,
    name: "Test User",
    avatar: "https://example.com/avatar.jpg",
    lastMessage: "Test message",
    time: "10:30",
    isUnread: false,
    messages: [
    {
        id: 1,
        sender: "Test User",
        content: "Hello World",
        timestamp: "10:30",
        isOwn: false,
        isRead: true,
    },
    ],
    ...overrides,
  };
};

/**
 * Crea un mock de mensaje para testing
 * @param {Object} overrides - Propiedades personalizadas
 * @returns {Object} Mensaje mock
 */
export const createMockMessage = (overrides = {}) => {
  return {
    id: Date.now(),
    sender: "Test User",
    content: "Test message content",
    timestamp: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    isOwn: false,
    isRead: true,
    ...overrides,
  };
};

/**
 * Simula un evento táctil
 * @param {string} type - Tipo de evento (touchstart, touchend, touchmove)
 * @param {Object} coords - Coordenadas {x, y}
 * @returns {Object} Evento mock
 */
export const createTouchEvent = (type, coords = { x: 0, y: 0 }) => {
  const mockFn = () => {};
  return {
    type,
    preventDefault: mockFn,
    stopPropagation: mockFn,
    touches: [
      {
        clientX: coords.x,
        clientY: coords.y,
      },
    ],
  };
};

/**
 * Simula un evento de contexto
 * @param {Object} coords - Coordenadas {x, y}
 * @returns {Object} Evento mock
 */
export const createContextMenuEvent = (coords = { x: 0, y: 0 }) => {
  const mockFn = () => {};
  return {
    type: "contextmenu",
    preventDefault: mockFn,
    stopPropagation: mockFn,
    clientX: coords.x,
    clientY: coords.y,
  };
};

/**
 * Espera un tiempo determinado (para tests asíncronos)
 * @param {number} ms - Milisegundos a esperar
 * @returns {Promise}
 */
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Valida la estructura de una conversación
 * @param {Object} conversation - Conversación a validar
 * @returns {boolean}
 */
export const isValidConversation = (conversation) => {
  return (
    conversation &&
    typeof conversation.id === "number" &&
    typeof conversation.name === "string" &&
    Array.isArray(conversation.messages)
  );
};

/**
 * Valida la estructura de un mensaje
 * @param {Object} message - Mensaje a validar
 * @returns {boolean}
 */
export const isValidMessage = (message) => {
  return (
    message &&
    typeof message.id === "number" &&
    typeof message.content === "string" &&
    typeof message.timestamp === "string" &&
    typeof message.isOwn === "boolean"
  );
};
