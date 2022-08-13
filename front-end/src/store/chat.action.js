import { chatService } from "../services/chat.service";

export function loadChats() {
  return async (dispatch) => {
    const chats = await chatService.getChatsByUser();
    dispatch({ type: "SET_CHATS", chats });
  };
}

export function addChat(chat, user) {
  return async (dispatch) => {
    try {
      const addedChat = await chatService.addChat(chat, user._id);
      dispatch({ type: "ADD_CHAT", chat: addedChat });
      return addedChat;
    } catch (error) {
      return null;
    }
  };
}

export function socketAddChat(chat) {
  return (dispatch) => {
    dispatch({ type: "ADD_CHAT", chat });
  };
}

export function updateChat(chat) {
  return async (dispatch) => {
    const updatedChat = await chatService.updateChat(chat);
    dispatch({ type: "UPDATE_CHAT", updatedChat });
  };
}

export function socketUpdateChat(updatedChat) {
  return (dispatch) => {
    dispatch({ type: "UPDATE_CHAT", updatedChat });
  };
}
