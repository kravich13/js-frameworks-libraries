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

const usersTasks = new Schema({
  userName: String,
  allDay: [
    {
      fullDate: Date,
      tasksDay: [
        {
          id: Number,
          title: String,
          posTop: Number,
          height: Number,
          position: String,
          posLeft: Number
        }
      ]
    }
  ]
})

mongoose.connect('mongodb://localhost:27017/calendar', {
  useUnifiedTopology: true
})

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

server.listen(PORT, () => console.log('Сервер запущен'))

// ========== FUNCTIONS TO WORK WITH THE DATABASE  ==========

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
