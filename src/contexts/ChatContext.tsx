import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { chatSocket } from '@/lib/socket';
import { usePermissions } from './PermissionsContext';
import api from '@/lib/api';

interface ChatContextValue {
    unreadCounts: Record<string, number>;
    lastMessages: Record<string, { content: string; timestamp: string }>;
    incrementUnread: (chatId: string) => void;
    clearUnread: (chatId: string) => void;
    markAsRead: (chatId: string) => Promise<void>;
    activeChatId: string | null;
    setActiveChatId: (id: string | null) => void;
    totalGlobalUnread: number;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
    const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    const [lastMessages, setLastMessages] = useState<Record<string, { content: string; timestamp: string }>>({});
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const { currentUser } = usePermissions();
    const authUser = currentUser as any;
    const myId = authUser?.userId || authUser?.id || authUser?.pk || '';

    const incrementUnread = useCallback((chatId: string) => {
        setUnreadCounts(prev => ({
            ...prev,
            [chatId]: (prev[chatId] || 0) + 1
        }));
    }, []);

    const markAsRead = useCallback(async (chatId: string) => {
        try {
            await api.post('/api/chat/messages/mark_as_read/', { group_id: chatId });
        } catch (err) {
            console.error('Erro ao marcar como lida no backend:', err);
        }
    }, []);

    const clearUnread = useCallback((chatId: string) => {
        setUnreadCounts(prev => {
            const next = { ...prev };
            delete next[chatId];
            return next;
        });
        // Também avisa o backend
        markAsRead(chatId);
    }, [markAsRead]);

    // Initial hydration
    useEffect(() => {
        const fetchInitialUnread = async () => {
            try {
                const res = await api.get('/api/chat/groups/');
                const counts: Record<string, number> = {};
                res.data.forEach((group: any) => {
                    if (group.unread_count > 0) {
                        counts[String(group.id)] = group.unread_count;
                    }
                });
                setUnreadCounts(counts);
            } catch (err) {
                console.error('Erro ao buscar unread counts iniciais:', err);
            }
        };

        if (myId) {
            fetchInitialUnread();
        }
    }, [myId]);

    useEffect(() => {
        chatSocket.connect();

        const unsubscribe = chatSocket.subscribe('chat_message_broadcast', (data) => {
            const groupId = String(data.group_id || data.group || '');
            const senderId = String(data.sender_id);

            // Atualiza última mensagem em tempo real
            setLastMessages(prev => ({
                ...prev,
                [groupId]: {
                    content: data.message,
                    timestamp: data.timestamp
                }
            }));

            // Só incrementa se não for mensagem própria e não for o chat ativo
            if (senderId !== String(myId) && groupId !== String(activeChatId)) {
                setUnreadCounts(prev => ({
                    ...prev,
                    [groupId]: (prev[groupId] || 0) + 1
                }));
            }
        });

        return () => unsubscribe();
    }, [myId, activeChatId]);

    const totalGlobalUnread = Object.values(unreadCounts).reduce((a, b) => a + b, 0);

    return (
        <ChatContext.Provider value={{
            unreadCounts,
            lastMessages,
            incrementUnread,
            clearUnread,
            markAsRead,
            activeChatId,
            setActiveChatId,
            totalGlobalUnread
        }}>
            {children}
        </ChatContext.Provider>
    );
}

export function useChatContext() {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context;
}
