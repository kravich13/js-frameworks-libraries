const express = require("express")
const app = express()
const jsonParser = express.json()
const server = require('http').createServer(app)
const path = require("path")
const io = require("socket.io")(server)
const { response } = require('express')
const { type } = require('os')
const Sequelize = require("sequelize")
const PORT = process.env.PORT || 3000


const sequelize = new Sequelize("generalChat", "root", "rfgkzrfgkz", {
    dialect: "mysql",
    host: "localhost",
    define: {
        createdAt: true,
        updatedAt: false
    }
})

const GeneralMessages = sequelize.define("generalMessages", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    message: {
        type: Sequelize.TEXT("tiny"),
        allowNull: false
    }
})

sequelize.sync().then(result => {
    console.log("База данных была создана заново или не тронута.")
}).catch(err => console.log(err))


const connections = []

app.use(express.static(path.join(__dirname, 'public')))

app.post("/", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)

    // SELECT DATE_FORMAT("2020-11-10", "%d %M %Y") FROM generalMessages;
    GeneralMessages.findAll({ 
        attributes: [
            "id", "user", "message",
            [sequelize.fn("date_format", sequelize.col("createdAt"), '%d %M %Y %k:%i'), 'createdAt'],
        ],
        raw: true 
    })
    .then (arr => {
        // отправка всего массива объектов (строк таблицы)  
        console.log(arr[arr.length - 1])
        res.json(arr)

    }).catch(err => console.log(err))
    
})


io.on("connection", function (socket) {
    // текущие подключенные пользователи
    connections.push(socket)
    io.sockets.emit("numberOfUsers", connections.length)


    socket.on("addMessage", function (data) {
        // если пришло сообщение, то...
        // добавить новые данные в БД и тут же вернуть эти данные клиенту
        GeneralMessages.create({
            user: data.name,
            message: data.message,
        }).then(res => {
            const lastMessage = {id: res.id, user: res.user, message: res.message, createdAt: res.createdAt}
            io.sockets.emit("lastMessage", lastMessage)
        })  
    }) 

    socket.on("disconnect", function () {
        connections.splice(connections.indexOf(socket), 1)
        
        io.sockets.emit("numberOfUsers", connections.length)
    })
})

server.listen(PORT)