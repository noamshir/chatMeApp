import React from 'react'
import ChatPreview from './ChatPreview'
export default function ChatList({ chats }) {
    
    return (
        <section className="chat-list-container">
            {(chats) && chats.map(chat => <ChatPreview chat={chat} key={chat.user._id} />)}
        </section >
    )
}
