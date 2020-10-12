const express = require("express")
const app = express()

app.use("/home/kravich", function (request, response) {
    // response.send("<h2>Kravich</h2>")
    // response.send(["Kravich", "Vlad"])
    // response.send({id:13, name: "Vlad"})

    // response.send(Buffer.from("Hello Kravich"))

    // response.sendFile(__dirname + "/index.html")
    
    // response.sendStatus(404)

    // response.status(404).send("Ресурс не найден")
})

app.listen(3000)


