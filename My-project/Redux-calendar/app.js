const express = require('express')
const app = express()
const server = require('http').createServer(app)
// const io = require('socket.io')(server)
const PORT = process.env.PORT || 5000
// const { nanoid } = require('nanoid')

const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.pluralize(null)

const existingUsersScheme = new Schema(
  {
    login: {
      type: String,
      minLength: 3,
      maxLength: 21,
      unique: true
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 48
    },
    birthday: {
      type: String,
      minLength: 10,
      maxLength: 10
    }
  },
  { versionKey: false }
)

const iBlockTask = {
  _id: false,
  id: Number,
  timestamp: Number,
  title: String,
  posTop: Number,
  height: Number,
  position: String,
  posLeft: Number
}

const usersTasks = new Schema(
  {
    user: {
      type: String,
      minLength: 3,
      maxLength: 21,
      unique: true
    },
    tasks: [iBlockTask]
  },
  { versionKey: false }
)

mongoose.connect('mongodb://localhost:27017/calendar', {
  useUnifiedTopology: true,
  useNewUrlParser: true
})
mongoose.set('useCreateIndex', true)

const ExistingUsers = mongoose.model('existing_users', existingUsersScheme)
const UsersTasks = mongoose.model('usersTasks', usersTasks)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/sing-up', async (req, res) => {
  if (!req.body) {
    return return_data('Неверный формат запроса, попробуйте ещё раз')
  }

  // ========== VALIDATION OF DATA FROM OF THE CLIENT ==========
  const { login, birthday, password, passwordConfirm } = req.body

  const loginBirthday = login.length > 3 && birthday.length === 10
  const passCorrect = password.length >= 8 && passwordConfirm === password

  // ========== SENDIND DATA TO THE CLIENT ==========

  // Data of the client TRUE
  if (loginBirthday && passCorrect) {
    const userExists = await filtering_login(login)

    // New user
    if (!userExists) {
      const newUser = await create_user(login, password, birthday)

      // User added
      if (newUser) return_data('Успешная регистрация')
      else return_data('Неверные данные')
    } else return_data('Пользователь существует')
  } else return_data('Неверные данные')

  function return_data(message) {
    res.json({ message })
  }
})

app.post('/login', async (req, res) => {
  if (!req.body) {
    return return_data('Неверный формат запроса, попробуйте ещё раз')
  }

  const { name, password } = req.body
  if (name.length < 3 && password.length < 8) return_data('Неверные данные')

  const autoLogin = await login_details_match(name, password)

  if (autoLogin) return_data('Вы успешно авторизировались!', autoLogin)
  else return_data('Неверное имя пользователя или пароль')

  function return_data(message, login = null) {
    res.json({ message, login })
  }
})

app.post('/tasks', async (req, res) => {
  if (!req.body && req.headers['action-type']) {
    return res.json({ message: 'Неверный формат запроса, попробуйте ещё раз' })
  }

  const dateTask = new Date(req.body.timestamp)
  const correctMonth = new Date(dateTask.setDate(dateTask.getDate() + 1))

  if (req.headers['action-type'] === 'allTasks') {
    const tasksDatas = await all_tasks({
      user: req.body.userName,
      timestamp: +correctMonth
    })
    return res.json(tasksDatas)
  }

  if (req.headers['action-type'] === 'changeTask') {
    const changeTask = await change_tasks(req.body)
    return res.json(changeTask)
  }

  if (req.headers['action-type'] === 'createTask') {
    const dataCorrection = {
      user: req.body.userName,
      task: {
        id: req.body.id,
        timestamp: +correctMonth,
        title: req.body.title,
        posTop: req.body.posTop,
        posLeft: req.body.posLeft,
        height: req.body.height,
        position: req.body.position
      }
    }

    const userDataIs = await search_user(req.body.userName)

    if (userDataIs) {
      // Юзер существует
      const userObjPush = await push_newTask(dataCorrection)

      return_tasks(userObjPush)
    } else {
      // Новый юзер
      const userObjCreated = await createDocument_tasksUser(dataCorrection)

      return_tasks(userObjCreated)
    }

    function return_tasks(flag) {
      if (!flag)
        return return_tasks({ message: 'Неизвестная ошибка', task: null })
      return res.json({ message: 'Блок создан', task: dataCorrection.task })
    }
  }

  if (req.headers['action-type'] === 'deleteTask') {
    const idDel = await delete_task(req.body)
    return res.json({ id: idDel })
  }
})

server.listen(PORT, () => console.log('Сервер запущен'))

// ========== FUNCTIONS TO WORK WITH THE DATABASE  ==========
async function all_tasks({ user, timestamp }) {
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

async function search_user(user) {
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

async function createDocument_tasksUser({ user, task }) {
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

async function push_newTask({ user, task }) {
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

async function change_tasks({ userName, tasks }) {
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

async function delete_task({ userName, task }) {
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

async function filtering_login(login) {
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

async function create_user(login, password, birthday) {
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

async function login_details_match(login, password) {
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
