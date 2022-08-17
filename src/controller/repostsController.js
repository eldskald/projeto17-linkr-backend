import { insertRepost } from '../repositories/repostsRepository.js';

export async function newRepost(req,res){
    try{
        const {userId}=res.locals;
        const postId = req.params.postId
        console.log("attempt")
        if(!postId){
            return res.status(404).send("This post is not available");
        }
        insertRepost(userId,postId);
        return res.sendStatus(201);
    }catch (err) {
        console.log(err);
        return res.sendStatus(500);
    }
}