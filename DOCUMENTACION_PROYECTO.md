## 🏗️ **ESTRUCTURA GENERAL DEL PROYECTO**

```
vite-project/
├── 📁 public/              # Archivos estáticos (Lo puedo borrar ya que no lo uso)
├── 📁 src/                # Código fuente principal
│   ├── 📁 components/     # Componentes reutilizables
│   ├── 📁 panels/        # Paneles principales de la app
│   ├── 📁 ui/            # Componentes de interfaz
│   ├── 📁 assets/        # Recursos (imágenes, etc. Sin utilizar en este proyecto)
│   ├── App.jsx           # Componente principal
│   ├── App.css           # Estilos globales
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # CSS base
├── package.json          # Dependencias y scripts
├── vite.config.js        # Configuración de Vite
└── index.html           # Archivo HTML base
```

---

## 🎯 **TECNOLOGÍAS UTILIZADAS**

### **Frontend Framework:**
- **React 19.1.0** - Biblioteca para crear interfaces de usuario
- **Vite 7.0.4** - Build tool súper rápido para desarrollo

### **Estilos:**
- **CSS Modules** - CSS con alcance local para evitar conflictos
- **CSS Puro** - Sin frameworks como Bootstrap o Tailwind

### **Herramientas de Desarrollo:**
- **ESLint** - Linter para mantener código limpio
- **React Icons** - Librería de iconos (aunque usamos emojis)

---

## 📁 **EXPLICACIÓN DETALLADA DE CARPETAS**

### **📁 `src/components/`** - Componentes Globales
Contiene componentes que se usan en múltiples lugares de la aplicación.

**🎛️ `Sidebar.jsx`** - Barra lateral principal
- **Propósito**: Navegación entre secciones (Chats, Estados, Llamadas)
- **Estado Local**: `isExpanded` para mostrar/ocultar menú
- **Props**: `onSectionChange` y `currentSection`
- **Características**: Menú hamburguesa expandible con iconos emoji

### **📁 `src/panels/`** - Paneles Principales
Contiene los paneles que forman las vistas principales de la aplicación.

**📋 `LeftPanel.jsx`** - Panel izquierdo de contactos
- **Propósito**: Mostrar lista de conversaciones y búsqueda
- **Estado Local**: `searchTerm` para filtrar contactos
- **Props**: `onSelectContact`, `conversations`
- **Funcionalidades**: 
  - Filtrado de contactos por nombre o último mensaje
  - Header con perfil de usuario
  - Lista scrolleable de conversaciones

**💬 `ConversationPanel.jsx`** - Panel principal de chat
- **Propósito**: Mostrar conversación activa con mensajes y composer
- **Estados Locales**:
  - `searchTerm`: Texto de búsqueda en el chat
  - `isSearchExpanded`: Si la búsqueda está expandida
  - `currentMatchIndex`: Índice del resultado actual
  - `totalMatches`: Total de coincidencias
- **Funcionalidades**:
  - Búsqueda de mensajes tipo WhatsApp ("X de Y")
  - Navegación entre resultados con flechas
  - Header con info del contacto
  - Integración con MessageList y MessageComposer

### **📁 `src/ui/`** - Componentes de Interfaz
Contiene componentes de UI reutilizables y que son específicos.

**✍️ `MessageComposer.jsx`** - Compositor de mensajes
- **Propósito**: Input para escribir y enviar mensajes
- **Estado Local**: `message` para el texto del input
- **Props**: `onSendMessage`, `conversationId`
- **useEffect**: Limpia el input cuando cambia la conversación
- **Características**:
  - Envío con Enter (Shift+Enter = nueva línea)
  - Botones emoji y adjuntar (Son solo decorativos)
  - Botón micrófono/enviar dinámico (Switch entre iconos al escribir)

**📜 `MessageList.jsx`** - Lista de mensajes
- **Propósito**: Mostrar lista de mensajes con scroll y búsqueda
- **Props**: `messages`, `searchTerm`, `currentMatchIndex`
- **useRef**: Para referencias de DOM (scroll automático)
- **Funciones**:
  - `highlightText`: Resalta texto en mensaje activo
  - `messageMatches`: Verifica coincidencias
