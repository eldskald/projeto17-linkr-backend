import connection from '../../config/database.js';

export async function getHashtags() {
    const { rows } = await connection.query(`
        SELECT hashtags.name, COUNT("postsHashtags"."hashtagId") AS mentions FROM "postsHashtags" JOIN hashtags ON "postsHashtags"."hashtagId"=hashtags.id GROUP BY hashtags.name ORDER BY mentions DESC LIMIT 10;
    `);
    return rows;
}

export async function getHashtag(limit, offset, userId, urlHashtag){
    const { rows: posts } = await connection.query(`
        SELECT
            users.id AS "authorId",
            users.name AS "authorName",
            users."profilePictureUrl" AS "authorPicture",
            posts.description,
            posts.link,
            posts.id as "postId",
            COUNT(likes.id) as likes,
            (SELECT 1 FROM likes l WHERE l."userId"=$3 AND l."postId"=posts.id LIMIT 1) AS liked
        FROM posts
        JOIN users ON users.id = posts."userId"
        JOIN "postsHashtags" ON posts.id = "postsHashtags"."postId"
        JOIN hashtags ON "postsHashtags"."hashtagId" = hashtags.id
        LEFT JOIN likes ON likes."postId" = posts.id
        WHERE hashtags.name = $4
        GROUP BY posts."createdAt",description,"link","authorPicture","authorName","authorId",posts.id
        ORDER BY posts."createdAt" DESC
        LIMIT $1 OFFSET $2
    `, [limit, offset,userId,urlHashtag]);
    return posts;
}

//export async function getHashtag(limit, offset, userId, urlHashtag) {
//    const { rows: posts } = await connection.query(`
//        SELECT
//            users.id AS "authorId",
//            users.name AS "authorName",
//            users."profilePictureUrl" AS "authorPicture",
//            posts.description,
//            posts.link,
//            posts.id as "postId",
//            COUNT(likes.id) as likes,
//            (SELECT 1 FROM likes l WHERE l."userId"=$3 AND l."postId"=posts.id) AS liked
//        FROM "postsHashtags"
//        JOIN posts ON posts.id = "postsHashtags"."postId"
//        JOIN users ON users.id = posts."userId"
//        JOIN hashtags ON hashtag.id = "postsHashtags"."hashtagId"
//        LEFT JOIN likes ON likes."postId" = posts.id
//        WHERE hashtag.name = $4
//        GROUP BY posts."createdAt",description,"link","authorPicture","authorName","authorId",posts.id
//        ORDER BY posts."createdAt" DESC
//        LIMIT $1 OFFSET $2
//    `, [limit, offset, userId, urlHashtag]);
//    return posts;
//}
