// const express = require('express');
// const { GraphQLClient } = require('graphql-request');
// const jwt = require('jsonwebtoken');

import express from 'express';
import router from "./route.mjs";

const app = express();
const port = 3000;

app.use(router);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
