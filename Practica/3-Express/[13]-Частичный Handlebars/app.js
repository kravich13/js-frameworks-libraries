const express = require("express")
const hbs = require("hbs")
const app = express()

app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "/views/patrials")


app.use("/contact", function (request, response) {

    response.render("contact", {
        title: "Мои контакты",
        email: "qq@gads.com",
        phone: "0666666666"
    })
})

app.use("/", function (request, response) {
    
    response.render("home.hbs")
})

app.listen(3000)
