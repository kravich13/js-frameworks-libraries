# Stream и Pipe

## Stream

`Stream` представляет поток данных, потоки бывают различных типов, среди которых можно выделить "потоки для чтения" и "потоки для записи".

С помощью этих двух потоков можно считывать и записывать информацию в файл (как в сампе при регистрации аккаунта создавался новый файл с кучей полей): 

```javascript
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
```

Для создания потока записи применяется метод `fs.createWriteStream()`, в который передаётся **два** параметра:

1. название файла. 
2. кодировка файла.

Если такого файла в папке нет - он будет создан.

Запись файла производится с помощью метода `write()`, в который передаются данные. Для окончания записи используется метод `end()`.

Для создания потока чтения применяется метод `fs.createReadStream()`, в который передаётся название файла и его кодировка.

Сам поток разбивается на ряд кусков и при считывании каждого такого куска, возникает событие `data`. С помощью метода `on()` можно подписаться на это событие и вывести каждый кусок данных в консоль.

### Terminal

```
Имя 
Возраст
VIP
```
Точно такой же вид имеет файл `hello.txt`.
***

## Pipe

`Pipe` - это канал, который связывает поток для чтения и поток для записии и позволяет сразу считать из потока чтения в поток записи.   

Копирование данных из одного файла в другой:

```javascript
const fs = require("fs")

// Чтение файла
let readableStream = fs.createReadStream("hello.txt", "utf8")

// Запись файла
let writeableStream = fs.createWriteStream("some.txt")

// Копирование из hello.txt в some.txt
readableStream.pipe(writeableStream)
```

У потока чтения вызывается метод `pipe()` в который передаётся поток записи.

Пример с архивацией файла, где сначала нужно считать файл, затем сжать данные и в конце записать сжатые данные в файл-архив.

```javascript
// Модуль на чтение и архивации
const fs = require("fs")
const zlib = require("zlib")

// 1) Чтение из файла hello.txt
let readableStream = fs.createReadStream("hello.txt", "utf8")

// 2) Определние файла hello.txt.gz
let writeableStream = fs.createWriteStream("hello.txt.gz")

// 3) Архивируем модуль
let gzip = zlib.createGzip()

// 4) Файл hello.txt запихиваем в архив hello.txt.gz
readableStream.pipe(gzip).pipe(writeableStream)
```