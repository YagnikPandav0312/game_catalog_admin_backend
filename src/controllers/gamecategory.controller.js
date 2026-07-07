const service = require("../service/gamecategory.service");

async function getGameCategories(req, res) {
  try {
    const result = await service.getGameCategories();
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Game Categories fetched successfully",
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        message: error.message
      }
    });
  }
}

async function getGameCategoryById(req, res) {
  try {
    const result = await service.getGameCategoryById(req.params.id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Game Category not found",
        }
      });
    }
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Game Category Fetched Successfully",
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        message: error.message
      }
    });
  }
}

async function createGameCategory(req, res) {
  try {
    const { game_categorie_name, slug } = req.body || {};
    const result = await service.createGameCategory(game_categorie_name, slug);
    return res.status(201).json({
      status: {
        code: result.code,
        message: result.message
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        message: error.message
      }
    });
  }
}

async function updateGameCategory(req, res) {
  try {
    const { game_categorie_name, slug } = req.body || {};
    const result = await service.updateGameCategory(req.params.id, game_categorie_name, slug);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Update Game Category Failed",
        }
      });
    }
    return res.status(200).json({
      status: {
        code: result.code,
        message: result.message
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        message: error.message
      }
    });
  }
}

async function deleteGameCategory(req, res) {
  try {
    const result = await service.deleteGameCategory(req.params.id);
    console.log(result);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Delete Game Category Failed",
        }
      });
    }
    return res.status(200).json({
      status: {
        code: result.code,
        message: result.message
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        message: error.message
      }
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