- **useEffect**: Scroll automático al mensaje seleccionado

**👤 `UserCard.jsx`** - Tarjeta de usuario/contacto
- **Propósito**: Mostrar información de contacto/chat
- **Props**: `user`, `onClick`, `isChat`
- **Adaptable**: Se usa tanto para contactos como para chats
- **Elementos**: Avatar, nombre, estado/último mensaje, contador no leídos

**🔍 `SearchBar.jsx`** - Barra de búsqueda
- **Propósito**: Input de búsqueda reutilizable
- **Props**: `onSearch`, `placeholder`
- **Estado Local**: `searchTerm`
- **Características**: Botón clear, búsqueda en tiempo real

---

## 🏛️ **COMPONENTE PRINCIPAL: App.jsx**

**🏠 `App.jsx`** - Componente raíz de la aplicación

### **Estados Principales:**
1. **`activeConversation`** - Conversación actualmente seleccionada
2. **`conversations`** - Array de todas las conversaciones
3. **`currentSection`** - Sección activa ('chats', 'estados', 'llamadas', 'mensajes destacados', 'archivar chats', 'ajustes' y 'perfil')

### **useEffect de Inicialización:**
- Carga conversaciones de prueba al montar el componente
- Cada conversación tiene: id, name, status, lastMessage, time, unreadCount, messages

### **Funciones Principales:**

**📨 `handleSendMessage`** - Función para enviar mensajes:
1. Verifica que hay conversación activa
2. Crea nuevo mensaje con: id único, sender "You", contenido, timestamp, isOwn: true
3. Actualiza el array de conversaciones con el nuevo mensaje
4. Actualiza lastMessage y time de la conversación
5. Sincroniza activeConversation con la conversación actualizada

**👆 `handleSelectContact`** - Cambia la conversación activa

**🔄 `handleSectionChange`** - Cambia entre secciones de la app

### **Función de Renderizado Condicional:**

**🎭 `renderContent()`** - Renderizado condicional por sección:
- **'chats'**: Muestra LeftPanel + ConversationPanel (La funcionalidad completa)
- **Otras secciones**: Pantallas "Hasta acá llegué" (placeholders)

---

## 🎨 **SISTEMA DE ESTILOS CSS MODULES**

Alcance local. Cada componente tiene su archivo `.module.css`:

---

## 🔄 **FLUJO DE DATOS Y COMUNICACIÓN**

```
App.jsx (Estado Global)
├── conversations[]          # Array de todas las conversaciones
├── activeConversation       # Conversación seleccionada
└── currentSection          # Sección activa

    ↓ Props Down
    
Sidebar.jsx
├── currentSection (prop)
├── onSectionChange (callback)

LeftPanel.jsx  
├── conversations (prop)
├── onSelectContact (callback)

ConversationPanel.jsx
├── activeConversation (prop)
├── onSendMessage (callback)
    
    ↓ Props Down
    
MessageList.jsx
├── messages (prop)
├── searchTerm (prop)
├── currentMatchIndex (prop)

MessageComposer.jsx
├── onSendMessage (callback)
├── conversationId (prop) # Para limpiar input
```

### **🎯 Flujo de Eventos:**

1. **Seleccionar Chat**: 
    - User clicks en LeftPanel → `onSelectContact` → `setActiveConversation`

2. **Enviar Mensaje**: 
   - User escribe en MessageComposer → `onSendMessage` → `handleSendMessage` → Actualiza `conversations` y `activeConversation`

3. **Cambiar Sección**: 
   - User clicks en Sidebar → `onSectionChange` → `setCurrentSection` → `renderContent` cambia vista

4. **Buscar Mensajes**: 
   - User busca en ConversationPanel → Estados locales → MessageList recibe props

---

## 🚀 **CARACTERÍSTICAS AVANZADAS IMPLEMENTADAS**

