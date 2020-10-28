const express = require("express")
const app = express()

const jsonParser = express.json()

app.post("/user", jsonParser, function (request, response) {

    console.log(request.body)
    
    if (!request.body) return response.sendStatus(400)

    response.json(request.body)
})

app.get("/", function (request, response) {

    response.sendFile(__dirname + "/index.html")
})

app.listen(3000)