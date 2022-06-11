// Resolvers define the technique for fetching the types defined in the
// schema.
const resolvers = {
    Query: {
        accountsForUser: (_, { userId }, { dataSources }) => dataSources.fireAPI.getAccountsByUser(userId),
    },
    Mutation: {
        saveAccount: (_, { accountObject }, { dataSources }) => dataSources.fireAPI.saveAccount(accountObject)
    }
}

module.exports = resolvers