const mongoose = require("mongoose")
const Schema = mongoose.Schema


const userScheme2 = new Schema({ model: "string" },
{ versionKey: false })

const userScheme1 = new Schema({
    smartphone: [userScheme2],
    currentSmart: userScheme2
}, { versionKey: false }) 


try {
    mongoose.connect("mongodb://localhost:27017/nodeTest", { useUnifiedTopology: true})
} catch (err) {
    console.log(err)
}


const UserTest2 = mongoose.model("UserTest2", userScheme1)


// при каждом запуске - будет новое добавление документа
const userTest2 = new UserTest2({
    smartphone: [
        { model: "iPhone 5s" },
        { model: "iPhone 6s Plus" }
    ]
})

// const doc = userTest2.smartphone.id("5fc902cd019b7c5cb55f75b4") // поиск
// console.log(doc)
// userTest2.smartphone[0].model = "iPhone 7 plus" // замена
// userTest2.smartphone.push({ model: "iPhone 6s" }) // добавление
// userTest2.smartphone.create({ model: "iPhone 7 plus" }) // создание
// userTest2.smartphone.id("5fc8f7b6d11621473cbae484").remove() // удаление


userTest2.save()
    .then(function (doc) {
        console.log(`Сохранён объект: ${doc}`)
        mongoose.disconnect()
    })
    .catch(function (err) {
        console.log(err)
        mongoose.disconnect()
    })


