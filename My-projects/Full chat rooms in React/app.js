const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const PORT = process.env.PORT ?? 5000

// ============= THE DATABASE CONSTANTS =============
const { Work_DB, allCollections } = require('./work.db')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
const MONGODB_URI =
  'mongodb+srv://Chat:Mypassword@cluster0.pyfv2.mongodb.net/ChatRoomsReact?retryWrites=true&w=majority'
const options = { useNewUrlParser: true, useUnifiedTopology: true }
const mongoClient = new MongoClient(MONGODB_URI, options)

// ============= OTHERS =============
const connections = []
const arrNamesCollections = []

mongoose.pluralize(null)
mongoose.connect(MONGODB_URI, options, (err) => {
  if (err) console.log('The DB is not ready to work')
})
mongoose.connection.once('open', () => {
  server.listen(PORT, () => {
    console.log(`The server was started on the PORT: ${PORT}`)
  })
})

mongoClient.connect((err, client) => {
  if (err) return mongoose.disconnect()

  const db = client.db('ChatRoomsReact')

  db.listCollections().toArray((err, collInfos) => {
    if (err) return console.log('Error sync of the collections')
    collInfos.forEach((elem) => {
      arrNamesCollections.push(elem.name)
      Work_DB.syncCollection(elem.name)
    })
  })
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'public', 'index.html'))
})

app.post('/rooms', async (req, res) => {
  try {
    if (!req.body) return

    const { message, clickRoom } = req.body

    if (message === 'allRoom') res.json(arrNamesCollections)
    if (message === 'allMessages') {
      if (clickRoom) {
        res.json(await Work_DB.allMessages(allCollections[clickRoom]))
      }
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
    if (regExp_RoomAndMessage(user)) return
    if (message.string > 1024) return

    const lastData = await Work_DB.newMessage(
      allCollections[clickRoom],
      user,
      message
    )
    io.sockets.emit('lastMessage', { lastData, sendFromRoom: clickRoom })
  })

  socket.on('addRoom', (room) => {
    if (regExp_RoomAndMessage(room)) return

    let uniqueRoom = false

    arrNamesCollections.forEach((elem) => {
      if (room === elem) uniqueRoom = true
    })
    if (uniqueRoom) return

    Work_DB.syncCollection(room)
    arrNamesCollections.push(room)
    io.sockets.emit('newRoom', room)
  })
  socket.on('deleteRoom', async (room) => {
    const collectionDeleted = await Work_DB.deleteRoom(allCollections[room])
    io.sockets.emit('roomDeleted', collectionDeleted ?? false, room)

    if (!collectionDeleted) return

    delete allCollections[room]
    const index = arrNamesCollections.indexOf(room)
    if (index > -1) arrNamesCollections.splice(index, 1)
  })
})

function regExp_RoomAndMessage(value) {
  const roomMatch = value.match(/\w+/gi)
  if (!roomMatch || roomMatch[0] !== value) return true
  return false
}

module.exports = { arrNamesCollections }
