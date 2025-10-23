import React, { useState } from 'react';
import styles from './ConversationPanel.module.css';
import MessageList from '../ui/MessageList';
import MessageComposer from '../ui/MessageComposer';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const ConversationPanel = ({ activeConversation, onSendMessage, onDeleteMessage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);

  const handleSendMessage = (messageContent) => {
    const newMessage = {
      id: Date.now(),
      sender: "You",
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    
    if (onSendMessage) {
      onSendMessage(newMessage);
    }
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      setSearchTerm('');
      setCurrentMatchIndex(0);
      setTotalMatches(0);
    }
  };

  // Función para resaltar texto en los mensajes, lupa.
  
  // Manejar el cambio en el término de búsqueda
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    
    if (newSearchTerm) {
      const matches = activeConversation?.messages?.filter(message => 
        message.content && message.content.toLowerCase().includes(newSearchTerm.toLowerCase())
      ) || [];
      
      setTotalMatches(matches.length);
      setCurrentMatchIndex(matches.length > 0 ? 1 : 0);
    } else {
      setTotalMatches(0);
      setCurrentMatchIndex(0);
    }
  };

  // Navegar al siguiente resultado
  const goToNextMatch = () => {
    if (totalMatches > 0) {
      setCurrentMatchIndex(currentMatchIndex < totalMatches ? currentMatchIndex + 1 : 1);
    }
  };

  // Navegar al resultado anterior
  const goToPreviousMatch = () => {
    if (totalMatches > 0) {
      setCurrentMatchIndex(currentMatchIndex > 1 ? currentMatchIndex - 1 : totalMatches);
    }
  };

  // Función simple para filtrar mensajes
  const getMessagesToShow = () => {
    return activeConversation?.messages || [];
  };

  // ALERT para iconos sin funcionalidad
  const handleIconClick = () => {
    alert('Este icono tampoco tiene funcionalidad jeje');
  };

  if (!activeConversation) {
    return (
      <div className={styles.conversationPanel}>
        <div className={styles.emptyState}>
          <h3>WhatsApp para Windows</h3>
          <p>Envía y recibe mensajes sin mantener tu teléfono conectado.</p>
          <p>Usa Whatsapp en hasta 4 dispositivos vinculados y 1 teléfono a la vez.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.conversationPanel}>
      <div className={styles.conversationHeader}>
        <div className={styles.contactInfo}>
          <div className={styles.avatar}>
            {activeConversation.name[0]}
          </div>
          <div className={styles.contactDetails}>
            <h3>{activeConversation.name}</h3>
            <p className={styles.status}>{activeConversation.status || 'en línea'}</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionButton} onClick={handleIconClick}>
            <CallIcon sx={{ fontSize: 20 }} />
          </button>
          <button className={styles.actionButton} onClick={handleIconClick}>
            <VideocamIcon sx={{ fontSize: 20 }} />
          </button>
          <button 
            className={styles.actionButton}
            onClick={toggleSearch}
            title="Buscar en chat"
          >
            <SearchIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

      {/* Barra de búsqueda desplegable, muestra barra de búsqueda si está expandida*/}
      {isSearchExpanded && (
        <div className={styles.searchDropdown}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Buscar en el chat"
              value={searchTerm}
              onChange={handleSearchChange}
              className={styles.chatSearchInput}
              autoFocus
            />
            
            {/* Contador y navegación de resultados */}
            {searchTerm && (
              <div className={styles.searchNavigation}>
                <span className={styles.searchCounter}>
                  {totalMatches > 0 ? `${currentMatchIndex} de ${totalMatches}` : '0 de 0'}
                </span>
                <button 
                  className={styles.navButton}
                  onClick={goToPreviousMatch}
                  disabled={totalMatches === 0}
                  title="Resultado anterior"
                >
                  <KeyboardArrowUpIcon sx={{ fontSize: 16 }} />
                </button>
                <button 
                  className={styles.navButton}
                  onClick={goToNextMatch}
                  disabled={totalMatches === 0}
                  title="Siguiente resultado"
                >
                  <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                </button>
              </div>
            )}
            
            <button 
              className={styles.closeSearchButton}
              onClick={toggleSearch}
            >
              <CloseIcon sx={{ fontSize: 18 }} />
            </button>
          </div>
        </div>
      )}
      
      <MessageList 
        messages={getMessagesToShow()} 
        searchTerm={searchTerm}
        currentMatchIndex={currentMatchIndex}
        onDeleteMessage={onDeleteMessage}
      />
      <MessageComposer 
        onSendMessage={handleSendMessage} 
        conversationId={activeConversation?.id}
      />
    </div>
  );
};

export default ConversationPanel;
