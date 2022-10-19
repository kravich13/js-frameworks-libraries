const path = require("path")
const express = require("express")
const app = express()


// basename
console.log(path.basename("[8]-Path-module/app.js")) // app.js
console.log(path.basename("Practica/[8]-Path-module/app.js")) // app.js

console.log(path.basename("/srv/app/app.js", ".js")) // app


// dirname
console.log(path.dirname("/srv/app/app.js", ".js")) // /srv/app


// extname
console.log(path.extname('/srv/app/app.js')) // .js


// isAbsolute
console.log(path.isAbsolute('/srv/app/app.js')) //true
console.log(path.isAbsolute('srv/app/app.js')) //false


// normalize
console.log(path.normalize("/srv///app///app.js"))


// parse
console.log(path.parse("/srv/app/app.js"))


// resolve
console.log(path.resolve('[8]-Path-module', 'app.js')) // D:\srv\app\app.js




app.get("/", function (req, res) {
    res.send("<h1>Vlad Kravich</h1>")
})


app.listen(3000)