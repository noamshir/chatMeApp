import React, { useContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { ChatContext } from '../../context/chatContext'
import { socketService, SOCKET_ON_TYPING } from '../../services/socket.service';
import { utilService } from '../../services/util.service';
import { getReceiver } from '../../utils/chat_utils';
import { formatTime } from '../../utils/time';
import UserProfileImage from '../profile/UserProfileImage'

export default function ChatPreview({ chat, receiver }) {

    const { currChat, setChat } = useContext(ChatContext);
    const { user } = useSelector(({ userModule }) => userModule)
    const [unreadCount, setUnreadCount] = useState(utilService.getUnreadMsgCount(chat.msgs, user._id))
    const [isTyping, setIsTyping] = useState(false)
    const [gTimeout, setGTimeout] = useState(null)


    useEffect(() => {
        setSockets();
        return () => {
            clearSockets();
            setGTimeout(null)
        }
    }, [])

    useEffect(() => {
        setUnreadCount(utilService.getUnreadMsgCount(chat.msgs, user._id))
    }, [chat])

    const setSockets = () => {
        socketService.on(SOCKET_ON_TYPING, (chatId) => {
            if (chat._id === chatId) {
                setIsTyping(true);
                setGTimeout(null)
                setGTimeout(setTimeout(() => {
                    setIsTyping(false)
                }, 3000))
            }
        })
    }

    const clearSockets = () => {
        socketService.off(SOCKET_ON_TYPING);
    }

    const isChatCurrentChat = () => {
       const currChatReceiver = currChat ? getReceiver(currChat.users, user) : {}
       return receiver._id === currChatReceiver._id
    }

    const onSetCurrentChat = () => {
        if (isChatCurrentChat()) return
        setChat(chat)
        }

    const getSubContent = (msgs, msgsLength) => {
        let sub = (msgs[0]) ? chat.msgs[msgsLength - 1].txt : "New Chat"
        if (!sub) sub = "Photo";
        sub = (isTyping) ? "typing..." : sub;
        if (sub.length > 10) sub = sub.slice(0, 8) + '...'
        return sub
    }

    const msgs = chat?.msgs
    const msgsLength = msgs.length
    const sub = getSubContent(msgs, msgsLength)
    const activeClass = currChat?._id === chat._id ? "active" : "";
    const timeLastMsgSent = (msgsLength > 0) ? formatTime(msgs[msgsLength - 1].sentAt) : null
    
    return (
        <div onClick={onSetCurrentChat} className={`chat-preview flex ${activeClass}`}>
            <UserProfileImage user={receiver} />
            <div className="chat-preview-content">
                <h1>{receiver.username}</h1>
                <p>{sub}</p>
            </div>
            <div className="chat-preview-container">
                {timeLastMsgSent && <span className='chat-last-active-time'>{timeLastMsgSent}</span>}
                {(unreadCount > 0) && <div className="unread-count">
                    <h1>{unreadCount}</h1>
                </div>}
            </div>
        </div>
    )
}
