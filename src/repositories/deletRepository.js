import connection from "../../config/database.js";

async function deletePost(postId){
    console.log('deletePost, postId', postId)
    await connection.query(`
        DELETE FROM posts 
        WHERE posts.id = $1;`
    , [postId])
}

export const deleteRepository ={
    deletePost
}
