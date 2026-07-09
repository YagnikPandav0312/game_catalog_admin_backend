const pool = require("../config/db");

async function getGameType(page, limit, search) {
  const query = `SELECT * FROM get_game_types($1, $2, $3)`;
  const values = [page, limit, search];
  const result = await pool.query(query, values);
  return result.rows;
}

async function getGameTypeById(id) {
  const query = "SELECT * FROM get_game_type_by_id($1)";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function createGameType(game_types_name, slug) {
  const query = "SELECT * FROM create_game_type($1, $2)";
  const values = [game_types_name, slug];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateGameType(id, game_types_name, slug) {
  const query = "SELECT * FROM update_game_type($1, $2, $3) AS success";
  const values = [id, game_types_name, slug];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function deleteGameType(id) {
  const query = "SELECT * FROM delete_game_type($1) AS success";
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  createGameType,
  getGameType,
  getGameTypeById,
  updateGameType,
  deleteGameType,
};
