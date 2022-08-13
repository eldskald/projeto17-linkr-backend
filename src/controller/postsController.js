import { getPosts, insertPost } from '../repositories/postsRepository.js';
import urlMetadata from 'url-metadata';

export async function listPosts(req, res) {
    try {
        let { limit, offset } = req.query;
        limit = parseInt(limit);
        offset = parseInt(offset);
        if (isNaN(limit) || isNaN(offset) || limit <= offset || offset < 0) {
            return res.sendStatus(400);
        }

        const posts = await getPosts(limit, offset);
        for (const post of posts) {
            post.metadata = await urlMetadata(post.link);
        }
        return res.status(200).send(posts);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function newPost(_req, res) {
    try {
        const { userId, body } = res.locals;
        const hashtags = findHashtags(body.description);
        await insertPost(userId, body.link, body.description, hashtags);
        return res.sendStatus(201);
        
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

function findHashtags(text) {
    const words = text.split(' ');
    const hashtags = [];
    for (const word of words) {
        const regex = /^\#[a-zA-Z0-9_]+$/;
        if (regex.test(word)) hashtags.push(word.slice(1));
    }
    return hashtags;
}
