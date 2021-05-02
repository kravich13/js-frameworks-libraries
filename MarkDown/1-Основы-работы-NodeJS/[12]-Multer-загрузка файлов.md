- [Загрузка файлов и настройка multer](#загрузка-файлов-и-настройка-multer)
  - [Загрузка файлов](#загрузка-файлов)
    - [***Методы приёма файлов:***](#методы-приёма-файлов)
  - [Настройка multer](#настройка-multer)
    - [***Настройка параметров сохранения файлов:***](#настройка-параметров-сохранения-файлов)
    - [***Фильтрация файлов:***](#фильтрация-файлов)
    - [***Обработка ошибок:***](#обработка-ошибок)


# Загрузка файлов и настройка multer

## Загрузка файлов

Модуль `multer` нужен для загрузки файлов из HTML формы. В этой HTML форме может быть как сам файл для загрузки, так и совместно с другими передаваемыми данными из формы. 

Делать это руками - долго, неэффективно и слишком много всего нужно учитывать, `multer` же разделяет на две составляющие и позволяет взять файл отдельно.

Определение модуля:

```bash
npm i multer
```

В `index.html` будет распологаться следующий код: 

```html
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="filedata"/>
    <input type="submit" value="Send"/>
</form>
```

* Установка атрибута `enctype="multipart/form-data"` обязательна для подхвата загружаемого файла на сервере по `multer`.

Файл `app.js`:

```javascript
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const path = require("path")
const server = require('http').createServer(app)
const multer = require("multer")
const PORT = process.env.PORT || 3000

const urlencodedParser = bodyParser.urlencoded( {extended: false} )

  
app.use(multer( {dest:"uploads"} ).single("filedata")) // 1)

app.post("/upload", urlencodedParser, function (req, res) {
   
    let filedata = req.file
    console.log(filedata) // 2)

    if (!filedata) return res.send("Ошибка при загрузке файла")
    return res.send("Файл загружен")
})

app.use(express.static(path.join(__dirname, 'public')))

server.listen(PORT)
```

Теперь по пунктам: 

1. `Multer` работает как middleware. 
    * Параметром передаётся объект, в котором параметр `dest` указывает на путь, по которому будет загружаться файл, в данном случае - это папка **uploads**. Если такой папки **нет** - она будет **создана** автоматически.

    * Функция `single` указывает, что загружаться будет **один** файл. 


2. Получение файла происходит через `req.file`, в котором будут храниться все данные загружаемого файла в виде объекта:

    ```javascript
    {
    fieldname: 'filedata',
    originalname: 'Снимок экрана от 2020-11-02 10-40-51.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'uploads',
    filename: '0afc1ee48c5453f140c51062c97b229b',
    path: 'uploads/0afc1ee48c5453f140c51062c97b229b',
    size: 80318
    }
    ```

В результате всех действий папка проекта будет выглядеть так: 

```bash
node_modules
public
    css
    index.html
uploads
    # здесь хранятся все имена файлов
    # можно прикрутить к ним расширение и первоначальные имена
    0afc1ee48c5453f140c51062c97b229b
app.js
package-lock.json
package.json
```

Также необязательно встраивать `multer` глобально в ввиде middleware, вместо этого можно его определить в переменную и передать в конкретный обработчик запроса:

```javascript
const upload = multer( {dest:"uploads"} )


app.post("/upload", upload.single("filedata"), function (req, res) {
   
    let filedata = req.file
    console.log(filedata)

    if (!filedata) return res.send("Ошибка при загрузке файла")
    return res.send("Файл загружен")
})
```

### ***Методы приёма файлов:***

* ### `upload.single (filename)`
    Принимает только один файл с входными данными `name="filename"`. Единственный файл будет сохранён в `req.file`:

    ```javascript
    upload.single("filedata")
    ```

* ### `.array(fieldname [,maxcount])`
    Принимает массив файлов с помощью `name="filename"`. Будет ошибка, если кол-во файлов больше, чем `maxcount`. Массив хранится в `req.file`:

    ```javascript
    upload.array("filesdatas", 3)
    ```

* ### `fields(fields)`
    Принимает сочетание разных файлов с разных `form`:

    ```html
    <input type="file" name="screen" />
    <input type="file" name="video" multiple />
    ```

    ```js
    router.post('/form', upload.fields([
            { name: "screen", maxCount: 1 },
            { name: "video" }
        ])
    )
    ```
    
* ### `.none()`
    Принимает только текстовые поля, при загрузке любого файла будет выдана ошибка с кодом `LIMIT_UNEXPECTED_FILE`.

* ### `any()`
    Принимает все файлы. Массив хранится в `req.file`. 

    Важно: `any()` нужно использовать только в тех маршрутах, где идёт обработка загруженных файлов:

    ```javascript
    router.post('/form', upload.any(), (req, res, next) => {
	    req.files.forEach( (file) => console.log(file))
    }
    ```

***

## Настройка multer

### ***Настройка параметров сохранения файлов:***

```javascript
const srorageCongif = multet.diskStorage({
    destination: (req, file, cb) => { // 1)
        cb(null, "uploads")
    },
    filename: (req, file, cb) => { // 2)
        cb(null, file.originalname)
    }
})

// 3)
app.use(multer( {storage:storageConfig} ).single("filedata"))

app.post("/upload", function (req, res) {
   
    let filedata = req.file
    console.log(filedata)

    if (!filedata) return res.send("Ошибка при загрузке файла")
    return res.send("Файл загружен")
})
```

Для настройки сохранения файлов применяется метод `multer.diskStorage()`, который принимает объект с двумя параметрами, каждый из которых представляет функцию:

* `destination` - определяет место хранение файлов.
* `filename` - определяет имя загруженных файлов, т.е. `file.originalname`. При необходимости можно добавить другие методы, например, дату загрузки: 

    ```javascript
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
    ```
Оба параметра получают объект `req`, из которого можно достать нужные передаваемые в него данные и использовать при сохранении файлов.

### ***Фильтрация файлов:***

`multer` позволяет делать фильтрацию файлов по типу. К примеру нужны лишь файлы изображений:

```javascript
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
            cb(null, true)
            break
        default: 
            cb(null, false)
            break
    }
}

// передача фильтра в объект
app.use(multer( {storage:storageConfig, fileFilter: fileFilter} ).single("filedata"))
```

С помощью `file.mimetype` можно проверить тип файла, а далее вызывается `cb` и если тип `mimetype` подходит, то в качестве второго параметра в функцию `cb` передаётся `true`. Если же нужно **отклонить** файл - передаётся значение `false`.

### ***Обработка ошибок:***

Если нужно проконтролировать ошибки именно в `multer` без передачи ошибки в `express`, то можно использовать класс `MulterError`, который прикреплён к этому `multer`:

```javascript
const multer = require("multer")
const upload = multer().single("screen")

app.post("/profile", function (req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // при загрузке произошла ошибка
        } else {
            if (err) // при загрузке произошла неизвестная ошибка

            // ошибок нет и всё чётко
        }
    })
})
```