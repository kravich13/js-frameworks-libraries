const mongoose = require('mongoose')

const {
  existingUsersScheme,
  usersTasks,
} = require('./schemas/schemas.mongoose')

let ExistingUsers = null
let UsersTasks = null

mongoose.connection.once('open', () => {
  ExistingUsers = mongoose.model('existing_users', existingUsersScheme)
  UsersTasks = mongoose.model('usersTasks', usersTasks)
})

class Work_DB {
  static async all_tasks({ user, timestamp }) {
    const arrTasks = []

    try {
      const { tasks } = await UsersTasks.findOne({ user })
      if (tasks.length) {
        tasks.forEach((elem) => {
          if (elem.timestamp === timestamp) arrTasks.push(elem)
        })
      }
    } catch (err) {
      console.log('Ошибка в получении всех тасков')
    } finally {
      return arrTasks
    }
  }

  static async search_user(user) {
    let status = false

    try {
      const data = await UsersTasks.findOne({ user })
      if (data) status = true
    } catch (err) {
      console.log('Ошибка в поиске юзера')
    } finally {
      return status
    }
  }

  static async createDocument_tasksUser({ user, task }) {
    let status = false

    try {
      const data = await UsersTasks.create({ user: user, tasks: [task] })
      if (data) status = true
    } catch (err) {
      console.log('Ошибка при создании документа юзера')
    } finally {
      return status
    }
  }

  static async push_newTask({ user, task }) {
    let status = null

    try {
      const data = await UsersTasks.updateOne(
        { user: user },
        { $push: { tasks: task } }
      )
      if (data.nModified) status = data.nModified
    } catch (err) {
      console.log('Ошибка при добавлении таска')
    } finally {
      return status
    }
  }

  static async change_tasks({ userName, tasks }) {
    const changedTasks = []

    try {
      const data = await UsersTasks.findOne({ user: userName })
      if (!data) return changedTasks

      for (const db of data.tasks) {
        for (const { id, position, posLeft } of tasks) {
          if (db.id !== id) continue

          db.position = position
          db.posLeft = posLeft
          await data.save()

          changedTasks.push({ id, position, posLeft })
        }
      }
    } catch (err) {
      console.log('Ошибка при изменении таска')
    } finally {
      return changedTasks
    }
  }

  static async delete_task({ userName, task }) {
    let idDeldElem = null

    try {
      const data = await UsersTasks.updateOne(
        { user: userName },
        { $pull: { tasks: task } }
      )
      if (data.nModified) idDeldElem = task.id
    } catch (err) {
      console.log('Ошибка в удалении таска')
    } finally {
      return idDeldElem
    }
  }

  static async filtering_login(login) {
    let user = false

    try {
      const data = await ExistingUsers.findOne({ login })
      if (data) user = true
    } catch (err) {
      console.log('Ошибка поиска юзера')
    } finally {
      return user
    }
  }

  static async create_user(login, password, birthday) {
    let id = false

    try {
      const data = await ExistingUsers.create({ login, password, birthday })
      if (data) id = true
    } catch (err) {
      console.log('Ошибка добавления ')
    } finally {
      return id
    }
  }

  static async login_details_match(login, password) {
    let result = null

    try {
      const data = await ExistingUsers.findOne({ login })
      if (password === data.password) result = data.login
    } catch (err) {
      console.log('Ошибка в сравнении пароля')
    } finally {
      return result
    }
  }

  static async unique_day_task(user) {
    const arrTimestamp = []

    try {
      const data = await UsersTasks.findOne({ user })
      if (!data) return arrTimestamp

      const arrayDay = new Set()

      for (const { timestamp } of data.tasks) {
        const day = new Date(timestamp).toLocaleDateString('en-US', {
          day: 'numeric',
        })

        if (!arrayDay.has(day)) arrTimestamp.push(timestamp)
        arrayDay.add(day)
      }

      arrTimestamp.forEach((elem, index, array) => {
        const date = new Date(elem)
        return (array[index] = date.setDate(date.getDate() - 1))
      })
    } catch (err) {
      console.log('Ошибка в добавлении уникального дня таска')
    } finally {
      return arrTimestamp
    }
  }

  static async user_birthday(user) {
    let result = null

    try {
      const data = await ExistingUsers.findOne({ login: user })
      if (data) result = data.birthday
    } catch (err) {
      console.log('Ошибка поиска дня рождения юзера')
    } finally {
      return result
    }
  }
}

module.exports = { Work_DB }
