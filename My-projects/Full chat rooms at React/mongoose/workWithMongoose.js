const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.pluralize(null)
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const mongoClient = new MongoClient(url, { useUnifiedTopology: true })

const allCollections = {}
const arrNamesCollections = []

mongoClient.connect(function (err, client) {
  if (err) {
    console.log(err)
    return mongoose.disconnect()
  }

  const db = client.db('ChatRoomsReact')

  db.listCollections().toArray(function (err, collInfos) {
    collInfos.forEach((elem) => {
      arrNamesCollections.push(elem.name)
      MongoMethods.getRoom(elem.name)
    })
  })
})

const roomsSchema = new Schema(
  {
    user: {
      type: String,
      minlength: 3,
      maxlength: 20
    },
    message: {
      type: String,
      minlength: 1
    },
    createdAt: Date
  },
  { versionKey: false },
  { minimize: false }
)

try {
  mongoose.connect('mongodb://localhost:27017/ChatRoomsReact', {
    useUnifiedTopology: true
  })
} catch (err) {
  console.log(err)
}

class MongoMethods {
  static async getRoom(collectionRoom) {
    collectionRoom = mongoose.model(room, roomsSchema)
    try {
      await collectionRoom.createCollection()
      console.log('Коллекция  успешно синхронизирована с БД.')
    } catch (err) {
      console.log(`Ошибка синхронизации коллекции: ${err}`)
    }
  }

  static async getMessages(collectionRoom) {
    collectionRoom.find({}, (err, docs) => {
      if (err) return console.log(`Ошибка поиска в БД: ${err}`)
      return docs
    })
  }

  static async addMessages(collectionRoom, user, message) {
    let obj
    await new collectionRoom((resolve) => {
      collectionName.create(
        { user, message, createdAt: new Date() },
        (err, doc) => {
          if (err) return console.log('Ошибка в добавлении в БД')
          obj = {
            _id: doc._id,
            user: doc.user,
            message: doc.message,
            createdAt: doc.createdAt
          }
          resolve()
        }
      )
    })
    return obj
  }
}

module.export = { allCollections, arrNamesCollections, MongoMethods }
