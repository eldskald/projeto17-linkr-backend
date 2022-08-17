import connection from '../../config/database.js';

export async function insertRepost(userId,postId){
    await connection.query(`
    INSERT INTO reposts ("reposterId","repostedPost") values ($1,$2)
    `,[userId,postId])
}
