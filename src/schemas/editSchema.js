import joi from 'joi';

const postEdit = joi.object({
    link: joi.string().required(),
    description: joi.string().max(255).required(),
});

export default postEdit;