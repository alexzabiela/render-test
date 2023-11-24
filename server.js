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

  type FormSubmission {
    id: Int
    name: String
    email: String
    message: String
  }
  
  type Query {
    services: [Service]
    formSubmissions: [FormSubmission]
  }

  type Mutation {
    addFormSubmission(name: String!, email: String!, message: String!): FormSubmission
  }
  
`;

// Resolvers define the technique for fetching the types in the schema
const resolvers = {
  Query: {
    services: () => data.services,
    formSubmissions: () => data.formSubmissions
  },
  Mutation: {
    addFormSubmission: (parent, args) => {
      // Implement logic to add form submission
      // Example:
      const newSubmission = { id: generateNewId(), ...args };
      data.formSubmissions.push(newSubmission);
      return newSubmission;
    }
  }
};

// Create the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
