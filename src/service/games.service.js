const repo = require("../repositories/games.repository");

async function getGames() {
    return await repo.getGames();
}

async function getGameById(id) {
    return await repo.getGameById(id);
}

async function createGame(game) {
    const result = await repo.createGame(game);
    if (result.code !== 0) {
        return null;
    }
    return result;
}

async function updateGame(id, game) {
    const result = await repo.updateGame(id, game);
    if (result.code !== 0) {
        return null;
    }
    return result;
}

async function deleteGame(id) {
    const result = await repo.deleteGame(id);
    if (result.code !== 0) {
        return null;
    }
    return result;
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
};