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
  updateGameCategoryStatus,
} = require("../controllers/gamecategory.controller");

router.post("/get_game_category", verifyToken, logger, getGameCategories);
router.get("/get_game_category_by_id/:id", verifyToken, logger, getGameCategoryById);
router.post("/create_game_category", verifyToken, logger, createGameCategory);
router.put("/update_game_category/:id", verifyToken, logger, updateGameCategory);
router.delete("/delete_game_category/:id", verifyToken, logger, deleteGameCategory);
router.put("/update_game_category_status/:id", verifyToken, logger, updateGameCategoryStatus);

module.exports = router;
