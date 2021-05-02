- [Stream, Readable, Writable](#stream-readable-writable)
	- [Поток чтения](#поток-чтения)
		- [***Ивенты:***](#ивенты)
	- [Поток записи](#поток-записи)
		- [***Ивенты:***](#ивенты-1)
		- [***Примеры:***](#примеры)
	- [Pipeline](#pipeline)

# Stream, Readable, Writable

`Stream` представляет поток данных, среди которых можно выделить поток **чтения**, **записи** и одновременный поток **чтения** и **записи**.
***

## Поток чтения
`fs.createStream()` - поток **чтения**.

Поток чтения - это также и `req` **запрос** от клиента.

Принимает два параметра:
1. `path` - типа `string` | `Buffer` | `URL`.
2. `options` - типа `string` | `Object`.


### ***Ивенты:***

Основные ивенты чтения `readable.on("event", callback)`: 
* `data` - применяется для чтения потока, его лучше **не** использовать, т.к. в случае закрытия страницы у клиента во время потока - поток сам не закроется.

* `readable` - применяется для чтения потока и не имеет недостатков `data`.
* `end` - сигнализирует о том, что поток чтения был окончен.
	
Пример с событием `readable`, чтения данных из файла с помощью `stream.read()`: 

```javascript
const fileData = path.parse("/uploads/kravich.txt")
const readableStream = fs.createReadStream(`uploads/${fileData.base}`)
const chunks = [] // массив кусков (один кусок 64 кб)

readableStream.setEncoding("utf8") // установка кодировки, иначе вернет баффер
readableStream.on("readable", () => {
	let chunk
    while ((chunk = readableStream.read()) !== null) {
        chunks.push(chunk)
        break
    }
})
readableStream.on("end", () => { // финал
    const finaly = chunks.join(" ")
    console.log(finaly)
    // Vlad Kravich 
	// 13kk+$
})
```
***

## Поток записи

`fs.createWriteStream()` - поток **записи**.

Поток записи - это также `res` поток отправки данных клиенту.

Принимает два параметра:
1. `path` - типа `string` | `Buffer` | `URL`.
2. `options` - типа `string` | `Object`.


### ***Ивенты:***

Основные ивенты чтения `writeableStream.on("event", callback)`: 
* `close` - срабатывает, когда любой из его базовых ресурсов закрыт. Событие указывает, что больше никаких событий не будет и вычислений тоже.

* `drain` - если `stream.write(chunk)` возвращает `false`, ивент `drain` будет сгенерирован, когда будет необходимо возобновить запись данных в поток. 
* `finish` - генерируется после того, как `stream.end()` метод был вызван, и все данные были сброшены в базовую систему. 

### ***Примеры:***
Пример с одновременным чтением и записью в другой файл с помощью метода `writable.write()`:

**Важное уточнение**: если поток чтения готов, а поток записи не закончен - то поток чтения буфферизируется и занимает память. Т.е. происходит синхронное действие: к примеру 3 чтения и 1 запись. А должно быть асинхронно: 1 чтение - 1 запись.

Для эффективного решения ипользуется событие `stream.drain()`, если `stream.write(chunk)` возвращает `false` - то это событие срабатывает и ждёт, когда нужно будет возобновить запись.

```js
const fileData = path.parse("/uploads/Cold Rush & Tiff Lacey - Cry Wolf (Original Mix).mp3")
const readableStream = fs.createReadStream(`uploads/${fileData.base}`)
const writeableStream = fs.createWriteStream(`rewriting/${fileData.base}`)

// передаётся поток чтения и записи
copyFile(readableStream, writeableStream) 

async function copyFile (origin, destination) {
    for await (const chunk of origin) { 
		// пока один кусок не прочитается и не запишется - цикл продолжен не будет
		const isDrained = destination.write(chunk)
		
		if (!isDrained) await events.once(destination, "drain") // нужен модуль events
	}

	destination.end()
}
```
**Важно** отметить, что для полного окончания записи нужно использовать `writeable.end()`, чтобы сервер дал понять, что запись всех кусков была завершена. 
***

## Pipeline

`Pipeline` - это канал, который связывает поток для чтения и поток для записии и позволяет сразу считать из потока чтения в поток записи. 

Имеет ключевую особенность от метода `pipe` в том, что при прерывании юзером загрузки (закрыл вкладку/браузер/комп), **загрузка завершится сразу же**, а не будет висеть в памяти до перезапуска в сервере.

Копирование данных из одной файла в папке в другой файл в другой папке:

```js
const { pipeline } = require('stream')

const fileData = path.parse("/uploads/Cold Rush & Tiff Lacey - Cry Wolf (Original Mix).mp3")
const readableStream = fs.createReadStream(`uploads/${fileData.base}`)
const writeableStream = fs.createWriteStream(`rewriting/${fileData.base}`)

run(readableStream, writeableStream) 

async function run (origin, dest) {
	try {
		await pipeline(origin, dest)
		// чтение и запись на лету
	} 
	catch (err) { // в случае какой-то ошибки убиваем все процессы
		origin.destroy()	
		dest.destroy()
		console.log(err)
	}
}
```