import joi from 'joi';

const postEdit = joi.object({
    description: joi.string().max(255).required()
});

export default postEdit;