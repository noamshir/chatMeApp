import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ChatDetails from '../cmp/chat-details/ChatDetails'
import ChatContent from '../cmp/chat/ChatContent'
import SideBar from '../cmp/sidebar/SideBar'
import { ChatContext } from '../context/chatContext'
import screenService from '../services/screen.service'
import { socketService, SOCKET_EMIT_UPDATED_CHAT } from '../services/socket.service'
import { utilService } from '../services/util.service'
import { loadChats, socketAddChat, socketUpdateChat, updateChat } from '../store/chat.action'

export default function Chat() {
    const [currChat, setChat] = useState();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(screenService.isMobile(document.body.clientWidth))
    const [renderConversation, setRenderConversation] = useState(false)
    const [renderSideBar, setRenderSideBar] = useState(false)
    const { chats } = useSelector(({ chatModule }) => chatModule);
    const { user } = useSelector(({ userModule }) => userModule);
    const dispatch = useDispatch()

    useEffect(() => {
        loadUserChats();
        const handleWindowResize = window.addEventListener('resize', () => {
            setIsMobile(screenService.isMobile(document.body.clientWidth))
        });
        return () => {
            window.removeEventListener('resize', handleWindowResize)
        };
    }, [])

    useEffect(() => {
        if (!isMobile) {
            setRenderConversation(true)
            setRenderSideBar(true)
        }
        else {
            if (!currChat) {
                setRenderConversation(false)
                setRenderSideBar(true)
            }
            else {
                setRenderConversation(true)
                setRenderSideBar(false)
            }
        }

    }, [isMobile, currChat]);

    const onReceivedMsg = (chat) => {
        const onUpdatedChat = chats.find(cChat => cChat._id === chat._id);
        const currMsgs = onUpdatedChat.msgs;
        const msgs = chat.msgs.map((msg, idx) => {
            if (currMsgs.length > idx) {
                if (currMsgs[idx].viewers.includes(user._id) && !(msg.viewers.includes(user._id))) {
                    const updatedMsg = { ...msg };
                    updatedMsg.viewers.push(user._id);
                    return updatedMsg;
                }
                else {
                    return msg
                }
            }
            else {
                return msg;
            }
        })
        const updatedChat = { ...chat, msgs };
        dispatch(socketUpdateChat(updatedChat))
        if (updatedChat._id === currChat?._id) {
            updatedChat.msgs = utilService.markAllAsRead(msgs, user._id)
            setChat(updatedChat);
            socketService.emit(SOCKET_EMIT_UPDATED_CHAT, { updatedChat, user });
            const chatToUpdate = { ...updatedChat };
            chatToUpdate.users = [user, updatedChat.user]
            delete chatToUpdate.user
            dispatch(updateChat(chatToUpdate));
        }
    }

    const loadUserChats = async () => {
        dispatch(loadChats());
    }

    const onChatUpdated = (chat) => {
        dispatch(socketUpdateChat(chat))
    }

    const onAddChat = (chat) => {
        dispatch(socketAddChat(chat))
    }

    return (
        <section className="main-app-chat  flex">
            <ChatContext.Provider value={{ currChat, setChat, isMobile }}>
                {(!isMobile || isMobile && renderSideBar) && <SideBar onReceivedMsg={onReceivedMsg} onChatUpdated={onChatUpdated} onAddChatFromSocket={onAddChat} />}
                {(!isMobile || isMobile && renderConversation) && <ChatContent chat={currChat} openUserDetails={() => setIsDetailsOpen(true)} onReceivedMsg={onReceivedMsg} onChatUpdated={onChatUpdated} onAddChat={onAddChat} />}
                {/* {isDetailsOpen && <ChatDetails close={() => setIsDetailsOpen(false)} />} */}
            </ChatContext.Provider>
        </section>
    )
}
