const express = require("express");
const router = express.Router();
const logger = require("../middlewares/logger.middleware");
const verifyToken = require("../middlewares/auth.middleware");

const {
  home,
  games,
  gameDetail,
  providers,
  categories,
} = require("../controllers/client.controller");

router.get("/home", logger, home);
router.post("/providers", verifyToken, logger, providers);
router.post("/categories", verifyToken, logger, categories);
router.post("/games", verifyToken, logger, games);
router.post("/games-detail", verifyToken, logger, gameDetail);

module.exports = router;
