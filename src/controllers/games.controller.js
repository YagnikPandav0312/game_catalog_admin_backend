const service = require("../service/games.service");

async function getGames(req, res) {
    try {
        const data = await service.getGames();
        res.status(200).json({
            success: true,
            message: "Games fetched successfully",
            data
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

async function getGameById(req, res) {
    try {
        const result = await service.getGameById(req.params.id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Game not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Game fetched successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function createGame(req, res) {
    try {
        const payload = {
            ...req.body,
            provider_id: req.body.provider_id ? parseInt(req.body.provider_id, 10) : null,
            category_id: req.body.category_id ? parseInt(req.body.category_id, 10) : null,
            game_type_id: req.body.game_type_id ? parseInt(req.body.game_type_id, 10) : null,
            min_bet: req.body.min_bet ? parseFloat(req.body.min_bet) : null,
            max_bet: req.body.max_bet ? parseFloat(req.body.max_bet) : null,
            rtp: req.body.rtp ? parseFloat(req.body.rtp) : null,
            thumbnail: req.file ? req.file.path : (req.body.thumbnail || null)
        };

        const result = await service.createGame(payload);
        res.status(201).json({
            success: true,
            message: "Game Created Successfully",
            data: result
        });
    }

    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
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
                success: false,
                message: "Game not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Game Updated Successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

async function deleteGame(req, res) {
    try {
        const { id } = req.params;

        const result = await service.deleteGame(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Game not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Game Deleted Successfully",
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
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