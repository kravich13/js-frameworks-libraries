const Sequelize = require("sequelize")
const sequelize = new Sequelize("nodejs", "root", "rfgkzrfgkz", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
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







const Coach = sequelize.define("Coach", {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


const Team = sequelize.define("Team", {
    Id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Coach.hasOne(Team, {onDelete: "cascade"})

sequelize.sync({force: true}).then( () => {
    console.log("Tables have been created")
}).catch(err => console.log(err))