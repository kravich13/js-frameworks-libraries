if (!process.env.MONGO_PASSWORD) {
  throw new Error('process.env.MONGO_PASSWORD is undefined')
}
const mongoPassword = process.env.MONGO_PASSWORD

module.exports = {
  mongoPassword,
}
