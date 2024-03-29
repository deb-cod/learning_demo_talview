import {PersonDAO} from './dao/dao.mjs';

const dao = new PersonDAO();

const result = await dao.get_by(1000000);
console.log(result);