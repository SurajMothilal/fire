const logger = require('newrelic')
const express = require('express')
const errorMiddleware = require('./middleware/errorMiddleware')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./graphql/typedefs')
const  resolvers = require('./graphql/resolvers')
const FireAPI = require('./graphql/datasources/fireApi')

async function startApolloServer() {
    const app = express()
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      dataSources: () => ({
        fireAPI: new FireAPI()
      }),
    });
    await server.start();

    server.applyMiddleware({ app });
    
    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
    return { server, app };
}

startApolloServer()