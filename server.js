const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const morgan = require("morgan");
const cors = require("cors");
const fetch = require("node-fetch");
const typeDefs = require("./schema/typedefs");
const resolvers = require("./schema/resolvers");

require("./config");

//for auth0
const isTokenValid = require("./validate");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    // Get the user token from the headers.
    const token = req.headers.authorization || "";
    const { error } = await isTokenValid(token);

    return { token, error };
  },
});
const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

server.applyMiddleware({ app });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
