import { chatService } from '../services/chat.service'

export function loadChats() {
  return async (dispatch) => {
    try {
      const chats = await chatService.getChatsByUser()
      dispatch({ type: 'SET_CHATS', chats })
    } catch (error) {
      console.error({ error })
      dispatch({ type: 'SET_CHATS', chats: [] })
    }
  }
}

export function addChatToDb(chat, receiverId) {
  return async (dispatch) => {
    try {
      const addedChat = await chatService.addChat(chat, receiverId)
      dispatch({ type: 'ADD_CHAT', chat: addedChat })
      return addedChat
    } catch (error) {
      console.error({ error })
      return null
    }
  }
}

export function addChatToStore(chat) {
  return (dispatch) => {
    dispatch({ type: 'START_NEW_CHAT', chat })
  }
}

export function updateChat(chat, receiverId, withNewMsg = false) {
  return async (dispatch) => {
    try {
      const updatedChat = await chatService.updateChat(
        chat,
        receiverId,
        withNewMsg
      )
      dispatch({ type: 'UPDATE_CHAT', updatedChat })
      return updatedChat
    } catch (error) {
      console.error({ error })
    }
  }
}

export function updateChatInStore(updatedChat) {
  return (dispatch) => {
    dispatch({ type: 'UPDATE_CHAT', updatedChat })
  }
}

export function setChats(chats) {
  return async (dispatch) => {
    dispatch({ type: 'SET_CHATS', chats })
  }
}
