const pool = require("../config/db");

async function getGameCategories(page, limit, search, sort_by, sort_order, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_game_categories($1, $2, $3, $4, $5, $6)`;
    const values = [page, limit, search, sort_by, sort_order, user_id];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching game categories:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function getGameCategoryById(id, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_game_category_by_id($1, $2)`;
    const values = [id, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching game category by ID:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function createGameCategory(name, slug, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM create_game_category($1, $2, $3)`;
    const values = [name, slug, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating game category:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function updateGameCategory(id, name, slug, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM update_game_category($1, $2, $3, $4) AS success`;
    const values = [id, name, slug, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating game category:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function deleteGameCategory(id, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM delete_game_category($1, $2) AS success`;
    const values = [id, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting game category:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function updateGameCategoryStatus(id, status, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM update_game_category_status($1, $2, $3) AS success`;
    const values = [id, status, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating game category status:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function getGameCategoryDdl(user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_game_category_ddl($1)`;
    const values = [user_id];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching game category DDL:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = {
  getGameCategories,
  getGameCategoryById,
  createGameCategory,
  updateGameCategory,
  deleteGameCategory,
  updateGameCategoryStatus,
  getGameCategoryDdl
};
