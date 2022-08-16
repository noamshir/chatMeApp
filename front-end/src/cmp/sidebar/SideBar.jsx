import React, { useState, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ChatList from './ChatList'
import Search from './Search'
import SideBarHeader from './SideBarHeader'
import AddChatModal from '../AddChatModal'

import { logout } from '../../store/user.action'
import { addChatToStore } from '../../store/chat.action'

import { socketService, SOCKET_EMIT_CONNECTED, SOCKET_EMIT_LOGOUT, SOCKET_ON_ADDCHAT, SOCKET_ON_ADDMSG, SOCKET_ON_UPDATE_CHAT } from '../../services/socket.service'
import { ChatContext } from '../../context/chatContext'

export default function SideBar({ onReceivedMsg, onChatUpdated, addNewChat }) {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { currChat, setChat, isMobile } = useContext(ChatContext);
    const user = useSelector(({ userModule }) => userModule.user)
    const chats = useSelector(({ chatModule }) => chatModule.chats)
    const [selectedReceiver, setSelectedReceiver] = useState()

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_CONNECTED, user._id)
    }, [user]);

    useEffect(() => {
        if(isMobile) {
            socketService.on(SOCKET_ON_ADDMSG, onReceivedMsg)
            socketService.on(SOCKET_ON_UPDATE_CHAT, onChatUpdated)
            socketService.on(SOCKET_ON_ADDCHAT, addNewChat)
        } else disconnectSockets()
        return () => {
            disconnectSockets()
        };
    }, [isMobile, user, chats, currChat]);

    const disconnectSockets = () => {
        socketService.off(SOCKET_ON_ADDMSG)
        socketService.off(SOCKET_ON_UPDATE_CHAT)
        socketService.off(SOCKET_ON_ADDCHAT)
    }

    const onLogout = async () => {
        await dispatch(logout())
        socketService.emit(SOCKET_EMIT_LOGOUT, user._id);
    }
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    const onAddNewChat = async (chat) => {
        dispatch(addChatToStore(chat));
        setChat(chat);
    }
    return (
        <section className="side-bar flex column">
            <SideBarHeader isMobile={isMobile} logout={onLogout} toggleAddChatModal={toggleModal} />
            {!isMobile && <Search />}
            <ChatList chats={chats} />
            {isModalOpen && <AddChatModal toggleModal={toggleModal} addChat={onAddNewChat} selectedReceiver={selectedReceiver} setSelectedReceiver={setSelectedReceiver} />}
        </section>
    )
}
