const { request } = require("express")
const app = require("express")()
const http = require("http").createServer(app)
const io = require("socket.io")(http)
const ss = require('socket.io-stream')
const stream = ss.createStream()


const hishoryMessage = {
    data: []
}


app.get("/", function (request, response) {
    response.sendFile(__dirname + "/index.html")
})



io.on("connection", function (socket) {


    ss(socket).on("addMessage", function (stream, data) {
        console.log(data, stream)
    })
 
//     io.sockets.emit("getMessage", hishoryMessage.data)

//     socket.on("addMessage", function (userMessage) {

//         if (userMessage.pdfFile) {

//         }

//         hishoryMessage.data.push(userMessage)

//         io.sockets.emit("getMessage", hishoryMessage.data)
//     })

})

http.listen(3000)
