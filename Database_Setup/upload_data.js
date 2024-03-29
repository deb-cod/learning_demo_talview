const fs = require("fs");

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1', // local host
        user: 'postgres', // enter username
        password: 'password',  // password for postgresql database i.e pgAdmin for example
        database: 'github_upload'  // change the database name if required
    }
});


const sql = fs.readFileSync('user_data.sql', 'utf8');
const sql1 = fs.readFileSync('usual_user.sql', 'utf8');
const sql2 = fs.readFileSync('pro_user.sql', 'utf8');

// Execute the raw SQL queries
knex.raw(sql)
    .then(() => {
        console.log('Data inserted successfully');
        knex.destroy(); // Close the connection pool
    })
    .catch(error => {
        console.error('Error inserting data:', error);
        knex.destroy(); // Close the connection pool
    });

knex.raw(sql1)
    .then(() => {
        console.log('Data inserted successfully');
        knex.destroy(); // Close the connection pool
    })
    .catch(error => {
        console.error('Error inserting data:', error);
        knex.destroy(); // Close the connection pool
    });

knex.raw(sql2)
    .then(() => {
        console.log('Data inserted successfully');
        knex.destroy(); // Close the connection pool
    })
    .catch(error => {
        console.error('Error inserting data:', error);
        knex.destroy(); // Close the connection pool
    });