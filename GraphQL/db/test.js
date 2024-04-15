import {db} from "./db.mjs";

const a=db('user_data').select('id', 'first_name').orderBy('id').returning('*');
console.log(a);
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';


// Connect to the database


// Define your GraphQL schema
const schema = buildSchema(`
  type User {
    id: ID!
    first_name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }
`);

// Implement resolvers
const root = {
    users: async () => {
        try {
            return await db('user_data').select('*').orderBy('id');
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }
};

// Create an Express application
const app = express();

// Mount GraphQL endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true // Enable GraphiQL for interactive query testing
}));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
