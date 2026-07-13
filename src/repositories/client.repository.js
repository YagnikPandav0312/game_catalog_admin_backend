const pool = require("../config/db");

async function getGames() {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM get_client_games()`;
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching dashboard statistics:", error);
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function getProviders() {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM get_client_providers()`;
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching dashboard statistics:", error);
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function getCategories() {
    let client;
    try {
        client = await pool.connect();
        const query = `SELECT * FROM get_client_categories()`;
        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error("Error fetching dashboard statistics:", error);
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = {
    getGames,
    getProviders,
    getCategories
};
