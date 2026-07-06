const router = require("express").Router();
const logger = require("../middlewares/logger.middleware");
const upload = require("../middlewares/upload.middleware");

const {
    getGames,
    getGameById,
    createGame,
    updateGame,
    deleteGame
} = require("../controllers/games.controller");

router.get("/get_game", logger, getGames);
router.get("/get_game_by_id/:id", logger, getGameById);
router.post("/create_game", upload.single("thumbnail"), logger, createGame);
router.put("/update_game/:id", upload.single("thumbnail"), logger, updateGame);
router.delete("/delete_game/:id", logger, deleteGame);

module.exports = router;
