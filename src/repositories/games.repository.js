const pool = require("../config/db");

async function getGames() {
    const result = await pool.query(
        `SELECT * FROM get_games()`
    );
    return result.rows;
}

async function getGameById(id) {
    const result = await pool.query(
        `SELECT * FROM get_game_by_id($1)`,
        [id]
    );
    return result.rows[0];
}

async function createGame(game) {
    const result = await pool.query(
        `SELECT create_game(
$1,$2,
$3,$4,$5,
$6,$7,$8,
$9,$10,$11
) AS game_id`,
        [
            game.provider_id,
            game.game_type_id,
            game.game_name,
            game.slug,
            game.thumbnail,
            game.release_date,
            game.max_win,
            game.min_bet,
            game.max_bet,
            game.rtp,
            game.variance
        ]
    );
    return result.rows[0];
}

async function updateGame(id, game) {
    const result = await pool.query(
        `SELECT update_game(
$1,$2,$3,
$4,$5,$6,
$7,$8,$9,
$10,$11,$12
) AS success`,
        [
            id,
            game.provider_id,
            game.game_type_id,
            game.game_name,
            game.slug,
            game.thumbnail,
            game.release_date,
            game.max_win,
            game.min_bet,
            game.max_bet,
            game.rtp,
            game.variance
        ]
    );
    return result.rows[0];
}

async function deleteGame(id) {
    const result = await pool.query(
        `SELECT delete_game($1) AS success`,
        [id]
    );
    return result.rows[0];
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
};