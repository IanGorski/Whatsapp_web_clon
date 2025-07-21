import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LeftPanel.module.css';
import SearchBar from '../ui/SearchBar';
import UserCard from '../ui/UserCard';
import { useAppContext } from '../context/AppContext';

const LeftPanel = ({ onSelectContact, conversations = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { handleSelectContact, isMobile } = useAppContext();

  const filteredContacts = conversations.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleContactClick = (contact) => {
    // Llamar a la función original para mantener compatibilidad
    if (onSelectContact) {
      onSelectContact(contact);
    }
    
    // También actualizar el contexto
    handleSelectContact(contact);
    
    // En desktop: navegar sin cambiar la vista (mantiene ambos paneles)
    // En mobile: navegar y cambiar vista completa
    if (!isMobile) {
      // En desktop, actualizar URL pero mantener la misma página
      navigate(`/chat/${contact.id}`, { replace: true });
    } else {
      // En mobile, navegar normalmente
      navigate(`/chat/${contact.id}`);
    }
  };

  const handleMenuClick = () => {
    alert('Este icono no tiene función por el momento :(');
  };

  const handleChatClick = () => {
    alert('Este icono no tiene función por el momento :(');
  };

  return (
    <div className={styles.leftPanel}>
      <div className={styles.header}>
        <div className={styles.userProfile}>
          <h2>Chats</h2>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.actionButton} onClick={handleChatClick}>💬</button>
          <button className={styles.actionButton} onClick={handleMenuClick}>⋮</button>
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
