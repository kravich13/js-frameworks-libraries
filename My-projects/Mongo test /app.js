const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 5000

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trackScheme = new Schema({ title: String }, { versionKey: false })
const MONGODB_URI =
  'mongodb+srv://Chat:Mypassword@cluster0.pyfv2.mongodb.net/MongoTest?retryWrites=true&w=majority'

mongoose.pluralize(null)
mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

const Track = mongoose.model('Track', trackScheme)
// [
//   { _id: 60df2d899c7b0ba6779c7dea, title: '123Etest' },
//   { _id: 60df2d899c7b0ba6779c7df1, title: '123test2' },
//   { _id: 60df2d899c7b0ba6779c7de7, title: '123Calvin Harris' },
//   { _id: 60df2d899c7b0ba6779c7dec, title: '123Edvcg' },
//   { _id: 60df2d899c7b0ba6779c7de3, title: '123Eminem' },
//   { _id: 60df2d899c7b0ba6779c7de9, title: '123turtle' },
//   { _id: 60df2d899c7b0ba6779c7de8, title: '123Skillet' },
//   { _id: 60df2d899c7b0ba6779c7dee, title: 'dssdd' },
//   { _id: 60df2d899c7b0ba6779c7de6, title: 'kjdnjk' },
//   { _id: 60df2d899c7b0ba6779c7ded, title: '123ledss' },
//   { _id: 60df2d899c7b0ba6779c7de2, title: '123Eminem' },
//   { _id: 60df2d899c7b0ba6779c7de4, title: 'ins' },
//   { _id: 60df2d899c7b0ba6779c7de5, title: 'dsd' },
//   { _id: 60df2d899c7b0ba6779c7deb, title: '123Edsds' },
//   { _id: 60df2d899c7b0ba6779c7def, title: 'nmkn' },
//   { _id: 60df2d899c7b0ba6779c7df0, title: '123test1' }
// ]

findTracks()
async function findTracks() {
  try {
    const arrData = []

    const regExp = /^123/
    let searchInterval = 2
    let howManyElementsGive = 0

    while (true) {
      const promise = await new Promise((resolve, reject) => {
        Track.find(
          { title: regExp },
          null,
          { limit: searchInterval, skip: searchInterval * howManyElementsGive },
          (err, docs) => {
            if (err) reject()
            if (!docs.length) resolve(true)

            arrData.push(...docs)
            howManyElementsGive++
            resolve()
          }
        )
      })
      if (promise) break
    }
    return arrData
    // [
    //   { _id: 60df2d899c7b0ba6779c7dea, title: '123Etest' },
    //   { _id: 60df2d899c7b0ba6779c7df1, title: '123test2' },
    //   { _id: 60df2d899c7b0ba6779c7de7, title: '123Calvin Harris' },
    //   { _id: 60df2d899c7b0ba6779c7dec, title: '123Edvcg' },
    //   { _id: 60df2d899c7b0ba6779c7de3, title: '123Eminem' },
    //   { _id: 60df2d899c7b0ba6779c7de9, title: '123turtle' },
    //   { _id: 60df2d899c7b0ba6779c7de8, title: '123Skillet' },
    //   { _id: 60df2d899c7b0ba6779c7ded, title: '123ledss' },
    //   { _id: 60df2d899c7b0ba6779c7de2, title: '123Eminem' },
    //   { _id: 60df2d899c7b0ba6779c7deb, title: '123Edsds' },
    //   { _id: 60df2d899c7b0ba6779c7df0, title: '123test1' }
    // ]
  } catch (err) {
    return []
  }
}

app.post('/meta/tracks/', async (req, res) => {})

app.put('/meta/tracks', async (req, res) => {})

app.delete('/meta/tracks/trackid', async (req, res) => {})

app.listen(PORT, () => {
  console.log(`The server was started on the PORT: ${PORT}`)
})
