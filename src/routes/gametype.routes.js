const express = require("express");
const router = express.Router();
const logger = require("../middlewares/logger.middleware");
const verifyToken = require("../middlewares/auth.middleware");

const {
  getGameType,
  getGameTypeById,
  createGameType,
  updateGameType,
  deleteGameType,
} = require("../controllers/gametype.controlar");

router.get("/get_game_type", verifyToken, logger, getGameType);
router.get("/get_game_type_by_id/:id", verifyToken, logger, getGameTypeById);
router.post("/create_game_type", verifyToken, logger, createGameType);
router.put("/update_game_type/:id", verifyToken, logger, updateGameType);
router.delete("/delete_game_type/:id", verifyToken, logger, deleteGameType);

module.exports = router;
