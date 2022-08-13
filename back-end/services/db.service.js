const { MongoClient } = require('mongodb');

const config = {
  dbURL: process.env.MONGO_URI,
};

// Database Name
const databaseName = process.env.DB_NAME;

let mongoClient = null;

async function getCollection(collectionName) {
  try {
    const collection = await mongoClient.collection(collectionName);
    return collection;
  } catch (err) {
    console.error('Failed to get Mongo collection', err);
    throw err;
  }
}

async function connectToMongo() {
  if (mongoClient) return mongoClient;
  try {
    const client = await MongoClient.connect(config.dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const dbInstance = client.db(databaseName);
    console.log('connected to mongo client')
    mongoClient = dbInstance;
    return dbInstance;
  } catch (err) {
    console.error('Cannot Connect to DB', err);
    throw err;
  }
}

module.exports = {
  getCollection,
  connectToMongo
};
