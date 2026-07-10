const service = require("../service/games.service");

async function getGames(req, res) {
  try {
    const { page, limit, search, sort_by, sort_order } = req.body || {};
    const result = await service.getGames(page, limit, search, sort_by, sort_order);
    const totalRecords =
      result.length > 0 ? parseInt(result[0].total_records, 10) : 0;
    const data = result.map(({ total_records, ...rest }) => rest);
    res.status(200).json({
      data: data,
      total_records: totalRecords,
      status: {
        code: 0,
        message: "Games fetched successfully",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 2,
        message: error.message,
      },
    });
  }
}

async function getGameById(req, res) {
  try {
    const result = await service.getGameById(req.params.id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Game not found",
        },
      });
    }

    res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Game fetched successfully",
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

async function createGame(req, res) {
  try {
    const payload = {
      ...req.body,
      provider_id: req.body.provider_id
        ? parseInt(req.body.provider_id, 10)
        : null,
      category_id: req.body.category_id
        ? parseInt(req.body.category_id, 10)
        : null,
      game_type_id: req.body.game_type_id
        ? parseInt(req.body.game_type_id, 10)
        : null,
      device_type_id: req.body.device_type_id
        ? parseInt(req.body.device_type_id, 10)
        : null,
      min_bet: req.body.min_bet ? parseFloat(req.body.min_bet) : null,
      max_bet: req.body.max_bet ? parseFloat(req.body.max_bet) : null,
      rtp: req.body.rtp ? parseFloat(req.body.rtp) : null,
      thumbnail: req.file ? req.file.path : req.body.thumbnail || null,
    };

    const result = await service.createGame(payload);
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

async function updateGame(req, res) {
  try {
    const { id } = req.params;
    const payload = {
      ...req.body,
      provider_id: req.body.provider_id
        ? parseInt(req.body.provider_id, 10)
        : null,
      category_id: req.body.category_id
        ? parseInt(req.body.category_id, 10)
        : null,
      game_type_id: req.body.game_type_id
        ? parseInt(req.body.game_type_id, 10)
        : null,
      device_type_id: req.body.device_type_id
        ? parseInt(req.body.device_type_id, 10)
        : null,
      min_bet: req.body.min_bet ? parseFloat(req.body.min_bet) : null,
      max_bet: req.body.max_bet ? parseFloat(req.body.max_bet) : null,
      rtp: req.body.rtp ? parseFloat(req.body.rtp) : null,
      thumbnail: req.file ? req.file.path : req.body.thumbnail || null,
    };

    const result = await service.updateGame(id, payload);

    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Update Game Failed",
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

async function deleteGame(req, res) {
  try {
    const { id } = req.params;

    const result = await service.deleteGame(id);

    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Delete Game Failed",
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

async function updateGameStatus(req, res) {
  try {
    const { id } = req.params;
    const { status, is_active } = req.body || {};
    const newStatus = status !== undefined ? status : is_active;
    if (newStatus === undefined) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Status is required (use 'status' or 'is_active')",
        },
      });
    }
    const result = await service.updateGameStatus(id, newStatus);
    if (!result) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Update Game Status Failed",
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

module.exports = {
  getGames,
  getGameById,
  createGame,
  updateGame,
  deleteGame,
  updateGameStatus,
};
