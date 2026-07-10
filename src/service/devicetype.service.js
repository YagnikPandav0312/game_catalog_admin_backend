const DeviceTypeRepo = require("../repositories/devicetype.repository");

async function getDeviceTypes(page, limit, search, sort_by, sort_order, user_id) {
  const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
  const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
  const pSearch = search ? String(search) : "";
  const pSortBy = sort_by ? String(sort_by) : null;
  const pSortOrder = sort_order ? String(sort_order) : null;
  return await DeviceTypeRepo.getDeviceTypes(pPage, pLimit, pSearch, pSortBy, pSortOrder, user_id);
} 

async function getDeviceTypeById(id, user_id) {
  return await DeviceTypeRepo.getDeviceTypeById(id, user_id);
}

async function createDeviceType(name, slug, user_id) {
  const result = await DeviceTypeRepo.createDeviceType(name, slug, user_id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateDeviceType(id, name, slug, user_id) {
  const result = await DeviceTypeRepo.updateDeviceType(id, name, slug, user_id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function deleteDeviceType(id, user_id) {
  const result = await DeviceTypeRepo.deleteDeviceType(id, user_id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateDeviceTypeStatus(id, status, user_id) {
  return await DeviceTypeRepo.updateDeviceTypeStatus(id, status, user_id);
}

module.exports = {
  getDeviceTypes,
  getDeviceTypeById,
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
  updateDeviceTypeStatus,
};
