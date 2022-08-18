import connection from '../../config/database.js';

export async function getPosts(limit, offset,userId) {
    const { rows: posts } = await connection.query(`
    (SELECT 
        users.id AS "authorId",
        users.name AS "authorName",
        users."profilePictureUrl" AS "authorPicture",
        posts.description,
        posts.link,
        posts.id as "postId",
        posts."createdAt" AS "createdTime",
        NULL AS "reposterName",
        COUNT(likes.id) as likes,
        COUNT(reposts.id) AS "repostCount",
        COUNT(comments.id) AS "commentCount",
        (SELECT 1 FROM likes l WHERE l."userId"=$3 AND l."postId"=posts.id LIMIT 1) AS liked
        
    FROM posts   
    JOIN users ON users.id = posts."userId"
    LEFT JOIN likes ON likes."postId" = posts.id
    LEFT JOIN reposts ON reposts."repostedPost" = posts.id
    LEFT JOIN comments ON comments."postId" = posts.id
    WHERE EXISTS (SELECT 1 FROM follows WHERE follows."followerId" = $3 AND follows."followedId" = users.id LIMIT 1)
    GROUP BY posts."createdAt",description,"link","authorPicture","authorName","authorId",posts.id

    UNION ALL
    
    SELECT
        users.id AS "authorId",
        users.name AS "authorName",
        users."profilePictureUrl" AS "authorPicture",
        posts.description,
        posts.link,
        posts.id as "postId",
        reposts."createdAt" AS "createdTime",
        reposter.name AS "reposterName",
        COUNT(likes.id) as likes,
        COUNT(reposts.id) AS repostsCount,
        COUNT(comments.id) AS "commentCount",
        (SELECT 1 FROM likes l WHERE l."userId"=$3 AND l."postId"=posts.id LIMIT 1) AS liked
    
    FROM posts
    LEFT JOIN reposts ON posts.id = reposts."repostedPost"
    JOIN users ON users.id = posts."userId"
    JOIN users AS reposter ON reposts."reposterId" = reposter.id
    LEFT JOIN likes ON likes."postId" = posts.id
    LEFT JOIN comments ON comments."postId" = posts.id
    WHERE EXISTS (SELECT 1 FROM follows WHERE follows."followerId" = $3 AND follows."followedId" = users.id LIMIT 1)
    GROUP BY reposter.name, reposts."createdAt",description,"link","authorPicture","authorName","authorId",posts.id)
    ORDER BY "createdTime" DESC
    LIMIT $1 OFFSET $2
    `, [limit, offset,userId]);
    
    return posts;
}
export async function getPostsByUser(limit, offset,userId,timelineOwnerId) {
    const { rows: posts } = await connection.query(`
        SELECT
            users.id AS "authorId",
            users.name AS "authorName",
            users."profilePictureUrl" AS "authorPicture",
            posts.description,
            posts.link,
            posts.id as "postId",
            COUNT(likes.id) as likes,
            COUNT(comments.id) AS "commentCount",
            (SELECT 1 FROM likes l WHERE l."userId"=$3 AND l."postId"=posts.id LIMIT 1) AS liked
        FROM posts
        JOIN users ON users.id = posts."userId"
        LEFT JOIN likes ON likes."postId" = posts.id
        LEFT JOIN comments ON comments."postId" = posts.id
        WHERE users.id=$4
        GROUP BY posts."createdAt",description,"link","authorPicture","authorName","authorId",posts.id
        ORDER BY posts."createdAt" DESC
        LIMIT $1 OFFSET $2
    `, [limit, offset,userId,timelineOwnerId]);
    
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
    if(hashtags.length>0){
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
    }
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

export async function getLikerNames(userId, postId){
    const {rows:names} =await connection.query(`
    SELECT users.name 
    FROM posts
    JOIN likes ON likes."postId" = posts.id
    JOIN users ON likes."userId" = users.id
    WHERE posts.id = $1 AND users.id!=$2
    LIMIT 2;`,[postId,userId])
    return names;
}
