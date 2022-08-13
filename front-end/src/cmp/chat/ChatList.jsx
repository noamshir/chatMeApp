import React, { useEffect, useState } from 'react'
import { socketService, SOCKET_ON_TYPING } from '../../services/socket.service';
import ChatBubble from "./ChatBubble"
import ChatBubbleTyping from './ChatBubbleTyping';
import ImageMsg from './ImageMsg';
import NoMsg from './NoMsg'

export default function ChatList({ msgs, chatId }) {
    const [isTyping, setIsTyping] = useState(false)
    const [gTimeout, setGTimeout] = useState(null)

    useEffect(() => {
        setSockets();
        return () => {
            clearSockets();
            setGTimeout(null)
        }
    }, [chatId])

    const setSockets = () => {
        socketService.on(SOCKET_ON_TYPING, (id) => {
            if (id === chatId) {
                setIsTyping(true);
                setGTimeout(null)
                setGTimeout(setTimeout(() => {
                    setIsTyping(false)
                }, 5000))
            }
        })
    }

    const clearSockets = () => {
        socketService.off(SOCKET_ON_TYPING)
    }

    return (
        <section className="chat-list">
            {msgs.length > 0 && <ul className="clean-list">
                {msgs.map(msg => {
                    return (msg.imgUrl) ? <ImageMsg key={msg.sentAt} msg={msg} /> : (
                        <ChatBubble msg={msg} key={msg.sentAt} />
                    )
                })}
                {(isTyping) && <ChatBubbleTyping />}
            </ul>}

            {!msgs.length && <NoMsg />}
        </section>
    )
}
