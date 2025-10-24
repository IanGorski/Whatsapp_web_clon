import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

// Hook para usar el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext debe ser usado dentro de AppProvider");
    }
    return context;
};

export const AppProvider = ({ children }) => {
    const [activeConversation, setActiveConversation] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [showChatList, setShowChatList] = useState(true);

    // Detectar si estamos en móvil
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setShowChatList(true);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Conversaciones demo
    useEffect(() => {
        const initialContacts = [
            {
                id: 1,
                name: "Ellen Ripley",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTc3YWUzYjYtNmRmZS00NGVlLTg0N2ItN2Q2OTU5M2FlMDE4XkEyXkFqcGc@._V1_FMjpg_UX1024_.jpg",
                lastMessage: "¿Has visto al xenomorfo?",
                time: "10:30",
                isUnread: true,
            },
            {
                id: 2,
                name: "Ash",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTc3YWUzYjYtNmRmZS00NGVlLTg0N2ItN2Q2OTU5M2FlMDE4XkEyXkFqcGc@._V1_FMjpg_UX1024_.jpg",
                lastMessage: "La misión es prioridad.",
                time: "09:15",
                isUnread: false,
            },
            {
                id: 3,
                name: "Dallas",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTc3YWUzYjYtNmRmZS00NGVlLTg0N2ItN2Q2OTU5M2FlMDE4XkEyXkFqcGc@._V1_FMjpg_UX1024_.jpg",
                lastMessage: "Mantengan la calma.",
                time: "08:45",
                isUnread: false,
            },
            {
                id: 4,
                name: "Parker",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTc3YWUzYjYtNmRmZS00NGVlLTg0N2ItN2Q2OTU5M2FlMDE4XkEyXkFqcGc@._V1_FMjpg_UX1024_.jpg",
                lastMessage: "¿Qué hacemos ahora?",
                time: "07:50",
                isUnread: true,
            },
            {
                id: 5,
                name: "Lambert",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTc3YWUzYjYtNmRmZS00NGVlLTg0N2ItN2Q2OTU5M2FlMDE4XkEyXkFqcGc@._V1_FMjpg_UX1024_.jpg",
                lastMessage: "¡Cuidado!",
                time: "06:30",
                isUnread: false,
            },
            {
                id: 6,
                name: "Brett",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTc3YWUzYjYtNmRmZS00NGVlLTg0N2ItN2Q2OTU5M2FlMDE4XkEyXkFqcGc@._V1_FMjpg_UX1024_.jpg",
                lastMessage: "Entendido.",
                time: "05:20",
                isUnread: false,
            },
            {
                id: 7,
                name: "Kane",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTc3YWUzYjYtNmRmZS00NGVlLTg0N2ItN2Q2OTU5M2FlMDE4XkEyXkFqcGc@._V1_FMjpg_UX1024_.jpg",
                lastMessage: "¿Qué sucede?",
                time: "04:10",
                isUnread: true,
            },
            {
                id: 8,
                name: "Bishop",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTk3NzU5NDE0MF5BMl5BanBnXkFtZTgwNjAxNzE5MDI@._V1_FMjpg_UX500_.jpg",
                lastMessage: "No está mal para un humano.",
                time: "03:00",
                isUnread: false,
            },
            {
                id: 9,
                name: "Hicks",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTk3NzU5NDE0MF5BMl5BanBnXkFtZTgwNjAxNzE5MDI@._V1_FMjpg_UX500_.jpg",
                lastMessage: "Mantente alerta.",
                time: "02:45",
                isUnread: true,
            },
            {
                id: 10,
                name: "Hudson",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTk3NzU5NDE0MF5BMl5BanBnXkFtZTgwNjAxNzE5MDI@._V1_FMjpg_UX500_.jpg",
                lastMessage: "¡Estamos acabados!",
                time: "01:30",
                isUnread: false,
            },
            {
                id: 11,
                name: "Vasquez",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTk3NzU5NDE0MF5BMl5BanBnXkFtZTgwNjAxNzE5MDI@._V1_FMjpg_UX500_.jpg",
                lastMessage: "¡Vamos a luchar!",
                time: "00:15",
                isUnread: true,
            },
            {
                id: 12,
                name: "Gorman",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTk3NzU5NDE0MF5BMl5BanBnXkFtZTgwNjAxNzE5MDI@._V1_FMjpg_UX500_.jpg",
                lastMessage: "Sigan el plan.",
                time: "23:50",
                isUnread: false,
            },
            {
                id: 13,
                name: "Newt",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTk3NzU5NDE0MF5BMl5BanBnXkFtZTgwNjAxNzE5MDI@._V1_FMjpg_UX500_.jpg",
                lastMessage: "Ellos vienen de noche.",
                time: "22:40",
                isUnread: true,
            },
            {
                id: 14,
                name: "Frost",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTk3NzU5NDE0MF5BMl5BanBnXkFtZTgwNjAxNzE5MDI@._V1_FMjpg_UX500_.jpg",
                lastMessage: "Todos vamos a morir.",
                time: "21:30",
                isUnread: false,
            },
            {
                id: 15,
                name: "Apone",
                avatar: "https://m.media-amazon.com/images/M/MV5BMTk3NzU5NDE0MF5BMl5BanBnXkFtZTgwNjAxNzE5MDI@._V1_FMjpg_UX500_.jpg",
                lastMessage: "Mírame a los ojos.",
                time: "20:20",
                isUnread: true,
            },
        ];

        setConversations(initialContacts);
    }, []);

    const handleSelectContact = (contact) => {
        setActiveConversation(contact);
        if (isMobile) {
            setShowChatList(false);
        }
    };

    const handleDeselectContact = () => {
        setActiveConversation(null);
        if (isMobile) {
            setShowChatList(true);
        }
    };

    const handleSendMessage = (message) => {
        if (!activeConversation) return;

        const updatedConversations = conversations.map((conv) => {
            if (conv.id === activeConversation.id) {
                const newMessage = {
                    id: Date.now(),
                    sender: "You",
                    content: message.content,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                    isOwn: true,
                };

                const updatedConv = {
                    ...conv,
                    messages: [...(conv.messages || []), newMessage],
                    lastMessage: message.content,
                    time: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                };

                setActiveConversation(updatedConv);
                return updatedConv;
            }
            return conv;
        });

        setConversations(updatedConversations);
    };

    const handleDeleteMessage = (messageId) => {
        if (!activeConversation) return;

        const updatedConversations = conversations.map((conv) => {
            if (conv.id === activeConversation.id) {
                const filteredMessages = conv.messages.filter(
                    (msg) => msg.id !== messageId
                );

                const lastMessage =
                    filteredMessages.length > 0
                        ? filteredMessages[filteredMessages.length - 1].content
                        : "Sin mensajes";

                const lastTime =
                    filteredMessages.length > 0
                        ? filteredMessages[filteredMessages.length - 1].timestamp
                        : "";

                const updatedConv = {
                    ...conv,
                    messages: filteredMessages,
                    lastMessage: lastMessage,
                    time: lastTime,
                };

                setActiveConversation(updatedConv);
                return updatedConv;
            }
            return conv;
        });

        setConversations(updatedConversations);
    };

    const handleMuteConversation = (conversationId, duration) => {
        const updatedConversations = conversations.map((conv) => {
            if (conv.id === conversationId) {
                const muteUntil =
                    duration === "8h"
                        ? new Date(Date.now() + 8 * 60 * 60 * 1000)
                        : duration === "1w"
                        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                        : duration === "always"
                        ? null
                        : conv.muteUntil;

                return {
                    ...conv,
                    muteUntil,
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
    };

    const handleUnmuteConversation = (conversationId) => {
        const updatedConversations = conversations.map((conv) => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    muteUntil: undefined,
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
    };

    // Fijar/Desfijar conversación
    const handlePinConversation = (conversationId) => {
        const updatedConversations = conversations.map((conv) => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    isPinned: true,
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
        
        // Actualizar conversación activa si es la misma
        if (activeConversation && activeConversation.id === conversationId) {
            setActiveConversation({ ...activeConversation, isPinned: true });
        }
    };

    const handleUnpinConversation = (conversationId) => {
        const updatedConversations = conversations.map((conv) => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    isPinned: false,
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
        
        // Actualizar conversación activa si es la misma
        if (activeConversation && activeConversation.id === conversationId) {
            setActiveConversation({ ...activeConversation, isPinned: false });
        }
    };

    // Archivar/Desarchivar conversación
    const handleArchiveConversation = (conversationId) => {
        const updatedConversations = conversations.map((conv) => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    isArchived: true,
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
        
        // Si es la conversación activa, deseleccionarla
        if (activeConversation && activeConversation.id === conversationId) {
            handleDeselectContact();
        }
    };

    const handleUnarchiveConversation = (conversationId) => {
        const updatedConversations = conversations.map((conv) => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    isArchived: false,
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
    };

    // Eliminar conversación completa
    const handleDeleteConversation = (conversationId) => {
        const updatedConversations = conversations.filter(
            (conv) => conv.id !== conversationId
        );

        setConversations(updatedConversations);
        
        // Si es la conversación activa, deseleccionarla
        if (activeConversation && activeConversation.id === conversationId) {
            handleDeselectContact();
        }
    };

    // Vaciar mensajes de una conversación
    const handleClearConversation = (conversationId) => {
        const updatedConversations = conversations.map((conv) => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    messages: [],
                    lastMessage: "Sin mensajes",
                    time: "",
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
        
        // Actualizar conversación activa si es la misma
        if (activeConversation && activeConversation.id === conversationId) {
            setActiveConversation({
                ...activeConversation,
                messages: [],
                lastMessage: "Sin mensajes",
                time: "",
            });
        }
    };

    // Marcar como leído/no leído
    const handleMarkAsUnread = (conversationId) => {
        const updatedConversations = conversations.map((conv) => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    unreadCount: conv.unreadCount > 0 ? 0 : 1,
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
        
        if (activeConversation && activeConversation.id === conversationId) {
            setActiveConversation({ 
                ...activeConversation, 
                unreadCount: activeConversation.unreadCount > 0 ? 0 : 1 
            });
        }
    };

    // Añadir a favoritos
    const handleToggleFavorite = (conversationId) => {
        const updatedConversations = conversations.map((conv) => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    isFavorite: !conv.isFavorite,
                };
            }
            return conv;
        });

        setConversations(updatedConversations);
        
        if (activeConversation && activeConversation.id === conversationId) {
            setActiveConversation({ 
                ...activeConversation, 
                isFavorite: !activeConversation.isFavorite 
            });
        }
    };

    const markAsUnread = (chatId) => {
        setConversations((prevConversations) =>
            prevConversations.map((chat) =>
                chat.id === chatId ? { ...chat, isUnread: true } : chat
            )
        );
    };

    const markAsRead = (chatId) => {
        setConversations((prevConversations) =>
            prevConversations.map((chat) =>
                chat.id === chatId ? { ...chat, isUnread: false } : chat
            )
        );
    };

    const value = {
        activeConversation,
        setActiveConversation,
        conversations,
        setConversations,
        isMobile,
        showChatList,
        setShowChatList,
        handleSelectContact,
        handleSendMessage,
        handleDeleteMessage,
        handleDeselectContact,
        handleMuteConversation,
        handleUnmuteConversation,
        handlePinConversation,
        handleUnpinConversation,
        handleArchiveConversation,
        handleUnarchiveConversation,
        handleDeleteConversation,
        handleClearConversation,
        handleMarkAsUnread,
        handleToggleFavorite,
        markAsUnread,
        markAsRead,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
