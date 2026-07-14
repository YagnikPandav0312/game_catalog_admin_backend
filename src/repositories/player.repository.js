const pool = require("../config/db");

async function getPlayer(page, limit, search, sort_by, sort_order, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM get_players($1, $2, $3, $4, $5, $6)`;
        const values = [page, limit, search, sort_by, sort_order, user_id];
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.error("Error fetching players:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function getPlayerById(id, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM get_player_by_id($1, $2)`;
        const values = [id, user_id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching player by ID:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function createPlayer(fullName, email, password, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM register_player($1, $2, $3, $4)`;
        const values = [fullName, email, password, user_id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating player:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}


async function updatePlayer(id, fullName, email, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM update_player($1, $2, $3, $4) AS success`;
        const values = [id, fullName, email, user_id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating player:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function deletePlayer(id, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM delete_player($1, $2) AS success`;
        const values = [id, user_id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting player:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function updatePlayerStatus(id, status, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM update_player_status($1, $2, $3) AS success`;
        const values = [id, status, user_id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating player status:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = {
    getPlayer,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
    updatePlayerStatus
};

