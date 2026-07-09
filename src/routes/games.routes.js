const router = require("express").Router();
const logger = require("../middlewares/logger.middleware");
const upload = require("../middlewares/upload.middleware");
const verifyToken = require("../middlewares/auth.middleware");

const {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} = require("../controllers/games.controller");

router.post("/get_game", verifyToken, logger, getGames);
router.get("/get_game_by_id/:id", verifyToken, logger, getGameById);
router.post("/create_game", verifyToken, upload.single("thumbnail"), logger, createGame);
router.put("/update_game/:id", verifyToken, upload.single("thumbnail"), logger, updateGame);
router.delete("/delete_game/:id", verifyToken, logger, deleteGame);

module.exports = router;
