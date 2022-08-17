const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");

// import apollo server
const { ApolloServer } = require("apollo-server-express");

//import our typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");

const app = express();
const PORT = process.env.PORT || 3001;

//create a new Apollo server and pass in our schema data
const server = new ApolloServer({ typeDefs, resolvers });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if we're in production, serve client/build as static assets
/* if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
} */

//create a new instance of an Apollo Server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
};

//app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`🌍 Now listening on localhost:${PORT}`);
    //log where we can go to test our GQL API
    console.log(`use GraphQL at http://localhost:${port}${server.graphqlPath}`);
  });
});

//call the async function to start the server
startApolloServer(typeDefs, resolvers);
