import { deleteRepository } from "../repositories/deleteRepository.js";
import { editionRepository } from "../repositories/editionRepository.js";

export async function deletePostController (req, res){
    const {userId} = res.locals
    console.log('userId : ', userId)
    const postId = parseInt(req.params.id)
    console.log('postId :', postId)
    
    try {
        const post = await deleteRepository.getOnePost(postId)
        console.log('post.userId :', post.userId)
        if(post.userId === userId){
            await deleteRepository.deletePost(postId)
            return res.status(200).send('post was deleted')
        }
        return res.status(400).send('Problem to Delete Post')

    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('catch editionController')
    }
}