### **1. Búsqueda de Mensajes Tipo WhatsApp:**
- Conteo "X de Y" en tiempo real
- Navegación con flechas ▲▼ 
- Scroll automático al mensaje
- Resaltado amarillo solo del texto coincidente

### **2. Input Inteligente:**
- Se limpia automáticamente al cambiar de chat
- Envío con Enter (Shift+Enter = nueva línea)
- Botón dinámico micrófono/enviar

### **3. Interface Responsiva:**
- CSS Flexbox para layouts
- Sidebar expandible/colapsable
- Scroll personalizado en listas

### **4. Gestión de Estado Eficiente:**
- Estado centralizado en App.jsx
- Props drilling controlado
- useEffect para efectos secundarios

---

## 📚 **CONCEPTOS DE REACT UTILIZADOS**

### **1. Hooks:**
- **useState**: Gestión de estado local
- **useEffect**: Efectos secundarios (inicialización, cleanup)
- **useRef**: Referencias a elementos DOM

### **2. Patrones:**
- **Props Drilling**: Pasar datos entre componentes
- **Callback Props**: Comunicación hijo → padre
- **Conditional Rendering**: Renderizado según estado
- **Component Composition**: Combinar componentes

### **3. Eventos:**
- **onClick**: Selección de chats/botones
- **onChange**: Inputs de búsqueda/mensajes
- **onKeyDown**: Envío con Enter
- **onSubmit**: Formularios

---

## 🏗️ **ARQUITECTURA DEL PROYECTO**

```
┌─────────────────────────────────────────┐
│                App.jsx                  │
│  (Estado Global + Lógica Principal)     │
├─────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────────────────────┐│
│  │Sidebar  │  │      Content Area       ││
│  │         │  │┌──────────┐┌───────────┐││
│  │• Chats  │  ││LeftPanel ││Conversation││
│  │• Status │  ││          ││   Panel   │││
│  │• Calls  │  ││• Search  ││           │││
│  │• Etc    │  ││• UserList││• Messages │││
│  │         │  ││          ││• Composer │││
│  └─────────┘  │└──────────┘└───────────┘││
│                └─────────────────────────┘
└─────────────────────────────────────────┘
```

---

## 🔧 **DETALLES TÉCNICOS ESPECÍFICOS**

### **Estructura de Datos de Conversaciones:**
```javascript
const conversation = {
  id: 1,                    // Identificador único
  name: "Contacto 1",         // Nombre del contacto
  status: "en línea",       // Estado del contacto
  lastMessage: "Mensaje 1",     // Último mensaje
  time: "10:30",           // Hora del último mensaje
  unreadCount: 0,          // Mensajes no leídos
  messages: [              // Array de mensajes
    {
      id: 1,               // ID del mensaje
      sender: "Contacto 1",  // Quién envió
      content: "Mensaje 1",    // Contenido
      timestamp: "10:30 AM", // Timestamp
      isOwn: false         // Si es mensaje propio
    }
  ]
}
```

### **Sistema de Búsqueda Implementado:**
1. **Input de búsqueda por filtrado de texto** con placeholder "Buscar en el chat"
2. **Conteo en tiempo real** muestra "X de Y" resultados
3. **Navegación con flechas** ▲▼ para moverse entre resultados
4. **Scroll automático** al mensaje seleccionado usando `useRef`
5. **Resaltado visual** solo del texto que coincide (color amarillo)

### **Gestión de Estado del Input:**
- El `MessageComposer` se limpia automáticamente cuando cambias de chat
- `useEffect` para cambios en `conversationId`
- No hay BUG texto persistente entre conversaciones

---












---





## 📖 **FLUJO DE APRENDIZAJE RECOMENDADO**

### **Nivel Básico:**
1. Entender la estructura de carpetas
2. Revisar `App.jsx` y sus estados
3. Analizar `UserCard.jsx` (componente simple)
4. Estudiar imports y exports

### **Nivel Intermedio:**
1. Analizar `ConversationPanel.jsx` y sus múltiples estados
2. Entender el sistema de props entre componentes
3. Revisar `MessageList.jsx` y el uso de `useRef`
4. Estudiar CSS Modules

