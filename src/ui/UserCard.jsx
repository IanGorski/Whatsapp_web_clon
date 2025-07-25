import React from 'react';
import styles from './UserCard.module.css';

const UserCard = ({ user, onClick, isChat = false }) => {
  return (
    <div className={styles.userCard} onClick={onClick}>
      <div className={styles.avatar}>
        {getInitials(user?.name) || 'U'}
      </div>
      <div className={styles.userInfo}>
        <div className={styles.topRow}>
          <h4>{user?.name || 'Unknown User'}</h4>
          {isChat && <span className={styles.time}>{user?.time}</span>}
        </div>
        <div className={styles.bottomRow}>
          <p className={styles.lastMessage}>
            {isChat ? user?.lastMessage : user?.status || 'en línea'}
          </p>
          {isChat && user?.unreadCount > 0 && (
            <div className={styles.unreadBadge}>
              {user.unreadCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function getInitials(name) {
  if (!name) return '';
  const words = name.trim().split(' ');
  return (words[0][0] + (words[1]?.[0] || '')).toUpperCase();
}
export default UserCard;
