import connection from '../../config/database.js';

export async function search(str) {
    const { rows } = await connection.query(`
        SELECT id, name, "profilePictureUrl"
        FROM users
        WHERE name ILIKE $1
        LIMIT 2
    `, [`${str}%`]);
    return rows;
}
