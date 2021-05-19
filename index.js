const { ApolloServer } = require('apollo-server');
const connectDB = require('./config');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
//creating server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});
//connecting mongodb
connectDB();
// starting server
server.listen({ port: 5000 }).then((res) => {
  console.log(`server running at ${res.url}`);
});
