import React from 'react'
import { useSelector } from 'react-redux'

import { getReceiver } from '../../utils/chat'
import ChatPreview from './ChatPreview'

export default function ChatList({ chats }) {
  const { user } = useSelector(({ userModule }) => userModule)

  return (
    <section className='chat-list-container'>
      {chats &&
        chats.map((chat) => (
          <ChatPreview
            chat={chat}
            receiver={getReceiver(chat.users, user)}
            key={chat._id}
          />
        ))}
    </section>
  )
}
