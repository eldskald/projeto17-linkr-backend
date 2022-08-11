import connection from "../../config/database.js";

async function getPost(postId){
    const {rows:post} = await connection.query(`
        SELECT * 
        FROM posts
        WHERE posts.id = $1
    `, [postId])
    console.log('editionRepository post[0] : ', post[0])
    return post[0];
}

async function editPost(postEdit, postId){
    await connection.query(`
        UPDATE  posts
        SET link = '$1', description = '$2'  
        WHERE posts.id = $3`
    , [postEdit.link, postEdit.description, postId])
}


export const editionRepository ={
    getPost,
    editPost
}
