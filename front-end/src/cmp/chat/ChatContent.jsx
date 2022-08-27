import React, { useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ChatHeader from './ChatHeader'
import ChatList from './ChatList'
import ChatMsgSend from './ChatMsgSend'

import {
  socketService,
  SOCKET_EMIT_CONNECTED,
  SOCKET_ON_ADDCHAT,
  SOCKET_ON_ADDMSG,
  SOCKET_ON_UPDATE_CHAT,
} from '../../services/socket.service'
import NoMsg from './NoMsg'
import { ChatContext } from '../../context/chatContext'
import { addChat, updateChat } from '../../store/chat.action'
import { getReceiver } from '../../utils/chat_utils'
import { utilService } from '../../services/util.service'

export default function ChatContent({
  openUserDetails,
  onReceivedMsg,
  onChatUpdated,
  onAddChat,
}) {
  const { user } = useSelector(({ userModule }) => userModule)
  const { chats } = useSelector(({ chatModule }) => chatModule)
  const dispatch = useDispatch()

  const { currChat, setChat, isMobile } = useContext(ChatContext)

  useEffect(() => {
    const unreadCount = utilService.getUnreadMsgCount(currChat?.msgs, user._id)
    if (unreadCount) {
      const updatedMsgs = utilService.markAllAsRead(currChat.msgs, user._id)
      const updatedChat = { ...currChat, msgs: updatedMsgs }
      const receiver = getReceiver(currChat.users, user)
      const receiverId = receiver?._id
      setChat(updatedChat)
      dispatch(updateChat(updatedChat, receiverId))
    }
  }, [currChat, chats])

  useEffect(() => {
    socketService.emit(SOCKET_EMIT_CONNECTED, user._id)
    socketService.on(SOCKET_ON_ADDMSG, onReceivedMsg)
    socketService.on(SOCKET_ON_UPDATE_CHAT, onChatUpdated)
    socketService.on(SOCKET_ON_ADDCHAT, onAddChat)
    return () => {
      disconnectSockets()
    }
  }, [isMobile, user, chats, currChat])

  const disconnectSockets = () => {
    socketService.off(SOCKET_ON_ADDMSG)
    socketService.off(SOCKET_ON_UPDATE_CHAT)
    socketService.off(SOCKET_ON_ADDCHAT)
  }

  const addMsg = async (msg) => {
    const updatedChat = { ...currChat }
    updatedChat.msgs.push(msg)
    setChat(updatedChat)
    const receiver = getReceiver(currChat.users, user)
    const receiverId = receiver?._id
    if (updatedChat._id) {
      const withNewMsg = true
      await dispatch(updateChat(updatedChat, receiverId, withNewMsg))
    } else {
      const addedChat = await dispatch(addChat(updatedChat, receiverId))
      setChat(addedChat)
    }
  }

  return (
    <section className='chat flex column'>
      {!currChat || !currChat.msgs ? (
        <NoMsg />
      ) : (
        <>
          <ChatHeader
            receiver={getReceiver(currChat.users, user)}
            openUserDetails={openUserDetails}
          />
          <ChatList msgs={currChat.msgs} chatId={currChat._id} />
          <ChatMsgSend sendMsg={addMsg} chat={currChat} user={user} />
        </>
      )}
    </section>
  )
}
