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

const PORT = process.env.NODE_ENV || 5000;

//connecting mongodb
connectDB();
// starting server
server
  .listen({ port: PORT })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  })
  .catch((err) => {
    console.error(err);
  });
