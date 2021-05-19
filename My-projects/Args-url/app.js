const express = require("express")
const app = express()
const jsonParser = express.json()
const server = require('http').createServer(app)
const path = require("path")
const { nextTick } = require("process")
const PORT = process.env.PORT || 3000


// http://localhost:3000/rooms?nameRoom=TestRoom

let urlRoomUser = []

app.get("/", function (req, res) {
    res.redirect("/rooms")
})

app.get("/rooms", function (req, res) {
    urlRoomUser[0] = req.query.nameRoom
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.post("/rooms", jsonParser, function (req, res) {
    if (urlRoomUser[0]) res.json({showTables: urlRoomUser}) 
})

app.use(express.static(path.join(__dirname, 'public')))
server.listen(PORT)