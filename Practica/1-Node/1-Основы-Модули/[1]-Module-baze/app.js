// const http = require("http")

// // Слушает входящие запросы
// http.createServer(function (request, response) {

//     response.end("Hello, Node")

// }).listen(3000, "127.0.0.1", function () {  // принимает ответы

//     console.log("Сервер начал работу")
// })

// Этот модуль предоставляет данные о системе пользователя
const os = require('os')

// Здесь подключён другой файл (собственный модуль)
// const greeting = require("./greeting")

let userName = os.userInfo().username

// console.log(`Дата запроса: ${greeting.date}`)

// Вызывается функция из модуля с параметром "userName" - имя пользователя из системы
// console.log(greeting.getMessage(userName))

// Определение глобального модуля
const greeting = require('./greeting')

global.name = 'Владислав'

global.console.log(date)
console.log(greeting.getMessage())

//
const User = require('./user')
let vladislav = new User('Владислав', 23)

vladislav.sayHi()
// "Привет, меня зовут Владислав и мне 23 года"

//
const welcome = require('./welcome')

welcome.getMorningMessage() // Доброе утро
welcome.getEveningMessage() // Добрый вечер

// Передача параметров для терминала

let nodePath = process.argv[0]
let addPath = process.argv[1]
let name = process.argv[2]
let age = process.argv[3]

console.log(`nodePath: ${nodePath}`)
console.log(`addPath: ${addPath}`)
console.log('')
console.log(`name: ${name}`)
console.log(`age: ${age}`)

// nodePath: /usr/bin/node
// addPath: /run/media/vladislav/Новый том/Dev/js/Node-js/Practica/module-baze/app.js

// name: Vlad
// age: 23
