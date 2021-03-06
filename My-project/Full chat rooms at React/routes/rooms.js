const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roomsSchema = new Schema(
  {
    user: {
      type: String,
      minlength: 2,
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

const allNameRoomsSchema = new Schema(
  {
    allNameRooms: {
      type: String,
      minlength: 2,
      maxlength: 40,
      unique: true
    }
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
mongoose.pluralize(null)

// Коллекция со всеми названиями основных коллекций
const AllNameRooms = mongoose.model('AllNameRooms', allNameRoomsSchema)
const allNameRooms = new AllNameRooms({
  allNameRooms: 'VladKravich'
})
allNameRooms.save()

AllNameRooms.find({}, (err, docs) => {
  if (err) return console.log(`Ошибка поиска в БД: ${err}`)
  console.log(docs)
})

// Основная коллекция
const UserRoom = mongoose.model('VladKravich', roomsSchema)
const userRoom = new UserRoom({
  name: 'Vlad',
  message: 'Это первое сообщение, всем привет.',
  createdAt: new Date()
})
userRoom.save()

router.post('/', async (req, res) => {
  try {
    const { message } = req.body

    if (message === 'all room') {
      res.json()
    }

    // UserRoom.find({}, (err, docs) => {
    //   if (err) return console.log(`Ошибка поиска в БД: ${err}`)
    // res.json({ showTables: 'VladKravich', history: docs })
    // })
  } catch (e) {
    res.status(500).json({ message: 'Какая-то ошибка, попробуйте позже' })
  }
  console.log('получил пост запрос')
})

module.exports = router
