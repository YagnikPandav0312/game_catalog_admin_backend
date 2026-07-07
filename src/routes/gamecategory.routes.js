const express = require("express");
const router = express.Router();
const logger = require("../middlewares/logger.middleware");
const verifyToken = require("../middlewares/auth.middleware");

const {
  getGameCategories,
  getGameCategoryById,
  createGameCategory,
  updateGameCategory,
  deleteGameCategory,
} = require("../controllers/gamecategory.controller");

router.get("/get_game_category", verifyToken, logger, getGameCategories);
router.get("/get_game_category_by_id/:id", verifyToken, logger, getGameCategoryById);
router.post("/create_game_category", verifyToken, logger, createGameCategory);
router.put("/update_game_category/:id", verifyToken, logger, updateGameCategory);
router.delete("/delete_game_category/:id", verifyToken, logger, deleteGameCategory);

module.exports = router;
