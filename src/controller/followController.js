import { addFollow, removeFollow } from '../repositories/followRepository.js';
import { authRepository } from '../repositories/authRepository.js';

export async function follow(req, res) {
    try {
        const { userId } = res.locals;
        const followedId = parseInt(req.params.id);
        const followedUser = await authRepository.getUser(followedId);
        if (!followedUser) return res.sendStatus(404);

        await addFollow(userId, followedId);
        return res.sendStatus(200);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function unfollow(req, res) {
    try {
        const { userId } = res.locals;
        const followedId = parseInt(req.params.id);
        const followedUser = await authRepository.getUser(followedId);
        if (!followedUser) return res.sendStatus(404);

        await removeFollow(userId, followedId);
        return res.sendStatus(200);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
