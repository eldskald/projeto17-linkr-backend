import { countComments, findComments } from '../repositories/commentsRepository.js';
import { findPostById } from '../repositories/postsRepository.js';

export async function getComments(req, res) {
    try {
        const { userId } = res.locals;
        const postId = parseInt(req.params.postId);
        const post = await findPostById(postId);
        if (!post) return res.sendStatus(404);

        let { limit, offset } = req.query;
        limit = parseInt(limit);
        offset = parseInt(offset);
        if (isNaN(limit) || isNaN(offset) || limit <= offset || offset < 0) {
            return res.sendStatus(400);
        }

        const comments = await findComments(userId, postId, limit, offset);
        const commentsTotal = await countComments(postId);
        return res.status(200).send({ comments, commentsTotal });

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
