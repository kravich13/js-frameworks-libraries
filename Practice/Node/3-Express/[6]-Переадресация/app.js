const express = require("express")
const app = express()

app.use("/index", function (request, response) {
    response.redirect("https://kravich.com")
})

// app.use("/home", function (request, response) {
//     response.redirect("about")
// })

// app.use("/about", function (request, response) {
//     response.send("<h1>About</h1>")
// })



// app.use("/home/bar", function (request, response) {
//     response.redirect("about")
// })

// app.use("/home/about", function (request, response) {
//     response.send("<h1>About</h1>")
// })




// app.use("/home/foo/bar", function (request, response) {
//     response.redirect("./about")
// })

// app.use("/home/foo/about", function (request, response) {
//     response.send("<h1>About</h1>")
// })


app.listen(3000)