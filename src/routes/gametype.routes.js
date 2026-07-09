const express = require("express");
const router = express.Router();
const logger = require("../middlewares/logger.middleware");
const verifyToken = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  getGameType,
  getGameTypeById,
  createGameType,
  updateGameType,
  deleteGameType,
  updateGameTypeStatus,
} = require("../controllers/gametype.controlar");

router.post("/get_game_type", verifyToken, logger, getGameType);
router.get("/get_game_type_by_id/:id", verifyToken, logger, getGameTypeById);
router.post("/create_game_type", verifyToken, validate("game_types_name"), logger, createGameType);
router.put("/update_game_type/:id", verifyToken, validate("game_types_name"), logger, updateGameType);
router.delete("/delete_game_type/:id", verifyToken, logger, deleteGameType);
router.put("/update_game_type_status/:id", verifyToken, logger, updateGameTypeStatus);

module.exports = router;
