const service = require("../service/devicetype.service");

async function getDeviceTypes(req, res) {
  try {
    const { page, limit, search, sort_by, sort_order, user_id } = req.body || {};
    const result = await service.getDeviceTypes(
      page,
      limit,
      search,
      sort_by,
      sort_order,
      user_id,
    );
    const totalRecords =
      result.length > 0 ? parseInt(result[0].total_records, 10) : 0;
    const data = result.map(({ total_records, ...rest }) => rest);
    return res.status(200).json({
      data: data,
      total_records: totalRecords,
      status: {
        code: 0,
        message: "Device Types Fetched Successfully",
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function getDeviceTypeById(req, res) {
  try {
    const { id } = req.params;
    const { user_id } = req.body || {};
    const result = await service.getDeviceTypeById(id, user_id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Device Type Not Found",
        },
      });
    }
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Device Type Fetched Successfully",
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function createDeviceType(req, res) {
  try {
    const { device_type_name, slug, user_id } = req.body || {};
    const result = await service.createDeviceType(device_type_name, slug, user_id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Device Type Not Found",
        },
      });
    }
    return res.status(201).json({
      status: {
        code: result.code,
        message: result.message,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function updateDeviceType(req, res) {
  try {
    const { id, device_type_id, device_type_name, slug, user_id } = req.body || {};
    const targetId = id || device_type_id;
    const result = await service.updateDeviceType(
      targetId,
      device_type_name,
      slug,
      user_id,
    );
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Update Device Type Failed",
        },
      });
    }
    return res.status(200).json({
      status: {
        code: result.code,
        message: result.message,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function deleteDeviceType(req, res) {
  try {
    const { id, device_type_id, user_id } = req.body || {};
    const targetId = id || device_type_id;
    const result = await service.deleteDeviceType(targetId, user_id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Delete Device Type Failed",
        },
      });
    }
    return res.status(200).json({
      status: {
        code: result.code,
        message: result.message,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function updateDeviceTypeStatus(req, res) {
  try {
    const { id, device_type_id, status, is_active, user_id } = req.body || {};
    const targetId = id || device_type_id;
    const newStatus = status !== undefined ? status : is_active;
    if (newStatus === undefined) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Status is required (use 'status' or 'is_active')",
        },
      });
    }
    const result = await service.updateDeviceTypeStatus(targetId, newStatus, user_id);
    if (!result) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Update Device Type Status Failed",
        },
      });
    }
    return res.status(result.code === 0 ? 200 : 400).json({
      status: {
        code: result.code,
        message: result.message,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function getDeviceTypeDdl(req, res) {
  try {
    const { user_id } = req.body || {};
    const result = await service.getDeviceTypeDdl(user_id);
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Device Type DDL Fetched Successfully",
      }
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong"
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
  updateDeviceTypeStatus,
  getDeviceTypeDdl,
};
