let currentDate = new Date()

// Передача переменной из модуля
// module.exports.date = currentDate


// Передача глобального модуля
global.date = currentDate

module.exports.getMessage = function (name) {
    let hour = currentDate.getHours()

    if (hour > 16) return `Добрый вечер, ${global.name} `
    else if (hour < 16) return `Добрый день, ${global.name}`
    else return `Доброе утро, ${global.name}`
}