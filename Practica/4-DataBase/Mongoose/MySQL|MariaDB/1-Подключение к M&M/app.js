const mysql = require('mysql2')

// подключение к БД
const connection = mysql
  .createConnection({
    host: 'localhost',
    user: 'root',
    database: 'metanit',
    password: 'MYPASSWORD',
  })
  .promise()

// подключение к самому серверу
// connection.connect( function (err) {
//     if (err) return console.log(`Ошибка: ${err.message}`)

//     console.log("Подключение к серверу установлено.")
// })

// отключение от сервера
// connection.end( function (err) {
//     if (err) return console.log(`Ошибка: ${err.message}`)

//     console.log("Подключение закрыто.")
// })

// const user = ["Anna", "Pluzhnyk", null, null]
// const sql = "INSERT INTO Clients(FirstName, LastName, Phone, Email) VALUES(?, ?, ?, ?)"

// // выполнение запросов и неявное подключение
// connection.query(sql, user, function (err, results) {
//     if (err) return console.log(`Ошибка: ${err}`)

//     console.log("Данные добавлены")
// })

// использование промисов

const user = ['Vlad', 'Onatskyi', null, null]
const sql =
  'INSERT INTO Clients(FirstName, LastName, Phone, Email) VALUES(?, ?, ?, ?)'

connection
  .query(sql, user)
  .then((result) => {
    console.log(result[0])
  })
  .catch((err) => {
    console.log(err)
  })

connection.end()
