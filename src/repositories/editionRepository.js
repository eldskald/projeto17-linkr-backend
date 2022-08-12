import connection from "../../config/database.js";

async function getPost(postId){
    const {rows:post} = await connection.query(`
        SELECT * 
        FROM posts
        WHERE posts.id = $1
    `, [postId])
    return post[0];
}

async function editPost(link, description, postId){
    await connection.query(`
        UPDATE  posts
        SET link = $1, description = $2  
        WHERE posts.id = $3`
    , [link, description, postId])
}

export const editionRepository ={
    getPost,
    editPost
}
