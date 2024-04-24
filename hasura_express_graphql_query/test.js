// 1. Install required packages:
// npm install express graphql-request jsonwebtoken

const express = require('express');
const { GraphQLClient } = require('graphql-request');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// 2. Set up your Hasura endpoint and admin secret
const hasuraEndpoint = 'http://localhost:8080/v1/graphql';
const adminSecret = 'your-admin-secret'; // Replace with your actual admin secret

// 3. Generate a JWT token (if using JWT authentication)
const generateJwtToken = () => {
    const claims = {
        'x-hasura-allowed-roles': ['user'], // Adjust roles as needed
        'x-hasura-default-role': 'user',
        'x-hasura-user-id': '123', // Replace with actual user ID
    };

    return jwt.sign(claims, 'your-secret-key', { expiresIn: '1h' });
};

// 4. Initialize a GraphQL client
const client = new GraphQLClient(hasuraEndpoint, {
    headers: {
        'x-hasura-admin-secret': adminSecret,
        // Uncomment the following line if using JWT authentication
        // 'Authorization': `Bearer ${generateJwtToken()}`,
    },
});

// 5. Define your GraphQL query
const query = `
  query {
    your_table {
      your_field
    }
  }
`;

// 6. Set up an Express route to fetch data
app.get('/data', async (req, res) => {
    try {
        const data = await client.request(query);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 7. Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
