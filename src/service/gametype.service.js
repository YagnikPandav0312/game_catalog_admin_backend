const gameTypeRepo = require("../repositories/gametype.repository");

async function getGameType(page, limit, search, sort_by, sort_order, user_id) {
  const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
  const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
  const pSearch = search ? String(search) : "";
  const pSortBy = sort_by ? String(sort_by) : null;
  const pSortOrder = sort_order ? String(sort_order) : null;
  return await gameTypeRepo.getGameType(pPage, pLimit, pSearch, pSortBy, pSortOrder, user_id);
}

async function getGameTypeById(game_type_id, user_id) {
  return await gameTypeRepo.getGameTypeById(game_type_id, user_id);
}

async function createGameType(game_types_name, slug, user_id) {
  if (!game_types_name || game_types_name.trim() === "") {
    throw new Error("Game Types Name Is Required");
  }
  const result = await gameTypeRepo.createGameType(game_types_name, slug, user_id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateGameType(id, game_types_name, slug, user_id) {
  const result = await gameTypeRepo.updateGameType(id, game_types_name, slug, user_id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function deleteGameType(id, user_id) {
  const result = await gameTypeRepo.deleteGameType(id, user_id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateGameTypeStatus(id, status, user_id) {
  return await gameTypeRepo.updateGameTypeStatus(id, status, user_id);
}

async function getGameTypeDdl(user_id) {
  return await gameTypeRepo.getGameTypeDdl(user_id);
}

module.exports = {
  createGameType,
  getGameType,
  getGameTypeById,
  updateGameType,
  deleteGameType,
  updateGameTypeStatus,
  getGameTypeDdl,
};
