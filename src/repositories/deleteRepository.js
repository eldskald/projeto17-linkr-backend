import connection from "../../config/database.js";

async function deletePost(postId){
    console.log('deletePost, postId', postId)
    await connection.query(`
        DELETE FROM "postsHashtags"
        WHERE "postId" = $1`
        , [postId])
    
    await connection.query(`
        DELETE FROM posts 
        WHERE posts.id = $1;`
    , [postId])
}

export async function getOnePost(postId) {
    console.log('getOnePost, postId', postId)
    const { rows: post } = await connection.query(`
        SELECT *
        FROM posts
        WHERE posts.id = $1
    `, [postId]);
    console.log('post[0] : ', post[0])
    return post[0];
}

export const deleteRepository ={
    deletePost,
    getOnePost
}
