const gameTypeRepo = require("../repositories/gametype.repository");

async function getGameType(page, limit, search, sort_by, sort_order) {
  const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
  const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
  const pSearch = search ? String(search) : "";
  const pSortBy = sort_by ? String(sort_by) : null;
  const pSortOrder = sort_order ? String(sort_order) : null;
  return await gameTypeRepo.getGameType(pPage, pLimit, pSearch, pSortBy, pSortOrder);
}

async function getGameTypeById(game_type_id) {
  return await gameTypeRepo.getGameTypeById(game_type_id);
}

async function createGameType(game_types_name, slug) {
  if (!game_types_name || game_types_name.trim() === "") {
    throw new Error("Game Types Name Is Required");
  }
  const result = await gameTypeRepo.createGameType(game_types_name, slug);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateGameType(id, game_types_name, slug) {
  const result = await gameTypeRepo.updateGameType(id, game_types_name, slug);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function deleteGameType(id) {
  const result = await gameTypeRepo.deleteGameType(id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateGameTypeStatus(id, status) {
  return await gameTypeRepo.updateGameTypeStatus(id, status);
}

module.exports = {
  createGameType,
  getGameType,
  getGameTypeById,
  updateGameType,
  deleteGameType,
  updateGameTypeStatus,
};
