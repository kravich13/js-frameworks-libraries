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

### ***Ивенты Readable:***

* `data` - получение потоком данных;
* `resume` - инициируется при вызове метода `resume()`;
* `pause` - инициируется при вызове метода `pause()`;
* `close` - возникает при закрытии источника данных или самого потока;
* `end` - генерируется, когда из источника считаны все данные;
* `error` - возникновение в потоке ошибки, обработчику аргументом передается объект ошибки.

### Terminal

```
Имя 
Возраст
VIP
```
Точно такой же вид имеет файл `hello.txt`.
***

## Pipeline

`Pipeline` - это канал, который связывает поток для чтения и поток для записии и позволяет сразу считать из потока чтения в поток записи. 

Имеет ключевую особенность от метода `pipe` в том, что при прерывании юзером загрузки (закрыл вкладку/браузер/комп), **загрузка завершится сразу же**, а не будет висеть в памяти до перезапуска в сервере.

Копирование данных из одной файла в папке в другой файл в другой папке:

```js
const { pipeline } = require('stream')

const readableStream = fs.createReadStream("uploads/Cold Rush & Tiff Lacey - Cry Wolf (Original Mix).mp3")
const writeableStream = fs.createWriteStream("rewriting/Cold Rush & Tiff Lacey - Cry Wolf (Original Mix).mp3")

pipeline(
    readableStream,
    writeableStream,
	(err) => {
		if (err) {
			console.error('Pipeline failed.', err)
		} else {
			console.log('Pipeline succeeded.')
		}
	}
)
```