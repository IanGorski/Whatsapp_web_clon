[Ver proyecto en vivo](https://whatsapp-web-clon.vercel.app) - 

## 📋 Descripción del Desafío

Este proyecto fue desarrollado como trabajo final del curso de Frontend UTN, con el objetivo de crear una aplicación web que replique la interfaz y funcionalidades básicas de WhatsApp WEB. El desafío principal fue implementar una arquitectura de componentes escalable y responsiva que funcione correctamente desde dispositivos móviles hasta pantallas de escritorio.

## 🛠️ Tecnologías y Librerías Utilizadas

- **React 19.1.0** - Framework principal de JavaScript
- **Vite 7.0.4** - Herramienta de build y desarrollo
- **React Router DOM 6.x** - Enrutamiento y navegación SPA
- **React Icons 5.5.0** - Biblioteca de iconos
- **CSS Modules** - Estilos modulares y encapsulados
- **ESLint** - Linting y calidad de código

## ✨ Características Implementadas

### 🏗️ Arquitectura
- **Componentes reutilizables** con separación clara de responsabilidades
- **Context API** para manejo de estado global
- **React Router** con navegación y parámetros de URL
- **CSS Modules** para estilos encapsulados y mantenibles

### 💬 Funcionalidades de Chat
- Lista de conversaciones con búsqueda en tiempo real
- Interfaz de chat con envío de mensajes
- Búsqueda dentro de conversaciones con navegación por resultados
- Eliminación de mensajes con confirmación
- Estados de mensajes (enviado, leído)

### 📱 Diseño Responsivo
- **Breakpoints específicos**: 320px, 480px, 768px, 2000px+
- Adaptación automática de la interfaz según el dispositivo
- Sidebar expandible/colapsable
- Navegación optimizada para móviles

### 🎨 Interfaz de Usuario
- Diseño fiel al WhatsApp original
- Animaciones suaves y transiciones CSS
- Tema claro con contraste accesible
- Componentes interactivos con feedback visual

## 🗂️ Estructura del Proyecto

```
src/
├── components/          # Componentes globales reutilizables
│   └── Sidebar.jsx     # Navegación principal
├── context/            # Context API para estado global
│   └── AppContext.jsx  # Proveedor de estado de la aplicación
├── pages/              # Páginas principales con rutas
│   ├── ChatPage.jsx    # Página principal de chats
│   ├── ConversationPage.jsx  # Chat específico (/chat/:id)
│   ├── SettingsPage.jsx      # Configuración de la app
│   ├── StatusPage.jsx        # Estados de WhatsApp
│   └── ComingSoonPage.jsx    # Páginas en desarrollo
├── panels/             # Paneles principales de la UI
│   ├── LeftPanel.jsx   # Lista de conversaciones
│   └── ConversationPanel.jsx # Panel de chat activo
├── ui/                 # Componentes de interfaz específicos
│   ├── MessageList.jsx      # Lista de mensajes
│   ├── MessageComposer.jsx  # Compositor de mensajes
│   ├── SearchBar.jsx        # Barra de búsqueda
│   └── UserCard.jsx         # Tarjeta de contacto/chat
└── App.jsx             # Componente raíz con Router
```

## 🎯 Rutas Implementadas

- `/` - Redirección automática a `/chats`
- `/chats` - Lista principal de conversaciones
- `/chat/:id` - Conversación específica (parámetro de búsqueda)
- `/settings` - Página de configuración
- `/status` - Estados de WhatsApp
- `/calls`, `/starred`, `/archived`, `/profile` - Páginas en desarrollo

## 🚧 Dificultades Encontradas y Soluciones

### 1. **Gestión de Estado Complejo**
- **Problema**: Sincronizar estado entre múltiples componentes
- **Solución**: Implementación de Context API para centralizar el estado global

### 2. **Navegación con Parámetros**
- **Problema**: Pasar IDs de conversación a través de rutas
- **Solución**: React Router con parámetros dinámicos (`/chat/:id`)

### 3. **Responsive Design Avanzado**
- **Problema**: Adaptación de interfaz compleja a múltiples dispositivos
- **Solución**: Breakpoints específicos y componentes condicionales por tamaño de pantalla

### 4. **Búsqueda en Tiempo Real**
- **Problema**: Búsqueda eficiente en conversaciones y mensajes
- **Solución**: Filtrado optimizado con `useState` y funciones puras

### 5. **CSS Modular**
- **Problema**: Evitar conflictos de estilos en componentes
- **Solución**: CSS Modules con nomenclatura específica por componente

## 🔧 Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de producción
npm run preview
```

## 📱 Compatibilidad

- **Navegadores**: Chrome, Firefox, Safari, Edge 
- **Dispositivos**: Móviles (320px+), Tablets (768px+), Desktop (1024px+)
- **Resoluciones**: Desde 320x568 hasta 2560x1440+

## 🎨 Principios de Diseño Aplicados

- **DRY (Don't Repeat Yourself)**: Componentes reutilizables y funciones auxiliares
- **YAGNI (You Aren't Gonna Need It)**: Implementación incremental sin sobre-ingeniería
- **KISS (Keep It Simple, Stupid)**: Arquitectura simple y comprensible
- **Separation of Concerns**: Clara separación entre lógica, presentación y datos
