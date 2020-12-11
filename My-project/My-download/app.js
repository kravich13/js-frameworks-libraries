const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")
const server = require('http').createServer(app)
const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


app.post("/upload", function (req, res) {
    console.log(req.body)

    // const writeableStream = fs.createWriteStream(req.body.name)

    // fs.createWriteStream()
    res.json({qq: "privet"})    
})





app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT)