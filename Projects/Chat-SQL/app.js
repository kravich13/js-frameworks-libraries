const express = require('express')
const app = express()
const jsonParser = express.json()
const server = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(server)
const { response } = require('express')
const { type } = require('os')
const Sequelize = require('sequelize')
const { send } = require('process')
const { table } = require('console')
const PORT = process.env.PORT || 3000
const rooms = app.route('/rooms')

const sequelize = new Sequelize('generalChat', 'root', 'MYPASSWORD', {
  dialect: 'mysql',
  host: 'localhost',
  define: {
    createdAt: true,
    updatedAt: false,
    freezeTableName: true,
  },
})

const allTableInSQL = {}
const arrNamesTables = []
const connections = []
let correspondenceTables

function addRoomsInSQL(nameTable) {
  allTableInSQL[nameTable] = sequelize.define(nameTable, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    user: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT('tiny'),
      allowNull: false,
    },
  })
}

sequelize
  .getQueryInterface()
  .showAllSchemas()
  .then((tableObj) => {
    for (let key of tableObj) {
      arrNamesTables.push(key.Tables_in_generalChat)
      addRoomsInSQL(key.Tables_in_generalChat)
      // console.log(key.Tables_in_generalChat)
    }
    // console.log(allTableInSQL)
    // console.log(arrNamesTables)
  })
  .catch((err) => {
    console.log('showAllSchemas ERROR', err)
  })

sequelize
  .sync()
  .then((result) => {
    return
  })
  .catch((err) => console.log(err))

app.use(express.static(path.join(__dirname, 'public')))

app.post('/', jsonParser, function (req, res, next) {
  if (!req.body) return res.sendStatus(400)

  // console.log(req.body.nameRoom)

  // если у клиента отрисовка впервые - послать ему чат из первой таблицы в списке
  if (req.body.nameRoom === '') {
    correspondenceTables = arrNamesTables[0]
    return gettingDataInTables(allTableInSQL[arrNamesTables[0]])
  }

  gettingDataInTables(allTableInSQL[req.body.nameRoom])

  function gettingDataInTables(keyConst) {
    keyConst
      .findAll({
        attributes: [
          'id',
          'user',
          'message',
          [
            sequelize.fn(
              'date_format',
              sequelize.col('createdAt'),
              '%d %M %Y %k:%i'
            ),
            'createdAt',
          ],
        ],
        raw: true,
      })
      .then((arr) => {
        // отправка всего массива объектов (строк таблицы)
        res.json({ showTables: arrNamesTables, history: arr })
      })
      .catch((err) => console.log(err))
  }
})

io.on('connection', function (socket) {
  // текущие подключенные пользователи
  connections.push(socket)
  io.sockets.emit('numberOfUsers', connections.length)

  function newMessagesInTables(tableName, datas, nameRoom) {
    tableName
      .create({
        user: datas.name,
        message: datas.message,
      })
      .then((res) => {
        const lastMessage = {
          id: res.id,
          user: res.user,
          message: res.message,
          createdAt: res.createdAt,
        }
        console.log(tableName)
        io.sockets.emit('lastMessage', [lastMessage, nameRoom])
      })
  }

  socket.on('addMessage', function (data, nameRoom) {
    // если пришло сообщение, то...
    // добавить новые данные в БД и тут же вернуть эти данные клиенту

    console.log(data, nameRoom)

    // console.log(allTableInSQL[correspondenceTables], data)
    newMessagesInTables(allTableInSQL[nameRoom], data, nameRoom)
  })

  socket.on('addRoom', function (tableName) {
    // юзер нажал на кнопку
    // дать всем сигнал, что комната создана

    io.sockets.emit('newRoom', tableName)

    // добавить эту комнату в БД в виде таблицы
    addRoomsInSQL(tableName)
    allTableInSQL[tableName]
      .sync()
      .then((result) => {
        arrNamesTables.push(tableName)
      })
      .catch((err) => console.log(err))
  })

  socket.on('disconnect', function () {
    connections.splice(connections.indexOf(socket), 1)

    io.sockets.emit('numberOfUsers', connections.length)
  })
})

server.listen(PORT)
