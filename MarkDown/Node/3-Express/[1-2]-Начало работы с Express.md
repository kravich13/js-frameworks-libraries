- [Express](#express)
  - [Начало работы с Express](#начало-работы-с-express)
  - [app.get()](#appget)
  - [app.use()](#appuse)
    - [***Пример middlewar:***](#пример-middlewar)

# Express

## Начало работы с Express

`Express` - фреймворк, использующий модуль `http`, но вместе с ним предоставляет ряд готовых решений, которые упрощают создание сервера и серверной логики, таких как обработка отправленных форм, работа с куками, `CORS` и т.д.


Для создания проекта на `Express` нужно:
* создать файл `package.json`;
* вбить в терминале `npm init`, ввести имя и получить готовый файл;
* установить `Express` в терминале с помощью команды `npm i express`, после чего в `package.json` появится сам модуль `express`.
***
## app.get()

Использование `Express` с помощью `app.get`:

```javascript
// подключение модуля express
// создание объекта на express
const express = require("express")
const app = express()

// обработчик для маршрута /
app.get("/", function (request, response) {

    response.send("<h1>Привет Express</h1>")
})

// обработчик для маршрута /about
app.get("/about", function (request, response) {
    
    response.send("<h1>О сайте</h1>")
})

// обработчик для маршрута /contact
app.get("/contact", function (request, response) {

    response.send("<h1>Контакты</h1>")
})

// запуск сервера с помощью app.listen
app.listen(3000)
```

**`Express` опирается на систему маршрутов, поэтому все запросы, которые не соответствуют указанным маршрутам не будут обрабатываться и на странице будет надпись "Cannot GET /адрес".**
***

## app.use()

Примеры выше - это конвеер обработки, в котором при соответствии адреса с `app.get("путь")` срабатывал код внутри него.

При необходимости можно встроить в конвеер обработки запроса на любом этапе любую функцию `middleware`. Для этого применяется метод `app.use()`.

```javascript
const express = require("express")
const app = express()

app.use( function (request, response, next) {

    console.log("Middleware 1")
    next()
})

app.use( function (request, response, next) {

    console.log("Middleware 2")
    next()
})

app.get("/", function (request, response) {

    console.log("Route /")
    response.send("Hello")
})

app.listen(3000)    
```

Функция в `app.use` принимает три параметра:
* `request` - данные запроса;
* `response` - объект для управления ответом;
* `next` - следующая в конвейре обработки функция


Каждая из функций просто выводит в консоль сообщение и в конце вызывает следующую функцию с помощью вызова `next()`.

При запуске приложения после обращения по адресу `localhost:3000` последовательно отрабатывают все три `middleware`:
 
```bash
# Terminal

Middleware 1
Middleware 2
Route /
```

При обращении к любому адресу `localhost:3000/` будет срабатывать два раза последовательно срабатывать `middleware`.

Функции `middleware` также могут сопоставляться с определенными маршрутами: 

```javascript
const express = require("express")
const app = express()

app.use( function (request, response, next) {

    console.log("Middleware 1")
    next()
})

app.use("/about", function (request, response, next) { // *

    console.log("About Middleware")
    response.send("About Middleware")
})

app.get("/", function (request, response) {

    console.log("Route /")
    response.send("Hello")
})

app.listen(3000)    
```

В данном примере вторая функция `middleware` явно сопоставляется с маршрутом `/about`, поэтому она будет обрабатывать только запрос `localhost:3000/about`. Первая же функция всё ещё обрабатывает все запросы.
 


```bash
# Terminal

// 1
Middleware 1

//2 
Middleware 1
About Middleware

//3 
Middleware 1
Route /
```

1. Зашел на неверный адрес, первая функция отработала.
2. Зашел на `/about` - первая и вторая отработала.
3. Зашел на `/` - первая и третья отработала.

### ***Пример middlewar:***

`Middlewar` помогают выполнять некоторые задачи, которые должны быть сделаны до отправки ответа. Стандартная задача - логгирование запросов.

```javascript
const fs = require("fs")
const express = require("express")
const app = express()


app.use( function (request, response, next) {
    
    let now = new Date()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    
    // Часы, минуты, секунды, тип запроса, браузер, система
    let data = `${hour}:${minutes}:${seconds} ${request.method} ${request.url} ${request.get("user-agent")}`


    console.log(data)

    // Создаём файл server.log, в который будет записываться переменная data
    fs.appendFile("server.log", data + "\n", function () {})

    // Перейти к следующему запросу
    next()
})

app.get("/", function (request, response) {
    response.send("Hello Kravich")
})

app.listen(3000)
```

С помощью объекта `response` получаем разную информацию о запросе добавляем её в файл `server.log` при помощи модуля `fs`. 

При каждом обновлении страницы или при переходе на другой адрес в `server.log` будет записываться различная информация.

```bash
# Terminal

15:49:38 GET / Mozilla/5.0 (X11; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0
15:49:43 GET /about Mozilla/5.0 (X11; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0
```

