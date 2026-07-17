const router = require("express").Router();
const logger = require("../middlewares/logger.middleware");
const verifyToken = require("../middlewares/auth.middleware");

const {
  getGameCategories,
  getGameCategoryById,
  createGameCategory,
  updateGameCategory,
  deleteGameCategory,
  updateGameCategoryStatus,
  getGameCategoryDdl
} = require("../controllers/gamecategory.controller");

router.post("/get_game_category", verifyToken, logger, getGameCategories);
router.get("/get_game_category_by_id/:id", verifyToken, logger, getGameCategoryById);
router.post("/create_game_category", verifyToken, logger, createGameCategory);
router.post("/update_game_category", verifyToken, logger, updateGameCategory);
router.post("/delete_game_category", verifyToken, logger, deleteGameCategory);
router.post("/update_game_category_status", verifyToken, logger, updateGameCategoryStatus);
router.post("/get_game_category_ddl", verifyToken, logger, getGameCategoryDdl);

module.exports = router;
