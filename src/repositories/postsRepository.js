import connection from '../../config/database.js';

export async function getPosts(limit, offset) {
    const { rows: posts } = await connection.query(`
        SELECT
            users.id AS "authorId",
            users.name AS "authorName",
            users."profilePictureUrl" AS "authorPicture",
            posts.description,
            posts.link,
            posts.id AS "postId"
        FROM posts
        JOIN users ON users.id = posts."userId"
        ORDER BY posts."createdAt" DESC
        LIMIT $1 OFFSET $2
    `, [limit, offset]);
    
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
