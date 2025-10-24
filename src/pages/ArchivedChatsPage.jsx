import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ArchivedChatsPage.module.css';
import { useAppContext } from '../context/AppContext';
import UserCard from '../ui/UserCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UnarchiveIcon from '@mui/icons-material/Unarchive';

const ArchivedChatsPage = () => {
  const navigate = useNavigate();
  const { conversations, handleUnarchiveConversation } = useAppContext();

  // Filtrar solo chats archivados
  const archivedChats = conversations.filter(conv => conv.isArchived);

  const handleUnarchive = (chatId) => {
    handleUnarchiveConversation(chatId);
  };

  return (
    <div className={styles.archivedChatsPage}>
      <div className={styles.header}>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/chats')}
          title="Volver a chats"
        >
          <ArrowBackIcon sx={{ fontSize: 24 }} />
        </button>
        <h2>Chats archivados</h2>
      </div>

      <div className={styles.chatsList}>
        {archivedChats.length === 0 ? (
          <div className={styles.emptyState}>
            <UnarchiveIcon sx={{ fontSize: 64, color: '#8696a0' }} />
            <h3>No hay chats archivados</h3>
            <p>Los chats que archives aparecerán aquí</p>
          </div>
        ) : (
          archivedChats.map((chat) => (
            <div key={chat.id} className={styles.chatItem}>
              <UserCard
                user={chat}
                onClick={() => navigate(`/chat/${chat.id}`)}
                isChat={true}
              />
              <button
                className={styles.unarchiveButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnarchive(chat.id);
                }}
                title="Desarchivar"
              >
                <UnarchiveIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArchivedChatsPage;
