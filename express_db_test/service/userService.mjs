// const dao = require('../dao/dao');

import {PersonDAO} from '../dao/dao.mjs';

const dao = new PersonDAO();

export class PersonService{


    createUser(personDto){
        const {first_name,last_name, email, working_sector, car_make, car_model, car_model_year, car_vin_number} = personDto;
        return dao.createPerson(first_name,last_name, email, working_sector, car_make, car_model, car_model_year, car_vin_number);
    }

    getFromUser(id_number){
        return dao.get_by(id_number);
    }

    getAllUser(){
        //console.log(dao.get_all())
        return dao.get_all();
    }

    deleteFromUser(id_number){
        return dao.remove(id_number);
    }

    updateUserData(id_number, updatedValue){
        //console.log(updatedValue);
        const {column_name, changed_value} = updatedValue;
        //console.log   (`COLUMN: ${first_name}`);
        return dao.updateData(id_number, column_name, changed_value);
    }


    paginationData(offset_val, pageSize){
        return dao.pagination(offset_val, pageSize);
    }

    usualAuth2(secret_number, secret_name){
        return dao.usualAuth1(secret_number, secret_name);
    }

    proAuth2(secret_number, secret_name){
        return dao.proAuth1(secret_number, secret_name);
    }
}
