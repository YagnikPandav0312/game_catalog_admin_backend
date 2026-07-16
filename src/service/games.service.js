const GamesRepo = require("../repositories/games.repository");

async function getGames(page, limit, search, sort_by, sort_order) {
  const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
  const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
  const pSearch = search ? String(search) : "";
  const pSortBy = sort_by ? String(sort_by) : null;
  const pSortOrder = sort_order ? String(sort_order) : null;
  return await GamesRepo.getGames(pPage, pLimit, pSearch, pSortBy, pSortOrder);
}

async function getGameById(id) {
    return await GamesRepo.getGameById(id);
}

async function createGame(game) {
    return await GamesRepo.createGame(game);
}

async function updateGame(id, game) {
    return await GamesRepo.updateGame(id, game);
}

async function deleteGame(id) {
    return await GamesRepo.deleteGame(id);
}

async function updateGameStatus(id, status) {
    return await GamesRepo.updateGameStatus(id, status);
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    updateGameStatus
};