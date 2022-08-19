import { getPosts, insertPost, insertLike, deleteLike, getLikerNames, getPostsByUser, getNewPosts} from '../repositories/postsRepository.js';
import urlMetadata from 'url-metadata';

export async function listPosts(req, res) {
    let posts
    try {
        let { limit, offset } = req.query;
        const userId=res.locals.userId
        limit = parseInt(limit);
        offset = parseInt(offset);
        if (isNaN(limit) || isNaN(offset) || limit <= offset || offset < 0) {
            return res.sendStatus(400);
        }
        posts = await getPosts(limit, offset,userId);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
    for (const post of posts) {
        try{
        post.metadata = await urlMetadata(post.link);
        }
        catch{
            post.metadata = {url:post.link};
            continue;
        }
    }
    return res.status(200).send(posts);


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
        if (regex.test(word)) hashtags.push(word);
    }
    return hashtags;
}

export async function newLike(req,res){
    try{
        const {userId}=res.locals;
        const{postId}=req.body;
        if(!postId){
            return res.status(404).send("This post is no longer available")
        }
        insertLike(userId,postId);
        return res.sendStatus(201);
    }catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
export async function unlike(req,res){
    try{
        const {userId}=res.locals;
        const {postId}=req.body;
        if(!postId){
            return res.status(404).send("This post is no longer available")
        }
        deleteLike(userId,postId);
        return res.sendStatus(200);
    }catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
export async function getNames(req,res){
    try{
        const {userId}=res.locals;
        const {postId}=req.body;
        const names=await getLikerNames(userId,postId);
        return res.status(200).send(names);
    }catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}
export async function listPostsByUser(req, res) {
    try {
        let { limit, offset } = req.query;
        const {userId}=res.locals;
        const timelineOwnerId=req.params.id;
        limit = parseInt(limit);
        offset = parseInt(offset);
        if (isNaN(limit) || isNaN(offset) || limit <= offset || offset < 0) {
            return res.sendStatus(400);
        }

        const posts = await getPostsByUser(limit, offset,userId,timelineOwnerId);
        for (const post of posts) {
            try{
                post.metadata = await urlMetadata(post.link);
                }
                catch{
                    post.metadata = {url:post.link};
                    continue;
                }
        }
        return res.status(200).send(posts);

    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}

export async function newPosts(req, res){
    let newPosts
    try {
        const userId = res.locals.userId
        const lastPostTimeline = req.params.time;
        newPosts = await getNewPosts( userId, lastPostTimeline);
    } catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }

    return res.status(200).send(newPosts);
}