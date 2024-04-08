import express from 'express';
// import dummy_users from './dummy_data/MOCK_DATA.json' assert { type: "json" };
import {graphqlHTTP} from "express-graphql";
import {schema} from "./schema/schema.mjs";


const app = express();
const PORT = process.env.PORT || 7410 ;


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));



app.listen(PORT, ()=>{
    console.log(`Server at PORT ${PORT}`);
})