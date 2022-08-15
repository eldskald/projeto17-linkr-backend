import connection from "../../config/database.js";
import { editionRepository } from "../repositories/editionRepository.js";

export async function editionController (req, res){
    const {userId} = res.locals
    const postId = parseInt(req.params.id)
    const {description} = req.body

   try{
        const post = await editionRepository.getPost(postId)
        const hastags = editionRepository.findHashtags(description)
        console.log('hastags :', hastags)

        if(post.userId == userId){
            await editionRepository.teste(postId, description, hastags)
            return res.status(200).send('post was edited')
        }
        return res.status(400).send('user doesnt have this post') 
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('catch editionController')
    }
}