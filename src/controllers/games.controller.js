const service = require("../service/games.service");

async function getGames(req, res) {
    try {
        const result = await service.getGames();
        res.status(200).json({
            data: result,
            status: {
                code: 0,
                message: "Games fetched successfully",
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: {
                code: 2,
                message: error.message
            }
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
                }
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
                message: error.message
            }
        })
    }
}

async function createGame(req, res) {
    try {
        const payload = {
            ...req.body,
            provider_id: req.body.provider_id ? parseInt(req.body.provider_id, 10) : null,
            category_id: req.body.category_id ? parseInt(req.body.category_id, 10) : null,
            game_type_id: req.body.game_type_id ? parseInt(req.body.game_type_id, 10) : null,
            device_type_id: req.body.device_type_id ? parseInt(req.body.device_type_id, 10) : null,
            min_bet: req.body.min_bet ? parseFloat(req.body.min_bet) : null,
            max_bet: req.body.max_bet ? parseFloat(req.body.max_bet) : null,
            rtp: req.body.rtp ? parseFloat(req.body.rtp) : null,
            thumbnail: req.file ? req.file.path : (req.body.thumbnail || null)
        };

        const result = await service.createGame(payload);
        return res.status(201).json({
            status: {
                code: result.code,
                message: result.message
            }
        });
    }

    catch (error) {
        return res.status(500).json({
            status: {
                code: 2,
                message: error.message
            }
        });
    }
}

async function updateGame(req, res) {
    try {
        const { id } = req.params;
        const payload = {
            ...req.body,
            provider_id: req.body.provider_id ? parseInt(req.body.provider_id, 10) : null,
            category_id: req.body.category_id ? parseInt(req.body.category_id, 10) : null,
            game_type_id: req.body.game_type_id ? parseInt(req.body.game_type_id, 10) : null,
            device_type_id: req.body.device_type_id ? parseInt(req.body.device_type_id, 10) : null,
            min_bet: req.body.min_bet ? parseFloat(req.body.min_bet) : null,
            max_bet: req.body.max_bet ? parseFloat(req.body.max_bet) : null,
            rtp: req.body.rtp ? parseFloat(req.body.rtp) : null,
            thumbnail: req.file ? req.file.path : (req.body.thumbnail || null)
        };

        const result = await service.updateGame(
            id,
            payload
        );

        if (!result) {
            return res.status(404).json({
                status: {
                    code: 1,
                    message: "Update Game Failed",
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

async function deleteGame(req, res) {
    try {
        const { id } = req.params;

        const result = await service.deleteGame(id);

        if (!result) {
            return res.status(404).json({
                status: {
                    code: 1,
                    message: "Delete Game Failed",
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
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
};