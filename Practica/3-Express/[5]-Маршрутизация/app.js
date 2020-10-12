const express = require("express")
const app = express()

app.get("/about", function (request, response) {
    response.send("<h1>О сайте</h1>")
})

app.use("/contact", function (request, response) {
    response.send("<h1>Контакты</h1>")
})

app.get("/", function (request, response) {
    response.send("<h1>Главная страница</h1>")
})

app.get("/kravich(.html)?", function (request, response) {
    response.send("<h1>Кравич</h1>")
})

app.get(/.*(\.)html$/, function (request, response) {
    response.send("<h1>Любой .html</h1>")
})
app.listen(3000)