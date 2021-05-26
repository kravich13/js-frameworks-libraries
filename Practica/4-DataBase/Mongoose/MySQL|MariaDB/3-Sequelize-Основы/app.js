const Sequelize = require('sequelize')
const sequelize = new Sequelize('nodejs', 'root', 'MYPASSWORD', {
  dialect: 'mysql',
  host: 'localhost',
  define: {
    // timestamps: false - выкл всё
    createdAt: true,
    updatedAt: false,
  },
})

const User = sequelize.define('Users', {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  Name: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  FirstName: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
  Age: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 18,
  },
})

// User.drop()

// User.sync()
//     .then(results => {
//         console.log("Таблица была добавлена или уже существует.")
//     })
//     .catch(err => console.log(err))

// User.create({
//     Name: "Vlad",
//     FirstName: "Kravich",
//     CreatedAd: "2020-11-14"
// })

// User.create({
//     Name: "Max",
//     FirstName: "Kravich",
//     Age: 27,
//     CreateAd: "2020-11-13"
// })
// .then (res => {
//     console.log(res) // получение данных о таблице Users
// })
// .catch (err => console.log(err))

// Все данные таблицы
// User.findAll({ raw: true })
//     .then(users => {
//         console.log(users)
//     })
//     .catch(err => console.log(err))

// Выборочные данные
User.findAll({ where: { name: 'Max' }, raw: true })
  .then((users) => {
    console.log(users)
  })
  .catch((err) => console.log(err))

// Обновление данных с выборкой
User.update(
  { Age: 23 },
  {
    where: {
      Name: 'Max',
    },
  }
)
  .then((users) => {
    console.log(users)
  })
  .catch((err) => console.log(err))
