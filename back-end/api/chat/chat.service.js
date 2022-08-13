const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;
module.exports = {
  add,
  getByUserId,
  update,
};

async function add(chat) {
  try {
    const collection = await dbService.getCollection('chat');
    const { insertedId } = await collection.insertOne(chat);
    const addedChat = { ...chat, _id: insertedId };
    return addedChat;
  } catch (error) {
    console.log('error adding chat to user: ', error);
  }
}

async function getByUserId(id) {
  try {
    const collection = await dbService.getCollection('chat');
    const chats = await collection
      .find({ users: { $elemMatch: { _id: id } } })
      .toArray();
    chats.forEach((chat) => {
      const { users } = chat;
      delete chat.users;
      chat.user = users[0]._id === id ? users[1] : users[0];
    });
    return chats;
  } catch (error) {
    console.log('error getting user chats: ', error);
  }
}

async function update(chat, userId) {
  try {
    var id = ObjectId(chat._id);
    delete chat._id;
    const collection = await dbService.getCollection('chat');
    await collection.updateOne({ _id: id }, { $set: { ...chat } });
    chat._id = id;
    const { users } = chat;
    delete chat.users;
    chat.user = users[0]._id === userId ? users[1] : users[0];
    return chat;
  } catch (error) {
    console.log('error while updating chat');
  }
}
