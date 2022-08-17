import connection from '../../config/database.js';

export async function addFollow(followerId, followedId) {
    await connection.query(`
        INSERT INTO follows ("followerId", "followedId")
        VALUES ($1, $2)
    `, [followerId, followedId]);
    return;
}

export async function removeFollow(followerId, followedId) {
    await connection.query(`
        DELETE FROM follows
        WHERE "followerId" = $1 AND "followedId" = $2
    `, [followerId, followedId]);
    return;
}

export async function getFollows(userId) {
    const { rows } = await connection.query(`
        SELECT COUNT(id) AS follows FROM follows
        WHERE "followerId" = $1
    `, [userId]);
    return rows[0];
}
