const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const PORT = process.env.PORT || 5000

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

app.post('/sign-up', require('./routes/sign-up'))
app.post('/login', require('./routes/login'))
app.post('/tasks', require('./routes/tasks'))
app.post('/daysTasks', require('./routes/days-tasks'))

server.listen(PORT, () => console.log('Сервер запущен'))
