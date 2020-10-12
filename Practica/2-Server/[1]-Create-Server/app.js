// Request
// const http = require("http")

// http.createServer( function (request, response) {

//     console.log(`Url: ${request.url}`)
//     console.log(`Тип запроса: ${request.method}`)
//     console.log(`User-Agent: ${request.headers["user-agent"]}`)
//     console.log("Все заголовки")
//     console.log(request.headers)
     
//     response.end()
// }).listen(3000)




// Response
// const http = require("http")
 
// http.createServer( function (request, response) {
     
//     response.setHeader("UserId", 12)
//     response.setHeader("Content-Type", "text/html; charset=utf-8;")
//     response.write("<h2>Vlad Kravich</h2>")
//     response.end()

// }).listen(3000)





// Маршрутизация - перенаправление со страницы на страницу в рамках своего сайта

// const http = require("http")

// http.createServer( function (request, response) {

//     response.setHeader("Content-type", "text/html; charset=utf-8")

//     if (request.url === "/home" || request.url === "/") {
//         response.write("<h2>Kravich Home</h2>")
//     }
//     else if (request.url === "/about") {
//         response.write("<h2>About</h2>")
//     }
//     else if (request.url == "/contact") {
//         response.write("<h2>Contacts</h2>")
//     }
//     else {
//         response.write("<h2>Not found</h2>")
//     }
//     response.end()

// }).listen(3000)




// Переадресация
// const http = require("http");
  
// http.createServer( function (request, response) {
     
//     response.setHeader("Content-Type", "text/html; charset=utf-8;")
     
//     if (request.url === "/") {
//         response.statusCode = 302 // временная переадресация
//         // на адрес localhost:3000/newpage
//         response.setHeader("Location", "/newpage")
//     }
//     else if (request.url == "/newpage") {
//         response.write("New address")
//     }
//     else {
//         response.statusCode = 404 // адрес не найден
//         response.write("Not Found")
//     }
//     response.end()

// }).listen(3000)