const mysql = require('mysql2')

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     database: "nodejs",
//     password: "MYPASSWORD"
// })

// connection.query("CREATE DATABASE nodejs",
//     function (err, results) {
//         if (err) return console.log(err)

//         console.log("База данных создана.")
// })

// const users = [
//     ["Vlad", 23],
//     ["Max", 27],
//     ["Anna", 26]
// ]
// const sql = `INSERT INTO Users(Name, Age) VALUES ?`

// connection.query(sql, [users], function (err, results) {
//     if (err) return console.log(err)

//     console.log(results)
// })

//  WHERE
// const sql = `SELECT * FROM Users WHERE Name = ? AND Age = ?`
// const filter = ["Anna", 26]

// connection.query(sql, filter, function (err, results) {
//     if (err) return console.log(err)

//     console.log(results)
//     // [ TextRow { Id: 3, Name: 'Anna', Age: 26 } ]
// })

// connection.end()

// Пулы

const pool = mysql
  .createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'nodejs',
    password: 'MYPASSWORD',
  })
  .promise()

// const sql = "INSERT INTO users (name, age) VALUES(?, ?)"
// const data = ["Vlad", 23]

// pool.query(sql, data, function (err, results) {
//   if (err) return console.log(err)

//   console.log(results)
// })

// // получение объектов
// pool.query("SELECT * FROM users", function (err, results) {
//     if (err) return console.log(err)

//     console.log(results)
// })

pool
  .execute('UPDATE users SET age=age+1 WHERE name=?', ['Stan']) // изменение объектов
  .then((result) => {
    console.log(result[0])
    return pool.execute('SELECT * FROM users') // получение объектов
  })
  .then((result) => {
    console.log(result[0])
    pool.end()
  })
  .then(() => {
    console.log('Пул закрыт.')
  })
  .catch(function (err) {
    console.log(err.message)
  })
