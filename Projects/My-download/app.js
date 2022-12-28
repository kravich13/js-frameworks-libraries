const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { chdir } = require('process');
const { pipeline } = require('stream');
const { json } = require('body-parser');
const events = require('events');
const jsonParser = express.json();
const server = require('http').createServer(app);
const PORT = process.env.PORT || 4444;

const multer = require('multer');

// const writeableStream = fs.createWriteStream("uploads/kravich.txt")
// writeableStream.write("Vlad Kravich \n")
// writeableStream.end("13kk+$")

// 1) Чтение файла в виде бинарки
// const fileData = path.parse("/uploads/kravich.txt")
// const readableStream = fs.createReadStream(`uploads/${fileData.base}`)

// // readableStream.setEncoding("utf8") // установка кодировки, иначе вернет баффер
// readableStream.on("readable", () => {
//     while ((chunk = readableStream.read()) !== null) {
//         console.log(chunk)
//         // Vlad Kravich
//         // 13kk+$
//         break
//     }
// })

// 2) Считывание файла с диска и перезапись его на диск.

// 2.1) копирование файла в другое место
// const fileData = path.parse("/uploads/Cold Rush & Tiff Lacey - Cry Wolf (Original Mix).mp3")
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
//     writeableStream.write(chunk)
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

// 4) Считать файл с диска и отправить клиенту потоками

app.post('/upload2', function (req, res) {
  // const readableStream = fs.createReadStream(`uploads/${fileData.base}`)

  // resFile(readableStream, res)

  const fileName = req.headers['file-name'];
  const writeableStream = fs.createWriteStream(`rewriting/${fileName}`);
  console.log(writeableStream.path);
  reqFile(req, writeableStream);

  // 5) Передача файла от клиента серверу
  async function reqFile(origin, destination) {
    try {
      for await (const chunk of origin) {
        const isDrained = destination.write(chunk);
        if (!isDrained) await events.once(destination, 'drain');
      }
      destination.end();
      console.log('готово');
    } catch (err) {
      origin.destroy();
      destination.destroy();
      console.log(err);
    }
  }

  // 4) Передача файла от сервера клиенту
  async function resFile(origin, destination) {
    try {
      res.setHeader('AudioName', fileData.name);

      for await (const chunk of origin) {
        const isDrained = destination.write(chunk);
        if (!isDrained) await events.once(destination, 'drain');
      }

      destination.end();
    } catch (err) {
      origin.destroy();
      destination.destroy();
      console.log(err);
    }
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Images/');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.json({ extended: true }));

app.post('/upload', upload.array('electric', 2), (req, res) => {
  console.log(req.files.length);
  res.send('Image uploaded');
});

app.post('/upload-single', upload.single('electric'), (req, res) => {
  res.send('Image uploaded');
});

app.use(express.static(path.join(__dirname, 'public')));

server.listen(PORT, undefined, () => {
  console.log('GO');
});
