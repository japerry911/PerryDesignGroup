const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { ApolloServer, gql } = require("apollo-server-express");
const fs = require("fs");
const resolvers = require("./resolvers");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const port = 9000;

const db = async () => {
  const uri = process.env.DATABASE_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error}`);
  }
};

db();

const app = express();
app.use(cors(), bodyParser.json());

app.get("/api", (req, res) => {
  res.send("HOORAY");
});

const typeDefs = gql(fs.readFileSync("./schema.graphql", { encoding: "utf8" }));

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: "/graphql" });

app.listen(port, () => console.info(`Server started on port ${port}`));
