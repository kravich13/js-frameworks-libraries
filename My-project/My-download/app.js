const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const fs = require("fs")
const path = require("path")
const { chdir } = require("process")
const { pipeline } = require('stream')
const { json } = require("body-parser")
const jsonParser = express.json()
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
// const fileData = path.parse("/uploads/17_Corona_-_Baby_Baby.mp3")
// const readableStream = fs.createReadStream(`uploads/${fileData.base}`)
// const writeableStream = fs.createWriteStream(`rewriting/${fileData.base}`)

// copyFile(readableStream, writeableStream)

// async function copyFile (origin, destination) {
//     for await (const chunk of origin) {
//         destination.write(chunk)
//     }
//     console.log("Закончил")
// }

// readableStream.on("data", chunk => {
    // writeableStream.write(chunk)
// })

// readableStream.on("end", () => {
// })


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



// 3) Считывание текстовых данных файла
// const fileData = path.parse("/uploads/kravich.txt")
// const readableStream = fs.createReadStream(`uploads/${fileData.base}`)


// readableStream.setEncoding("utf8") // установка кодировки, иначе вернет баффер
// readableStream.on("readable", () => {
//     while ((chunk = readableStream.read()) !== null) {
//         console.log(chunk)
//         // Vlad Kravich 
//         // 13kk+$
//         break
//     }
// })


app.post("/", function (req, res) {

    // const readableStream = fs.createReadStream(req)

    const chunks = []

    req.on("readable", () => {
        let chunk
        while ((chunk = req.read()) !== null) {
            chunks.push(chunk)
            break
        }
    })

    req.on("end", () => {
        const finaly = chunks.join(" ")
        console.log(finaly)
    })


    res.json("qq")
})




app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT)