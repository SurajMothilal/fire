const { ApolloServer } = require('apollo-server-lambda');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')
const FireAPI = require('./graphql/datasources/fireApi')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    fireAPI: new FireAPI()
  }),
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      endpoint: "/dev/graphql"
    })
  ]
})

exports.graphqlHandler = server.createHandler()