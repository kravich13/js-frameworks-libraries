const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')
const PORT = process.env.PORT || 5555

const schema = buildSchema(`
  type User {
    id: String
    name: String
    money: Int
    crypto: [String]
  }
 
  type Query {
    users(id: String): User
  }
  `)

// user2(id: String): User

const fakeDatabase = {
  vlad: {
    id: 'a',
    crypto: ['eth', 'etc', 'neo'],
  },
  max: {
    id: 'b',
    name: 'Max',
    money: 40000000,
    crypto: ['btc', 'eos', 'iota'],
  },
}

const root = {
  users: ({ id }) => {
    return fakeDatabase[id]
  },
  // user2: ({ id }) => {
  //   return fakeDatabase[id]
  // }
}

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

app.listen(PORT)
