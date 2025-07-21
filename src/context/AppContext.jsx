import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// Hook para usar el contexto
// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de AppProvider');
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
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Conversaciones demo
  useEffect(() => {
    const initialContacts = [
      {
        id: 1,
        name: "John Goldberg",
        status: "en línea",
        lastMessage: "Como andas papu?",
        time: "10:30",
        unreadCount: 0,
        messages: [
          {
            id: 1,
            sender: "John Goldberg",
            content: "Como andas papu?",
            timestamp: "10:30 AM",
            isOwn: false
          }
        ]
      },
      {
        id: 2,
        name: "Messi",
        status: "hace 5 min",
        lastMessage: "Te dediqué un gol kpo, SIUUUUUUU",
        time: "09:45",
        unreadCount: 0,
        messages: [
          {
            id: 2,
            sender: "Messi",
            content: "Te dediqué un gol kpo, SIUUUUUUU",
            timestamp: "09:45 AM",
            isOwn: false
          }
        ]
      },
      {
        id: 3,
        name: "Malvavisco",
        status: "en línea",
        lastMessage: "Respondemeee es urgenteeeeeee 😱",
        time: "08:20",
        unreadCount: 2,
        messages: [
          {
            id: 3,
            sender: "Malvavisco",
            content: "Tengo que decirte algooooooo",
            timestamp: "07:18 AM",
            isOwn: false
          },
          {
            id: 4,
            sender: "Malvavisco",
            content: "Necesito que me respondas porfabo",
            timestamp: "07:43 AM",
            isOwn: false
          },
          {
            id: 5,
            sender: "You",
            content: "Que pasooo",
            timestamp: "07:50 AM",
            isOwn: true
          },
          {
            id: 6,
            sender: "Malvavisco",
            content: "Te tengo que decir algo importantiiisimo",
            timestamp: "08:15 AM",
            isOwn: false
          },
          {
            id: 7,
            sender: "Malvavisco",
            content: "Respondemeee es urgenteeeeeee 😱",
            timestamp: "08:20 AM",
            isOwn: false
          }
        ]
      }
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

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        const newMessage = {
          id: Date.now(),
          sender: "You",
          content: message.content,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: true
        };
        
        const updatedConv = {
          ...conv,
          messages: [...(conv.messages || []), newMessage],
          lastMessage: message.content,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
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

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        const filteredMessages = conv.messages.filter(msg => msg.id !== messageId);
        
        const lastMessage = filteredMessages.length > 0 
          ? filteredMessages[filteredMessages.length - 1].content 
          : "Sin mensajes";
        
        const lastTime = filteredMessages.length > 0 
          ? filteredMessages[filteredMessages.length - 1].timestamp 
          : "";

        const updatedConv = {
          ...conv,
          messages: filteredMessages,
          lastMessage: lastMessage,
          time: lastTime
        };
        
        setActiveConversation(updatedConv);
        return updatedConv;
      }
      return conv;
    });

    setConversations(updatedConversations);
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
    handleDeselectContact
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
