function resAsync(data) {
  const result = new Promise((resolve, reject) => {
    setTimeout(() => {
      data ? resolve(data) : reject(new Error('error'))
    }, 500)
  })

  return result
}

module.exports = { resAsync }
