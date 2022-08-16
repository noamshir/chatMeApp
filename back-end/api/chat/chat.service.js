const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
module.exports = {
  add,
  getByUserId,
  update,
}

async function add(chat) {
  try {
    const collection = await dbService.getCollection('chat')
    const { insertedId } = await collection.insertOne(chat)
    const addedChat = { ...chat, _id: insertedId }
    return addedChat
  } catch (error) {
    console.log('error adding chat to user: ', error)
  }
}

async function getByUserId(id) {
  try {
    const collection = await dbService.getCollection('chat')
    const chats = await collection
      .find({ users: { $elemMatch: { _id: id } } })
      .toArray()
    return chats
  } catch (error) {
    console.log('error getting user chats: ', error)
  }
}

async function update(chat) {
  try {
    const { _id, ...chatWithoutId } = chat
    let id = ObjectId(_id)
    const collection = await dbService.getCollection('chat')
    await collection.updateOne({ _id: id }, { $set: { ...chatWithoutId } })
    chat._id = id
    return chat
  } catch (error) {
    console.log('error while updating chat')
  }
}
