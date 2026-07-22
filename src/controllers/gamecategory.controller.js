const service = require("../service/gamecategory.service");

async function getGameCategories(req, res) {
  try {
    const { page, limit, search, sort_by, sort_order, user_id } = req.body || {};
    const result = await service.getGameCategories(page, limit, search, sort_by, sort_order, user_id);
    const totalRecords = result.length > 0 ? parseInt(result[0].total_records, 10) : 0;
    const data = result.map(({ total_records, ...rest }) => rest);
    return res.status(200).json({
      data: data,
      total_records: totalRecords,
      status: {
        code: 0,
        message: "Game Categories fetched successfully",
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      }
    });
  }
}

async function getGameCategoryById(req, res) {
  try {
    const { id } = req.params;
    const { user_id } = req.body || {};
    const result = await service.getGameCategoryById(id, user_id);
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
        error: error.message,
        message: "something went wrong",
      }
    });
  }
}

async function createGameCategory(req, res) {
  try {
    const { game_categorie_name, slug, user_id, game_type_id } = req.body || {};
    const result = await service.createGameCategory(game_categorie_name, slug, user_id,game_type_id);
    return res.status(result.code === 0 ? 201 : 400).json({
      status: {
        code: result.code,
        message: result.message
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong"
      }
    });
  }
}

async function updateGameCategory(req, res) {
  try {
    const { id, game_categorie_id, game_categorie_name, slug, user_id, game_type_id } = req.body || {};
    const targetId = id || game_categorie_id;
    const result = await service.updateGameCategory(targetId, game_categorie_name, slug, user_id, game_type_id);
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
        error: error.message,
        message: "something went wrong"
      }
    });
  }
}

async function deleteGameCategory(req, res) {
  try {
    const { id, game_categorie_id, user_id } = req.body || {};
    const targetId = id || game_categorie_id;
    const result = await service.deleteGameCategory(targetId, user_id);
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
        error: error.message,
        message: "something went wrong"
      }
    });
  }
}

async function updateGameCategoryStatus(req, res) {
  try {
    const { id, game_categorie_id, status, is_active, user_id } = req.body || {};
    const targetId = id || game_categorie_id;
    const newStatus = status !== undefined ? status : is_active;
    if (newStatus === undefined) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Status is required (use 'status' or 'is_active')"
        }
      });
    }
    const result = await service.updateGameCategoryStatus(targetId, newStatus, user_id);
    if (!result) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Update Game Category Status Failed"
        }
      });
    }
    return res.status(result.code === 0 ? 200 : 400).json({
      status: {
        code: result.code,
        message: result.message
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong"
      }
    });
  }
}

async function getGameCategoryDdl(req, res) {
  try {
    const { user_id } = req.body || {};
    const result = await service.getGameCategoryDdl(user_id);
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Game Category DDL Fetched Successfully",
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong"
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
  updateGameCategoryStatus,
  getGameCategoryDdl
};
