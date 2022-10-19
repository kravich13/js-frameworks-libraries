// Получение модуля express
const express = require("express")

// Создание приложения
const app = express()

// Установка обработчика для пути /
app.get("/", function (request, response) {
    response.end("Hello, module Express")
})

// Прослушивание по порту 
app.listen(3000)



let name = process.argv[2]
let age = process.argv[3]
 
console.log("name: " + name)
console.log("age: " + age)