import joi from 'joi';

const logInSchema = joi.object({
  email:joi.string().email().required().messages({
    'string.base':`E-mail needs to be text`,
    'string.pattern.base':`The E-mail needs to be valid`,
    'string.required':`E-mail is required`}),
  password: joi.string().required().messages({
    'string.base':`Password needs to be text`,
    'string.required':`A password is required`
  }),
});

export default logInSchema;