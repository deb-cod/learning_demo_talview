import Joi from 'joi';
import { z } from 'zod';
import validator from 'validator';
import * as Yup from 'yup';

// Define complex validation schemas for each library
const joiSchema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
    email: Joi.string().email().required()
});

const zodSchema = z.object({
    username: z.string().min(3).max(30),
    password: z.string().min(6).max(30),
    email: z.string().email()
});

const yupSchema = Yup.object().shape({
    username: Yup.string().min(3).max(30).required(),
    password: Yup.string().min(6).max(30).required(),
    email: Yup.string().email().required()
});

// Sample Data
const testData = {
    username: 'TestUser123',
    password: 'Password123',
    email: 'test@example.com'
};

// Define the number of iterations for performance testing
const iterations = 10000;

// Performance test for Joi
const joiTestStart = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
    joiSchema.validate(testData);
}
const joiTestEnd = process.hrtime.bigint();
const joiTestDuration = Number(joiTestEnd - joiTestStart) / 1000000; // Convert to milliseconds

// Performance test for Zod
const zodTestStart = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
    zodSchema.parse(testData);
}
const zodTestEnd = process.hrtime.bigint();
const zodTestDuration = Number(zodTestEnd - zodTestStart) / 1000000; // Convert to milliseconds

// Performance test for Validator
const validatorTestStart = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
    validator.isEmail(testData.email) && validator.isAlphanumeric(testData.username) && testData.username.length >= 3 && testData.username.length <= 30 && testData.password.length >= 6 && testData.password.length <= 30;
}
const validatorTestEnd = process.hrtime.bigint();
const validatorTestDuration = Number(validatorTestEnd - validatorTestStart) / 1000000; // Convert to milliseconds

// Performance test for Yup
const yupTestStart = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
    yupSchema.validate(testData);
}
const yupTestEnd = process.hrtime.bigint();
const yupTestDuration = Number(yupTestEnd - yupTestStart) / 1000000; // Convert to milliseconds


console.log(`Joi validation took ${joiTestDuration.toFixed(2)} milliseconds for ${iterations} iterations.`);
console.log(`Zod validation took ${zodTestDuration.toFixed(2)} milliseconds for ${iterations} iterations.`);
console.log(`Validator validation took ${validatorTestDuration.toFixed(2)} milliseconds for ${iterations} iterations.`);
console.log(`Yup validation took ${yupTestDuration.toFixed(2)} milliseconds for ${iterations} iterations.`);
