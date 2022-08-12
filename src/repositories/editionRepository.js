import connection from "../../config/database.js";

async function getPost(postId){
    const {rows:post} = await connection.query(`
        SELECT * 
        FROM posts
        WHERE posts.id = $1
    `, [postId])
    return post[0];
}

async function editPost(description, postId){
    await connection.query(`
        UPDATE  posts
        SET description = $1  
        WHERE posts.id = $2`
    , [description, postId])
}

export const editionRepository ={
    getPost,
    editPost
}
