const express = require("express")
const app = express()


app.get("/", function (req, res) {

    res.download("/hello.txt", function (error) {
        console.log(error)
    })
    res.send("Привет")
})

app.listen(3000)

