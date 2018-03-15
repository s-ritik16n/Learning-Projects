const {
  buildSchema
} = require('graphql');
const express = require('express');
const Posts = require('./data/posts.js');
const graphqlHTTP = require('express-graphql');
const _ = require('lodash');
let app = express();

app.use(express.static(__dirname+'/public'));


var schema = buildSchema(`
  type FeedType{
    title: String!
    id: String!
  }
  type Query {
    hello: String!
    feed(limit: Int!): [FeedType]
  }
  `);

let offset = 0;
var root = {
  hello: () => {
    return 'Hello World';
  },
  feed: (args) => {
    // return query
    array = _.slice(Posts, offset,offset+ args.limit);
    offset += 2;
    console.log(array);
    return array
  }
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
//
// // Run the GraphQL query '{ hello }' and print out the response
// graphql(schema, '{ hello }', root).then((response) => {
//   console.log(response);
// });

app.get("/", (req,res) => {
  res.sendFile(__dirname+"/public/index.html")
})

app.listen("4000", () => {
  console.log("listening on 4000");
})
