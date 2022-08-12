import connection from '../../config/database.js';

export async function getPosts(limit, offset, userId) {
    const { rows } = await connection.query(`
        SELECT
            users.name AS "authorName",
            users."profilePictureUrl" AS "authorPicture",
            posts.description AS "description",
            posts.link AS "link",
            COUNT(likes.id) AS "likesTotal",
            COUNT(liked.id) AS "liked"
        FROM posts
        JOIN users ON users.id = posts."userId"
        JOIN likes ON likes."postId" = posts.id
        JOIN likes liked ON liked."postId" = posts.id
        WHERE liked."userId" = $1
        GROUP BY posts.id, users.id
        ORDER BY posts."createdAt" DESC
        LIMIT $2 OFFSET $3
    `, [userId, limit, offset]);
    return rows;
}

