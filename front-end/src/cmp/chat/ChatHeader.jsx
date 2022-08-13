import React, { useEffect, useState, useContext } from 'react'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { socketService, SOCKET_EMIT_CHECK_USER_CONNECTED, SOCKET_ON_USER_ONLINE, SOCKET_ON_USER_OFFLINE } from '../../services/socket.service';
import { ChatContext } from '../../context/chatContext'

export default function ChatHeader({ user, openUserDetails }) {

    const [isOnline, setIsOnline] = useState(false)

    const { setChat, isMobile } = useContext(ChatContext);

    useEffect(() => {
        setSockets()
        return () => {
            disableSockets()
        }
    }, [user])

    const setSockets = () => {
        socketService.emit(SOCKET_EMIT_CHECK_USER_CONNECTED, user._id);
        socketService.on(SOCKET_ON_USER_ONLINE, (userId) => {
            if (user._id === userId) setIsOnline(true);
        })
        socketService.on(SOCKET_ON_USER_OFFLINE, (userId) => {
            if (user._id === userId) setIsOnline(false);
        })
    }

    const disableSockets = () => {
        socketService.off(SOCKET_ON_USER_ONLINE)
        socketService.off(SOCKET_ON_USER_OFFLINE)
    }

    const clearSelectedChat = () => {
        setChat(null)
    }

    const onlineClass = isOnline ? "online" : "offline";

    return (
        <header className="chat-header flex">
            <div className="chat-header-main flex">
                {isMobile && <button className="back-btn" onClick={clearSelectedChat}>
                    <ArrowBackIcon />
                </button>}
                <i className={`online-status ${onlineClass}`}></i>
                <h1 onClick={openUserDetails}>{user.username}</h1>
            </div>
            <div className="chat-header-btns flex">
                <button className="header-chat-btn">
                    <LocalPhoneIcon />
                </button>
                <button className="header-chat-btn">
                    <VideocamOutlinedIcon />
                </button>
            </div>
        </header>
    )
}
