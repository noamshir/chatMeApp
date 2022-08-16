import io from "socket.io-client";

export const SOCKET_EMIT_CONNECTED = "user-connected";
export const SOCKET_ON_USER_ONLINE = "user-online";
export const SOCKET_EMIT_LOGOUT = "unset-user-socket";
export const SOCKET_ON_USER_OFFLINE = "user-offline";
export const SOCKET_EMIT_CHECK_USER_CONNECTED="isUserConnected"

export const SOCKET_EMIT_NEWMSG = "new-message";
export const SOCKET_EMIT_NEWCHAT = "new-chat";
export const SOCKET_ON_ADDMSG = "add-message";
export const SOCKET_ON_ADDCHAT = "add-chat";
export const SOCKET_EMIT_TYPING = "user-typing";
export const SOCKET_ON_TYPING = "on-user-typing";
export const SOCKET_EMIT_UPDATED_CHAT="chat-updated"
export const SOCKET_ON_UPDATE_CHAT="updateChat"


const baseUrl = process.env.NODE_ENV === "production" ? "" : "//localhost:3030";
export const socketService = createSocketService();

socketService.setup();

function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(baseUrl);
    },
    on(eventName, cb) {
      socket.on(eventName, cb);
    },
    leave(room) {
      socket.leave(room);
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName);
      else socket.off(eventName, cb);
    },
    emit(eventName, data) {
      socket.emit(eventName, data);
    },
    terminate() {
      socket = null;
    },
  };
  return socketService;
}
