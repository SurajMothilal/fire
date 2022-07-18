const { gql } = require('apollo-server')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type User {
    id: ID!
    firstName: String!
    lastName: String
    dob: String!
    accounts: [Account]
  }

  type Account {
    name: String
    id: ID!
    balance: Float
    currency: String
    type: String
    userId: ID!
    updatedAt: String
  }

  input AccountInput {
    name: String
    balance: Float
    currency: String
    type: String
    userId: ID!
  }

  input AccountEditInput {
    name: String
    balance: Float
    currency: String
    type: String
    id: ID!
    userId: ID!
  }

  type FireProfile {
    targetYear: Int
    fireType: String
    targetYearlyExpense: String
    targetPortfolioValue: Float
    userId: ID!
  }

  input FireProfileInput {
    targetYear: Int
    fireType: String
    targetYearlyExpense: String
    targetPortfolioValue: String
    userId: ID!
  }

  type FireProfileResponse {
    id: String
  }

  type AccountResponse {
    id: String
  }

  type Query {
    getUser(id: ID!): User
    getUserAccounts(userId: String): [Account]
    fireProfileForUser(userId: String): FireProfile
    testMessage: String
  }

  type Mutation {
    saveAccount(accountObject: AccountInput): AccountResponse,
    editAccount(accountEditObject: AccountEditInput): AccountResponse,
    deleteAccount(accountId: ID!): AccountResponse,
    saveFireProfile(fireProfileObject: FireProfileInput): FireProfileResponse
  }
`

module.exports = typeDefs