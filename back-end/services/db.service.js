const { MongoClient } = require('mongodb')

const config = {
  mongoURL: process.env.MONGO_URI,
  dbName: process.env.DB_NAME,
}

const client = new MongoClient(config.mongoURL)

let mongoClient = null

async function getCollection(collectionName) {
  try {
    const collection = await mongoClient.collection(collectionName)
    return collection
  } catch (err) {
    console.error('Failed to get Mongo collection', err)
    throw err
  }
}

async function connectToMongo() {
  if (!mongoClient) {
    try {
      await client.connect()
      console.log('Connected to mongo client!')
      mongoClient = client.db(config.dbName)
    } catch (err) {
      console.error('Cannot Connect to DB', err)
      throw err
    }
  }
}

async function getMongoClient() {
  return await MongoClient.connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

async function closeMongoConnection() {
  await client.close()
  console.log('Closed MongoDB connection')
}

module.exports = {
  getCollection,
  connectToMongo,
  getMongoClient,
  closeMongoConnection,
}
