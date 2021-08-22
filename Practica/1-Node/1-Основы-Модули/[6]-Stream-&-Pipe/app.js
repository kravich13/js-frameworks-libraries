// Stream

// Модуль для работы с файлами
const fs = require("fs")

// В переменную записьСтрим записали файл hello.txt
let writeableStream = fs.createWriteStream("hello.txt")

// Запись в сам файл
writeableStream.write("Имя \n")
writeableStream.write("Возраст\n")
// Окончание записи
writeableStream.end("VIP")


// Создание потока для чтения в файл hello.txt
let readableStream = fs.createReadStream("hello.txt", "utf8")


// на файл hello.txt вешается обработчик
readableStream.on("data", function (chunk) {
    console.log(chunk)
})





// Pipe

// // Копирование файла
// const fs = require("fs")

// // Чтение файла
// let readableStream = fs.createReadStream("hello.txt", "utf8")

// // Запись файла
// let writeableStream = fs.createWriteStream("some.txt")

// // Копирование из hello.txt в some.txt
// readableStream.pipe(writeableStream)




// Сжатие в архив
// const fs = require("fs")
// const zlib = require("zlib")

// let readableStream = fs.createReadStream("hello.txt", "utf8")

// let writeableStream = fs.createWriteStream("hello.txt.gz")

// let gzip = zlib.createGzip()

// readableStream.pipe(gzip).pipe(writeableStream)

