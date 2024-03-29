// const userController = require("../controller/user")

import {PersonController} from '../controller/user.mjs';


const userController = new PersonController();

export class Middleware {

    auth_overall = async (req, res, next) => {
        const password = "password";
        if (req.query && req.query.passcode === password) {
            next();
        }
        else{
            res.status(404).json({message:"No/Incorrect Password for Overall Auth Enter password as passcode"});
        }
            }


        auth_usual = async (req, res, next) => {
            if (req.query.s_number == undefined || req.query.s_name == undefined) {
                return res.status(400).json({ message: 'Caution: Query parameters s_number and s_name are required.' });
            }
            const data = await userController.usualAuth(req.query.s_number, req.query.s_name);
            if(data && data.length>0){

                next();
                
            }
            else{
                res.status(404).json({"message":"You are not in ALL USER list, Query Required: s_number s_name"});
                // console.log(res)
            }


            // if(usual_user[0].s_name && req.query.usualNum===usual_user[0].s_number){
            // next();
            // }
            // else{
            //     res.status(404).send("No/Incorrect Password \n Enter Password For Usual Users");
            // }
        }

        // auth_pro = async (req, res, next) => {
        //     next();
        //     return userController.proAuth;
        // }

        auth_pro = async (req, res, next) => {
            //const usual_password = "usual";
            if (req.query.s_number == undefined || req.query.s_name == undefined) {
                return res.status(401).json({ message: 'Caution: Query parameters s_number and s_name are required.' });
            }
            // const data = await userService.usualAuth2(req.query.s_number, req.query.s_name);
            const data = await userController.proAuth(req.query.s_number, req.query.s_name);
            if(data && data.length>0){
                
                // console.log(data);
                next();
                
            }
            else{
                res.status(404).json({"message":"You are not in PRO USER list, Query Required: s_number s_name"});
                // console.log(res)
            }


    }
}