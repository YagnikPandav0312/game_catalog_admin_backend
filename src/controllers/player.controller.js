const playerService = require("../service/player.service");
const { validate } = require("../utils/schemaValidation");
const {
  getPlayer: getPlayerSchema,
  getPlayerById: getPlayerByIdSchema,
  createPlayer: createPlayerSchema,
  updatePlayer: updatePlayerSchema,
  deletePlayer: deletePlayerSchema,
  updatePlayerStatus: updatePlayerStatusSchema,
} = require("../utils/validation");

async function getPlayers(req, res) {
    try {
        const validationError = await validate(req.body, getPlayerSchema);
        if (validationError) {
            return res.status(400).json({
                status: {
                    code: 3,
                    message: validationError,
                },
            });
        }
        const { page, limit, search, sort_by, sort_order, user_id } = req.body || {};
        const result = await playerService.getPlayers(
            page,
            limit,
            search,
            sort_by,
            sort_order,
            user_id,
        );

        const totalRecords = result.length > 0 ? parseInt(result[0].total_records, 10) : 0;
        const data = result.map(({ total_records, ...rest }) => rest);

        return res.status(200).json({
            data: data,
            total_records: totalRecords,
            status: {
                code: 0,
                message: "Players Fetched Successfully",
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: {
                code: 2,
                error: error.message,
                message: "something went wrong"
            }
        })
    }
}

async function getPlayerById(req, res) {
    try {
        const { id } = req.params;
        const { user_id } = req.body || {};
        const validationError = await validate({ id, user_id }, getPlayerByIdSchema);
        if (validationError) {
            return res.status(400).json({
                status: {
                    code: 3,
                    message: validationError,
                },
            });
        }
        const result = await playerService.getPlayerById(id, user_id);
        if (!result) {
            return res.status(404).json({
                status: {
                    code: 1,
                    message: "Player Not Found",
                },
            });
        }
        return res.status(200).json({
            data: result,
            status: {
                code: 0,
                message: "Player Fetched Successfully",
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: {
                code: 2,
                error: error.message,
                message: "something went wrong"
            }
        })
    }
}

async function createPlayer(req, res) {
    try {
        const validationError = await validate(req.body, createPlayerSchema);
        if (validationError) {
            return res.status(400).json({
                status: {
                    code: 3,
                    message: validationError,
                },
            });
        }
        const { first_name, last_name, full_name, email, mobile, password, user_id } = req.body || {};
        const result = await playerService.createPlayer(first_name, last_name, email, mobile, user_id, password, full_name);
        if (!result) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: "Create Player Failed",
                },
            });
        }
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
                message: "something went wrong"
            }
        })
    }
}

async function updatePlayer(req, res) {
    try {
        const validationError = await validate(req.body, updatePlayerSchema);
        if (validationError) {
            return res.status(400).json({
                status: {
                    code: 3,
                    message: validationError,
                },
            });
        }
        const { id, player_id, first_name, last_name, full_name, email, mobile, user_id } = req.body || {};
        const targetId = id || player_id;
        const result = await playerService.updatePlayer(
            targetId,
            first_name,
            last_name,
            email,
            mobile,
            user_id,
            full_name
        );
        if (!result) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: "Update Player Failed",
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
                message: "something went wrong"
            }
        })
    }
}

async function deletePlayer(req, res) {
    try {
        const validationError = await validate(req.body, deletePlayerSchema);
        if (validationError) {
            return res.status(400).json({
                status: {
                    code: 3,
                    message: validationError,
                },
            });
        }
        const { id, player_id, user_id } = req.body || {};
        const targetId = id || player_id;
        const result = await playerService.deletePlayer(targetId, user_id);
        if (!result) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: "Delete Player Failed",
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
                message: "something went wrong"
            }
        })
    }
}

async function updatePlayerStatus(req, res) {
    try {
        const validationError = await validate(req.body, updatePlayerStatusSchema);
        if (validationError) {
            return res.status(400).json({
                status: {
                    code: 3,
                    message: validationError,
                },
            });
        }
        const { id, player_id, status, is_active, user_id } = req.body || {};
        const targetId = id || player_id;
        const newStatus = status !== undefined ? status : is_active;
        if (newStatus === undefined) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: "Status is required (use 'status' or 'is_active')",
                },
            });
        }
        const result = await playerService.updatePlayerStatus(targetId, newStatus, user_id);
        if (!result) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: "Update Player Status Failed",
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
                message: "something went wrong"
            }
        })
    }
}

module.exports = {
    getPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
    updatePlayerStatus,
}