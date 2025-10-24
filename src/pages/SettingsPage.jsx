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
                    <h3>General</h3>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>💻</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Configuración general</span>
                            <span className={styles.settingsDesc}>Preferencias básicas</span>
                        </div>
                    </div>
                </div>

                <div className={styles.settingsSection}>
                    <h3>Cuenta</h3>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>👤</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Perfil</span>
                            <span className={styles.settingsDesc}>Foto, nombre, información</span>
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
                </div>

                <div className={styles.settingsSection}>
                    <h3>Audio y video</h3>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>🎥</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Configuración de cámara</span>
                            <span className={styles.settingsDesc}>Resolución, permisos</span>
                        </div>
                    </div>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>🎙️</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Configuración de micrófono</span>
                            <span className={styles.settingsDesc}>Volumen, permisos</span>
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

                <div className={styles.settingsSection}>
                    <h3>Personalización</h3>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>🖌️</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Colores</span>
                            <span className={styles.settingsDesc}>Personaliza los colores de la app</span>
                        </div>
                    </div>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>🔤</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Fuentes</span>
                            <span className={styles.settingsDesc}>Elige el estilo de fuente</span>
                        </div>
                    </div>
                </div>

                <div className={styles.settingsSection}>
                    <h3>Almacenamiento</h3>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>💾</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Uso de almacenamiento</span>
                            <span className={styles.settingsDesc}>Espacio ocupado por archivos y mensajes</span>
                        </div>
                    </div>
                </div>

                <div className={styles.settingsSection}>
                    <h3>Atajos</h3>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>⌨️</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Teclas rápidas</span>
                            <span className={styles.settingsDesc}>Configura accesos rápidos</span>
                        </div>
                    </div>
                </div>

                <div className={styles.settingsSection}>
                    <h3>Ayuda</h3>
                    <div className={styles.settingsItem} onClick={handleOptionClick}>
                        <span className={styles.settingsIcon}>❓</span>
                        <div className={styles.settingsText}>
                            <span className={styles.settingsTitle}>Centro de ayuda</span>
                            <span className={styles.settingsDesc}>Preguntas frecuentes y soporte</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
