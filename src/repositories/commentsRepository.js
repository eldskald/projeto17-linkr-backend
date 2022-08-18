import connection from '../../config/database.js';

export async function findComments(userId, postId, limit, offset) {
    const { rows } = await connection.query(`
        SELECT
            comments.id,
            comments.comment AS "text",
            users.id AS "authorId",
            users.name AS "authorName",
            users."profilePictureUrl" AS "authorPicture",
            EXISTS (SELECT 1 FROM follows f WHERE f."followerId"=$1 AND f."followedId"=users.id) AS following
        FROM comments
        JOIN users ON users.id = comments."userId"
        WHERE comments."postId" = $2
        LIMIT $3 OFFSET $4
    `, [userId, postId, limit, offset]);
    return rows;
}
