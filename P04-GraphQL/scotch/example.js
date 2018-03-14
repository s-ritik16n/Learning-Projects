const express = require('express');
const { buildSchema } = require('graphql');
const graphhqlHTTP = require('express-graphql');

let port = 3000;

let schema = buildSchema(`
  type Query {
    postTitle: String,
    blogTitle: String
  }`
);

let root = {
  postTitle: () => {
    return 'Build a simple graphql server';
  },
  blogTitle: () => {
    return 'scotch.io';
  }
}

const app = express()

app.use('/',graphhqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));


app.listen(port,()=>{
  console.log("GraphQL server running at "+port);
});
