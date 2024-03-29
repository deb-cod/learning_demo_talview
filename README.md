# learning_demo_talview



npm install nodemon knex pg express --save-dev

npm install jest --save-dev

npm jest init@config

// TEST
npm install --save-dev @babel/preset-env @babel/plugin-transform-modules-commonjs





//     DATABASE SETUP

npm install knex pg --save-dev


// FOR CREATING NEW DATABASE, make init is required

npx knex migrate:make init --migrations-directory db/migrations

//////////////// CHANGE THE migration file ending with *_init.js

npx knex migrate:latest --knexfile db/knexfile.js


/////////////// IF YOU ARE USING YOUR EXISTING DATABASE THEN

npx knex migrate:make debesh_github --knexfile db/knexfile.js


/////////////// UPLOAD THE DATA ///////////////


node upload_data.js
