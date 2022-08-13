import { deleteRepository } from "../repositories/deletRepository.js";
import { editionRepository } from "../repositories/editionRepository.js";

export async function deletePostController (req, res){
    const {userId} = res.locals
    const postId = parseInt(req.params.id)
    
    try {
        const post = await editionRepository.getPost(postId)
        console.log('post.userId :',post.userId)
        console.log('userId', userId)
        if(post.userId == userId){
            console.log('to aqui')
            await deleteRepository.deletePost(postId)
            return res.status(200).send('post was deleted')
        }
        return res.status(400).send('user doesnt have this post')

    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('catch editionController')
    }
}