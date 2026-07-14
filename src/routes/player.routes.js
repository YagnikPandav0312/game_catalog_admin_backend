const router = require("express").Router();
const verifyToken = require("../middlewares/auth.middleware");

const {
    getPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
    updatePlayerStatus,
} = require("../controllers/player.controller");

router.post("/get_players", verifyToken, getPlayers);
router.get("/get_player_by_id/:id", verifyToken, getPlayerById);
router.post("/create_player", verifyToken, createPlayer);
router.post("/update_player", verifyToken, updatePlayer);
router.post("/delete_player", verifyToken, deletePlayer);
router.post("/update_player_status", verifyToken, updatePlayerStatus);

module.exports = router;
