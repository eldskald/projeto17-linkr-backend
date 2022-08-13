import { search } from '../repositories/searchRepository.js';

export async function searchFor(req, res) {
    try {
        const { str, id } = req.query;
        const results = await search(str);
        if (results.length > 0) return res.status(200).send({results, id});
        else return res.status(204).send({results, id});

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
