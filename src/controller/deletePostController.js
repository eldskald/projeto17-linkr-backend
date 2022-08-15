import { deleteRepository } from "../repositories/deleteRepository.js";

export async function deletePostController (req, res){
    const {userId} = res.locals;
    const postId = parseInt(req.params.id);
    
    try {
        const post = await deleteRepository.getOnePost(postId)
        if(post){
            if(post.userId === userId){
                await deleteRepository.deletePost(postId,userId)
                return res.status(200).send('post was deleted')
            }
            return res.status(400).send('Problem to Delete Post')
        }
        return res.status(404).send('Post not found');
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('catch editionController')
    }
}