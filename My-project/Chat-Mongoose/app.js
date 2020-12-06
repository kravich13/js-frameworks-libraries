const express = require("express")
const app = express()
const jsonParser = express.json()
const server = require('http').createServer(app)
const path = require("path")
const io = require("socket.io")(server)
const mongoose = require("mongoose")
mongoose.pluralize(null) // отключение множественных имён
const Schema = mongoose.Schema
const { response } = require('express')
const { type } = require('os')
const { send } = require("process")
const { table } = require("console")
const PORT = process.env.PORT || 3000



const MongoClient = require("mongodb").MongoClient
const url = "mongodb://localhost:27017/"
const mongoClient = new MongoClient(url, { useUnifiedTopology: true })


const allCollections = {}
const arrNamesCollections = []
const connections = []
let correspondenceTables



mongoClient.connect(function (err, client) {
      
    if (err) {
        console.log(err)
        return mongoose.disconnect()
    }

    const db = client.db("generalChat")

    db.listCollections().toArray(function(err, collInfos) {

        collInfos.forEach(elem => {
            arrNamesCollections.push(elem.name)
            addRoomsInMongoDB(elem.name)
        })            
    })
})

const messageStorageScheme = new Schema({
    user: {
        type: String,
        minlength: 2,
        maxlength: 20
    },
    message: {
        type: Schema.Types.Mixed,
        minlength: 1
    },
    createdAt: Date

}, { versionKey: false }, { minimize: false }) 


try {
    mongoose.connect("mongodb://localhost:27017/generalChat", { useUnifiedTopology: true})
} catch (err) {
    console.log(err)
}


async function addRoomsInMongoDB (nameTable) {
    allCollections[nameTable] = mongoose.model(nameTable, messageStorageScheme)

    try {
        await allCollections[nameTable].createCollection()
        console.log("Коллекция успешно создана и добавлена в БД.")
    } catch (err) {
        return console.log(err)
    }
}

app.use(express.static(path.join(__dirname, 'public')))

app.get("/:room")

app.post("/", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400)

    // console.log(req.query.user = "VladKravich")

    // если у клиента отрисовка впервые - послать ему чат из первой таблицы в списке
    if (req.body.nameRoom === "") {

        correspondenceTables = arrNamesCollections[0]
        return gettingDataInTables(allCollections[arrNamesCollections[0]])
    }

    gettingDataInTables(allCollections[req.body.nameRoom])


    function gettingDataInTables (keyConst) {

        keyConst.find({}, function (err, docs) {
            if (err) return console.log(err)
            res.json({showTables: arrNamesCollections, history: docs})
        })
    } 
})


io.on("connection", function (socket) {
    // текущие подключенные пользователи
    connections.push(socket)
    io.sockets.emit("numberOfUsers", connections.length)

    function newMessagesInTables (tableName, datas, nameRoom) {

        tableName.create({
            user: datas.name,
            message: datas.message,
            createdAt: new Date()
        }, function (err, doc) {
            if (err) return console.log(err)
    
            
            const lastMessage = {id: doc._id, user: doc.user, message: doc.message, createdAt: doc.createdAt}
            io.sockets.emit("lastMessage", [lastMessage, nameRoom])
            
        })
    }

    socket.on("addMessage", function (data, nameRoom) {
        // если пришло сообщение, то...
        // добавить новые данные в БД и тут же вернуть эти данные клиенту
        newMessagesInTables(allCollections[nameRoom], data, nameRoom)
    }) 


    socket.on("addRoom", function (tableName) {
        // юзер нажал на кнопку 
        // дать всем сигнал, что комната создана
        
        io.sockets.emit("newRoom", tableName)
        

        // добавить эту комнату в БД в виде таблицы
        addRoomsInMongoDB(tableName)
        arrNamesCollections.push(tableName)
    })


    socket.on("disconnect", function () {
        connections.splice(connections.indexOf(socket), 1)
        
        io.sockets.emit("numberOfUsers", connections.length)
    })
})

server.listen(PORT)