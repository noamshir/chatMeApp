import { httpService } from './http.service';
import { socketService, SOCKET_EMIT_NEWCHAT, SOCKET_EMIT_NEWMSG, SOCKET_EMIT_UPDATED_CHAT } from './socket.service';

export const chatService = {
  addChat,
  getChatsByUser,
  updateChat,
  uploadImg,
};

const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME;
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const preset = process.env.REACT_APP_PRESET;

async function addChat(chat, receiverId) {
  try {
    const newChat = await httpService.post("chat", chat);
    socketService.emit(SOCKET_EMIT_NEWCHAT, {newChat, receiverId})
    return newChat;
  } catch (error) {
    console.log("error while adding chat to user: ", error);
  }
}

async function getChatsByUser() {
  try {
    return await httpService.get('chat/user-chats');
  } catch (error) {
    console.log('error while getting chats of user: ', error);
  }
}

async function updateChat(chat, receiverId, withNewMsg=false) {
  try {
    const updatedChat = await httpService.put('chat', chat);
    if(withNewMsg) {
      socketService.emit(SOCKET_EMIT_NEWMSG, { chat: updatedChat, receiverId })
    } else socketService.emit(SOCKET_EMIT_UPDATED_CHAT, { updatedChat, receiverId })
    return updatedChat
  } catch (error) {
    console.log('error while updating chat: ', error);
  }
}

async function uploadImg(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);
  try {
    const res = await fetch(UPLOAD_URL, {
      method: 'POST',
      body: formData,
    });
    const { url } = await res.json();
    return url;
  } catch (error) {
    console.log('error while uploading img to cloudinery!');
  }
}
