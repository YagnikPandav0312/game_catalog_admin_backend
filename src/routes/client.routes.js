const express = require("express");
const router = express.Router();
const logger = require("../middlewares/logger.middleware");
const verifyToken = require("../middlewares/auth.middleware");

const {
  home,
  game,
  gameDetail,
  providers,
  category,
} = require("../controllers/client.controller");

router.post("/home", verifyToken, logger, home);
router.post("/game", verifyToken, logger, game);
router.post("/game-detail", verifyToken, logger, gameDetail);
router.post("/providers", verifyToken, logger, providers);
router.post("/category", verifyToken, logger, category);

module.exports = router;
