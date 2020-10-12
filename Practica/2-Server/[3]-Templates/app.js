const http = require("http")
const fs = require("fs")

http.createServer( function (require, response) {

    fs.readFile("index.html", "utf8", function (error, data) {
        // путь файла, кодировка, функция обратного вызова


        let message = "Блог о трейдинге"
        let header = "Kravich Home"


        // data - само содержимое всего файла index.html
        data = data.replace("{header}", header).replace("{message}", message)
        response.end(data)
    })
}).listen(3000)