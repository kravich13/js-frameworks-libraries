const fs = require("fs")


// Создание файла


fs.open("hello.txt", "w", (err) => {
    if (err) throw err
    console.log("Файл создан")
})



// Чтение файла
// Асинхронный вариант

// fs.readFile("hello.txt", "utf8",
//     function (error, data) {
//         console.log("Асинхронное чтение файла")
        
//         if (error) throw error
//         console.log(data)
// })


// Синхронный вариант
// console.log("Синхронное чтение файла")
// let fileContent = fs.readFileSync("hello.txt", "utf8")
// console.log(fileContent)





// Запись в файл

// Асинхронный вариант

// fs.writeFile("hello.txt", "Привет, Кравич", function (error) {

//     if (error) throw error 
//     console.log("Асинхронная запись завершена. Содержимое файла:")

//     let data = fs.readFileSync("hello.txt", "utf8")
//     console.log(data)
// })  





// Дозапись в файл

// fs.appendFile("hello.txt", "\nКу", function (error) {

//     if (error) throw error

//     console.log("Запись файла завершена, содержимое файла:")

//     let data = fs.readFileSync("hello.txt", "utf8")
//     console.log(data)
// })

// fs.appendFileSync("hello.txt", "\nVladislav")




// Переименование файла
// fs.rename("hello.txt", "kravich.txt", (err) => {
//     if (err) throw err
//     console.log("Файл переименован")
// })




// Удаление файла

// // Синхронная функция удаления
// // fs.unlinkSync("kravich.txt")


// Асинхронная функция для удаления
// fs.unlink("kravich.txt", (err) => {
//     if (err) console.log(err)
//     else console.log("Файл удалён")
// })

