import connection from '../../config/database.js';

export async function getPosts(limit, offset,userId) {
    const { rows: posts } = await connection.query(`
    SELECT 
        users.id AS "authorId",
        users.name AS "authorName",
        users."profilePictureUrl" AS "authorPicture",
        posts.description,
        posts.link,
        posts.id as "postId",
        posts."createdAt" AS "createdTime",
        NULL AS "reposterName",
        NULL AS "reposterId",
        (SELECT COUNT(likes.id) FROM likes WHERE likes."postId"=posts.id) as likes,
        (SELECT COUNT(reposts.id) FROM reposts WHERE reposts."repostedPost"=posts.id) AS "repostCount",
        (SELECT COUNT(comments.id) FROM comments WHERE comments."postId"=posts.id) AS "commentCount",
        (SELECT 1 FROM likes l WHERE l."userId"=$3 AND l."postId"=posts.id LIMIT 1) AS liked
        
    FROM posts   
    JOIN users ON users.id = posts."userId"
    WHERE EXISTS (SELECT 1 FROM follows WHERE follows."followerId" = $3 AND follows."followedId" = users.id LIMIT 1)
    GROUP BY posts."createdAt",description,"link","authorPicture","authorName","authorId",posts.id
    
    UNION
    
    SELECT
        users.id AS "authorId",
        users.name AS "authorName",
        users."profilePictureUrl" AS "authorPicture",
        posts.description,
        posts.link,
        posts.id as "postId",
        reposts."createdAt" AS "createdTime",
        reposter.name AS "reposterName",
        reposter.id AS "reposterId",
        (SELECT COUNT(likes.id) FROM likes WHERE likes."postId"=posts.id) as likes,
        (SELECT COUNT(reposts.id) FROM reposts WHERE reposts."repostedPost"=posts.id) AS "repostCount",
        (SELECT COUNT(comments.id) FROM comments WHERE comments."postId"=posts.id) AS "commentCount",
        (SELECT 1 FROM likes l WHERE l."userId"=$3 AND l."postId"=posts.id LIMIT 1) AS liked
    
    FROM posts
    JOIN reposts ON reposts."repostedPost" = posts.id 
    JOIN users ON users.id = posts."userId"
    JOIN users AS reposter ON reposts."reposterId" = reposter.id
    WHERE EXISTS (SELECT 1 FROM follows WHERE follows."followerId" = $3 AND follows."followedId" = reposter.id LIMIT 1)
    GROUP BY reposter.id,reposter.name, reposts."createdAt",description,"link","authorPicture","authorName","authorId",posts.id
    
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
            posts."createdAt" AS "createdTime",
            NULL AS "reposterName",
            NULL AS "reposterId",
            (SELECT COUNT(likes.id) FROM likes WHERE likes."postId"=posts.id) as likes,
            (SELECT COUNT(reposts.id) FROM reposts WHERE reposts."repostedPost"=posts.id) AS "repostCount",
            (SELECT COUNT(comments.id) FROM comments WHERE comments."postId"=posts.id) AS "commentCount",
            (SELECT 1 FROM likes l WHERE l."userId"=$3 AND l."postId"=posts.id LIMIT 1) AS liked
        FROM posts
        JOIN users ON users.id = posts."userId"
        WHERE users.id=$4
        GROUP BY "createdTime",posts."createdAt",description,"link","authorPicture","authorName","authorId",posts.id

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
            reposter.id AS "reposterId",
            (SELECT COUNT(likes.id) FROM likes WHERE likes."postId"=posts.id) as likes,
            (SELECT COUNT(reposts.id) FROM reposts WHERE reposts."repostedPost"=posts.id) AS "repostCount",
            (SELECT COUNT(comments.id) FROM comments WHERE comments."postId"=posts.id) AS "commentCount",
            (SELECT 1 FROM likes l WHERE l."userId"=$3 AND l."postId"=posts.id LIMIT 1) AS liked

        FROM posts
        JOIN reposts ON reposts."repostedPost" = posts.id 
        JOIN users AS reposter ON reposts."reposterId" = reposter.id
        JOIN users ON users.id = posts."userId"
        WHERE reposter.id=$4
        GROUP BY reposter.name,reposter.id,"createdTime",posts."createdAt",description,"link","authorPicture","authorName","authorId",posts.id

        ORDER BY "createdTime" DESC
        LIMIT $1 OFFSET $2
    `, [limit, offset,userId,timelineOwnerId]);
    
    return posts;
}

export async function findPostById(postId) {
    const { rows } = await connection.query(`
        SELECT * FROM posts WHERE id = $1
    `, [postId]);
    return rows[0];
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

export async function getNewPosts(userId, lastPostTimeline) {
    const { rows: newPosts } = await connection.query(`
    SELECT 
        users.id AS "authorId",
        users.name AS "authorName",
        users."profilePictureUrl" AS "authorPicture",
        posts.description,
        posts.link,
        posts.id as "postId",
        posts."createdAt" AS "createdTime",
        NULL AS "reposterName",
        NULL AS "reposterId",
        (SELECT COUNT(likes.id) FROM likes WHERE likes."postId"=posts.id) as likes,
        (SELECT COUNT(reposts.id) FROM reposts WHERE reposts."repostedPost"=posts.id) AS "repostCount",
        (SELECT COUNT(comments.id) FROM comments WHERE comments."postId"=posts.id) AS "commentCount",
        (SELECT 1 FROM likes l WHERE l."userId"=$1 AND l."postId"=posts.id LIMIT 1) AS liked
        
    FROM posts   
    JOIN users ON users.id = posts."userId"
    WHERE EXISTS (SELECT 1 FROM follows WHERE follows."followerId" = $1 AND follows."followedId" = users.id LIMIT 1) AND posts."createdAt" > $2
    GROUP BY posts."createdAt",description,"link","authorPicture","authorName","authorId",posts.id
    
    UNION
    
    SELECT
        users.id AS "authorId",
        users.name AS "authorName",
        users."profilePictureUrl" AS "authorPicture",
        posts.description,
        posts.link,
        posts.id as "postId",
        reposts."createdAt" AS "createdTime",
        reposter.name AS "reposterName",
        reposter.id AS "reposterId",
        (SELECT COUNT(likes.id) FROM likes WHERE likes."postId"=posts.id) as likes,
        (SELECT COUNT(reposts.id) FROM reposts WHERE reposts."repostedPost"=posts.id) AS "repostCount",
        (SELECT COUNT(comments.id) FROM comments WHERE comments."postId"=posts.id) AS "commentCount",
        (SELECT 1 FROM likes l WHERE l."userId"=$1 AND l."postId"=posts.id LIMIT 1) AS liked
    
    FROM posts
    JOIN reposts ON reposts."repostedPost" = posts.id 
    JOIN users ON users.id = posts."userId"
    JOIN users AS reposter ON reposts."reposterId" = reposter.id
    WHERE EXISTS (SELECT 1 FROM follows WHERE follows."followerId" = $1 AND follows."followedId" = reposter.id LIMIT 1) AND posts."createdAt" > $2
    GROUP BY reposter.id,reposter.name, reposts."createdAt",description,"link","authorPicture","authorName","authorId",posts.id
    
    ORDER BY "createdTime" DESC

    `, [ userId, lastPostTimeline]);
    
    return newPosts;
}
