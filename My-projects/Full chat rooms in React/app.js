const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const path = require('path')
const PORT = process.env.PORT ?? 5000

const { Work_DB, allCollections, arrNamesCollections } = require('./work.db')
const connections = []

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
    const roomMatch = user.match(/\w+/gi)

    if (roomMatch !== null) {
      if (roomMatch[0] !== user) return
    } else return

    if (message.string > 1024) return

    const lastData = await Work_DB.newMessage(
      allCollections[clickRoom],
      user,
      message
    )
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

    Work_DB.syncCollection(room)
    arrNamesCollections.push(room)
    io.sockets.emit('newRoom', room)
  })
  socket.on('deleteRoom', async (room) => {
    const collectionDeleted = await Work_DB.deleteRoom(allCollections[room])
    io.sockets.emit('roomDeleted', collectionDeleted ? true : false, room)

    if (collectionDeleted) {
      delete allCollections[room]
      const index = arrNamesCollections.indexOf(room)
      if (index > -1) arrNamesCollections.splice(index, 1)
    }
  })
})

server.listen(PORT, () => console.log('Сервер запущен'))
