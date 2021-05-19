const express = require("express");
const { json, request } = require("express");
const app = express()

const jsonParser = express.json();


// массив объектов
const historyMessage = {
    data: [{
        nickname: "Kravich",
        message: "hello"
    },],
}
historyMessage.nextMessageId = historyMessage.data.length

const fromAndTo = {
    data: [],
}

const transferred = {}
let index
let add = false
let get




function addMessage (obj) {
    
    if (obj.nickname && obj.message) {
        transferred.nickname = obj.nickname
        transferred.message = obj.message


        historyMessage.data.push(transferred)

        // console.log(historyMessage.data)
        return true
    }
    
    // console.log(transferred)
}
function getMessages (obj) {

    // Если отрисовка начинается с первого сообщения - вернуть весь массив
    if (obj.messageId === 0) {
        console.log(historyMessage.data)
        return 0
    }
    
    // console.log(тут)
    // Если добавлено одно новое сообщение - вернуть массив объекта с этим сообщением
    if (obj.messageId === historyMessage.nextMessageId - 1) {

        if (transferred.nickname) {

            // console.log(transferred)
            fromAndTo.data.push(transferred)
            fromAndTo.nextMessageId = historyMessage.data.length
            return "finally"
        }
    }

}


app.post("/", jsonParser, function (request, response) {
    // console.log(historyMessage)
    if (!request.body) return response.sendStatus(400)
    historyMessage.nextMessageId = historyMessage.data.length
    fromAndTo.nextMessageId = historyMessage.data.length

    
    // let add 
    // let get

    if (request.body.func === "addMessage") {
        add = addMessage(request.body)
        
        // если сообщение пришло - отправить обратно клиенту
        if (add) {            
            fromAndTo.data.push(transferred)
            
            response.json(fromAndTo)
            fromAndTo.data.pop()
            add = false
            return
            
        }
    }
    
    // если послан запрос
    if (request.body.func === "getMessages") {
        get = getMessages(request.body)
        
        // console.log(fromAndTo.nextMessageId)
        
        // Если отрисовка с нуля - вернуть все сообщения
        if (get === 0) {
            console.log("тут")
            return response.json(historyMessage)
        }
        else {
            // если новых сообщений нет - отправить пустой массив
            // console.log("тут")
            if (!add) {
                response.json(fromAndTo)
                fromAndTo.data.pop()
                return
            }
            
        }
        

        if (get === "finally") {
            response.json(fromAndTo)
            fromAndTo.data.pop()
            return 
        }

        // response.json(historyMessage)

    }
})


app.use("/", function (request, response) {
    response.sendFile(__dirname + "/index.html")

})

app.listen(3000)

