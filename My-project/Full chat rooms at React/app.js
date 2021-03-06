const express = require('express')
const app = express()
const server = require('http').createServer(app)
// const path = require('path')
// const io = require('socket.io')(server)
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/rooms', require('./routes/rooms'))

server.listen(PORT, () => console.log('Сервер запущен'))
