// Передача переменных

// const express = require("express")
// const app = express()

// app.get("/", function (request, response) {
//     response.send("<h1>Главная страница</h1>")
// })

// app.use("/about", function (request, response) {
    
//     let id = request.query.id
//     let userName = request.query.name
    
//     response.send(`<h1>Информация</h1><p>id="${id}"</p><p>name="${userName}"</p>`)
// })

// app.listen(3000)






// Передача массивов

// const express = require("express")
// const app = express()

// app.get("/", function (request, response) {
//     response.send("<h1>Главная страница</h1>")
// })

// app.use("/about", function (request, response) {
    
    
//     console.log(request.query)

//     let names = request.query.name
//     let responseText = "<ul>"

//     for (let name of names) {
//         responseText += `<li>${name}</li>`
//     }

//     responseText += "</ul>"
//     response.send(responseText)
// })

// app.listen(3000)






// Передача сложных объектов

const express = require("express")
const app = express()

app.get("/", function (request, response) {
    response.send("<h1>Главная страница</h1>")
})

app.use("/about", function (request, response) {
    
    
    console.log(request.query)
    let id = request.query.user.id
    let names = request.query.user.name

    response.send(`<h3>id: ${id} <br>name: ${names}</h3>`)
})

app.listen(3000)
