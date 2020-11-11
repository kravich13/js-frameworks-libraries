# Подключение к M&M, выполнение запросов, Promise API

## Подключение к MySQL | MariaDB

### **Установка пакета:**
Для работы с сервером MySQL | MariaDB используется ряд драйверов. Самые популярные - `mysql` и `mysql2`, которые совместимы. 

Для установки вводим в терминале: 

```bash
npm i mysql2
```

### **Создание подключения:**

Для создания подключения применяется метод `createConnection()`, который в качестве параметра принимает объект с настройками подключения: 

```javascript
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "metanit",
    password: "rfgkzrfgkz"
})
```

Передаваемые в объект настройки следующие: 

* `host` - хостинг, на котором запущен сервер. По дефолту `localhost`.
* `port` - номер порта, по дефолту `3306`.
* `user` - пользователь БД, который используется для подключения.
* `password` - пароль для пользователя БД.
* `database` - имя БД для подключения к ней. Если параметр не указан - подключение идёт к самому серверу.
* `charset` - кодировка для подключения, по дефолту "UTF8_GENERAL_CI".
* `timezone` - часовой пояс сервера. По дефолту `local`.

Для установки подключения используется метод `connect()`, **объекта** `connection`:

```javascript
connection.connect( function (err) {
    if (err) return console.log(`Ошибка: ${err.message}`)

    console.log("Подключение к серверу установлено.")
})
```

Метод `end()` **гарантирует**, что перед закрытием подключения к БД будут **выполнены** все оставшиеся запросы, которые не завершились к моменту вызова метода.

Для закрытия подключения без ожидания выполнения оставшихся запросов используется метод `destroy()`:

```bash
connection.destroy()
```

### **Возможные ошибки и их решение:**

При подключении к БД возможна следующая ошибка:

```bash
Access denied for user 'root@localhost'@'localhost'
```

Для её решения нужно:

* Разрешить подключение из инета (при настройке самой БД).
* Установить пароль на БД.
* Проверить, правильно ли введены данные подключения передаваемые в объект.


***

## Выполнение запросов к M&M

Для выполнения запросов у объекта подключения применяется метод `query()`:

```javascript
query(sqlString, callback)
```

* `sqlString` - выполняемая SQL команда.
* `callback` - функция обратного вызова, через параметры которой можно получить результаты выполнения `sqlString` или ошибку.

Получение всех данных из таблицы: 

```javascript
connection.query("SELECT * FROM Clients",
    function (err, results, fields) {
        if (err) return console.log(err)

        console.log(results) // данные полей
        // console.log(fields) // мета-данные полей
})

connection.end()
```

Поскольку команда `SELECT` делает **запрос** к БД - то использовать метод `connect()` не нужно, т.к. `query()` принимает тот же самый параметр для ошибки.

Также есть метод `execute()`, который работает точно также, как `query()`. 
Важно: с модулем `mysql` этот метод **не** работает!

### **Параметризация запросов:**

Для ввода данных в запрос нужно использовать параметризацию.

При этом вместо конкретных данных в тексте запроса ставятся знаки вопроса, вместо которых при выполнении запроса будут вставляться данные. 

Пример с добавлением данных в таблицу:

```javascript
const user = ["Anna", "Pluzhnyk", null, null]
const sql = "INSERT INTO Clients(FirstName, LastName, Phone, Email) VALUES(?, ?, ?, ?)"

connection.query(sql, user, function (err, results) {
    if (err) return console.log(`Ошибка: ${err}`)

    console.log("Данные добавлены") 
})

connection.end()
```

Т.е. фактически в параметры `VALUES` **вместо** `?` будут **вставлены** данные в указанном **порядке** из массива `user`.
***

## Promise API

Драйвер `MySQL2` позволяет использовать промисы при выполнении запросов к БД.

```javascript
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "metanit",
    password: "rfgkzrfgkz"
}).promise()


connection.query("SELECT * FROM Clients")
    .then(result => {
        console.log(result)
    })
    .catch(err => {
        console.log(err)
})

connection.end()
```

Для создания промиса при создании объекта `connection()` вызывается метод `promise()`. Затем при выполнении запроса с помощью `query()` можно к нему по цепочке присоединить методы `then()` и `catch()`.

Если запрос успешен - срабатывает `then` с объектом **результата**, если нет - срабатывает `catch` с объектом **ошибки**.

Для команды `SELECT` результат запроса представляет массив из двух объектов. где **первый** - полученные из БД данные в виде массива, а **второй** - метаданные полей.

```javascript
connection.query("SELECT * FROM Clients")
    .then(result => {
        console.log(result[0]) 
    })
    .catch(err => {
        console.log(err)
})
```

Если выполняется команда `INSTERT`, `UPDATE` или `DELETE` - результатом запроса будет объект, свойства которого описывают результат операции: 

```javascript
const user = ["Vlad", "Onatskyi", null, null]
const sql = "INSERT INTO Clients(FirstName, LastName, Phone, Email) VALUES(?, ?, ?, ?)"

connection.query(sql, user)
    .then(result => {
        console.log(result[0]) 

        // ResultSetHeader {
        //     fieldCount: 0,
        //     affectedRows: 1,
        //     insertId: 5,
        //     info: '',
        //     serverStatus: 2,
        //     warningStatus: 0
        // }
    })
    .catch(err => {
        console.log(err)
})
```

К примеру свойство `affectedRows` можно получить кол-во добавленных/удаленных/обновленных строк.