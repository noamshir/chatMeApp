import { httpService } from "./http.service";
import { socketService, SOCKET_EMIT_NEWCHAT } from "./socket.service";

export const chatService = {
  addChat,
  getChatsByUser,
  updateChat,
  uploadImg,
};

const CLOUD_NAME = "dbyslg0cu";
const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const preset = "rak3cbfo";

async function addChat(chat, id) {
  try {
    const addedChat = await httpService.post("chat", chat);
    const { users } = addedChat;
    const reciver = users[0]._id === id ? users[1] : users[0];
    socketService.emit(SOCKET_EMIT_NEWCHAT, { chat: addedChat, reciver });
    delete addedChat.users;
    addedChat.user = reciver;
    return addedChat;
  } catch (error) {
    console.log("error while adding chat to user: ", error);
  }
}

async function getChatsByUser() {
  try {
    return await httpService.get("chat/user-chats");
  } catch (error) {
    console.log("error while getting chats of user: ", error);
  }
}

async function updateChat(chat) {
  try {
    return await httpService.put("chat", chat);
  } catch (error) {
    console.log("error while updating chat: ", error);
  }
}

async function uploadImg(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", preset);
  try {
    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    });
    const { url } = await res.json();
    return url;
  } catch (error) {
    console.log("error while uploading img to cloudinery!");
  }
}
