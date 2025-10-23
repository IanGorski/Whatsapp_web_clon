import React, { useState, useEffect } from 'react';
import styles from './MessageComposer.module.css';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

const MessageComposer = ({ onSendMessage, conversationId }) => {
  const [message, setMessage] = useState('');

  // Limpiar el input cuando cambie la conversación
  useEffect(() => {
    setMessage('');
  }, [conversationId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleIconClick = () => {
    alert('Este icono no tiene funcionalidad jeje');
  };

  return (
    <div className={styles.messageComposer}>
      <div className={styles.leftButtons}>
        <button type="button" className={styles.emojiButton} title="Emoji" onClick={handleIconClick}>
          <InsertEmoticonIcon sx={{ fontSize: 24, color: '#54656f' }} />
        </button>
        <button type="button" className={styles.attachButton} title="Adjuntar" onClick={handleIconClick}>
          <AttachFileIcon sx={{ fontSize: 24, color: '#54656f' }} />
        </button>
      </div>
      
      <form className={styles.messageForm} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe un mensaje"
            className={styles.messageInput}
          />
        </div>
      </form>
        
      <button 
        type="button" 
        className={styles.sendButton}
        onClick={message.trim() ? handleSubmit : handleIconClick}
        title={message.trim() ? "Enviar" : "Grabar audio"}
      >
        {message.trim() ? (
          <SendIcon sx={{ fontSize: 24, color: '#54656f' }} />
        ) : (
          <MicIcon sx={{ fontSize: 24, color: '#54656f' }} />
        )}
      </button>
    </div>
  );
};

export default MessageComposer;
