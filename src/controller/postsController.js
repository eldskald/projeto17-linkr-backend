import { getPosts } from '../repositories/postsRepository.js';

export async function listPosts(req, res) {
    try {
        const { limit, amount } = req.query;
        if (!Number.isInteger(limit) && !Number.isInteger(amount)) {
            return res.sendStatus(400);
        }

        const posts = await getPosts(limit, Math.max(limit - amount, 0));
        return res.status(200).send(posts);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
