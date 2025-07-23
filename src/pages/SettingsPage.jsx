import React from 'react';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
    const handleOptionClick = () => {
        alert('Sin funcionalidad');
    };

    return (
        <div className={styles.settingsPage}>
            <div className={styles.settingsHeader}>
                <h2>⚙️ Ajustes</h2>
                <p>Personaliza tu experiencia de WhatsApp</p>
            </div>

            <div className={styles.settingsContent}>
                <div className={styles.settingsSection}>
                    <h3>Cuenta</h3>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>👤</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Perfil</span>
                            <span className={styles.settingsDesc}>Foto, nombre, información</span>
                        </div>
                    </div>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>🔒</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Privacidad</span>
                            <span className={styles.settingsDesc}>Última conexión, foto de perfil</span>
                        </div>
                    </div>
                </div>

                <div className={styles.settingsSection}>
                    <h3>Chats</h3>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>💬</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Respaldo de chats</span>
                            <span className={styles.settingsDesc}>Historial, medios, ajustes</span>
                        </div>
                    </div>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>🌙</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Tema</span>
                            <span className={styles.settingsDesc}>Claro, oscuro, automático</span>
                        </div>
                    </div>
                </div>

                <div className={styles.settingsSection}>
                    <h3>Notificaciones</h3>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>🔔</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Mensajes</span>
                            <span className={styles.settingsDesc}>Tono, vibración, notificaciones emergentes</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
