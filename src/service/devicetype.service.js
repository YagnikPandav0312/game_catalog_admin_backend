const repo = require("../repositories/devicetype.repository");

async function getDeviceTypes() {
  return await repo.getDeviceTypes();
}

async function getDeviceTypeById(id) {
  return await repo.getDeviceTypeById(id);
}

async function createDeviceType(name, slug) {
  const result = await repo.createDeviceType(name, slug);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateDeviceType(id, name, slug) {
  const result = await repo.updateDeviceType(id, name, slug);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function deleteDeviceType(id) {
  const result = await repo.deleteDeviceType(id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

module.exports = {
  getDeviceTypes,
  getDeviceTypeById,
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
};
