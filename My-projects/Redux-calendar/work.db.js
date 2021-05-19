const mongoose = require('mongoose')
mongoose.pluralize(null)

const {
  existingUsersScheme,
  usersTasks
} = require('./schemas/schemas.mongoose')

const MONGODB_URI =
  'mongodb+srv://Chat:Rfgkzrfgkz1997@cluster0.pyfv2.mongodb.net/Calendar?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
mongoose.set('useCreateIndex', true)

const ExistingUsers = mongoose.model('existing_users', existingUsersScheme)
const UsersTasks = mongoose.model('usersTasks', usersTasks)

class Work_DB {
  static async all_tasks({ user, timestamp }) {
    const tasks = []

    await new Promise((resolve) => {
      UsersTasks.findOne({ user }, (err, doc) => {
        if (err || !doc) return

        for (const key of doc.tasks) {
          if (key.timestamp === timestamp) tasks.push(key)
        }
        resolve()
      })
    })

    return tasks
  }

  static async search_user(user) {
    let status = false
    await new Promise((resolve) => {
      UsersTasks.findOne({ user }, (err, doc) => {
        if (err) return console.log(err)
        status = doc === null ? false : true
        resolve()
      })
    })
    return status
  }

  static async createDocument_tasksUser({ user, task }) {
    let status = false

    await new Promise((resolve) => {
      UsersTasks.create({ user: user, tasks: [task] }, (err) => {
        if (err) return console.log(err)
        status = true
        resolve()
      })
    })
    return status
  }

  static async push_newTask({ user, task }) {
    let status = null

    await new Promise((resolve) => {
      UsersTasks.updateOne(
        { user: user },
        { $push: { tasks: task } },
        (err, doc) => {
          if (err) return console.log(err)
          status = doc.nModified
          resolve()
        }
      )
    })
    return status
  }

  static async change_tasks({ userName, tasks }) {
    let task = []

    await new Promise((resolve) => {
      UsersTasks.findOne({ user: userName }, async (err, doc) => {
        if (err) return console.log(err)

        for (const key of doc.tasks) {
          for (const taskClient of tasks) {
            if (key.id === taskClient.id) {
              key.position = taskClient.position
              key.posLeft = taskClient.posLeft
              await doc.save()

              task.push({
                id: taskClient.id,
                position: taskClient.position,
                posLeft: taskClient.posLeft
              })
            }
          }
        }
        resolve()
      })
    })
    return task
  }

  static async delete_task({ userName, task }) {
    let idDel = null

    await new Promise((resolve) => {
      UsersTasks.updateOne(
        { user: userName },
        { $pull: { tasks: task } },
        (err, doc) => {
          if (err) return console.log(err)

          if (doc.nModified) {
            idDel = task.id
          }
          resolve()
        }
      )
    })
    return idDel
  }

  static async filtering_login(login) {
    let user = false
    await new Promise((resolve) => {
      ExistingUsers.findOne({ login }, (err, doc) => {
        if (err) return
        user = doc === null ? false : true
        resolve()
      })
    })
    return user
  }

  static async create_user(login, password, birthday) {
    let id = false
    await new Promise((resolve) => {
      ExistingUsers.create({ login, password, birthday }, (err) => {
        if (err) return console.log('Ошибка добавления пользователя')

        id = true
        resolve()
      })
    })
    return id
  }

  static async login_details_match(login, password) {
    let data = null
    await new Promise((resolve) => {
      ExistingUsers.findOne({ login }, (err, doc) => {
        if (err || !doc) return resolve()

        if (password === doc.password) data = doc.login
        resolve()
      })
    })
    return data
  }

  static async unique_day_task(user) {
    const arrTimestamp = []

    try {
      await new Promise((resolve) => {
        UsersTasks.findOne({ user }, (err, doc) => {
          if (err || !doc) return resolve()

          const arrayDay = new Set()

          for (let elem of doc.tasks) {
            const day = new Date(elem.timestamp).toLocaleDateString('en-US', {
              day: 'numeric'
            })

            if (!arrayDay.has(day)) arrTimestamp.push(elem.timestamp)
            arrayDay.add(day)
          }
          resolve()
        })
      })
    } catch (err) {
      return arrTimestamp
    }

    arrTimestamp.forEach((elem, index, array) => {
      const date = new Date(elem)
      return (array[index] = date.setDate(date.getDate() - 1))
    })

    return arrTimestamp
  }
}

module.exports = { Work_DB }
