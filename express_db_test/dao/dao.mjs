// const db = require('../db/db');

import {db} from '../db/db.mjs';
const userDB = ()=> db('user_data').orderBy('id');
// const userDB = ()=> db('user_data');
// const productDB= ()=> db('products').orderBy('id');


export class PersonDAO{

    async createPerson(first_name,last_name, email, working_sector, car_make, car_model, car_model_year, car_vin_number){
        const result = await db('user_data').insert({
            first_name,
            last_name,
            email,
            working_sector,
            car_make,
            car_model,
            car_model_year,
            car_vin_number
        })
        .returning('*');

        //console.log(result);

        return result[0];
    }
    
    async get_by(id){
        const result = await userDB().where({["id"]:id});
        //console.log(result);
        return result[0];
    }

    async get_all(){
        const data = await userDB();
        return data;
    }

    async remove(id){
        const result = await userDB().where({id:id}).del()
        .returning("*");
        return result[0];
    }


    async updateData(id_number,column_name,given_value){
        
        const updated_data = await userDB().where({id:id_number}).update({[column_name]:given_value,updated_at:db.fn.now()})
        .returning('*');
        return updated_data[0];
    }
    

    async pagination(offset_val, pageSize){
        const paged_data = await userDB().select('*')
        .offset(offset_val).limit(pageSize);
        return paged_data;
    }

    async usualAuth1(secret_number, secret_name){
        const auth = await db('usual_user').select('s_name','s_number')
        .where({s_name:secret_name,s_number:secret_number});
        //console.log(auth);
        return auth;
    }

    async proAuth1(secret_number, secret_name){
        const auth = await db('pro_user').select('s_name','s_number')
        .where({s_name:secret_name,s_number:secret_number});
        //console.log(auth);
        return auth;
    }
}