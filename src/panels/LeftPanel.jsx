import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LeftPanel.module.css';
import SearchBar from '../ui/SearchBar';
import UserCard from '../ui/UserCard';
import { useAppContext } from '../context/AppContext';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const LeftPanel = ({ conversations = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { handleSelectContact, isMobile } = useAppContext();

  // Ordenar conversaciones: fijadas primero, luego por timestamp
  const sortedConversations = [...conversations]
    .filter(conv => !conv.isArchived) // No mostrar archivadas
    .sort((a, b) => {
      // Primero, separar fijadas de no fijadas
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      
      // Si ambas están fijadas o ambas no están fijadas, ordenar por timestamp
      return (b.lastMessageTimestamp || 0) - (a.lastMessageTimestamp || 0);
    });

  const filteredContacts = sortedConversations.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleContactClick = (contact) => {
    // Actualizar el contexto primero
    handleSelectContact(contact);
    
    // Navegar según el modo
    if (!isMobile) {
      // En desktop, actualizar URL pero mantener la misma página
      navigate(`/chat/${contact.id}`, { replace: true });
    } else {
      // En mobile, navegar normalmente
      navigate(`/chat/${contact.id}`);
    }
  };

  return (
    <div className={styles.leftPanel}>
      <div className={styles.header}>
        <div className={styles.userProfile}>
          <h2>Chats</h2>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionButton}>
            <ChatIcon sx={{ fontSize: 20 }} />
          </button>
          <button className={styles.actionButton}>
            <MoreVertIcon sx={{ fontSize: 20 }} />
          </button>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <SearchBar 
          onSearch={handleSearch}
          placeholder="Buscar un chat o iniciar uno nuevo"
        />
      </div>

      <div className={styles.contactsList}>
        {filteredContacts.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No se encontraron conversaciones</p>
          </div>
        ) : (
          filteredContacts.map((contact) => (
            <UserCard
              key={contact.id}
              user={contact}
              onClick={() => handleContactClick(contact)}
              isChat={true}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
