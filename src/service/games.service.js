const GamesRepo = require("../repositories/games.repository");

async function getGames(page, limit, search, sort_by, sort_order, user_id) {
  const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
  const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
  const pSearch = search ? String(search) : "";
  const pSortBy = sort_by ? String(sort_by) : null;
  const pSortOrder = sort_order ? String(sort_order) : null;
  return await GamesRepo.getGames(pPage, pLimit, pSearch, pSortBy, pSortOrder, user_id);
}

async function getGameById(id, user_id) {
    return await GamesRepo.getGameById(id, user_id);
}

async function createGame(game) {
    const result = await GamesRepo.createGame(game);
    if (result.code !== 0) {
        return null;
    }
    return result;
}

async function updateGame(id, game) {
    const result = await GamesRepo.updateGame(id, game);
    if (result.code !== 0) {
        return null;
    }
    return result;
}

async function deleteGame(id, user_id) {
    const result = await GamesRepo.deleteGame(id, user_id);
    if (result.code !== 0) {
        return null;
    }
    return result;
}

async function updateGameStatus(id, status, user_id) {
    return await GamesRepo.updateGameStatus(id, status, user_id);
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    updateGameStatus
};