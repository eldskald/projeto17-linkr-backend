import joi from 'joi';

const userSchema = joi.object({
  name: joi.string().max(50).required().messages({
    'string.base':`Name needs to be text`,
    'string.max':`This name is too big`,
    'string.required':`A name is required`
  }),
  email:joi.string().email().required().messages({
    'string.base':`E-mail needs to be text`,
    'string.email':`The E-mail needs to be valid`,
    'string.required':`E-mail is required`}),
  password: joi.string().required().messages({
    'string.base':`Password needs to be text`,
    'string.required':`A password is required`
  }),
  pictureUrl: joi.string().uri().required().messages({
    'string.base':`The URL must be text`,
    'string.uri':`Picture URL must be a valid URL`,
    'string.required':`A URL for your profile picture is required`
  })
});

export default userSchema;