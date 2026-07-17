const router = require("express").Router();
const logger = require("../middlewares/logger.middleware");
const verifyToken = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const {
    getSports,
    getSportById,
    createSport,
    updateSport,
    deleteSport,
    updateSportStatus
} = require("../controllers/sport.controller");

router.post("/get_sport", verifyToken, logger, getSports);
router.get("/get_sport_by_id/:id", verifyToken, logger, getSportById);
router.post("/create_sport", verifyToken, upload.single("logo"), logger, createSport);
router.post("/update_sport", verifyToken, upload.single("logo"), logger, updateSport);
router.post("/delete_sport", verifyToken, logger, deleteSport);
router.post("/update_sport_status", verifyToken, logger, updateSportStatus);

module.exports = router;
