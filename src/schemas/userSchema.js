import joi from 'joi';

const userSchema = joi.object({
  name: joi.string().max(50).required(),
  email: joi.string().max(254).email().required(),
  password: joi.string().required(),
  pictureUrl: joi.string().uri().required()
});

export default userSchema;