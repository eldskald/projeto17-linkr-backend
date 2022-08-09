import { stripHtml } from 'string-strip-html';

function schemaValidation(schema) {
    return (req, res, next) => {
        const body = {...req.body};

        for (const key of Object.keys(body)) {
            body[key] = stripHtml(body[key]).result.trim();
        }

        const { schemaError } = schema.validate(body, { abortEarly: false });
        if (schemaError) {
            let messages = schemaError.details.map(value => value.message);
            for (const message of messages) {
                message = message.replaceAll('"', '');
                message[0] = message[0].toUpperCase();
            }
            res.status(422).send(messages.join('/n'));
        }

        res.locals.body = body;
        next();
    };
}

export default schemaValidation;
