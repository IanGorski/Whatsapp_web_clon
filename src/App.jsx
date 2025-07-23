import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import ChatPage from './pages/ChatPage';
import ConversationPage from './pages/ConversationPage';
import SettingsPage from './pages/SettingsPage';
import StatusPage from './pages/StatusPage';
import ComingSoonPage from './pages/ComingSoonPage';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Sidebar />
          <div className="content">
            <Routes>
              {/* Ruta principal - redirige a chats */}
              <Route path="/" element={<Navigate to="/chats" replace />} />
              
              {/* Página principal de chats */}
              <Route path="/chats" element={<ChatPage />} />
              
              {/* Chat específico con parámetro ID */}
              <Route path="/chat/:id" element={<ConversationPage />} />
              
              {/* Página de estados */}
              <Route path="/status" element={<StatusPage />} />
              
              {/* Página de configuración */}
              <Route path="/settings" element={<SettingsPage />} />
              
              {/* Páginas "Coming Soon" */}
              <Route 
                path="/calls" 
                element={<ComingSoonPage title="Llamadas" emoji="📞" />} 
              />
              <Route 
                path="/starred" 
                element={<ComingSoonPage title="Mensajes Destacados" emoji="⭐" />} 
              />
          <Route 
            path="/archived" 
            element={<ComingSoonPage title="Archivar Chats" emoji="📁" />} 
          />
              <Route 
                path="/profile" 
                element={<ComingSoonPage title="Perfil" emoji="👤" />} 
              />
              
              {/* Ruta para manejar URLs no encontradas */}
              <Route path="*" element={<Navigate to="/chats" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
