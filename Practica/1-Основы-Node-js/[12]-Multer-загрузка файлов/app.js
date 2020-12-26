const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const path = require("path")
const server = require('http').createServer(app)
const multer = require("multer")
const PORT = process.env.PORT || 3000




const urlencodedParser = bodyParser.urlencoded( {extended: false} )

  
// app.use(multer( {dest:"uploads"} ).single("filedata"))

// const upload = multer( {dest:"uploads"} )


const storage = multer.memoryStorage()
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => { // 1
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})



const fileFilter = (req, file, cb) => {

    switch (file.mimetype) {
        case "image/png":
        case "image/bmp":
        case "image/jpg":
        case "image/jpeg":
        case "image/gif":
        case "video/mp4":
            cb(null, true)
            break
        default: 
            cb(null, false)
            break
    }
}

app.use(multer( {storage:storageConfig, fileFilter: fileFilter} ).single("filedata"))


app.post("/upload", urlencodedParser, function (req, res) {
   
    let filedata = req.file
    console.log(filedata)

    if (!filedata) return res.send("Ошибка при загрузке файла")
    return res.send("Файл загружен")
})


app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT)


