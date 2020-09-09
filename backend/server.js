const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");
const resolvers = require("./resolvers");

const port = 9000;

const app = express();
app.use(cors(), bodyParser.json());

app.get("/api", (req, res) => {
  res.send("HOORAY");
});

const typeDefs = gql(fs.readFileSync("./schema.graphql", { encoding: "utf8" }));

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/graphql" });

app.listen(port, () => console.info(`Server started on port ${port}`));
