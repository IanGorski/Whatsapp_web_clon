import React, { useEffect, useRef } from 'react';
import styles from './MessageList.module.css';
import DeleteIcon from '@mui/icons-material/Delete';

const MessageList = ({ messages = [], searchTerm = '', currentMatchIndex = 0, onDeleteMessage }) => {
  const messageRefs = useRef({});
  const containerRef = useRef(null);
  
  // Función para resaltar texto solo en el mensaje activo
  const highlightText = (text, search, isActiveMatch) => {
    if (!search || !text || !isActiveMatch) return text;
    
    const regex = new RegExp(`(${search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className={styles.highlight}>{part}</mark>
      ) : part
    );
  };

  // Verificación si un mensaje coincide con la búsqueda
  const messageMatches = (message, search) => {
    if (!search) return false;
    return message.content && message.content.toLowerCase().includes(search.toLowerCase());
  };

  // Manejar eliminación de mensaje
  const handleDeleteMessage = (messageId) => {
    if (onDeleteMessage) {
      onDeleteMessage(messageId);
    }
  };

  // Scroll al mensaje activo cuando cambie la selección
  useEffect(() => {
    if (searchTerm && currentMatchIndex > 0) {
      const matchingMessages = messages.filter(message => messageMatches(message, searchTerm));
      if (currentMatchIndex <= matchingMessages.length) {
        const activeMessage = matchingMessages[currentMatchIndex - 1];
        const activeIndex = messages.findIndex(msg => msg.id === activeMessage.id);
        
        if (activeIndex !== -1 && messageRefs.current[activeIndex]) {
          messageRefs.current[activeIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      }
    }
  }, [searchTerm, currentMatchIndex, messages]);

  return (
    <div className={styles.messageList} ref={containerRef}>
      {messages.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No hay mensajes aún</p>
        </div>
      ) : (
        messages.map((message, index) => {
          // Determinar si este es el mensaje actualmente seleccionado
          const matchingMessages = messages.filter(msg => messageMatches(msg, searchTerm));
          const isActiveMessage = searchTerm && currentMatchIndex > 0 && 
            matchingMessages[currentMatchIndex - 1]?.id === message.id;
          
          return (
            <div 
              key={message.id} 
              ref={el => messageRefs.current[index] = el}
              className={`${styles.messageContainer} ${message.isOwn ? styles.ownMessage : styles.otherMessage}`}
            >
              <div className={styles.messageBubble}>
                <div className={styles.messageContent}>
                  {highlightText(message.content, searchTerm, isActiveMessage)}
                </div>
                <div className={styles.messageTime}>
                  {message.timestamp}
                  {message.isOwn && (
                    <span className={styles.checkmarks}>✓✓</span>
                  )}
                </div>
              </div>
              
              {/* Botón de eliminar mensaje */}
              <button 
                className={styles.deleteButton}
                onClick={() => handleDeleteMessage(message.id)}
                title="Eliminar mensaje"
              >
                <DeleteIcon sx={{ fontSize: 18, color: '#54656f' }} />
              </button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessageList;
