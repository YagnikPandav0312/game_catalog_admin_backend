const pool = require("../config/db");

async function getDeviceTypes(page, limit, search) {
  const query = `SELECT * FROM get_device_types($1, $2, $3)`;
  const values = [page, limit, search];
  const result = await pool.query(query, values);
  return result.rows;
}

async function getDeviceTypeById(id) {
  const query = `SELECT * FROM get_device_type_by_id($1)`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function createDeviceType(name, slug) {
  const query = `SELECT * FROM create_device_type($1, $2)`;
  const values = [name, slug];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateDeviceType(id, name, slug) {
  const query = `SELECT * FROM update_device_type($1, $2, $3) AS success`;
  const values = [id, name, slug];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function deleteDeviceType(id) {
  const query = `SELECT * FROM delete_device_type($1) AS success`;
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateDeviceTypeStatus(id, status) {
  const query = `SELECT * FROM update_device_type_status($1, $2) AS success`;
  const values = [id, status];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  getDeviceTypes,
  getDeviceTypeById,
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
  updateDeviceTypeStatus,
};
