import connection from '../../config/database.js';

export async function getHashtags() {
    const { rows } = await connection.query(`
        SELECT hashtags.name, COUNT("postsHashtags"."hashtagId") AS mentions FROM "postsHashtags" JOIN hashtags ON "postsHashtags"."hashtagId"=hashtags.id GROUP BY hashtags.name ORDER BY mentions DESC LIMIT 10;
    `);
    return rows;
}

export async function getHashtag(urlHashtag){
    const { rows } = await connection.query(`
    SELECT
        users.name AS "authorName",
        users."profilePictureUrl" AS "authorPicture",
        posts.description,
        posts.link,
        hashtags.name
        FROM posts
        JOIN users ON users.id = posts."userId"
        JOIN "postsHashtags" ON posts.id = "postsHashtags"."postId"
        JOIN hashtags ON "postsHashtags"."hashtagId" = hashtags.id
        WHERE hashtags.name = $1
        ORDER BY posts."createdAt" DESC;
    `, [urlHashtag])
    return rows;
}