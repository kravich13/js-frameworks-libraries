const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userScheme = new Schema({
    name: String,
    age: Number
}, { versionKey: false }) // удаление поля "__v" по дефолту

try {
    mongoose.connect("mongodb://localhost:27017/nodeTest", { useUnifiedTopology: true})
} catch (err) {
    console.log(err)
}



const UserTest1 = mongoose.model("UserTest1", userScheme)
const userTest1 = new UserTest1({
    name: "Vlad",
    age: 23
})


userTest1.save()
.then(function (doc) {
        console.log(`Сохранён объект: ${doc}`)
        mongoose.disconnect()
})
.catch(function (err) {
    console.log(err)
    mongoose.disconnect()
})