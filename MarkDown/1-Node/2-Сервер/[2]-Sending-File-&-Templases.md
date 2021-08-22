- [Отправка файлов и шаблоны](#отправка-файлов-и-шаблоны)
  - [Отправка файлов](#отправка-файлов)
  - [Шаблоны](#шаблоны)

# Отправка файлов и шаблоны

## Отправка файлов

Допустим, в каталоге приложения лежит три файла:
* `app.js`
* `about.html`
* `index.html`

Задача состоит в том, чтобы пользователь мог получить оба `html` файла по пути `localhost:3000/название.html`.

Для считывания файла может применяться метод `fs.createReadStream()`, который считывает файл в поток, а затем с помощью метода `pipe()` можно связать считанные файлы с потоком записи (с объектом `response`).

```javascript
// app.js

const http = require("http")
const fs = require("fs")

http.createServer( function (request, response) {

    // Получение пути после localhost:3000/
    console.log(`Запрошенный адрес: ${request.url}`)

    // Смотрим, есть ли такой файл
    const filePath = request.url.substr(1)


    fs.access(filePath, fs.constants.R_OK, err => {
        
        if (err) {
            response.statusCode = 404
            response.end("Resourse not found")
        }
        else fs.createReadStream(filePath).pipe(response)
    })
}).listen(3000, function () {
    console.log("Server started at 3000")
})
```

Логика следующая: 
1. Получаем запрошенный файл.
2. С помощью асинхронной функции `fs.acces` проверяем доступность файла для чтения.
   * Первый параметр - путь к файлу;
   * Второй параметр - опция, относительно которой проверяется доступ (`fs.constants.R_OK` проверяет права на чтения из файла.);
   * Третий параметр - функция обратного вызова для получения объекта ошибки.
3. Для отправки файла применяется цепочка методов `fs.createReadStream("файл").pipe(response)`.


Теперь можно обратиться по адресу `localhost:3000/index.html` и получить его содержимое, если же указан неверный путь - сработает `err` и на странице отобразится `Resourse not found`.

Подобным образом можно отправлять самые разные файлы. К примеру можно определить в проекте папку `public` и в ней создать `css` файл со стилями, после чего подключить этот `css` к `index.html` файлу и полное содержимое будет отображаться по пути `localhost:3000/index.html`.
***

## Шаблоны

В примерах выше использовался файл `html` со статическим, неизменным содержимым. Однако, можно применить спец. инструмент - шаблоны, чтобы сделать файл динамическим, в котором будет изменяться определенный текст (например). 

Для этого в динамический тег нужно вписать`{header}` (заголовок) и `{message}` (текст):

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>{header}</h1>
    <p>{message}</p>
</body>
</html>
```

Теперь в `app.js`:

```javascript
const http = require("http")
const fs = require("fs")

http.createServer( function (require, response) {

    fs.readFile("index.html", "utf8", function (error, data) {
        // путь файла, кодировка, функция обратного вызова

        let message = "Блог о трейдинге"
        let header = "Kravich Home"

        data = data.replace("{header}", header).replace("{message}", message)
        response.end(data)
    })
}).listen(3000)
```

По пути `data.replace("{header}")` получаем содержимое файла и заменяем вторым параметром на переменную `header`.

По обращению на страницу получим вписанные в переменные данные из `app.js`.