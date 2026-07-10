const router = require("express").Router();
const logger = require("../middlewares/logger.middleware");
const upload = require("../middlewares/upload.middleware");
const verifyToken = require("../middlewares/auth.middleware");

const {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame,
    updateGameStatus
} = require("../controllers/games.controller");

router.post("/get_game", verifyToken, logger, getGames);
router.get("/get_game_by_id/:id", verifyToken, logger, getGameById);
router.post("/create_game", verifyToken, upload.single("thumbnail"), logger, createGame);
router.post("/update_game", verifyToken, upload.single("thumbnail"), logger, updateGame);
router.post("/delete_game", verifyToken, logger, deleteGame);
router.post("/update_game_status", verifyToken, logger, updateGameStatus);

module.exports = router;
