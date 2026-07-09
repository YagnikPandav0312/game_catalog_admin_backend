const pool = require("../config/db");

async function getGameType(page, limit, search, sort_by, sort_order) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_game_types($1, $2, $3, $4, $5)`;
    const values = [page, limit, search, sort_by, sort_order];
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

async function getGameTypeById(id) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT * FROM get_game_type_by_id($1)";
    const values = [id];
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

async function createGameType(game_types_name, slug) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT * FROM create_game_type($1, $2)";
    const values = [game_types_name, slug];
    const result = await client.query(query, values);
  } catch (error) {
    console.error("Error creating game type:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
  return result.rows[0];
}

async function updateGameType(id, game_types_name, slug) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT * FROM update_game_type($1, $2, $3) AS success";
    const values = [id, game_types_name, slug];
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

async function deleteGameType(id) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT * FROM delete_game_type($1) AS success";
    const values = [id];
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

async function updateGameTypeStatus(id, status) {
  let client;
  try {
    client = await pool.connect();
    const query = "SELECT * FROM update_game_type_status($1, $2) AS success";
    const values = [id, status];
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
