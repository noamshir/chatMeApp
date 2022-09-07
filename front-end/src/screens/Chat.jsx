import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ChatContent from '../cmp/chat/ChatContent'
import SideBar from '../cmp/sidebar/SideBar'
import { ChatContext } from '../context/chatContext'
import notifyUser from '../services/notification.service'
import screenService from '../services/screen.service'
import {
  socketService,
  SOCKET_EMIT_UPDATED_CHAT,
} from '../services/socket.service'
import { utilService } from '../services/util.service'
import {
  loadChats,
  addChatToStore,
  updateChatInStore,
  updateChat,
} from '../store/chat.action'

export default function Chat() {
  const [currChat, setChat] = useState()
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(
    screenService.isMobile(document.body.clientWidth)
  )
  const [renderConversation, setRenderConversation] = useState(false)
  const [renderSideBar, setRenderSideBar] = useState(false)
  const { chats } = useSelector(({ chatModule }) => chatModule)
  const { user } = useSelector(({ userModule }) => userModule)
  const dispatch = useDispatch()

  useEffect(() => {
    loadUserChats()
    const handleWindowResize = window.addEventListener('resize', () => {
      setIsMobile(screenService.isMobile(document.body.clientWidth))
    })
    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setRenderConversation(true)
      setRenderSideBar(true)
    } else {
      if (!currChat) {
        setRenderConversation(false)
        setRenderSideBar(true)
      } else {
        setRenderConversation(true)
        setRenderSideBar(false)
      }
    }
  }, [isMobile, currChat])

  const onReceivedMsg = (chatWithNewMsg) => {
    const onUpdatedChat = chats.find(
      (cChat) => cChat._id === chatWithNewMsg._id
    )
    const currMsgs = onUpdatedChat.msgs
    const msgs = chatWithNewMsg.msgs.map((msg, idx) => {
      if (currMsgs.length > idx) {
        if (
          currMsgs[idx].viewers.includes(user._id) &&
          !msg.viewers.includes(user._id)
        ) {
          const updatedMsg = { ...msg }
          updatedMsg.viewers.push(user._id)
          return updatedMsg
        } else {
          return msg
        }
      } else {
        return msg
      }
    })
    if (msgs && msgs.length) {
      const { txt, from } = msgs[msgs.length - 1]
      notifyUser(txt, from.username)
    }
    const updatedChat = { ...chatWithNewMsg, msgs }
    dispatch(updateChatInStore(updatedChat))
    if (updatedChat._id === currChat?._id) {
      updatedChat.msgs = utilService.markAllAsRead(msgs, user._id)
      setChat(updatedChat)
      socketService.emit(SOCKET_EMIT_UPDATED_CHAT, { updatedChat, user })
      dispatch(updateChat(updatedChat))
    }
  }

  const loadUserChats = async () => {
    dispatch(loadChats())
  }

  const onChatUpdated = (chat) => {
    dispatch(updateChatInStore(chat))
  }

  const onAddChat = (chat) => {
    dispatch(addChatToStore(chat))
  }

  return (
    <section className='main-app-chat  flex'>
      <ChatContext.Provider value={{ currChat, setChat, isMobile }}>
        {(!isMobile || (isMobile && renderSideBar)) && (
          <SideBar
            onReceivedMsg={onReceivedMsg}
            onChatUpdated={onChatUpdated}
            addNewChat={onAddChat}
          />
        )}
        {(!isMobile || (isMobile && renderConversation)) && (
          <ChatContent
            openUserDetails={() => setIsDetailsOpen(true)}
            onReceivedMsg={onReceivedMsg}
            onChatUpdated={onChatUpdated}
            onAddChat={onAddChat}
          />
        )}
      </ChatContext.Provider>
    </section>
  )
}
