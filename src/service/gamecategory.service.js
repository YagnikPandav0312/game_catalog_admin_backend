const gameCategoryRepo = require("../repositories/gamecategory.repository");

async function getGameCategories(page, limit, search, sort_by, sort_order, user_id) {
  const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
  const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
  const pSearch = search ? String(search) : "";
  const pSortBy = sort_by ? String(sort_by) : null;
  const pSortOrder = sort_order ? String(sort_order) : null;
  return await gameCategoryRepo.getGameCategories(pPage, pLimit, pSearch, pSortBy, pSortOrder, user_id);
}

async function getGameCategoryById(id, user_id) {
  return await gameCategoryRepo.getGameCategoryById(id, user_id);
}

async function createGameCategory(name, slug, user_id) {
  if (!name || name.trim() === "") {
    throw new Error("Game Category Name Is Required");
  }
  const result = await gameCategoryRepo.createGameCategory(name, slug, user_id);
  return result;
}

async function updateGameCategory(id, name, slug, user_id) {
  const result = await gameCategoryRepo.updateGameCategory(id, name, slug, user_id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function deleteGameCategory(id, user_id) {
  const result = await gameCategoryRepo.deleteGameCategory(id, user_id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateGameCategoryStatus(id, status, user_id) {
  return await gameCategoryRepo.updateGameCategoryStatus(id, status, user_id);
}

async function getGameCategoryDdl(user_id) {
  return await gameCategoryRepo.getGameCategoryDdl(user_id);
}

module.exports = {
  getGameCategories,
  getGameCategoryById,
  createGameCategory,
  updateGameCategory,
  deleteGameCategory,
  updateGameCategoryStatus,
  getGameCategoryDdl
};
