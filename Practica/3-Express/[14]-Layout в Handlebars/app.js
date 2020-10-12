const express = require("express")
const expressHbs = require("express-handlebars")
const hbs = require("hbs")
const app = express()


app.engine("hbs", expressHbs (
    {
        layotsDir: "views/layouts",
        defaultLayout: "layout",
        extname: "hbs"
    }
))
app.set("view engine", "hbs")
hbs.registerPartials(__dirname + "views/patrials")


app.use("/contact", function (request, response) {
    
    response.render("contact", {
        title: "Мои контакты",
        email: "qq213@gmail",
        phone: "06666666666"
    })
})

app.use("/", function (request, response) {
    
    response.render("home.hbs")
})

app.listen(3000)