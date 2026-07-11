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
  updateGameTypeStatus,
  getGameTypeDdl,
} = require("../controllers/gametype.controlar");

router.post("/get_game_type", verifyToken, logger, getGameType);
router.get("/get_game_type_by_id/:id", verifyToken, logger, getGameTypeById);
router.post("/create_game_type", verifyToken, logger, createGameType);
router.post("/update_game_type", verifyToken, logger, updateGameType);
router.post("/delete_game_type", verifyToken, logger, deleteGameType);
router.post("/update_game_type_status", verifyToken, logger, updateGameTypeStatus);
router.post("/get_game_type_ddl", verifyToken, logger, getGameTypeDdl);

module.exports = router;
