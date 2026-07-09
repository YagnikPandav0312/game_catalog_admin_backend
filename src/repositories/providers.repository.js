const pool = require("../config/db");

async function getProviders(page, limit, search) {
  const query = `SELECT * FROM get_providers($1, $2, $3)`;
  const values = [page, limit, search];
  const result = await pool.query(query, values);
  return result.rows;
}

async function getProviderById(game_provider_id) {
  const query = `SELECT * FROM get_providers_by_id($1)`;
  const values = [game_provider_id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function createProviders(provider_name, slug, logo, public_id) {
  const query = `SELECT * FROM create_providers($1, $2, $3, $4)`;
  const values = [provider_name, slug, logo, public_id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateProvider(
  provider_id,
  provider_name,
  slug,
  logo,
  public_id,
) {
  const query = `SELECT * FROM update_providers($1, $2, $3, $4, $5) AS success`;
  const values = [provider_id, provider_name, slug, logo, public_id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function deleteProviders(provider_id) {
  const query = `SELECT * FROM delete_providers($1) AS success`;
  const values = [provider_id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

async function updateProviderStatus(provider_id, status) {
  const query = `SELECT * FROM update_provider_status($1, $2) AS success`;
  const values = [provider_id, status];
  const result = await pool.query(query, values);
  return result.rows[0];
}

module.exports = {
  getProviders,
  getProviderById,
  createProviders,
  updateProvider,
  deleteProviders,
  updateProviderStatus,
};
