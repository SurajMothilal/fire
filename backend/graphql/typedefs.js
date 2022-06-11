const { gql } = require('apollo-server')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type Account {
    name: String
    id: ID!
    balance: String
    currency: String
    type: String
    userId: ID!
  }

  input AccountInput {
    name: String
    balance: String
    currency: String
    type: String
    userId: ID!
  }

  type InsertResponse {
    id: String
  }

  type Query {
    accountsForUser(userId: String): [Account]
  }

  type Mutation {
    saveAccount(accountObject: AccountInput): InsertResponse
  }
`

module.exports = typeDefs