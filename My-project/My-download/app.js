const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")
const { chdir } = require("process")
const { pipeline } = require('stream')
const server = require('http').createServer(app)
const PORT = process.env.PORT || 3000



// const writeableStream = fs.createWriteStream("uploads/kravich.txt")
// writeableStream.write("Vlad Kravich \n")
// writeableStream.end("13kk+$")




// 1) Чтение файла в виде бинарки
// const readableStream = fs.createReadStream("uploads/kravich.txt", "utf8")

// readableStream.on("data", chunk => {
//     console.log(Buffer.from(new String(chunk)))
//     // arrChunks.push(Buffer.from(new String(chunk)))
// })




// 2) Считывание файла с диска и перезапись его на диск.

// 2.1) копирование файла в другое место 
const fileData = path.parse("/uploads/Cold Rush & Tiff Lacey - Cry Wolf (Original Mix).mp3")
const readableStream = fs.createReadStream(`uploads/${fileData.base}`)
const chunks = []

readableStream.on("data", chunk => {
    chunks.push(chunk)
})

readableStream.on("end", () => {
    const file = chunks.join('') 

    const writeableStream = fs.createWriteStream(`rewriting/${fileData.base}`)
    writeableStream.write(file)
})


// 2.2) перенаправление потока чтения в поток записи
// const readableStream = fs.createReadStream("uploads/Cold Rush & Tiff Lacey - Cry Wolf (Original Mix).mp3")
// const writeableStream = fs.createWriteStream("rewriting/Cold Rush & Tiff Lacey - Cry Wolf (Original Mix).mp3")

// pipeline(
//     readableStream,
//     writeableStream,
// 	(err) => {
// 		if (err) {
// 			console.error('Pipeline failed.', err)
// 		} else {
// 			console.log('Pipeline succeeded.')
// 		}
// 	}
// )


app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT)