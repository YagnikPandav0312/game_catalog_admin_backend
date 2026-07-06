const service = require("../service/devicetype.service");

async function getDeviceTypes(req, res) {
  try {
    const result = await service.getDeviceTypes();
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Device Types Fetched Successfully"
      }
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 2,
        message: error.message
      }
    });
  }
}

async function getDeviceTypeById(req, res) {
  try {
    const result = await service.getDeviceTypeById(req.params.id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Device Type Not Found"
        }
      });
    }
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Device Type Fetched Successfully",
      }
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 2,
        message: error.message
      }
    });
  }
}

async function createDeviceType(req, res) {
  try {
    const { device_type_name, slug } = req.body;
    const result = await service.createDeviceType(device_type_name, slug);
    return res.status(201).json({
      status: {
        code: result.code,
        message: result.message
      }
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 2,
        message: error.message
      }
    });
  }
}

async function updateDeviceType(req, res) {
  try {
    const { device_type_name, slug } = req.body;
    const result = await service.updateDeviceType(
      req.params.id,
      device_type_name,
      slug,
    );
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Update Device Type Failed",
        }
      });
    }
    return res.status(200).json({
      status: {
        code: result.code,
        message: result.message
      }
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 2,
        message: error.message
      }
    });
  }
}

async function deleteDeviceType(req, res) {
  try {
    const result = await service.deleteDeviceType(req.params.id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Delete Device Type Failed",
        }
      });
    }
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Device Type Deleted Successfully",
      }
    });
  } catch (error) {
    res.status(500).json({
      status: {
        code: 2,
        message: error.message
      }
    });
  }
}

module.exports = {
  getDeviceTypes,
  getDeviceTypeById,
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
};
