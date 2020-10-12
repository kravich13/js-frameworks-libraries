// const Emitter = require("events")

// let emitter = new Emitter()
// let eventName = "greet"

// emitter.on(eventName, function () {
//     console.log("Привет всем!")
// })

// emitter.on(eventName, function () {
//     console.log("Привет")
// })

// emitter.emit(eventName)



// Наследование от модуля
const EventEmitter = require("events")

let eventName = "greet"
 

// Собственный User наследуется от модуля events
class User extends EventEmitter {
    
    sayHi (data) {

        // Текущий объект генерирует событие greet и показывает текст
        this.emit(eventName, data)
    }
}

// Добавляем к объекту user обработку события "greet"
let user = new User()

// Объект user создаёт событие greet
user.on(eventName, function (data) {
    console.log(data)
})
  
user.sayHi("Мне нужна твоя одежда...")
