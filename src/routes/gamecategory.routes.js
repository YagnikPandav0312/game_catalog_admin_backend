const express = require("express");
const router = express.Router();
const logger = require("../middlewares/logger.middleware");

const {
  getGameCategories,
  getGameCategoryById,
  createGameCategory,
  updateGameCategory,
  deleteGameCategory,
} = require("../controllers/gamecategory.controller");

router.get("/get_game_category", logger, getGameCategories);
router.get("/get_game_category_by_id/:id", logger, getGameCategoryById);
router.post("/create_game_category", logger, createGameCategory);
router.put("/update_game_category/:id", logger, updateGameCategory);
router.delete("/delete_game_category/:id", logger, deleteGameCategory);

module.exports = router;
