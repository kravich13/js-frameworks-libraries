const expess = require('express')
const app = expess()
const PORT = process.env.PORT || 3000

require('dotenv').config()

app.get('/', (req, res) => {
  res.send('<p>Kravich</p>')
})

console.log(process.env)

app.listen(PORT, () => {
  console.log(`Server started on Port ${PORT}`)
})
