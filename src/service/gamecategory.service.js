const gameCategoryRepo = require("../repositories/gamecategory.repository");

async function getGameCategories() {
  return await gameCategoryRepo.getGameCategories();
}

async function getGameCategoryById(id) {
  return await gameCategoryRepo.getGameCategoryById(id);
}

async function createGameCategory(name, slug) {
  if (!name || name.trim() === "") {
    throw new Error("Game Category Name Is Required");
  }
  return await gameCategoryRepo.createGameCategory(name, slug);
}

async function updateGameCategory(id, name, slug) {
  const result = await gameCategoryRepo.updateGameCategory(id, name, slug);
  if (!result.success) {
    return null;
  }
  return result;
}

async function deleteGameCategory(id) {
  const result = await gameCategoryRepo.deleteGameCategory(id);
  if (!result.success) {
    return null;
  }
  return result;
}

module.exports = {
  getGameCategories,
  getGameCategoryById,
  createGameCategory,
  updateGameCategory,
  deleteGameCategory,
};
