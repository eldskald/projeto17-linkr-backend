import connection from '../../config/database.js';

export async function getPosts(limit, offset,userId) {
    const { rows: posts } = await connection.query(`
        SELECT
            users.name AS "authorName",
            users."profilePictureUrl" AS "authorPicture",
            posts.description,
            posts.link,
            posts.id as "postId",
            COUNT(likes.id) as likes,
            (SELECT 1 FROM likes l WHERE l."userId"=$3 AND l."postId"=posts.id) AS liked
        FROM posts
        JOIN users ON users.id = posts."userId"
        LEFT JOIN likes ON likes."postId" = posts.id
        GROUP BY posts."createdAt",description,"link","authorPicture","authorName",posts.id
        ORDER BY posts."createdAt" DESC
        LIMIT $1 OFFSET $2
    `, [limit, offset,userId]);
    
    return posts;
}

export async function insertPost(userId, link, description, hashtags) {
    const { rows: insertedPost } = await connection.query(`
        INSERT INTO posts ("userId", link, description)
        VALUES ($1, $2, $3)
        RETURNING id
    `, [userId, link, description]);
    const postId = insertedPost[0].id;

    let values = [];
    let where = [];
    for (const hashtag of hashtags) {
        values.push(`('${hashtag}')`);
        where.push(`hashtags.name = '${hashtag}'`);
    }

    await connection.query(`
        INSERT INTO hashtags (name)
        VALUES ${values.join(',\n')}
        ON CONFLICT (name) DO NOTHING
    `, []);

    const { rows: ids } = await connection.query(`
        SELECT id FROM hashtags
        WHERE ${where.join('\n OR ')}
    `, []);

    const nextValues = ids.map(row => `('${postId}', '${row.id}')`);
    await connection.query(`
        INSERT INTO "postsHashtags" ("postId", "hashtagId")
        VALUES ${nextValues.join(',\n')}
    `, []);

    return;
}

export async function insertLike(userId,postId){
    await connection.query(`
    INSERT INTO likes ("userId","postId") values ($1,$2)
    `,[userId,postId])
}

export async function deleteLike(userId,postId){
    await connection.query(`
    DELETE FROM likes WHERE "userId"=$1 AND "postId"=$2
    `,[userId,postId])
}