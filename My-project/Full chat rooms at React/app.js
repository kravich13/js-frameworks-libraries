const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.pluralize(null)
const PORT = process.env.PORT || 5000

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'
const mongoClient = new MongoClient(url, { useUnifiedTopology: true })

const allCollections = {}
const arrNamesCollections = []
const connections = []

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoClient.connect(function (err, client) {
  if (err) {
    console.log(err)
    return mongoose.disconnect()
  }

  const db = client.db('ChatRoomsReact')

  db.listCollections().toArray(function (err, collInfos) {
    collInfos.forEach((elem) => {
      arrNamesCollections.push(elem.name)
      addRoomsInMongoDB(elem.name)
    })
  })
})

// app.use('/rooms', require('./routes/rooms'))

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

async function addRoomsInMongoDB(nameTable) {
  allCollections[nameTable] = mongoose.model(nameTable, roomsSchema)
  try {
    await allCollections[nameTable].createCollection()
    console.log(`Коллекция ${nameTable} успешно синхронизирована с БД.`)
  } catch (err) {
    console.log(`Ошибка синхронизации коллекции: ${err}`)
  }
}

app.post('/rooms', async (req, res) => {
  try {
    if (!req.body) return

    res.json(arrNamesCollections)
  } catch (e) {
    res.status(500).json({ message: 'Какая-то ошибка, попробуйте позже' })
  }
})

app.post('/rooms/allmessages', async (req, res) => {
  try {
    if (!req.body) return

    const { clickRoom } = req.body

    if (clickRoom === 'firstRoom') {
      allCollections[arrNamesCollections[0]].find({}, (err, docs) => {
        if (err) return console.log(`Ошибка поиска в БД: ${err}`)
        res.json(docs)
      })
      return
    }

    allCollections[clickRoom].find({}, (err, docs) => {
      if (err) return console.log(`Ошибка поиска в БД: ${err}`)
      res.json(docs)
    })

    // console.log(req.body)
  } catch (e) {
    res.status(500).json({ message: 'Какая-то ошибка, попробуйте позже' })
  }
})

io.on('connection', (socket) => {
  connections.push(socket)
  io.sockets.emit('numberOfUsers', connections.length)

  socket.on('disconnect', () => {
    connections.splice(connections.indexOf(socket), 1)
    io.sockets.emit('numberOfUsers', connections.length)
  })

  socket.on('addMessage', async ({ user, message, clickRoom }) => {
    const lastData = await newMessagesMongo(
      allCollections[clickRoom],
      user,
      message
    )
    io.sockets.emit('lastMessage', lastData)
  })

  socket.on('addRoom', (room) => {
    arrNamesCollections.forEach((elem) => {
      if (room !== elem) console.log('не равно существующей')
      else console.log('равно существующей')
    })
    addRoomsInMongoDB(room)
    arrNamesCollections.push(room)
    io.sockets.emit('newRoom', room)
  })
})

async function newMessagesMongo(collectionName, user, message) {
  let obj
  await new Promise((resolve) => {
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

server.listen(PORT, () => console.log('Сервер запущен'))
