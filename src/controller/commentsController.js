import { findComments } from '../repositories/commentsRepository.js';

export async function getComments(req, res) {
    const { userId } = res.locals;
    const { postId } = req.params;

}
