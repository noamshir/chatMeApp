const chatService = require('../chat/chat.service');

async function addChat(req, res) {
  const chat = req.body;
  try {
    const addedChat = await chatService.add(chat);
    res.send(addedChat);
  } catch (error) {
    res.status(500).send('error adding chat');
  }
}

async function getUserChats(req, res) {
  const { user } = req.session;
  console.log(`getting user ${user._id} chats`)
  try {
    const chats = await chatService.getByUserId(user._id);
    res.send(chats);
  } catch (error) {
    res.status(500).send('failed to get users chats');
  }
}

async function updateChat(req, res) {
  const chat = req.body;
  const { user } = req.session;
  try {
    const updatedChat = await chatService.update(chat, user._id);
    res.send(updatedChat);
  } catch (error) {
    res.status(500).send('error updating chat');
  }
}

module.exports = {
  addChat,
  getUserChats,
  updateChat,
};
