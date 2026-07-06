const service = require("../service/gamecategory.service");

async function getGameCategories(req, res) {
  try {
    const result = await service.getGameCategories();
    return res.status(200).json({
      success: true,
      data: result,
      message: "Game Categories fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getGameCategoryById(req, res) {
  try {
    const result = await service.getGameCategoryById(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Game Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Game Category Fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function createGameCategory(req, res) {
  try {
    const { game_categorie_name, slug } = req.body || {};
    const result = await service.createGameCategory(game_categorie_name, slug);
    return res.status(200).json({
      success: true,
      message: "Game Category Created Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateGameCategory(req, res) {
  try {
    const { game_categorie_name, slug } = req.body || {};
    const result = await service.updateGameCategory(req.params.id, game_categorie_name, slug);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Update Game Category Failed",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Updated Game Category Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteGameCategory(req, res) {
  try {
    const result = await service.deleteGameCategory(req.params.id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Delete Game Category Failed",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Deleted Game Category Successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getGameCategories,
  getGameCategoryById,
  createGameCategory,
  updateGameCategory,
  deleteGameCategory,
};
