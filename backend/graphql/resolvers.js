// Resolvers define the technique for fetching the types defined in the
// schema.
const resolvers = {
    Query: {
        getUser: (_, { id }, { dataSources }) => dataSources.fireAPI.getUser(id),
        getUserAccounts: (_, { userId }, { dataSources }) => dataSources.fireAPI.getUserAccounts(userId),
        fireProfileForUser: (_, { userId }, { dataSources }) => dataSources.fireAPI.getFireProfileForUser(userId),
        testMessage: () => 'Test Message!'
    },
    Mutation: {
        saveAccount: (_, { accountObject }, { dataSources }) => dataSources.fireAPI.saveAccount(accountObject),
        editAccount: (_, { accountEditObject }, { dataSources }) => dataSources.fireAPI.editAccount(accountEditObject),
        deleteAccount: (_, { accountId }, { dataSources }) => dataSources.fireAPI.deleteAccount(accountId),
        saveFireProfile: (_, { fireProfileObject }, { dataSources }) => dataSources.fireAPI.saveFireProfile(fireProfileObject)
    }
}

module.exports = resolvers