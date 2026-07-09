const DeviceTypeRepo = require("../repositories/devicetype.repository");

async function getDeviceTypes(page, limit, search, sort_by, sort_order) {
  const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
  const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
  const pSearch = search ? String(search) : "";
  const pSortBy = sort_by ? String(sort_by) : null;
  const pSortOrder = sort_order ? String(sort_order) : null;
  return await DeviceTypeRepo.getDeviceTypes(pPage, pLimit, pSearch, pSortBy, pSortOrder);
} 

async function getDeviceTypeById(id) {
  return await DeviceTypeRepo.getDeviceTypeById(id);
}

async function createDeviceType(name, slug) {
  const result = await DeviceTypeRepo.createDeviceType(name, slug);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateDeviceType(id, name, slug) {
  const result = await DeviceTypeRepo.updateDeviceType(id, name, slug);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function deleteDeviceType(id) {
  const result = await DeviceTypeRepo.deleteDeviceType(id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateDeviceTypeStatus(id, status) {
  return await DeviceTypeRepo.updateDeviceTypeStatus(id, status);
}

module.exports = {
  getDeviceTypes,
  getDeviceTypeById,
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
  updateDeviceTypeStatus,
};
