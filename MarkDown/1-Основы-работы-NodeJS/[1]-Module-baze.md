- [Первое включение и подключение](#первое-включение-и-подключение)
  - [Вид в браузере](#вид-в-браузере)
- [Модули](#модули)
  - [Подключение модулей](#подключение-модулей)
  - [Экспорт переменных](#экспорт-переменных)
  - [Структура модулей](#структура-модулей)
  - [Объект global и глобальные переменные](#объект-global-и-глобальные-переменные)
  - [Передача параметров приложению](#передача-параметров-приложению)

# Первое включение и подключение

Для начала нужно установить `Node` в систему, переходим по ссылке `https://nodejs.org/en/`.

Скачиваем `current` версию и после чего - устанавливаем. 

После установки в терминале командой `node -v` можно узнать текущую версию `node.js`.

В терминале, после ввода команды `node` можно вводить JS выражения, он вместо того, чтобы в консоли писать код построчно в неудобом формате - можно подключить файл `app.js` and `server.js`. 

Для этого нужно зайти в папку с самим файлом, открыть терминал в этой папке и ввести `node app.js`, после чего сработает код в терминале из подключённого файла `app.js`.
***

## Вид в браузере

Открываем файл `app.js` и прописываем следующий код:

```javascript
// Создание модуля http для создания сервера
const http = require("http")

// Слушает входящие запросы с сервера http
http.createServer(function (request, response) { 

    response.end("Hello, Node")

}).listen(3000, "127.0.0.1", function () {  // Принимает ответы с сервера http

    console.log("Сервер начал работу")
})
```

`.listen(3000, "127.0.0.1", function ()` принимает три параметра: 
1. Указывает на локальный порт, по которому запускается сервер.
2. Указывает на локальный адрес.
3. Представляет функцию, которая запускается при начале прослушиваня подключений.



**Для запуска сервера открываем файл папку с файлом `app.js` в терминале и прописываем `node app.js`.**

В браузере в адресной строке вводим `http://localhost:3000/` и там будет наш сервер с надписью `Hello, Node`.
***

# Модули

## Подключение модулей

Для подключения модулей применяется функция `require()`, в которую передаётся название модуля.

```javascript
const os = require("os")

// получение имени пользователя с его OS
let userName = os.userInfo().username
console.log(userName)
```

Мы не ограничены встроенными модулями, можно создавать собственные модули.

Для этого нужно создать новый файл `greeting.js` (или другое имя) и подключить его в `app.js` следующим образом: 

```javascript
const greeting = require("./greeting") // нужно указать путь к файлу, расширение не обязательно
```
***

## Экспорт переменных

Теперь изменим файл `greeting.js`:

```javascript
let currentDate = new Date()

// Экспорт переменной из модуля 
module.exports.date = currentDate

module.exports.getMessage = function (name) {
    let hour = currentDate.getHours()

    if (hour > 16) return `Добрый вечер, ${name}`
    else if (hour < 16) return `Добрый день, ${name}`
    else return `Доброе утро, ${name}`
}
```

Здесь определена переменная `currentDate`. Однако из вне она недоступна, она доступна только в пределах данного модуля. Чтобы какие переменные или функции модуля были доступны, необходимо определить их в объекте `module.exports`.

Объект `module.exports` - это то, что возвращает функция `require()` при получении модуля.


Изменим `app.js`:

```javascript
const os = require("os") // Модуль о OS данных пользователя
const greeting = require("./greeting") // Собственный модуль

let userName = os.userInfo().username

console.log(`Дата запроса: ${greeting.date}`)

// Вызывается функция из модуля с параметром "userName" - имя пользователя из системы
console.log(greeting.getMessage(userName))
```

Все экспортированные методы и свойства модуля доступны по имени: `greeting.date` и `greeting`.`getMessage()`.
***

## Структура модулей

Создадим папку `welcome` в каталоге приложения, в которой будет три файла: `index.js`, `morning.js`, `evening.js`.

Общая структура проекта теперь такова:
* `welcome`
    * `index.js`
    * `morning.js`
    ```javascript
    module.exports = "Доброе утро"
    ```
    * `evening.js`
     ```javascript
    module.exports = "Добрый вечер"
    ```
* `app.js`
* `greeting.js`


В `index.js` запишем следующий код:

```javascript
const morning = require("./morning")
const evening = require("./evening")

// В модуле определен объект, который имеет две функции для вывода приветствий
module.exports = {
    getMorningMessage : function () { console.log(morning) },
    getEveningMessage : function () { console.log(evening) }
}
```

Теперь используем этот модуль в файле `app.js`:

```javascript
// Текущий модуль - вся папка welcome
const welcome = require("./welcome")

welcome.getMorningMessage() // Доброе утро
welcome.getEveningMessage() // Добрый вечер
```

Таким образом, папка `welcome` теперь является модулем и именно этот модуль имеет доступ ко всем данным внутри своего каталога.
***
## Объект global и глобальные переменные

`Node.js` предоставляет специальный объект `global`, который предоставляет доступ к глобальным, т.е. доступным из каждого модуля приложения переменным и функциям.

Для примера, можно определить глобальную переменную в файле `greeting.js`: 

```javascript
let currentDate = new Date()

// Передача глобального модуля
global.date = currentDate

module.exports.getMessage = function (name) {
    let hour = currentDate.getHours()

    // global.name
    if (hour > 16) return `Добрый вечер, ${global.name}` 
    else if (hour < 16) return `Добрый день, ${global.name}`
    else return `Доброе утро, ${global.name}`
}
```

1. В объекте `global` появляется ключ `date`, в котором лежит переменная `currentDate`.
2. В модуле получаем глобальную переменную `name`, которая будет установлены из вне. При этом обращение к глобальной переменной идёт через `global.name`.

Определение файла в `app.js`:

```javascript
// Определение глобального модуля
const greeting = require("./greeting")

global.name = "Владислав"

global.console.log(date)
console.log(greeting.getMessage()) 
// Добрый вечер, Владислав
```

Здесь установили глобальную переменую `name`, которую затем получаем в модуле `greeting.js`. И также в консоль логе выводим глобальную переменную `date`.

**Предпочительнее использовать обычные переменные и  передавать их в модуль.**
***

## Передача параметров приложению

При запуске из терминала можно передавать параметры приложению. Для передачи параметров применяется массив `process.argv`.

Первый элемент массива всегда указывает на путь к файлу `node.exe`, который вызывает приложение. Второй элементы массива всегда указывает на путь к файлу приложения, которой выполняется.

Пример с `app.js`:

```javascript
let nodePath = process.argv[0]
let addPath = process.argv[1]
let name = process.argv[2]
let age = process.argv[3]

console.log(`nodePath: ${nodePath}`)
console.log(`addPath: ${addPath}`)
console.log("")
console.log(`name: ${name}`)
console.log(`age: ${age}`)
```

В данном случае ожидается, что передано будет два параметра: `name` и `age`.

Запуск приложения в терминале `node app.js Vlad 23`, получим следующую запись: 

```
nodePath: /usr/bin/node
addPath: /run/media/vladislav/Новый том/Dev/js/Node-js/Practica/module-baze/app.js

name: Vlad
age: 23
```