import { editionRepository } from "../repositories/editionRepository.js";

export async function editionController (req, res){
    const {userId} = res.locals
    const postId = parseInt(req.params.id)
    const {description} = req.body

   try{
        const hastags = editionRepository.findHashtags(description)
        
        await editionRepository.editPost(postId,userId, description, hastags)
        return res.status(200).send('post was edited')

    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('catch editionController')
    }
}