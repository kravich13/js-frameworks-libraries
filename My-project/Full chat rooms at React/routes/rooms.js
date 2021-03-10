const { Router } = require('express')
const router = Router()
const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
mongoose.pluralize(null)

// Основная коллекция
const UserRoom = mongoose.model('VladKravich', roomsSchema)
const allCollections = {}
const arrNamesCollections = []

arrNamesCollections.push('VladKravich')
addRoomsInMongoDB(arrNamesCollections[0])

async function addRoomsInMongoDB(nameTable) {
  allCollections[nameTable] = mongoose.model(nameTable, roomsSchema)

  try {
    await allCollections[nameTable].createCollection()
    console.log(`Коллекция ${nameTable} успешно синхронизирована с БД.`)
  } catch (err) {
    return console.log(err)
  }
}

router.post('/', async (req, res) => {
  try {
    const { message } = req.body

    if (message === 'all room') {
      res.json(arrNamesCollections)
    }

    // console.log(message)

    // UserRoom.find({}, (err, docs) => {
    //   if (err) return console.log(`Ошибка поиска в БД: ${err}`)
    // res.json({ showTables: 'VladKravich', history: docs })
    // })
  } catch (e) {
    res.status(500).json({ message: 'Какая-то ошибка, попробуйте позже' })
  }
})

// module.exports = router
