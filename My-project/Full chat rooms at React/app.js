const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const PORT = process.env.PORT || 5000

const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.pluralize(null)
const MongoClient = require('mongodb').MongoClient
const MONGODB_URI =
  'mongodb+srv://Chat:Rfgkzrfgkz1997@cluster0.pyfv2.mongodb.net/ChatRoomsReact?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const mongoClient = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongoClient.connect(function (err, client) {
  if (err) {
    console.log(err)
    return mongoose.disconnect()
  }

  const db = client.db('ChatRoomsReact')

  db.listCollections().toArray(function (err, collInfos) {
    collInfos.forEach((elem) => {
      arrNamesCollections.push(elem.name)
      syncCollection(elem.name)
    })
  })
})

const allCollections = {}
const arrNamesCollections = []
const connections = []

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'client/build')))

if (process.env.NODE_ENV === 'production') {
  app.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + 'client/public/index.html'))
// })

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

app.post('/rooms', async (req, res) => {
  try {
    if (!req.body) return

    const { message, clickRoom } = req.body

    if (message === 'allRoom') res.json(arrNamesCollections)
    if (message === 'allMessages') {
      if (clickRoom) res.json(await allMessages(allCollections[clickRoom]))
    }
  } catch (e) {
    res.status(500).json({ message: 'Возникла ошибка, попробуйте позже' })
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
    const roomMatch = user.match(/\w+/gi)

    if (roomMatch !== null) {
      if (roomMatch[0] !== user) return
    } else return

    if (message.string > 1024) return

    const lastData = await newMessage(allCollections[clickRoom], user, message)
    io.sockets.emit('lastMessage', { lastData, sendFromRoom: clickRoom })
  })

  socket.on('addRoom', (room) => {
    let uniqueRoom = false

    const roomMatch = room.match(/\w+/gi)
    if (roomMatch !== null) {
      if (roomMatch[0] !== room) return
    } else return

    arrNamesCollections.forEach((elem) => {
      if (room === elem) return (uniqueRoom = true)
    })
    if (uniqueRoom) return

    syncCollection(room)
    arrNamesCollections.push(room)
    io.sockets.emit('newRoom', room)
  })
  socket.on('deleteRoom', async (room) => {
    const collectionDeleted = await deleteRoom(allCollections[room])
    io.sockets.emit('roomDeleted', collectionDeleted ? true : false, room)

    if (collectionDeleted) {
      delete allCollections[room]
      const index = arrNamesCollections.indexOf(room)
      if (index > -1) arrNamesCollections.splice(index, 1)
    }
  })
})

async function syncCollection(nameTable) {
  allCollections[nameTable] = mongoose.model(nameTable, roomsSchema)
  try {
    await allCollections[nameTable].createCollection()
    console.log(`Коллекция ${nameTable} успешно синхронизирована с БД.`)
  } catch (err) {
    console.log(`Ошибка синхронизации коллекции: ${err}`)
  }
}

async function deleteRoom(collectionName) {
  return await collectionName.collection.drop()
}

async function allMessages(collectionName) {
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

async function newMessage(collectionName, user, message) {
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
            createdAt: doc.createdAt
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

server.listen(PORT, () => console.log('Сервер запущен'))
