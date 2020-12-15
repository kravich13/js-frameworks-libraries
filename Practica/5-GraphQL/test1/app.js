const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")

const schema = buildSchema(`
    type Query {
        kravich: String
    }
`)

const root = {
    kravich: () => {
        return "Aventador"
    }
}

app.use("/graphql", graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))

app.listen(PORT)


