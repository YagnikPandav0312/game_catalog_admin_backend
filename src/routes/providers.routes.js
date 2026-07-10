const express = require("express");
const router = express.Router();
const logger = require("../middlewares/logger.middleware");
const upload = require("../middlewares/upload.middleware");
const verifyToken = require("../middlewares/auth.middleware");

const {
  getProviders,
  getProvidersById,
  createProviders,
  updateProviders,
  deleteProviders,
  updateProviderStatus,
} = require("../controllers/providers.controller");

router.post("/get_providers", verifyToken, logger, getProviders);
router.get("/get_provider_by_id/:id", verifyToken, logger, getProvidersById);
router.post( "/create_providers", verifyToken, upload.single("logo"), logger, createProviders);
router.put("/update_providers/:id",verifyToken,upload.single("logo"), logger, updateProviders);
router.delete("/delete_provider/:id", verifyToken, logger, deleteProviders);
router.put("/update_provider_status/:id", verifyToken, logger, updateProviderStatus);

module.exports = router;
