const express = require("express");
const router = express.Router();
const logger = require("../middlewares/logger.middleware");
const verifyToken = require("../middlewares/auth.middleware");

const { getDashboardStatistics } = require("../controllers/dashboard.controller");

router.get("/statistics", verifyToken, logger, getDashboardStatistics);

module.exports = router;
