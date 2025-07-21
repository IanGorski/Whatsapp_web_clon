import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    // Para chats, considerar activo tanto /chats como /chat/:id
    if (path === "/chats" || path === "/") {
      return location.pathname === "/chats" || location.pathname.startsWith("/chat/");
    }
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`${styles.sidebar} ${isExpanded ? styles.expanded : ""}`}>
      {/* Menú hamburguesa */}
      <button
        className={styles.hamburgerBtn}
        onClick={toggleSidebar}
        title="Abrir navegación"
      >
        <div className={styles.hamburgerIcon}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      {/* Chats (con indicador verde activo) */}
      <button
        className={`${styles.menuItem} ${
          isActive("/chats") ? styles.active : ""
        }`}
        onClick={() => handleMenuClick("/chats")}
        title="Chats"
      >
        <span className={styles.menuIcon}>💬</span>
        {isExpanded && <span className={styles.menuLabel}>Chats</span>}
      </button>

      {/* Estados */}
      <button
        className={`${styles.menuItem} ${
          isActive("/status") ? styles.active : ""
        }`}
        onClick={() => handleMenuClick("/status")}
        title="Estados"
      >
        <span className={styles.menuIcon}>📊</span>
        {isExpanded && <span className={styles.menuLabel}>Estados</span>}
      </button>

      {/* Llamadas */}
      <button
        className={`${styles.menuItem} ${
          isActive("/calls") ? styles.active : ""
        }`}
        onClick={() => handleMenuClick("/calls")}
        title="Llamadas"
      >
        <span className={styles.menuIcon}>📞</span>
        {isExpanded && <span className={styles.menuLabel}>Llamadas</span>}
      </button>

      {/* Espaciador para empujar estos elementos al bottom */}
      <div className={styles.bottomSpacer}></div>

      {/* Mensajes destacados */}
      <button
        className={`${styles.menuItem} ${
          isActive("/starred") ? styles.active : ""
        }`}
        onClick={() => handleMenuClick("/starred")}
        title="Mensajes destacados"
      >
        <span className={styles.menuIcon}>⭐</span>
        {isExpanded && <span className={styles.menuLabel}>Destacados</span>}
      </button>

      {/* Archivados */}
      <button
        className={`${styles.menuItem} ${
          isActive("/archived") ? styles.active : ""
        }`}
        onClick={() => handleMenuClick("/archived")}
        title="Archivar Chats"
      >
        <span className={styles.menuIcon}>📁</span>
        {isExpanded && <span className={styles.menuLabel}>Archivar Chats</span>}
      </button>

      {/* Configuración */}
      <button
        className={`${styles.menuItem} ${
          isActive("/settings") ? styles.active : ""
        }`}
        onClick={() => handleMenuClick("/settings")}
        title="Ajustes"
      >
        <span className={styles.menuIcon}>⚙️</span>
        {isExpanded && <span className={styles.menuLabel}>Ajustes</span>}
      </button>

      {/* Perfil */}
      <button
        className={`${styles.menuItem} ${
          isActive("/profile") ? styles.active : ""
        }`}
        onClick={() => handleMenuClick("/profile")}
        title="Perfil"
      >
        <span className={styles.menuIcon}>👤</span>
        {isExpanded && <span className={styles.menuLabel}>Perfil</span>}
      </button>
    </div>
  );
};

export default Sidebar;
