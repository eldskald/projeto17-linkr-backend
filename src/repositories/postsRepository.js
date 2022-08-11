import connection from '../../config/database.js';

export async function getPosts(limit, offset) {
    const { rows } = await connection.query(`
        SELECT * FROM posts
        ORDER BY "createdAt" DESC
        LIMIT $1 OFFSET $2
    `, [limit, offset]);
    return rows;
}

