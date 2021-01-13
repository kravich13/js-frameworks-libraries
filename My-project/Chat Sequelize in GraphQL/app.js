const express = require("express")
const app = express()
const server = require('http').createServer(app)
const path = require("path")
const { readFileSync } = require("fs")
const io = require("socket.io")(server)
const Sequelize = require("sequelize")
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require("graphql")
const PORT = process.env.PORT || 5555


const sequelize = new Sequelize("generalChat", "root", "rfgkzrfgkz", {
    dialect: "mysql",
    host: "localhost",
    define: {
        createdAt: true,
        updatedAt: false,
        freezeTableName: true
    }
})

const allTableInSQL = {}
const arrNamesTables = []
const connections = []

function addRoomsInSQL (nameTable) {
    allTableInSQL[nameTable] = sequelize.define(nameTable, {
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
}

const schemaString = readFileSync("./schema.graphql", {encoding: "utf-8"})
const schema = buildSchema(schemaString)
const urlRoomUser = []



app.get("/", function (req, res) {
    res.redirect("/rooms")
})

app.get("/rooms", function (req, res) {
    urlRoomUser[0] = req.query.nameRoom
    res.sendFile(path.join(__dirname, "public", "index.html"))
})


run ()
async function run() {
    
    // Получение всех существующих таблиц из БД
    try {
        const tableObj = await sequelize.getQueryInterface().showAllSchemas()
        
        for (let key of tableObj) {
            arrNamesTables.push(key.Tables_in_generalChat)
            addRoomsInSQL(key.Tables_in_generalChat)
        }
        sequelize.sync()
        
    } catch (err) { console.log(`Ошибка в синхронизации схем: ${err}`) }

    // Обработка входящих запросов от клиента
    try {
        const root = {
            getRoom: async function ({nameRoom}) {
                if (nameRoom === "713dbhqpo666") {
                    if (!urlRoomUser[0]) {
                        return gettingDataInTables(
                            allTableInSQL[arrNamesTables[0]], arrNamesTables[0]
                        )
                    }
                    return gettingDataInTables(
                        allTableInSQL[urlRoomUser[0]], urlRoomUser[0]
                    )
                }
                return gettingDataInTables(allTableInSQL[nameRoom], nameRoom)
            },
            allRoom: () => arrNamesTables,
            urlAdress: () => {
                if (!urlRoomUser[0]) return arrNamesTables[0]
                return urlRoomUser[0] 
            }
        }

        app.use("/rooms", graphqlHTTP({
            schema: schema,
            rootValue: root,
            // graphiql: true
        }))
    } catch (err) { console.log(`Ошибка в отправлении запроса или получении ответа: ${err}`) }

}

function gettingDataInTables(keyConst, validNameRoom) {
    // константа не равна строке
    try {        
        let noRoom = false

        for (let i = 0; i < arrNamesTables.length; i++) {
            if (arrNamesTables[i] == validNameRoom) {
                noRoom = true
                break
            }
        }

        if (noRoom) return findAllSQL(keyConst)
        return findAllSQL(allTableInSQL[arrNamesTables[0]])

    } catch (err) { console.log(err) }
}

function findAllSQL (keyConst) {
    return keyConst.findAll({
        attributes: [
            "id", "user", "message",
            [sequelize.fn("date_format", sequelize.col("createdAt"), '%d %M %Y %k:%i'), 'createdAt'],
        ],
        raw: true
    })
}



io.on("connection", function (socket) {
    // текущие подключенные пользователи
    connections.push(socket)
    io.sockets.emit("numberOfUsers", connections.length)

    async function newMessagesInTables (tableName, datas, nameRoom) {
        const res = await tableName.create({
            user: datas.name,
            message: datas.message,
        })

        const lastMessage = {
            id: res.id, user: res.user, message: res.message, createdAt: res.createdAt
        }
        io.sockets.emit("lastMessage", [lastMessage, nameRoom])
    }

    socket.on("addMessage", function (data, nameRoom) {
        // если пришло сообщение, то...
        // добавить новые данные в БД и тут же вернуть эти данные всем клиентам
        newMessagesInTables(allTableInSQL[nameRoom], data, nameRoom)
    }) 


    socket.on("addRoom", async function (tableName) {
        // юзер нажал на кнопку 
        // дать всем сигнал, что комната создана
        io.sockets.emit("newRoom", tableName)
        

        // добавить эту комнату в БД в виде таблицы
        try {

            addRoomsInSQL(tableName)
            await allTableInSQL[tableName].sync()
            arrNamesTables.push(tableName)
        } catch (err) { console.log(`Ошибка в добавлении комнаты в БД: ${err}`) }
    })

    socket.on("deleteRoom", function (nameRoom) {
        allTableInSQL[nameRoom].drop()

        for (let i = 0; i < arrNamesTables.length; i++) {
            if (nameRoom === arrNamesTables[i]) {
                arrNamesTables.splice(i, 1)
                break
            }
        }

        // команда всем, что комната была удалена
        io.sockets.emit("deleteLastRoom", nameRoom)
    })

    socket.on("disconnect", function () {
        connections.splice(connections.indexOf(socket), 1)
        io.sockets.emit("numberOfUsers", connections.length)
    })
})

app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT)