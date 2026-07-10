const pool = require("../config/db");

async function getGameType(page, limit, search, sort_by, sort_order, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_game_types($1, $2, $3, $4, $5, $6)`;
    const values = [page, limit, search, sort_by, sort_order, user_id];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching game types:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function getGameTypeById(id, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT * FROM get_game_type_by_id($1, $2)";
    const values = [id, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching game type by ID:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function createGameType(game_types_name, slug, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT * FROM create_game_type($1, $2, $3)";
    const values = [game_types_name, slug, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating game type:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function updateGameType(id, game_types_name, slug, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT * FROM update_game_type($1, $2, $3, $4) AS success";
    const values = [id, game_types_name, slug, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating game type:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function deleteGameType(id, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT * FROM delete_game_type($1, $2) AS success";
    const values = [id, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting game type:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function updateGameTypeStatus(id, status, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT * FROM update_game_type_status($1, $2, $3) AS success";
    const values = [id, status, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating game type status:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = {
  createGameType,
  getGameType,
  getGameTypeById,
  updateGameType,
  deleteGameType,
  updateGameTypeStatus,
};
