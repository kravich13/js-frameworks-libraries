const express = require("express")
const app = express()

// Промежуточный обработчик уровня приложения

// app.get("/user/:id", function (req, res, next) {
//     console.log(`ID: ${req.params.id}`)
//     next()
//   }, function (req, res, next) {
//     res.send('User Info')
// })
  
//  app.get('/user/:id', function (req, res, next) {
//      console.log("Не будет никогда")
//     res.end(req.params.id)
//  })

// app.listen(3000)





// Обработчик ошибок

// app.use(function (err, req, res, next) {
//     console.error(err.stack)
//     res.status(500).send("Поломка")
//   })

// app.listen(3000)




// Встроенные промежуточные обработчики

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now());
    }
}
  
app.use(express.static('public', options));

app.listen(3000)