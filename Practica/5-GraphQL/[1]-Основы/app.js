const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const PORT = process.env.PORT || 5555

// const schema = buildSchema(`
//   type Query {
//     kravich: String
//   }
// `)

// const root = {
//   kravich: () => {
//     return 'Aventador'
//   },
// }

// const schema = buildSchema(`
//   type Query {
//     quoteOfTheDay: String
//     random: Float!
//     rollThreeDice:Int
//   }
// `)

// const root = {
//   quoteOfTheDay: () => {
//     return Math.random() < 0.5 ? "Проиграл" : 'Победил'
//   },
//   random: () => {
//     return Math.random()
//   },
//   rollThreeDice: () => {
//     return [1, 2, 3].map( () => 1 + Math.floor(Math.random() * 6))
//   },
// }


// const schema = buildSchema(`
//   type Query {
//     rollDice(numDice: Int!, numSides: Int): [Int]
//   }
// `)

// const root = {
//   rollDice: ({ numDice, numSides }) => {

//     const output = []
//     for (let i = 0; i < numDice; i++) {
//       output.push(1 + Math.floor(Math.random() * (numSides || 6)));
//     }
//     return output;
//   }
// }


// var schema = buildSchema(`
//   type RandomDie {
//     numSides: Int!
//     rollOnce: Int!
//     roll(numRolls: Int!): [Int]
//   }
 
//   type Query {
//     getDie(numSides: Int): RandomDie
//   }
// `)

// class RandomDie {

//   constructor(numSides) {
//     this.numSides = numSides;
//   }

//   rollOnce () {
//     return 1 + Math.floor(Math.random() * this.numSides);
//   }

//   roll ( {numRolls} ) {
//     const output = []
    
//     for (let i = 0; i < numRolls; i++) {
//       output.push(this.rollOnce())
//     }

//     return output
//   }
// }

// const root = {
//   getDie: ( {numSides} ) => {
//     return new RandomDie(numSides || 6)
//   }
// }




// МАССИВ ОБЪЕКТОВ
// const schema = buildSchema(`
//   type Users {
//     id: ID!
//     name: String!
//     age: Int!
//     money: Int!
//   }
//   type Query {
//     users: [Users]!
//   }
// `)

// const users = [{
//     id: 1,
//     name: 'Vlad',
//     age: 23,
//     money: 1300,
//   },
//   {
//     id: 2,
//     name: 'Max',
//     age: 28,
//     money: 2400,
//   },
//   {
//     id: 3,
//     name: 'Anna',
//     age: 26,
//     money: 1000,
//   }
// ]

// const root = {
//   users: users
// }






// МУТАЦИИ И ТИП ВВОДА
// var schema = buildSchema(`
//   input MessageInput {
//     content: String
//     author: String
//   }
 
//   type Message {
//     id: ID!
//     content: String
//     author: String
//   }
 
//   type Query {
//     getMessage(id: ID!): Message
//   }
 
//   type Mutation {
//     createMessage(input: MessageInput): Message
//     updateMessage(id: ID!, input: MessageInput): Message
//   }
// `);
// // получается, что в мутацию передаются методы из объекта root
// // в эти методы передаются данные из input для изменения

 
// class Message {
//   constructor(id, { content, author }) {
//     this.id = id
//     this.content = content
//     this.author = author
//   }
// }
 
// // Maps username to content
// var fakeDatabase = {}
// var countI = 1
 
// var root = {
//   getMessage: ({ id }) => {

//     if (!fakeDatabase[id]) {
//       throw new Error(`no message exists with id ${id}`)
//     }
//     return new Message(id, fakeDatabase[id])
//   },
//   createMessage: ({ input }) => {
//     var id = countI++
 
//     fakeDatabase[id] = input
//     return new Message(id, input)
//   },
//   updateMessage: ({ id, input }) => {

//     if (!fakeDatabase[id]) {
//       throw new Error(`no message exists with id ${id}`)
//     }
//     fakeDatabase[id] = input
//     return new Message(id, input)
//   }
// }


// Аутентификация и промеж. ПО
const schema = buildSchema(`
  type Query {
    ip: String
  }
`)

const loggingMiddleware = (req, res, next) => {
  console.log(req.ip)
  next()
}

const root = {
  ip: function (args, req) {
    return req.ip
  }
}
 
app.use(loggingMiddleware)
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}))

app.listen(PORT)