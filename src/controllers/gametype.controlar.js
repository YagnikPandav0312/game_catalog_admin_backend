const service = require("../service/gametype.service");

async function getGameType(req, res) {
  try {
    const { page, limit, search } = req.body || {};
    const result = await service.getGameType(page, limit, search);
    const totalRecords = result.length > 0 ? parseInt(result[0].total_records, 10) : 0;
    const data = result.map(({ total_records, ...rest }) => rest);
    return res.status(200).json({
      data: data,
      total_records: totalRecords,
      status: {
        code: 0,
        message: "GameType Fetched successfully",
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

async function getGameTypeById(req, res) {
  try {
    const result = await service.getGameTypeById(req.params.id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "GameType not found",
        }
      });
    }
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Game Type Fetched Successfully",
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

async function createGameType(req, res) {
  try {
    const { game_types_name, slug } = req.body || {};
    const result = await service.createGameType(game_types_name, slug);
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

async function updateGameType(req, res) {
  try {
    const { game_types_name, slug } = req.body || {};
    const result = await service.updateGameType(req.params.id, game_types_name, slug);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Update Game Type Failed",
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

async function deleteGameType(req, res) {
  try {
    const result = await service.deleteGameType(req.params.id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Delete Game Type Failed",
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

async function updateGameTypeStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, is_active } = req.body || {};
    const newStatus = status !== undefined ? status : is_active;
    if (newStatus === undefined) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Status is required (use 'status' or 'is_active')"
        }
      });
    }
    const result = await service.updateGameTypeStatus(id, newStatus);
    if (!result) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Update Game Type Status Failed"
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
        message: error.message
      }
    });
  }
}

module.exports = {
  createGameType,
  getGameType,
  getGameTypeById,
  updateGameType,
  deleteGameType,
  updateGameTypeStatus,
};
