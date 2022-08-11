import { stripHtml } from 'string-strip-html';

function schemaValidation(schema) {
    return (req, res, next) => {
        const body = {...req.body};

        for (const key of Object.keys(body)) {
            body[key] = stripHtml(body[key]).result.trim();
        }

        const validate = schema.validate(body, { abortEarly: false });
        console.log(validate.error)
        if (validate.error) {
            let messages = validate.error.details.map(value => value.message);
            return res.status(422).send(messages.join('/n'));
        }

        res.locals.body = body;
        next();
    };
}

export default schemaValidation;
