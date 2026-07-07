const pool = require("../config/db");

async function getGameCategories() {
  const query = `SELECT * FROM get_game_categories()`;
  const result = await pool.query(query);
  return result.rows;
}

async function getGameCategoryById(id) {
  const query = `SELECT * FROM get_game_category_by_id($1)`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function createGameCategory(name, slug) {
  const query = `SELECT * FROM create_game_category($1, $2)`;
  const values = [name, slug];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateGameCategory(id, name, slug) {
  const query = `SELECT * FROM update_game_category($1, $2, $3) AS success`;
  const values = [id, name, slug];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function deleteGameCategory(id) {
  const query = `SELECT * FROM delete_game_category($1) AS success`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  getGameCategories,
  getGameCategoryById,
  createGameCategory,
  updateGameCategory,
  deleteGameCategory,
};
