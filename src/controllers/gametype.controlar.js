const service = require("../service/gametype.service");
const { validate } = require("../utils/schemaValidation");
const {
  getGameType: getGameTypeSchema,
  getGameTypeById: getGameTypeByIdSchema,
  createGameType: createGameTypeSchema,
  updateGameType: updateGameTypeSchema,
  deleteGameType: deleteGameTypeSchema,
  updateGameTypeStatus: updateGameTypeStatusSchema,
  getGameTypeDdl: getGameTypeDdlSchema,
} = require("../utils/validation");

async function getGameType(req, res) {
  try {
    const validationError = await validate(req.body, getGameTypeSchema);
    if (validationError) {
      return res.status(400).json({
        status: {
          code: 3,
          message: validationError,
        },
      });
    }
    const { page, limit, search, sort_by, sort_order, user_id } = req.body || {};
    const result = await service.getGameType(
      page,
      limit,
      search,
      sort_by,
      sort_order,
      user_id,
    );
    const totalRecords =
      result.length > 0 ? parseInt(result[0].total_records, 10) : 0;
    const data = result.map(({ total_records, ...rest }) => rest);
    return res.status(200).json({
      data: data,
      total_records: totalRecords,
      status: {
        code: 0,
        message: "GameType Fetched successfully",
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function getGameTypeById(req, res) {
  try {
    const { id } = req.params;
    const { user_id } = req.body || {};
    const validationError = await validate({ id, user_id }, getGameTypeByIdSchema);
    if (validationError) {
      return res.status(400).json({
        status: {
          code: 3,
          message: validationError,
        },
      });
    }
    const result = await service.getGameTypeById(id, user_id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "GameType not found",
        },
      });
    }
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Game Type Fetched Successfully",
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function createGameType(req, res) {
  try {
    const validationError = await validate(req.body, createGameTypeSchema);
    if (validationError) {
      return res.status(400).json({
        status: {
          code: 3,
          message: validationError,
        },
      });
    }
    const { game_types_name, slug, user_id } = req.body || {};
    const result = await service.createGameType(game_types_name, slug, user_id);
    return res.status(201).json({
      status: {
        code: result.code,
        message: result.message,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function updateGameType(req, res) {
  try {
    const validationError = await validate(req.body, updateGameTypeSchema);
    if (validationError) {
      return res.status(400).json({
        status: {
          code: 3,
          message: validationError,
        },
      });
    }
    const { id, game_type_id, game_types_name, slug, user_id } = req.body || {};
    const targetId = id || game_type_id;
    const result = await service.updateGameType(
      targetId,
      game_types_name,
      slug,
      user_id,
    );
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Update Game Type Failed",
        },
      });
    }
    return res.status(200).json({
      status: {
        code: result.code,
        message: result.message,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function deleteGameType(req, res) {
  try {
    const validationError = await validate(req.body, deleteGameTypeSchema);
    if (validationError) {
      return res.status(400).json({
        status: {
          code: 3,
          message: validationError,
        },
      });
    }
    const { id, game_type_id, user_id } = req.body || {};
    const targetId = id || game_type_id;
    const result = await service.deleteGameType(targetId, user_id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Delete Game Type Failed",
        },
      });
    }
    return res.status(200).json({
      status: {
        code: result.code,
        message: result.message,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function updateGameTypeStatus(req, res) {
  try {
    const validationError = await validate(req.body, updateGameTypeStatusSchema);
    if (validationError) {
      return res.status(400).json({
        status: {
          code: 3,
          message: validationError,
        },
      });
    }
    const { id, game_type_id, status, is_active, user_id } = req.body || {};
    const targetId = id || game_type_id;
    const newStatus = status !== undefined ? status : is_active;
    if (newStatus === undefined) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Status is required (use 'status' or 'is_active')",
        },
      });
    }
    const result = await service.updateGameTypeStatus(targetId, newStatus, user_id);
    if (!result) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Update Game Type Status Failed",
        },
      });
    }
    return res.status(result.code === 0 ? 200 : 400).json({
      status: {
        code: result.code,
        message: result.message,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function getGameTypeDdl(req, res) {
  try {
    const validationError = await validate(req.body, getGameTypeDdlSchema);
    if (validationError) {
      return res.status(400).json({
        status: {
          code: 3,
          message: validationError,
        },
      });
    }
    const { user_id } = req.body || {};
    const result = await service.getGameTypeDdl(user_id);
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "GameType DDL Fetched Successfully",
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
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
  getGameTypeDdl,
};
