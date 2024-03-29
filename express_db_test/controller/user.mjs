// const userService = require('../service/userService');

import {PersonService} from '../service/userService.mjs';

const userService = new PersonService();

export class PersonController{
    async createUser(req,res, next){
        try {
            const data = await userService.createUser(req.body);
            //console.log(Object.keys(data));
            // const personJson = JSON.stringify(data);
            // console.log(personJson);
            res.status(200).json(data);
        } catch(error){
            res.status(400).json({"message":error.message});
            //console.log(error);
            //const data = await userService.createUser(req.body);
        }
    }


    async getUser(req,res){
        try {
            const data = await userService.getFromUser(req.params.id);
            res.status(200).json(data);
        } catch (error) {
            res.status(404).json({"message":"ID Number Does Not Exist"});
            // console.error(error);
        }
    }

    async deleteFromUser(req,res){
        try {
            const data = await userService.deleteFromUser((req.params.id));
            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({"message":"User with That ID not found"})
            // console.error(error);
        }
    }

    async getAllUser(req,res){
        try {
            const data = await userService.getAllUser();
            //console.log(data);
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            }
        }

    async updateData(req,res){
        try {
            //console.log(req.params.id, req.body)
            const data = await userService.updateUserData(req.params.id, req.body);

            res.status(200).json(data);
        } catch (error) {
            res.status(400).json({"message":"User with That ID not found"})
            // console.error(error);
        }
    }

    async pagination(req,res){
        try {
            const page = parseInt(req.query.page) || 1;
            let pageSize = 50;
            if (parseInt(req.query.pageSize)>50){
                pageSize = 50;
            }
            else{
                pageSize = parseInt(req.query.pageSize) || 50;
            }
            // console.log(req.query);
            const offset_val = (page-1) * pageSize;

            const data = await userService.paginationData(offset_val,pageSize);
            res.status(200).json(data);

        } catch (error) {
            console.error(error);
        }
    }


///////////////////////////////////////////////////////////////////////////////////////
//                               AUTHINTICATION
//////////////////////////////////////////////////////////////////////////////////////


    async usualAuth(s_number, s_name){
        try{
            const data = await userService.usualAuth2(s_number, s_name);
            // console.log(data);
            return data

        }catch(error){
            console.error(error);

        }
    }


    async proAuth(s_number, s_name){
        try{
            const data = await userService.proAuth2(s_number, s_name);
            // console.log(data);
            return data

        }catch(error){
            console.error(error);

        }



    }


}