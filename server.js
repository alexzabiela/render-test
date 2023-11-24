const { ApolloServer, gql } = require('apollo-server');
const data = require('./data.json'); // assuming your JSON file is data.json

// GraphQL schema
const typeDefs = gql`
  type Service {
    id: Int
    title: String
    image: String
    description: String
  }

  type formSubmission {
    id: Int
    name: String
    email: String
    message: String
  }

  type Query {
    services: [Service]
    formSubmissions: [FormSubmission]
  }
`;

// Resolvers define the technique for fetching the types in the schema
const resolvers = {
  Query: {
    services: () => data.services,
    formSubmissions: () => data.formSubmissions
  },
};

// Create the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
