import express from 'express';
import {PersonController} from '../controller/user.mjs';
import {Middleware} from '../middleware/middleware.mjs';

const userController = new PersonController();
const middleware = new Middleware();
const router = express.Router();

// Middleware
router.use(middleware.auth_overall);

// To create a new user
router.post('/api/createuser', middleware.auth_pro, userController.createUser);

// To get a person from it's id
router.get('/api/getuser/:id', middleware.auth_usual,userController.getUser);

// To delete a person by it's id
router.delete('/api/deleteuser/:id', middleware.auth_pro, userController.deleteFromUser);

// To get all the user
router.get('/api/alluser', middleware.auth_usual,userController.getAllUser);

// To update the data of existing user
router.put('/api/updateuserdata/:id', middleware.auth_pro,userController.updateData);

// For the purpose of pagination from "product" database
router.get('/api/page', middleware.auth_usual, userController.pagination);


export default router;


