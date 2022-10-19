const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userScheme = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    age: {
        type: Number,
        default: 18,
        min: 18,
        max: 100
    }
}, { versionKey: false }) // удаление поля "__v" по дефолту


try {
    mongoose.connect("mongodb://localhost:27017/nodeTest", { useUnifiedTopology: true})
} catch (err) {
    console.log(err)
}

const UserTest1 = mongoose.model("UserTest1", userScheme)



// 1) Добавление данных в БД и созданную коллекцию

// UserTest1.create({name: "Vlad", age: 23}, function (err, doc) {
//     mongoose.disconnect()
    
//     if (err) return console.log(err)
//     console.log(`Сохранён объект: ${doc}`)
// })

// UserTest1.create({name: "Vlad Kravich", age: 18}, function (err, doc) {
//     mongoose.disconnect()
    
//     if (err) return console.log(err)
//     console.log(`Сохранён объект: ${doc}`)
// })




// 2) Получение данных из созданной коллекции

// UserTest1.find({}, function (err, docs) {
//     mongoose.disconnect()
    
//     if (err) return console.log(err)
//     console.log(`Получены документы согласно фильтрации: ${docs}`)

//     // Получены документы согласно фильтрации: 
//     // { age: 23, _id: 5fc7981759ea587b4c6400d3, name: 'Vlad' }
// })  


// UserTest1.findOne({name: "Vlad"}, function (err, doc) {
//     mongoose.disconnect()
     
//     if (err) return console.log(err)
//     console.log(`Результат: ${doc}`)
    
//     // Результат: { age: 23, _id: 5fc7981759ea587b4c6400d3, name: 'Vlad' }
// })


// const id = "5fc7981759ea587b4c6400d3"
// UserTest1.findById(id, function (err, doc) {
//     mongoose.disconnect()
     
//     if(err) return console.log(err)
//     console.log(`Результат: ${doc}`)
//     // Результат: { age: 23, _id: 5fc7981759ea587b4c6400d3, name: 'Vlad' }
// })




// 3) Обновление данных

// UserTest1.updateOne({name: "Vlad"}, {name: "Vlad Kravich"}, function (err, result) {
//     mongoose.disconnect()

//     if(err) return console.log(err)
//     console.log(result)
//     // { n: 1, nModified: 1, ok: 1 }
//     // { "_id" : ObjectId("5fc7981759ea587b4c6400d3"), "age" : 23, "name" : "Vlad Kravich" }
// })


// UserTest1.findOneAndUpdate({age: 23}, {name: "Max", age: 28}, {new: true}, 
//     function (err, user) {
//         mongoose.disconnect()

//         if (err) return console.log(err)
//         console.log(`Вернули обновленный документ: ${user}`)

//         // Вернули обновленный документ: { age: 28, _id: 5fc7981759ea587b4c6400d3, name: 'Max' }
// })




// 4) Удаление данных

// UserTest1.remove({age: 18}, function (err, result) {
//     mongoose.disconnect()
     
//     if (err) return console.log(err)
//     console.log(result)
    
//     // { n: 1, ok: 1, deletedCount: 1 }
// })



// const id = "5fc7a32a868bf89eb6dce2bc";
// UserTest1.findByIdAndDelete(id, function (err, doc) {
    // mongoose.disconnect()
     
    // if(err) return console.log(err)
    // console.log(doc)
// })


