const pool = require("../config/db");

async function getSports(page, limit, search, sort_by, sort_order, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM get_sports($1, $2, $3, $4, $5, $6)`;
        const values = [page, limit, search, sort_by, sort_order, user_id];
        const result = await client.query(query, values);
        return result.rows;
    } catch (error) {
        console.error("Error fetching sports:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function getSportById(id, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM get_sport_by_id($1, $2)`;
        const values = [id, user_id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching sport by ID:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}


async function createSport(sport_name, slug, logo, public_id, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM create_sport($1, $2, $3, $4, $5)`;
        const values = [sport_name, slug, logo, public_id, user_id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error creating sport:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function updateSport(id, name, slug, logo, public_id, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM update_sport($1, $2, $3, $4, $5, $6)`;
        const values = [id, name, slug, logo, user_id, public_id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating sport:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function deleteSport(id, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM delete_sport($1, $2)`;
        const values = [id, user_id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error deleting sport:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function updateSportStatus(id, status, user_id) {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM update_sport_status($1, $2, $3)`;
        const values = [id, status, user_id];
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error updating sport status:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = {
    getSports,
    getSportById,
    createSport,
    updateSport,
    deleteSport,
    updateSportStatus
}