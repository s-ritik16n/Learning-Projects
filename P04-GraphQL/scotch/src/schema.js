const Authors = requrie('./data/authors');
const Posts = require('./data/posts');

let  {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,

} = require('graphql');
