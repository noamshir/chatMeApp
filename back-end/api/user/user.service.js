const dbService = require("../../services/db.service");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
  query,
  getById,
  getByUsername,
  remove,
  update,
  add,
};

async function query(userId) {
  try {
    const collection = await dbService.getCollection("user");
    var users = await collection
      .find({ _id: { $ne: ObjectId(userId) } })
      .toArray();
    users = users.map((user) => {
      delete user.password;
      return user;
    });
    return users;
  } catch (err) {
    logger.error("cannot find users", err);
    throw err;
  }
}

async function getById(userId) {
  try {
    const collection = await dbService.getCollection("user");
    const user = await collection.findOne({ _id: ObjectId(userId) });
    delete user.password;
    user.createdAt = ObjectId(user._id).getTimestamp();
    return user;
  } catch (err) {
    logger.error(`while finding user ${userId}`, err);
    throw err;
  }
}

async function getByUsername(username) {
  try {
    const collection = await dbService.getCollection("user");
    const user = await collection.findOne({ username });
    return user;
  } catch (err) {
    logger.error(`while finding user ${username}`, err);
    throw err;
  }
}

//didnt try
async function remove(userId) {
  try {
    const collection = await dbService.getCollection("user");
    await collection.deleteOne({ _id: ObjectId(userId) });
  } catch (err) {
    logger.error(`cannot remove user ${userId}`, err);
    throw err;
  }
}
//didnt try
async function update(user) {
  try {
    var id = ObjectId(user._id);
    delete user._id;
    const collection = await dbService.getCollection("user");
    await collection.updateOne({ _id: id }, { $set: { ...user } });
    user._id = id;
    return user;
  } catch (err) {
    logger.error(`cannot update user ${user._id}`, err);
    throw err;
  }
}

async function add(user) {
  try {
    const collection = await dbService.getCollection("user");
    await collection.insertOne(user);
    return user;
  } catch (err) {
    logger.error("cannot insert user", err);
    throw err;
  }
}
