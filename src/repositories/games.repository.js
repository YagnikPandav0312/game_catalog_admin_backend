const pool = require("../config/db");

async function getGames(page, limit, search, sort_by, sort_order) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM get_games($1, $2, $3, $4, $5)`,
      [page, limit, search, sort_by, sort_order],
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching games:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function getGameById(id) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(`SELECT * FROM get_game_by_id($1)`, [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching game by ID:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function createGame(game) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM create_game(
$1,$2,$3,
$4,$5,$6,
$7,$8,$9,
$10,$11,$12,$13,$14
)`,
      [
        game.provider_id,
        game.category_id,
        game.game_type_id,
        game.device_type_id,
        game.game_name,
        game.slug,
        game.thumbnail,
        game.release_date,
        game.max_win,
        game.min_bet,
        game.max_bet,
        game.rtp,
        game.variance,
        game.public_id,
      ],
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating game:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function updateGame(id, game) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM update_game(
$1,$2,$3,
$4,$5,$6,
$7,$8,$9,
$10,$11,$12,
$13,$14,$15
) AS success`,
      [
        id,
        game.provider_id,
        game.category_id,
        game.game_type_id,
        game.device_type_id,
        game.game_name,
        game.slug,
        game.thumbnail,
        game.release_date,
        game.max_win,
        game.min_bet,
        game.max_bet,
        game.rtp,
        game.variance,
        game.public_id,
      ],
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting game:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function deleteGame(id, user_id) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM delete_game($1,$2) AS success`,
      [id, user_id],
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting game:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function updateGameStatus(id, status) {
  let client;
  try {
    client = await pool.connect();
    const result = await client.query(
      `SELECT * FROM update_game_status($1, $2) AS success`,
      [id, status],
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating game status:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  updateGameStatus,
};
