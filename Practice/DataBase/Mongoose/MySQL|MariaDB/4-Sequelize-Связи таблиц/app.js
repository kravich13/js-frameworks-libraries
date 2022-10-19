const Sequelize = require('sequelize')
const sequelize = new Sequelize('nodejs', 'root', 'MYPASSWORD', {
  dialect: 'mysql',
  host: 'localhost',
  define: {
    timestamps: false,
  },
})

// const Product = sequelize.define("Product", {
//     Id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     Name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     Price: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     }
// })

// const Company = sequelize.define("Company", {
//     Id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     Name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })
// связывает таблицу Company с таблицей Product
// Company.hasMany(Product, { onDelete: "cascade" })

// sequelize.sync({ force: true })
// .then( () => {
//     console.log("Таблица была создана.")
// })
// .catch(err => console.log(err))

// Company.create( { Name: "Apple"}).then(res => {

//     const compId = res.Id

//     Product.create({Name: "iPhone 10", Price: 1000, CompanyId: compId})
//     .catch(err => console.log(err))
//     Product.create({Name: "iPhone 8 Plus", Price: 500, CompanyId: compId})
//     .catch(err => console.log(err))

// }).catch(err => console.log(err))

// Company.findByPk(1).then(company => {
//     if (!company) return console.log("Company not found.")

//     console.log(company)
//     company.createProduct({Name:"iPhone 7 Plus", Price: 400})
//     .catch(err => console.log(err))

// }).catch(err => console.log(err))

// const Leader = sequelize.define("Leader", {
//     Id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     Name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })

// const Subordinate = sequelize.define("Subordinate", {
//     Id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     Name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })

// Leader.hasOne(Subordinate, {onDelete: "cascade"})

// sequelize.sync({force: true}).then( () => {
//     console.log("Tables have been created")
// }).catch(err => console.log(err))

// // Добавили лидера
// Leader.create({ Name: "Vlad Kravich"})
// .then(lead => {
//     // Добавили армию
//     Subordinate.create({Name: "SFA"}).then(sub => {
//         // Установка для армии лидера
//         lead.setSubordinate(sub).catch(err => console.log(err))

//     })
// }).catch(err => console.log(err))

// Leader.findByPk(1).then(lead => {
//     if (!lead) return console.log("Coach not found")

//     lead.getSubordinate().then(sub => {
//         console.log(`${lead.Name} - ${sub.Name}`)
//         // Vlad Kravich - SFA
//     })
// })

// Leader.findAll({
//     attributes: ["Name"], // включаем столбец name из таблицы coaches
//     include: [{
//       model: Subordinate,
//       attributes: ["Name"]  // включаем столбец name из таблицы teams
//     }]
//   }).then(leaders => {
//       for (lead of leaders){
//         console.log(`${lead.Name} - ${lead.Subordinate.Name}`)
//         // Vlad Kravich - SFA
//       }
// })

// лидерка
// const Liderka = sequelize.define("Liderka", {
//     Id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         primaryKey: true,
//         allowNull: false
//     },
//     Name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// })

// // ранги в лидерки
// const Subordinate = sequelize.define("Subordinate", {
//     Id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false
//     },
//     Rank: {
//       type: Sequelize.STRING,
//       allowNull: false
//     }
// })

// // промежуточная таблица, которая связывает лидерки и ранги (срок на лидерке)
// const Term = sequelize.define("Term", {
//     Id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false
//     },
//     NumbOfDays: {
//       type: Sequelize.INTEGER,
//       allowNull: false
//     }
// })

// // связывает первую со второй через третью
// Liderka.belongsToMany(Subordinate, {through: Term})
// // связывает вторую с первой через третью
// Subordinate.belongsToMany(Liderka, {through: Term})

// sequelize.sync({force:true}).then( () => {

//     console.log("Tables have been created")
// }).catch(err => console.log(err))

// Subordinate.create({ Rank: "15"})
// Subordinate.create({ Rank: "15"})
// Subordinate.create({ Rank: "5"})

// Liderka.create({ Name: "SFA"})
// Liderka.create({ Name: "LVA"})
// Liderka.create({ Name: "CityHall"})

// Liderka.findOne({ where: { Name: "SFA"}})
// .then(lead => {
//   if (!lead) return

//   // Добавление SFA 15 ранга
//   Subordinate.findOne({ where: {Rank: 15}})
//   .then(sub => {
//     if (!sub) return
//     sub.addSubordinate(sub, {through: {NumbOfDays}})
//   })
// })

// Liderka.findOne({ where: { Name: "SFA"}})
// .then(lead => {
//   if (!lead) return

//   lead.getSubordinates().then(subs => {
//     for (sub of subs) {
//       console.log(sub.Name)
//     }
//   })
// })

Liderka.findOne({ where: { Name: 'SFA' } }).then((lead) => {
  if (!lead) return

  lead.getSubordinates().then((subs) => {
    for (sub of subs) {
      console.log(`Ранг: ${sub.Rank}, Срок: ${sub.Term.NumbOfDays}`)
    }
  })
})

// Liderka.findOne({where: {Name: "SFA"}})
// .then(lead => {
//   if (!lead) return

//   // lead.getSubordinates is not a function
//   lead.getSubordinates().then(subs => {
//     for (sub of subs) {
//       if (sub.Rank === 15) sub.Term.destroy()
//     }
//   })
// })
