import Joi from 'joi';
import {z} from 'zod';
import validator from 'validator';
import * as Yup from 'yup';



////////////////////////////////////////////////////////////////////////////////////
//                                  JOI
///////////////////////////////////////////////////////////////////////////////////

// const joi_schema_1 = Joi.object({
//     username: Joi.string().alphanum().min(3).max(30).required(),
//     password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
//     email: Joi.string().email().required(),
// });

const joi_schema_1 = Joi.object({
    username: Joi.string().min(3).max(30),
    password: Joi.string().min(6).max(30),
    email: Joi.string().email()
});

const joi_data_1 = { username: 'Test', password: 'password123', email: 'test@example.com' };

const joi_start_1 = performance.now();
const joi_result_1 = joi_schema_1.validate(joi_data_1);
const joi_end_1 = performance.now();

console.log(`Joi Validation took ${joi_end_1 - joi_start_1} milliseconds.`);



///////////////////////////////////////////////////////////////////////////////////
//                                ZOD
//////////////////////////////////////////////////////////////////////////////////

const z_schema_1 = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6).max(30),
    email: z.string().email(),
});

const z_data_1 = { username: 'Test', password: 'password123', email: 'test@example.com' };

// const z_start_1 = performance.now();
// const z_result_1 = await z_schema_1.parseAsync(z_data_1);
// console.log(z_result_1)
// const z_end_1 = performance.now();
const z_start_1 = performance.now();
const z_result_1 = z_schema_1.safeParse(z_data_1);
const z_end_1 = performance.now();

console.log(`Zod Validation took ${z_end_1 - z_start_1} milliseconds.`);



//////////////////////////////////////////////////////////////////////////////////////
//                                VALIDATOR
//////////////////////////////////////////////////////////////////////////////////////



const v_schema_1 = {
    username: 'Test',
    password: 'password123',
    email: 'test@example.com'
};


const start = performance.now();
const isValidUsername = typeof v_schema_1.username === 'string' && v_schema_1.username.length >= 3 && v_schema_1.username.length <= 30;
const isValidPassword = typeof v_schema_1.password === 'string' && v_schema_1.password.length >= 6 && v_schema_1.password.length <= 30;
const isValidEmail = validator.isEmail(v_schema_1.email);
const isValidForm = isValidUsername && isValidPassword && isValidEmail;
const end = performance.now();


console.log(`Validator Validation took ${end - start} milliseconds.`);
// console.log(`Form is ${isValidForm ? 'valid' : 'invalid'}.`);



/////////////////////////////////////////////////////////////////////////////
//                            YUP
////////////////////////////////////////////////////////////////////////////

const yup_schema_1 = Yup.object().shape({
    username: Yup.string().min(3).max(30),
    password: Yup.string().min(6).max(30),
    email: Yup.string().email(),
});

const yup_data_1 = { username: 'Test', password: 'password123', email: 'test@example.com' };

// const yup_start_1 = performance.now();
// yup_schema_1.validate(yup_data_1)
//     .then(() => {
//         const yup_end_1 = performance.now();
//         console.log(`Yup Validation took ${yup_end_1 - yup_start_1} milliseconds.`);
//     })
//     .catch(err => console.error(err));

const yup_start_1 = performance.now();
// console.log(yup_start_1);
const yup_result_1 = yup_schema_1.validate(yup_data_1);
const yup_end_1 = performance.now();

console.log(`Yup Validation took ${yup_end_1 - yup_start_1} milliseconds.`);    

