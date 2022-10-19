const expess = require('express')
const app = expess()
const PORT = process.env.PORT || 3000

require('dotenv').config()

const { mongoPassword } = require('./config')

console.log(mongoPassword)

app.get('/', (req, res) => {
  res.send('<p>Kravich</p>')
})

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`)
})
