import Joi from 'joi';

export const create_user_validate = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().lowercase().email().required(),
    working_sector: Joi.string().required(),
    car_make: Joi.string().required(),
    car_model: Joi.string().required(),
    car_model_year: Joi.number().required(),
    car_vin_number: Joi.string().uppercase().required()
})

export const id_validate = Joi.object({
    id: Joi.number().required()
});

