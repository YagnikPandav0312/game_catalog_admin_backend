const router = require("express").Router();
const verifyToken = require("../middlewares/auth.middleware");

const {
  getDeviceTypes,
  getDeviceTypeById,
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
  updateDeviceTypeStatus,
} = require("../controllers/devicetype.controller");

router.post("/get_device_type", verifyToken, getDeviceTypes);
router.get("/get_device_type_by_id/:id", verifyToken, getDeviceTypeById);
router.post("/create_device_type", verifyToken, createDeviceType);
router.post("/update_device_type", verifyToken, updateDeviceType);
router.post("/delete_device_type", verifyToken, deleteDeviceType);
router.post("/update_device_type_status", verifyToken, updateDeviceTypeStatus);
module.exports = router;
