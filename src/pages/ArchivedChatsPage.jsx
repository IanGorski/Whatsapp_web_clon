import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ArchivedChatsPage.module.css';
import { useAppContext } from '../context/AppContext';
import UserCard from '../ui/UserCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import DraftsIcon from '@mui/icons-material/Drafts';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import DeleteIcon from '@mui/icons-material/Delete';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ConfirmDialog from '../ui/ConfirmDialog';

const ArchivedChatsPage = () => {
  const navigate = useNavigate();
  const { conversations, handleUnarchiveConversation, handleToggleRead, handleClearConversation, handleDeleteConversation, markAsRead, markAsUnread } = useAppContext();
  const [contextMenu, setContextMenu] = useState(null);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, type: null, chat: null });

  // Filtrar solo chats archivados
  const archivedChats = conversations.filter(conv => conv.isArchived);

  const handleContextMenu = (e, chat) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      chat: chat
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const handleMenuAction = (action, chatId) => {
    switch (action) {
      case 'toggleRead':
        handleToggleRead(chatId);
        break;
      case 'unarchive':
        handleUnarchiveConversation(chatId);
        break;
      case 'clearMessages':
        setConfirmDialog({ isOpen: true, type: 'clear', chat: archivedChats.find(chat => chat.id === chatId) });
        break;
      case 'deleteChat':
        setConfirmDialog({ isOpen: true, type: 'delete', chat: archivedChats.find(chat => chat.id === chatId) });
        break;
      case 'openInNewWindow':
        window.open(`/chat/${chatId}`, '_blank');
        break;
      default:
        break;
    }
    closeContextMenu();
  };

  const handleConfirmDelete = () => {
    if (confirmDialog.type === 'delete') {
      handleDeleteConversation(confirmDialog.chat.id);
    } else if (confirmDialog.type === 'clear') {
      handleClearConversation(confirmDialog.chat.id);
    }
    setConfirmDialog({ isOpen: false, type: null, chat: null });
  };

  React.useEffect(() => {
    if (contextMenu) {
      document.addEventListener('click', closeContextMenu);
      return () => {
        document.removeEventListener('click', closeContextMenu);
      };
    }
  }, [contextMenu]);

  return (
    <>
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
              <div 
                key={chat.id} 
                className={styles.chatItem}
                onContextMenu={(e) => handleContextMenu(e, chat)}
              >
                <UserCard
                  user={chat}
                  onClick={() => navigate(`/chat/${chat.id}`)}
                  isChat={true}
                  disableContextMenu={true}
                />
              </div>
            ))
          )}
        </div>

        {contextMenu && (
          <div
            className={styles.contextMenu}
            style={{
              position: 'fixed',
              top: `${contextMenu.y}px`,
              left: `${contextMenu.x}px`,
              zIndex: 1000
            }}
          >
            <div 
              className={styles.menuItem}
              onClick={() => {
                if (contextMenu.chat.isUnread) {
                  markAsRead(contextMenu.chat.id);
                } else {
                  markAsUnread(contextMenu.chat.id);
                }
              }}
            >
              {contextMenu.chat.isUnread ? (
                <>
                  <DraftsIcon sx={{ fontSize: 18 }} />
                  <span>Marcar como leído</span>
                </>
              ) : (
                <>
                  <MarkAsUnreadIcon sx={{ fontSize: 18 }} />
                  <span>Marcar como no leído</span>
                </>
              )}
            </div>
            <div 
              className={styles.menuItem}
              onClick={() => handleMenuAction('unarchive', contextMenu.chat.id)}
            >
              <UnarchiveIcon sx={{ fontSize: 18 }} />
              <span>Desarchivar</span>
            </div>
            <div 
              className={styles.menuItem}
              onClick={() => setConfirmDialog({ isOpen: true, type: 'clear', chat: contextMenu.chat })}
            >
              <DeleteSweepIcon sx={{ fontSize: 18 }} />
              <span>Eliminar mensajes</span>
            </div>
            <div 
              className={styles.menuItem}
              onClick={() => setConfirmDialog({ isOpen: true, type: 'delete', chat: contextMenu.chat })}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
              <span>Eliminar chat</span>
            </div>
            <div 
              className={styles.menuItem}
              onClick={() => handleMenuAction('openInNewWindow', contextMenu.chat.id)}
            >
              <OpenInNewIcon sx={{ fontSize: 18 }} />
              <span>Abrir en otra ventana</span>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.type === 'delete' ? `¿Deseas eliminar el chat con ${confirmDialog.chat?.name}?` : `¿Deseas vaciar el chat con ${confirmDialog.chat?.name}?`}
        message="Se eliminarán los mensajes de todos tus dispositivos."
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, type: null, chat: null })}
        confirmText={confirmDialog.type === 'delete' ? 'Eliminar' : 'Vaciar'}
        cancelText="Cancelar"
        confirmStyle="danger"
      />
    </>
  );
};

export default ArchivedChatsPage;
