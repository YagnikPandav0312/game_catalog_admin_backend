const express = require("express");
const router = express.Router();
const {
  getProviders,
  getProvidersById,
  createProviders,
  updateProviders,
  deleteProviders,
} = require("../controllers/providers.controller");

router.get("/get_providers", getProviders);
router.get("/get_provider_by_id/:id", getProvidersById);
router.post("/create_providers", createProviders);
router.put("/update_providers/:id", updateProviders);
router.delete("/delete_provider/:id", deleteProviders);

module.exports = router;
