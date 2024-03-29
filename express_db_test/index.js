// const express = require("express");
// const router = require("./routes/app");

import express from 'express';
import router from './routes/router.mjs';


const app = express();
app.use(express.json());
app.use(router);


const PORT = process.env.PORT || 1234;

app.listen(PORT,()=>{
    console.log(`Server is live at port ${PORT}`)
});


// for api testing
export {app};