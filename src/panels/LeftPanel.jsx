import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LeftPanel.module.css';
import SearchBar from '../ui/SearchBar';
import UserCard from '../ui/UserCard';
import { useAppContext } from '../context/AppContext';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import PushPinIcon from '@mui/icons-material/PushPin';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const LeftPanel = ({ onSelectContact, conversations = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, contact: null });
  const [muteSubMenu, setMuteSubMenu] = useState(false);
  const navigate = useNavigate();
  const { handleSelectContact, isMobile, setConversations } = useAppContext();

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

  const handleContextMenu = (e, contact) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, contact });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, contact: null });
    setMuteSubMenu(false);
  };

  const handleMenuOptionClick = (option, muteTime = null) => {
    const contactId = contextMenu.contact.id;
    
    switch (option) {
      case 'Marcar como no leído':
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === contactId 
              ? { ...conv, unreadCount: 1, isUnread: true }
              : conv
          )
        );
        break;

      case 'Marcar como leído':
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === contactId 
              ? { ...conv, unreadCount: 0, isUnread: false }
              : conv
          )
        );
        break;
        
      case 'Fijar arriba':
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === contactId 
              ? { ...conv, pinned: !conv.pinned }
              : conv
          ).sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return 0;
          })
        );
        break;
        
      case 'Añadir a favoritos':
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === contactId 
              ? { ...conv, favorite: !conv.favorite }
              : conv
          )
        );
        break;
        
      case 'Silenciar':
        if (muteTime) {
          const muteUntil = new Date();
          if (muteTime === '8 horas') {
            muteUntil.setHours(muteUntil.getHours() + 8);
          } else if (muteTime === '24 horas') {
            muteUntil.setHours(muteUntil.getHours() + 24);
          } else if (muteTime === 'Para siempre') {
            muteUntil.setFullYear(muteUntil.getFullYear() + 100);
          }
          
          setConversations(prevConversations => 
            prevConversations.map(conv => 
              conv.id === contactId 
                ? { ...conv, muted: true, muteUntil: muteUntil.toISOString(), muteTime }
                : conv
            )
          );
          closeContextMenu();
        } else {
          setMuteSubMenu(true);
          return; // No cerrar el menú
        }
        break;
        
      case 'Desactivar silencio':
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === contactId 
              ? { ...conv, muted: false, muteUntil: null, muteTime: null }
              : conv
          )
        );
        break;
        
      case 'Archivar':
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === contactId 
              ? { ...conv, archived: true }
              : conv
          )
        );
        break;
        
      case 'Eliminar mensajes':
        setConversations(prevConversations => 
          prevConversations.map(conv => 
            conv.id === contactId 
              ? { ...conv, messages: [], lastMessage: 'Sin mensajes', time: '' }
              : conv
          )
        );
        break;
        
      case 'Eliminar':
        setConversations(prevConversations => 
          prevConversations.filter(conv => conv.id !== contactId)
        );
        if (contactId === contextMenu.contact.id) {
          navigate('/chats');
        }
        break;
        
      case 'Abrir chat en otra ventana': {
        const width = 800;
        const height = 600;
        const left = (window.screen.width - width) / 2;
        const top = (window.screen.height - height) / 2;
        window.open(
          `/chat/${contactId}`, 
          '_blank',
          `width=${width},height=${height},left=${left},top=${top}`
        );
        break;
      }
        
      default:
        console.error('Opción no reconocida');
    }
    closeContextMenu();
  };

  return (
    <div className={styles.leftPanel} onClick={closeContextMenu}>
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
            <div
              key={contact.id}
              onContextMenu={(e) => handleContextMenu(e, contact)}
            >
              <UserCard
                user={contact}
                onClick={() => handleContactClick(contact)}
                isChat={true}
              />
            </div>
          ))
        )}
      </div>

      {contextMenu.visible && contextMenu.contact && (
        <div
          className={styles.contextMenu}
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <ul>
            {contextMenu.contact.isUnread ? (
              <li onClick={() => handleMenuOptionClick('Marcar como leído')}>
                <MarkEmailReadIcon sx={{ fontSize: 18, marginRight: '8px' }} />
                Marcar como leído
              </li>
            ) : (
              <li onClick={() => handleMenuOptionClick('Marcar como no leído')}>
                <MarkEmailUnreadIcon sx={{ fontSize: 18, marginRight: '8px' }} />
                Marcar como no leído
              </li>
            )}
            <li onClick={() => handleMenuOptionClick('Fijar arriba')}>
              <PushPinIcon sx={{ fontSize: 18, marginRight: '8px' }} />
              {contextMenu.contact.pinned ? 'Desfijar' : 'Fijar arriba'}
            </li>
            <li onClick={() => handleMenuOptionClick('Añadir a favoritos')}>
              <FavoriteIcon sx={{ fontSize: 18, marginRight: '8px' }} />
              Añadir a favoritos
            </li>
            <li 
              className={styles.menuItemWithSubmenu}
              onMouseEnter={() => setMuteSubMenu(true)}
            >
              {contextMenu.contact.muted ? (
                <>
                  <NotificationsOffIcon sx={{ fontSize: 18, marginRight: '8px' }} />
                  Silenciado
                  {muteSubMenu && (
                    <ul className={styles.subMenu}>
                      <li className={styles.subMenuItem}>
                        Silenciado {contextMenu.contact.muteTime}
                      </li>
                      <li 
                        className={styles.subMenuItem}
                        onClick={() => handleMenuOptionClick('Desactivar silencio')}
                      >
                        Desactivar silencio
                      </li>
                    </ul>
                  )}
                </>
              ) : (
                <>
                  <NotificationsIcon sx={{ fontSize: 18, marginRight: '8px' }} />
                  Silenciar →
                  {muteSubMenu && (
                    <ul className={styles.subMenu}>
                      <li 
                        className={styles.subMenuItem}
                        onClick={() => handleMenuOptionClick('Silenciar', '8 horas')}
                      >
                        Por 8 horas
                      </li>
                      <li 
                        className={styles.subMenuItem}
                        onClick={() => handleMenuOptionClick('Silenciar', '24 horas')}
                      >
                        Por 24 horas
                      </li>
                      <li 
                        className={styles.subMenuItem}
                        onClick={() => handleMenuOptionClick('Silenciar', 'Para siempre')}
                      >
                        Para siempre
                      </li>
                    </ul>
                  )}
                </>
              )}
            </li>
            <li onClick={() => handleMenuOptionClick('Archivar')}>
              <ArchiveIcon sx={{ fontSize: 18, marginRight: '8px' }} />
              Archivar
            </li>
            <li onClick={() => handleMenuOptionClick('Eliminar mensajes')}>
              <DeleteIcon sx={{ fontSize: 18, marginRight: '8px' }} />
              Eliminar mensajes
            </li>
            <li onClick={() => handleMenuOptionClick('Eliminar')}>
              <DeleteIcon sx={{ fontSize: 18, marginRight: '8px' }} />
              Eliminar
            </li>
            <li onClick={() => handleMenuOptionClick('Abrir chat en otra ventana')}>
              <OpenInNewIcon sx={{ fontSize: 18, marginRight: '8px' }} />
              Abrir chat en otra ventana
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LeftPanel;
