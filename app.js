let express = require('express')
let {graphqlHTTP} = require('express-graphql');
let {graphql, buildSchema} = require('graphql');
let fs = require('fs');
//load file
let mData = fs.readFileSync('./movies.json', 'utf-8');

// Construct a schema, using GraphQL schema language
let schema = buildSchema(`
  type Movies {
  actors: String
  director: String
  genres: [String]
  id: Int
  plot: String
  posterUrl: String
  rank: Int
  runtime: String
  title: String
  year: String
}

type Query {
  movies: [Movies]
}
`);
// The rootValue provides a resolver function for each API endpoint
let root = {
    movies: () => {
        return JSON.parse(mData);
    },
};
// Run the GraphQL query '{ hello }' and print out the response
let app = express();
app.use('/movies', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(80);
console.log('Running a GraphQL API server at http://localhost:3000/movies');