### **Nivel Avanzado:**
1. Implementar nuevas funcionalidades
2. Optimizar renders con `useMemo`/`useCallback`
3. Agregar persistencia de datos
4. Implementar WebSockets para tiempo real

---

## 🚀 **POSIBLES MEJORAS FUTURAS**

### **Funcionalidades:**
- [ ] Envío de archivos/imágenes
- [ ] Emojis picker funcional
- [ ] Estados de mensaje (enviado/entregado/leído)
- [ ] Notificaciones
- [ ] Tema oscuro/claro

### **Técnicas:**
- [ ] Context API para estado global
- [ ] LocalStorage para persistencia
- [ ] WebSockets para tiempo real
- [ ] Lazy loading de componentes
- [ ] Tests unitarios

### **UI/UX:**
- [ ] Animaciones más fluidas
- [ ] Drag & drop para archivos
- [ ] Modo responsive móvil
- [ ] Accesibilidad (ARIA)

---

## 💡 **CONSEJOS PARA SEGUIR APRENDIENDO**

1. **Experimenta**: Modifica colores, añade campos, cambia comportamientos
2. **Lee el código**: Entiende cada línea antes de cambiar algo
3. **Usa DevTools**: Inspecciona el DOM y estados en React DevTools
4. **Practica debugging**: Agrega `console.log` para entender el flujo
5. **Documenta cambios**: Mantén comentarios en código complejo

-------------------------------------------------------------------

## Función de eliminar mensajes individuales

### ¿Cómo funciona?
- Al pasar el mouse sobre cualquier mensaje, aparece un **icono de papelera** (🗑️) al costado del mensaje.
- Al hacer clic en el icono, **solo ese mensaje se elimina** de la conversación, sin afectar los demás.
- Si el mensaje eliminado era el último de la conversación, el panel izquierdo se actualiza mostrando el nuevo último mensaje (o "Sin mensajes" si no quedan).
- El sistema usa **IDs únicos** para cada mensaje, evitando errores al eliminar.

### Detalles técnicos:
- El botón de eliminar solo es visible al hacer hover sobre el mensaje (UX tipo WhatsApp Web).
- El icono cambia de color y tamaño al pasar el mouse para dar feedback visual.
- La función `handleDeleteMessage(messageId)` en `App.jsx` filtra el mensaje por ID y actualiza tanto la conversación activa como el listado global.
- El último mensaje y la hora en el panel de conversaciones se actualizan automáticamente tras cada eliminación.

### Ejemplo de flujo:
1. El usuario pasa el mouse sobre un mensaje → aparece el icono 🗑️
2. Clic en el icono → solo ese mensaje desaparece
3. El panel izquierdo muestra el nuevo último mensaje

### Código relevante:
```jsx
// En MessageList.jsx
<button 
  className={styles.deleteButton}
  onClick={() => handleDeleteMessage(message.id)}
  title="Eliminar mensaje"
>
  🗑️
</button>

// En App.jsx
const handleDeleteMessage = (messageId) => {
  if (!activeConversation) return;
  const updatedConversations = conversations.map(conv => {
    if (conv.id === activeConversation.id) {
      const filteredMessages = conv.messages.filter(msg => msg.id !== messageId);
      const lastMessage = filteredMessages.length > 0 
        ? filteredMessages[filteredMessages.length - 1].content 
        : "Sin mensajes";
      const lastTime = filteredMessages.length > 0 
        ? filteredMessages[filteredMessages.length - 1].timestamp 
        : "";
      const updatedConv = {
        ...conv,
        messages: filteredMessages,
        lastMessage: lastMessage,
        time: lastTime
      };
      setActiveConversation(updatedConv);
      return updatedConv;
    }
    return conv;
  });
  setConversations(updatedConversations);
};
```

### UX igual a WhatsApp Web:
- El usuario puede borrar mensajes individuales, no toda la conversación.
- El último mensaje del chat se actualiza automáticamente en la barra lateral.
- El sistema es rápido, visual y seguro.

---