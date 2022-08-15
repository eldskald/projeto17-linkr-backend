import connection from "../../config/database.js";

async function getPost(postId){

    const {rows:post} = await connection.query(`
        SELECT * 
        FROM posts
        WHERE posts.id = $1
    `, [postId])
    return post[0];
}

// async function editPost(description, postId){

    
//     await connection.query(`
//         UPDATE  posts
//         SET description = $1  
//         WHERE posts.id = $2`
//     , [description, postId])
// }

function findHashtags(text) {
    const words = text.split(' ');
    const hashtags = [];
    for (const word of words) {
        const regex = /^\#[a-zA-Z0-9_]+$/;
        if (regex.test(word)) hashtags.push(word.slice(1));
    }
    return hashtags;
}

export async function teste(postId, description, hashtags) {
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
        DELETE FROM "postsHashtags"
        WHERE "postId" = $1`
        , [postId])

    await connection.query(`
        INSERT INTO "postsHashtags" ("postId", "hashtagId")
        VALUES ${nextValues.join(',\n')}
    `, []);

    await connection.query(`
        UPDATE  posts
        SET description = $1  
        WHERE posts.id = $2`
    , [description, postId])

    return;
}

export const editionRepository ={
    getPost,
    // editPost,
    findHashtags,
    teste
}
