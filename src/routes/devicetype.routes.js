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
router.put("/update_device_type/:id", verifyToken, updateDeviceType);
router.delete("/delete_device_type/:id", verifyToken, deleteDeviceType);
router.put("/update_device_type_status/:id", verifyToken, updateDeviceTypeStatus);
module.exports = router;
