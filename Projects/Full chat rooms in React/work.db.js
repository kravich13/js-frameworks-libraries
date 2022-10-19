const mongoose = require('mongoose')
const { roomsSchema } = require('./schemas/schema.mongoose')
const allCollections = {}

class Work_DB {
  static async syncCollection(nameTable) {
    try {
      allCollections[nameTable] = mongoose.model(nameTable, roomsSchema)
      await allCollections[nameTable].createCollection()
    } catch (err) {
      console.log(`Ошибка синхронизации коллекции: ${err}`)
    }
  }

  static async deleteRoom(Model) {
    return await Model.collection.drop()
  }

  static async allMessages(Model) {
    const arrData = []

    try {
      const arrMessages = await Model.find({})
      if (arrMessages.length) arrData.push(...arrMessages)
    } catch (err) {
      console.log('Ошибка при загрузке всех сообщений')
    } finally {
      return arrData
    }
  }

  static async newMessage(Model, user, message) {
    let obj = null
    const createdAt = new Date()

    try {
      const data = await Model.create({ user, message, createdAt })
      if (data) obj = data
    } catch (err) {
      console.log('Ошибка при добавлении нового сообщения')
    } finally {
      return obj
    }
  }
}

module.exports = { Work_DB, allCollections }
