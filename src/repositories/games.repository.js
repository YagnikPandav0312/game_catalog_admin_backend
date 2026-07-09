const pool = require("../config/db");

async function getGames(page, limit, search) {
    const result = await pool.query(
        `SELECT * FROM get_games($1, $2, $3)`,
        [page, limit, search]
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
        `SELECT * FROM create_game(
$1,$2,$3,
$4,$5,$6,
$7,$8,$9,
$10,$11,$12,$13
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
            game.variance
        ]
    );
    return result.rows[0];
}

async function updateGame(id, game) {
    const result = await pool.query(
        `SELECT * FROM update_game(
$1,$2,$3,
$4,$5,$6,
$7,$8,$9,
$10,$11,$12,
$13,$14
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
            game.variance
        ]
    );
    return result.rows[0];
}

async function deleteGame(id) {
    const result = await pool.query(
        `SELECT * FROM delete_game($1) AS success`,
        [id]
    );
    return result.rows[0];
}

async function updateGameStatus(id, status) {
    const result = await pool.query(
        `SELECT * FROM update_game_status($1, $2) AS success`,
        [id, status]
    );
    return result.rows[0];
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    updateGameStatus
};