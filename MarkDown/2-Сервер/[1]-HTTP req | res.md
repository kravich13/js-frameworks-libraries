# Создание сервера

Для работы с сервером в `Node.js` используется модуль `http`.

Для создания сервера следует вызвать метод `http.createServer()`.

```javascript
const http = require("http")

http.createServer().listen(3000)
```

Модуль `createServer()` возвращает объект `http.Server`.

Но чтобы сервер мог прослушивать и обрабатывать входящие запросы, у объекта сервера нужно вызвать метод `listen()`, который в качестве параметра принимает номер порта, по которому запускается сервер.

Для обработки подключений в метод `createServer` можно передать специальную функцию:

```javascript
const http = require("http")
 
http.createServer( function (request, response) {
     
    response.end("Hello Kravich")
}).listen(3000)
```

### ***Запрос из сервера:***

* ### `http.request (options[, callback])` 
    Позволяет отправить запрос из сервера в этот же сервер, есть следующие основные `options`:

    
    * `method` - по дефолту: `GET`.
    * `port` - по дефолту: `80` для **http** и `443` для **https**.
    * `host` | `hostname` - например **kravich.com**, по дефолту: `localhost`.
    * `path` - путь запроса,  /index.html?user=kravich.
    * `port` - порт.
    * `headers` - объект с заголовками.

    Сам `req` возвращает **поток записи** (`writeable`), а `res` внутри него - поток **чтения** (`readable`).

    ```js
    const http = require("http")
    const express = require("express")
    const app = express()

    app.get('/', (req, res) => {
        console.log("тут")
    })
    app.listen(3000)


    const options = {
        method: "get",
        path: "/",
        port: 3000
    }   

    const req = http.request(options, (res) => {
        console.log(res)
    })

    req.end()
    ```
***

## Параметры createServer

* ### `Request`
    Позволяет получить информацию о запросе и представляет объект `http.IncomingMessage`. Основые свойства этого объекта:
    * `headers` - возвращает заголовок запроса.
    * `method` - тип запроса (`GET`, `POST`, `DELETE`, `PUT`).
    * `url` - представляет запрошенный адрес.

    Пример использования: 

    ```javascript
    const http = require("http")

    http.createServer( function (request, response) {

        console.log(`Url: ${request.url}`)
        console.log(`Тип запроса: ${request.method}`)
        console.log(`User-Agent: ${request.headers["user-agent"]}`)

        // Все заголовки
        console.log(request.headers)
        // Один заголовок
        console.log(request.getHeader('Content-Type')
        
        response.end()
    }).listen(3000)
    ```


* ### `Response`
    Управляет отправкой ответа и представляет объект `http.ServerResponse`. У него есть следующие основные методы:
    * `statusCode` - устанавливает статусный код ответа.
    * `statusMessage` - устанавливает сообщение, отправленное вместе со статусным кодом.
    * `setHeader(name, value)` - добавляет в ответ один заголовок.
    * `write` - пишет в поток ответа некоторое содержимое.
    * `writeHead` - добавляет в ответ статусный код и набор заголовков.
    * `end` - сигнализирует серверу, что заголовки и тело ответа установлены и в итоге отслылается ответ клиента. Данный метод должен вызываться в каждом запросе.

    Пример использования: 

    ```javascript
    const http = require("http")
    
    http.createServer( function (request, response) {
        
        response.setHeader("UserId", 12)
        response.setHeader("Content-Type", "text/html; charset=utf-8;")
        response.write("<h2>Vlad Kravich</h2>")
        response.end()

    }).listen(3000)
    ```

    В инструментах браузера по пути `Network` - `all` - `localhost` - `headers` можно найти все Хедеры.
***

## Маршрутизация 

Маршрутизация - перенаправление на разные страницы сайта. Пример: `kravich.com/home`, `kravich.com/vip` и т.д..

По умолчанию `Node.js` не имеет встроенной системы маршрутизации, обычно она используется с помощью специальных фреймворков типо `Express`. 

Однако, если необходимо разграничить простейшую обработку пары-тройки маршрутов - то вполне можно использовать для этого свойство `url` объекта `Request`. 

```javascript
const http = require("http")

http.createServer( function (request, response) {

    response.setHeader("Content-type", "text/html; charset=utf-8")

    if (request.url === "/home" || request.url === "/") {
        response.write("<h2>Kravich Home</h2>")
    }
    else if (request.url === "/about") {
        response.write("<h2>About</h2>")
    }
    else if (request.url == "/contact") {
        response.write("<h2>Contacts</h2>")
    }
    else {
        response.write("<h2>Not found</h2>")
    }
    response.end()

}).listen(3000)
```

В этом примере обрабатываются три маршрута. Если идёт обращение к корню сайта или по адресу `localhost:3000/home` - то выводится строка `Kravich Home`, если `localhost:3000/about` - `About`, если `localhost:3000/contact` - `Contacks`, а если страницы не существует - `Not found`.

**Более удобно использовать фреймворк `Express`, но о нём позже.**
***

## Переадресация


Переадресация - перенаправление сразу же при входе на сайт на другую страницу: ввёл в адресной строке `kravich.com`, а попал на `kravich.com/home`.

Есть два вида переадресации с отправкой статусного кода: 
1. Код `301` - постоянная переадресация.
2. Код `302` - временная переадресация c заголовком `Location`, который указывает на новый адрес.

Пример с временной переадрисацией с адреса `localhost:3000/` на адрес `localhost:3000/newpage`:

```javascript
const http = require("http");
  
http.createServer( function (request, response) {
     
    response.setHeader("Content-Type", "text/html; charset=utf-8;")
     
    if (request.url === "/") {
        response.statusCode = 302 // временная переадресация
        // на адрес localhost:3000/newpage
        response.setHeader("Location", "/newpage")
    }
    else if (request.url == "/newpage") {
        response.write("New address")
    }
    else {
        response.statusCode = 404 // адрес не найден
        response.write("Not Found")
    }
    response.end()

}).listen(3000)
```

`302` и `301` редирект похожи между собой. Тем не менее для большинства случаев оптимальным решением станет именно постоянная переадресация.

Редирект `301` — знак того, что поисковику стоит забыть о старом адресе и больше никогда на него не заходить. А `302` дает сигнал о продолжении индексирования контента, размещенного на изначально запрашиваемой странице.
В случае `301` перенаправления утратившая актуальность публикация перестанет отображаться в поисковой выдаче. При `302` редиректе в индексе будут присутствовать обе страницы.