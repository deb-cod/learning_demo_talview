import express from 'express';
import router from "./router.mjs";

const app = express();

app.use(express.json());
app.use(router);


const PORT = 8000;
app.listen(PORT, ()=>{
    console.log(`Running at ${PORT}`)
})