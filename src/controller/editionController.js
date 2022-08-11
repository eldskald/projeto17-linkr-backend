import connection from "../../config/database.js";

export async function editionController (req, res){
    const {userId} = res.locals
    const postId = parseInt(req.params.id)
    const postEdit = req.body

    try {
        const {rows:post} = await connection.query(`SELECT * FROM posts
                                                    WHERE posts.id = ${postId}`)
        
        if(userId == post[0].userId){
            await connection.query(`UPDATE  posts
                                    SET link = '${postEdit.link}', description = '${postEdit.description}'  
                                    WHERE posts.id = ${postId}`)
            return res.status(200).send('post was edited')
        }
        return res.status(400).send('user doesnt have this post')
    } catch (error) {
        console.log('error: ', error)
        return res.status(500).send('catch editionController')
    }
}