const service = require("../service/games.service");

const parseIds = (val) => {
  if (!val) return null;
  const arr = Array.isArray(val) ? val : String(val).split(",");
  const parsed = arr.map(id => parseInt(id, 10)).filter(id => !isNaN(id));
  return parsed.length ? parsed : null;
};



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
    const { id } = req.params;
    const result = await service.getGameById(id);
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
      category_id: parseIds(req.body.category_id),
      game_type_id: parseIds(req.body.game_type_id),
      device_type_id: parseIds(req.body.device_type_id),
      min_bet: req.body.min_bet ? parseFloat(req.body.min_bet) : null,
      max_bet: req.body.max_bet ? parseFloat(req.body.max_bet) : null,
      rtp: req.body.rtp ? parseFloat(req.body.rtp) : null,
      thumbnail: req.file ? req.file.path : req.body.thumbnail || null,
      public_id: req.file ? req.file.filename : null
    };

    const result = await service.createGame(payload);
    if (!result) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Create Game Failed",
        },
      });
    }
    return res.status(result.code === 0 ? 201 : 400).json({
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
    const { id, game_id } = req.body || {};
    const targetId = id || game_id;
    const games = await service.getGameById(targetId);
    if (!games) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Game not found",
        },
      });
    }
    let thumbnail = games.thumbnail;
    let public_id = games.public_id;
    if (req.file) {
      if (games.public_id) {
        await cloudinary.uploader.destroy(games.public_id);
      }
      thumbnail = req.file.path;
      public_id = req.file.filename;
    }
    const payload = {
      ...req.body,
      provider_id: req.body.provider_id
        ? parseInt(req.body.provider_id, 10)
        : null,
      category_id: parseIds(req.body.category_id),
      game_type_id: parseIds(req.body.game_type_id),
      device_type_id: parseIds(req.body.device_type_id),
      min_bet: req.body.min_bet ? parseFloat(req.body.min_bet) : null,
      max_bet: req.body.max_bet ? parseFloat(req.body.max_bet) : null,
      rtp: req.body.rtp ? parseFloat(req.body.rtp) : null,
      thumbnail: thumbnail,
      public_id: public_id,
    };
    const result = await service.updateGame(targetId, payload);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Update Game Failed",
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

async function deleteGame(req, res) {
  try {
    const { games_id, user_id } = req.body;
    const games = await service.getGameById(games_id, user_id);
    if (!games) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Games not found",
        },
      });
    }

    const result = await service.deleteGame(games_id, user_id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Delete Game Failed",
        },
      });
    }

    if (games.public_id) {
      await cloudinary.uploader.destroy(games.public_id);
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

async function updateGameStatus(req, res) {
  try {
    const { id, game_id, status, is_active } = req.body || {};
    const targetId = id || game_id;
    const newStatus = status !== undefined ? status : is_active;
    if (newStatus === undefined) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Status is required (use 'status' or 'is_active')",
        },
      });
    }
    const result = await service.updateGameStatus(targetId, newStatus);
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
