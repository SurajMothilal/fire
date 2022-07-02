// Resolvers define the technique for fetching the types defined in the
// schema.
const resolvers = {
    Query: {
        accountsForUser: (_, { userId }, { dataSources }) => dataSources.fireAPI.getAccountsByUser(userId),
    },
    Mutation: {
        saveAccount: (_, { accountObject }, { dataSources }) => dataSources.fireAPI.saveAccount(accountObject),
        editAccount: (_, { accountEditObject }, { dataSources }) => dataSources.fireAPI.editAccount(accountEditObject),
        deleteAccount: (_, { accountId }, { dataSources }) => dataSources.fireAPI.deleteAccount(accountId)
    }
}

module.exports = resolvers