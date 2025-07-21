# Documentación de Clases CSS y su Función

A continuación se listan las principales clases CSS de cada archivo del proyecto, junto a una breve descripción de su función.

---

## Sidebar.module.css
- `.sidebar`: Contenedor lateral fijo de navegación.
- `.sidebar.expanded`: Sidebar expandida (ancho mayor).
- `.hamburgerBtn`: Botón hamburguesa para abrir/cerrar menú.
- `.menuItems`: Contenedor de los ítems del menú.
- `.menuItem`: Botón de cada ítem del menú.
- `.menuItem.active`: Ítem activo, fondo verde.
- `.menuIcon`: Icono de cada ítem.
- `.menuLabel`: Texto del ítem (visible solo en expandido).

---

## LeftPanel.module.css
- `.leftPanel`: Panel izquierdo, lista de chats/contactos.
- `.header`: Cabecera del panel (usuario, acciones).
- `.userProfile`: Contenedor de perfil de usuario.
- `.headerActions`: Acciones rápidas (botones).
- `.actionButton`: Botón de acción en cabecera.
- `.searchContainer`: Contenedor de la barra de búsqueda.
- `.contactsList`: Lista de contactos/chats.
- `.emptyState`: Mensaje cuando no hay chats.

---

## ConversationPanel.module.css
- `.conversationPanel`: Panel principal de conversación.
- `.conversationHeader`: Cabecera de la conversación.
- `.contactInfo`: Info del contacto (avatar, nombre).
- `.avatar`: Avatar del contacto.
- `.contactDetails`: Detalles del contacto.
- `.status`: Estado del contacto.
- `.headerActions`: Acciones rápidas en cabecera.
- `.actionButton`: Botón de acción.
- `.emptyState`: Mensaje de conversación vacía.
- `.searchDropdown`: Dropdown de búsqueda.
- `.searchContainer`: Contenedor de búsqueda.

---

## UserCard.module.css
- `.userCard`: Tarjeta de usuario/contacto.
- `.avatar`: Avatar circular del usuario.
- `.userInfo`: Contenedor de info del usuario.
- `.topRow`: Fila superior (nombre, hora).
- `.time`: Hora del último mensaje.
- `.bottomRow`: Fila inferior (mensaje, badge).
- `.lastMessage`: Último mensaje o estado.
- `.unreadBadge`: Badge de mensajes no leídos.

---

## SearchBar.module.css
- `.searchBar`: Contenedor de la barra de búsqueda.
- `.searchInput`: Input de búsqueda.
- `.clearButton`: Botón para limpiar búsqueda.

---

## MessageList.module.css
- `.messageList`: Contenedor de la lista de mensajes.
- `.messageBubble`: Burbuja de mensaje.
- `.messageContent`: Texto del mensaje.
- `.messageTime`: Hora del mensaje.
- `.sentMessage`: Mensaje enviado.
- `.receivedMessage`: Mensaje recibido.
- `.deleteButton`: Botón para borrar mensaje.
- `.loadingMessage`, `.noMessages`: Mensajes de estado.
- `.emptyState`: Estado vacío.

---

## MessageComposer.module.css
- `.messageComposer`: Contenedor del input de mensaje.
- `.leftButtons`: Botones a la izquierda del input.
- `.inputContainer`: Contenedor del input.
- `.messageInput`: Input de texto para mensaje.
- `.sendButton`: Botón para enviar mensaje.
- `.attachButton`, `.emojiButton`: Botones de adjuntar/emoji.

---