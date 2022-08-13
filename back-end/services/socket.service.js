var gIo = null;
function connectSockets(http, session) {
  gIo = require("socket.io")(http, {
    cors: {
      origin: "*",
    },
  });
  gIo.on("connection", (socket) => {
    socket.on("disconnect", (socket) => { });

    socket.on("user-connected", (userId) => {
      socket.userId = userId;
      socket.join(userId);
      gIo.emit("user-online", userId);
    });

    socket.on("unset-user-socket", (userId) => {
      delete socket.userId;
      gIo.emit("user-offline", userId);
    });

    socket.on("isUserConnected", async (userId) => {
      const userSocket = await _getUserSocket(userId);
      if (userSocket) gIo.emit("user-online", userId);
      else {
        gIo.emit("user-offline", userId);
      }
    });
    socket.on("new-message", ({ updatedChat, receiverId }) => {
      const user = updatedChat.users[0];
      delete updatedChat.users;
      updatedChat.user = user;
      gIo.to(receiverId).emit("add-message", updatedChat);
    });
    socket.on("new-chat", ({ chat, reciver }) => {
      const { users } = chat;
      chat.user = users[0]._id === reciver._id ? users[1] : users[0];
      delete chat.users;
      gIo.to(reciver._id).emit("add-chat", chat);
    });
    socket.on("user-typing", (chat) => {
      const { user } = chat;
      gIo.to(user._id).emit("on-user-typing", chat._id);
    });
    socket.on("chat-updated", ({ updatedChat, user }) => {
      const receiverId = updatedChat.user._id;
      updatedChat.user = user;
      gIo.to(receiverId).emit("on-chat-updated", updatedChat);
    });
  });
}

async function _getUserSocket(userId) {
  const sockets = await _getAllSockets();
  const socket = sockets.find((s) => {
    return s.userId == userId
  });
  return socket;
}
async function _getAllSockets() {
  const sockets = await gIo.fetchSockets();
  return sockets;
}
module.exports = {
  connectSockets,
};
