const router = require("express").Router();
const verifyToken = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");

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
router.post("/create_device_type", verifyToken, validate("device_type_name"), createDeviceType);
router.put("/update_device_type/:id", verifyToken, validate("device_type_name"), updateDeviceType);
router.delete("/delete_device_type/:id", verifyToken, deleteDeviceType);
router.put("/update_device_type_status/:id", verifyToken, updateDeviceTypeStatus);
module.exports = router;
