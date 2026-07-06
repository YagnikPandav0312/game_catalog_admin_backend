const repo = require("../repositories/games.repository");

async function getGames() {
    return await repo.getGames();
}

async function getGameById(id) {
    return await repo.getGameById(id);
}

async function createGame(game) {
    return await repo.createGame(game);
}

async function updateGame(id, game) {
    const result = await repo.updateGame(id, game);
    if (!result.success) {
        return null;
    }
    return result.success;
}

async function deleteGame(id) {
    const result = await repo.deleteGame(id);
    if (!result.success) {
        return null;
    }
    return result.success;
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
};