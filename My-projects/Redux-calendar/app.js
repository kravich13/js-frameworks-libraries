const express = require('express')
const app = express()
const path = require('path')
const server = require('http').createServer(app)
const PORT = process.env.PORT ?? 5000

const mongoose = require('mongoose')
const MONGODB_URI =
  'mongodb+srv://Chat:Mypassword@cluster0.pyfv2.mongodb.net/Calendar?retryWrites=true&w=majority'

mongoose.pluralize(null)
mongoose.connect(
  MONGODB_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  (err) => {
    if (err) console.log('the DB is not ready to work')
  }
)
mongoose.set('useCreateIndex', true)

mongoose.connection.once('open', () => {
  server.listen(PORT, () => {
    console.log(`The server was started on the PORT: ${PORT}`)
  })
})

app.use(express.json(''))
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
