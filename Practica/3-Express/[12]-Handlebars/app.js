const express = require("express")
const app = express()

// Установка hbs в качестве движка 
app.set("view engine", "hbs")
app.set("views", "templates") // установка пути к представлениям

app.use("/contact", function (request, response) {

    // Делает рендеринг содержимого файла
    response.render("contact.hbs", {
        title: "Блог о трейдинге",
        emailsVisible: true,
        emails: ["kravich13@gmail.com", "qq@gmail.com"],
        phone: "0666666666"
    })
})

app.use("/", function (request, response) {
    response.send("Главная страница")
})

app.listen(3000)

