// Обычный вариант
const express = require("express")
const app = express()

// app.use("/about", function (request, response) {
//     response.send("О сайте")
// })

// app.use("/products/create", function (request, response) {
//     response.send("Добавление товара")
// })

// app.use("/products/:id", function (request, response) {
//     response.send(`Товар: ${request.params.id}`)
// })

// app.use("/products/", function (request, response) {
//     response.send("Список товаров")
// })

// app.use("/", function (request, response) {
//     response.send("Главная страница")
// })

// app.listen(3000)





// Вариант с Router

// Определение Router

// const productRouter = express.Router()

// // Сопоставляем роутер с конечной точкой /products
// app.use("/products", productRouter)


// // Определение маршрутов и их обработчиков внутри роутера
// productRouter.use("/create", function (request, response) {
//     response.send("Добавление товара")
// })

// productRouter.use("/:id", function (request, response) {
//     response.send(`Товар: ${request.params.id}`)
// })

// productRouter.use("/", function (request, response) {
//     response.send("Список товаров")
// })



// app.use("/about", function (request, response) {
//     response.send("О сайте")
// })

// app.listen(3000)







// Обработчики маршрутов

// app.get("/example/b", function (req, res, next) {
//     console.log("перешел на страницу")
//     next()
// }, function (req, res) {
//     res.send("Привет b")
// })

// app.listen(3000)






// Массив функций обратного вызова

// const cb0 = function (req, res, next) {
//     console.log("Один")
//     next()
// }

// const cb1 = function (req, res, next) {
//     console.log("Два")
//     next()
// }

// const cb2 = function (req, res, next) {
//     res.send("Привет на C")
// }

// app.get("/example/c", [cb0, cb1, cb2])

// app.listen(3000)






// Обработка сочетанием независимых функций и массива функций

// const cb0 = function (req, res, next) {
//     console.log("Один")
//     next()
// }

// const cb1 = function (req, res, next) {
//     console.log("Два")
//     next()
// }

// app.get("/example/d", [cb0, cb1], function (req, res, next) {
//     console.log("Сочетание массива и встроенной функции, три")
//     next()
// }, function (req, res) {
//     res.send("Привет d")
// })

// app.listen(3000)






// app.route()

app.route("/kravich")
    .get( function (req, res) {
        res.send("Прочитать блог")
    })
    .post( function (req, res) {
        res.send("Добавить в блог")
    })
    .put( function (req, res) {
        res.send("Обновить блог")
    })

app.listen(3000)



