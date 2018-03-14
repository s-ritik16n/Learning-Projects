const Authors = requrie('./data/authors');
const Posts = require('./data/posts');

let  {
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLSchema,

} = require('graphql');

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This repersent an author",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)},
    twitterHandle: {type: GraphQLString}
  })
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This represent a Post",
  fields: () => {
    id: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    body: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve: function(post) {
        return _.find(Authors, a=>a.id == post.author_id);
      }
    }
  }
})

const BlogQueryType = new GraphQLObjectType({
  name: "BLogAppSchema",
  description: "Blog Application",
  fields: () => {
    authors: {
      type: new GraphQLList(AuthorType),
      description: "Lit of all authors",
      resolve: function() {
        return Authors
      }
    },
    posts: {
      type: new GraphQLList(PostType),
      description: "List of all Posts",
      resolve: function() {
        return Posts
      }
    }
  }
});
