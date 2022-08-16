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

    socket.on("new-message", ({ chat, receiverId }) => {
      gIo.to(receiverId).emit("add-message", chat);
    });

    socket.on("new-chat", ({ newChat, receiverId }) => {
      gIo.to(receiverId).emit("add-chat", newChat);
    });

    socket.on("user-typing", ({chatId, receiverId}) => {
      gIo.to(receiverId).emit("on-user-typing", chatId);
    });

    socket.on("chat-updated", ({ updatedChat, receiverId }) => {
      gIo.to(receiverId).emit("updateChat", updatedChat);
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
