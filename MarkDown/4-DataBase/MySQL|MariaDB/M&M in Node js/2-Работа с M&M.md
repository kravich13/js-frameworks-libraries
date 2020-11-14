# Основные операции с данными, пулы подключений.

## Основные операции с данными

### **Создание базы данных:**

Создание БД из Node js:

```javascript
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rfgkzrfgkz"
})

connection.query("CREATE DATABASE nodejs",
    function (err, results) {
        if (err) return console.log(err)

        console.log("База данных создана.")
})
```

### **Создание таблиц:**

Теперь в БД `nodejs` добавим новую таблицу:

```javascript
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "nodejs",
    password: "rfgkzrfgkz"
})

const sql = `CREATE TABLE IF NOT EXISTS Users(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(30) NOT NULL,
    Age INT NOT NULL    
)`

connection.query(sql, function (err, results) {
    if (err) return console.log(err)

    console.log("Таблица создана.")
})
```

### **Добавление множества значений:**

Добавим сразу несколько значений в таблицу `Users`:

```javascript
const users = [
    ["Vlad", 23],
    ["Max", 27],
    ["Anna", 26]
]
const sql = `INSERT INTO Users(Name, Age) VALUES ?`

connection.query(sql, [users], function (err, results) {
    if (err) return console.log(err)

    console.log(results)
})
```

При добавлении множества объектов после `VALUES` указывается **один** знак `?`.

### **Фильтрация данных:**

Применим выражение `WHERE` для фильтрации:

```javascript
const sql = `SELECT * FROM Users WHERE Name = ? AND Age = ?`
const filter = ["Anna", 26]

connection.query(sql, filter, function (err, results) {
    if (err) return console.log(err)

    console.log(results)
    // [ TextRow { Id: 3, Name: 'Anna', Age: 26 } ]
})
```

Для удаления, обновления и т.д. нужно использовать параметризацию.
***

## Пулы подключений

Драйвер `mysql2` позволяет создавать пулы подключений. Пулы подключений позволяют уменьшить время, затраченное на подключение к серверу БД благодаря повторному использованию подключений. 

Пул подключений создаётся с помощью `createPool()`:

```javascript
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "nodejs",
    password: "rfgkzrfgkz"
})
```

`connectionLimit` определяется макс. кол-во подключений. Даже если определим 100 подключений, а приложению требуется только 5 - то создаваться и использоваться будет только 5 подключений.

Для **закрытия** всех подключений применяется `end()` (логика как и с объектом`connection`).

### **Запросы к БД:**

Запросы к БД через пул подключений выполняются через `query()`:

```javascript
const sql = "INSERT INTO users (name, age) VALUES(?, ?)"
const data = ["Vlad", 23]

pool.query(sql, data, function (err, results) {
  if (err) return console.log(err)

  console.log(results)
})
 
// получение объектов
pool.query("SELECT * FROM users", function (err, results) {
    if (err) return console.log(err)
    
    console.log(results)
})
```

Поскольку оба вызова `query()` выполняются **синхронно**, то нет гарантии, что вначала произойдет добавление, а после - получение. Тоже самое относится и к методу `end()`.

### **Promise API:**

Пулы также как и `connection` поддерживают работу с промисами. Благодаря чему можно быть уверенным, что код выполнится в нужном порядке: 

```javascript
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "nodejs",
    password: "rfgkzrfgkz"
}).promise()


pool.execute("UPDATE users SET age=age+1 WHERE name=?", ["Stan"]) // изменение объектов
    .then(result => { 
      console.log(result[0])
      
      return pool.execute("SELECT * FROM users") // получение объектов
    })
    .then(result => {
      console.log(result[0])
      pool.end()
    })
    .then( () => {
      console.log("Пул закрыт.")
    })
    .catch( function (err) {
      console.log(err.message)
})
```





