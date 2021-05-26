// const { allCollections, arrNamesCollections } = require('./app')
const mongoose = require('mongoose')
mongoose.pluralize(null)
const MongoClient = require('mongodb').MongoClient
const MONGODB_URI =
  'mongodb+srv://Chat:MYPASSWORD@cluster0.pyfv2.mongodb.net/ChatRoomsReact?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const allCollections = {}
const arrNamesCollections = []
const { roomsSchema } = require('./schemas/schema.mongoose')

const mongoClient = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoClient.connect(function (err, client) {
  if (err) return mongoose.disconnect()

  const db = client.db('ChatRoomsReact')

  db.listCollections().toArray(function (err, collInfos) {
    collInfos.forEach((elem) => {
      arrNamesCollections.push(elem.name)
      Work_DB.syncCollection(elem.name)
    })
  })
})

class Work_DB {
  static async syncCollection(nameTable) {
    allCollections[nameTable] = mongoose.model(nameTable, roomsSchema)
    try {
      await allCollections[nameTable].createCollection()
    } catch (err) {
      console.log(`Ошибка синхронизации коллекции: ${err}`)
      return
    }
  }

  static async deleteRoom(collectionName) {
    return await collectionName.collection.drop()
  }

  static async allMessages(collectionName) {
    let arr

    try {
      await new Promise((resolve) => {
        collectionName.find({}, (err, docs) => {
          if (err) return console.log(`Ошибка поиска в БД: ${err}`)
          arr = docs
          resolve()
        })
      })
    } catch (err) {
      console.log('Ошибка при загрузке всех сообщений')
    }
    return arr
  }

  static async newMessage(collectionName, user, message) {
    let obj

    try {
      await new Promise((resolve) => {
        collectionName.create(
          { user, message, createdAt: new Date() },
          (err, doc) => {
            if (err) return console.log('Ошибка в добавлении в БД')
            obj = {
              _id: doc._id,
              user: doc.user,
              message: doc.message,
              createdAt: doc.createdAt,
            }
            resolve()
          }
        )
      })
    } catch (err) {
      console.log('Ошибка при добавлении нового сообщения')
    }
    return obj
  }
}

module.exports = { Work_DB, allCollections, arrNamesCollections }
