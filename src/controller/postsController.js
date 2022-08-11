import { getPosts } from '../repositories/postsRepository.js';

export async function listPosts(req, res) {
    try {
        const { userId } = res.locals;
        let { limit, offset } = req.query;
        limit = parseInt(limit);
        offset = parseInt(offset);
        if (isNaN(limit) || isNaN(offset) || limit <= offset || offset <= 0) {
            return res.sendStatus(400);
        }

        const posts = await getPosts(limit, offset, userId);
        return res.status(200).send(posts);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
