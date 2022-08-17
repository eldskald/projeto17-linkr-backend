import connection from '../../config/database.js';

export async function search(str, userId) {
    const { rows } = await connection.query(`
        SELECT users.id, users.name, "profilePictureUrl",
            EXISTS (SELECT 1 FROM follows f WHERE f."followerId"=$2 AND f."followedId"=users.id) AS following
        FROM users
        WHERE name ILIKE $1
        ORDER BY following DESC
        LIMIT 2
    `, [`${str}%`, userId]);
    return rows;
}
