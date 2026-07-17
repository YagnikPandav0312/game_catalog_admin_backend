const GamesRepo = require("../repositories/games.repository");

async function getGames(page, limit, search, sort_by, sort_order) {
  try {
    const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
    const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
    const pSearch = search ? String(search) : "";
    const pSortBy = sort_by ? String(sort_by) : null;
    const pSortOrder = sort_order ? String(sort_order) : null;
    return await GamesRepo.getGames(pPage, pLimit, pSearch, pSortBy, pSortOrder);
  } catch (error) {
    throw error;
  }
}

async function getGameById(id) {
  try {
    return await GamesRepo.getGameById(id);
  } catch (error) {
    throw error;
  }
}

async function createGame(game) {
  try {
    return await GamesRepo.createGame(game);
  } catch (error) {
    throw error;
  }
}

async function updateGame(id, game) {
  try {
    return await GamesRepo.updateGame(id, game);
  } catch (error) {
    throw error;
  }
}

async function deleteGame(id,user_id) {
  try {
    return await GamesRepo.deleteGame(id,user_id);
  } catch (error) {
    throw error;
  }
}

async function updateGameStatus(id, status) {
  try {
    return await GamesRepo.updateGameStatus(id, status);
  } catch (error) {
    throw error;
  }
}

module.exports = {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    updateGameStatus
};