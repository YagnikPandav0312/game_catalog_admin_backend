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
  getProviderDdl
} = require("../controllers/providers.controller");

router.post("/get_providers", verifyToken, logger, getProviders);
router.get("/get_provider_by_id/:id", verifyToken, logger, getProvidersById);
router.post( "/create_providers", verifyToken, upload.single("logo"), logger, createProviders);
router.post("/update_providers",verifyToken,upload.single("logo"), logger, updateProviders);
router.post("/delete_provider", verifyToken, logger, deleteProviders);
router.post("/update_provider_status", verifyToken, logger, updateProviderStatus);
router.post("/get_provider_ddl", verifyToken, logger, getProviderDdl);

module.exports = router;
