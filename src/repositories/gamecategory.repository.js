const pool = require("../config/db");

async function getGameCategories(page, limit, search, sort_by, sort_order) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_game_categories($1, $2, $3, $4, $5)`;
    const values = [page, limit, search, sort_by, sort_order];
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

async function getGameCategoryById(id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_game_category_by_id($1)`;
    const values = [id];
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

async function getGameCategoryById(id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_game_category_by_id($1)`;
    const values = [id];
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

async function createGameCategory(name, slug) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM create_game_category($1, $2)`;
    const values = [name, slug];
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

async function updateGameCategory(id, name, slug) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM update_game_category($1, $2, $3) AS success`;
    const values = [id, name, slug];
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

async function deleteGameCategory(id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM delete_game_category($1) AS success`;
    const values = [id];
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

async function deleteGameCategory(id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM delete_game_category($1) AS success`;
    const values = [id];
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

async function updateGameCategoryStatus(id, status) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM update_game_category_status($1, $2) AS success`;
    const values = [id, status];
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

module.exports = {
  getGameCategories,
  getGameCategoryById,
  createGameCategory,
  updateGameCategory,
  deleteGameCategory,
  updateGameCategoryStatus,
};
