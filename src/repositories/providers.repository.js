const pool = require("../config/db");

async function getProviders(page, limit, search, sort_by, sort_order) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_providers($1, $2, $3, $4, $5)`;
    const values = [page, limit, search, sort_by, sort_order];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching providers:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function getProviderById(game_provider_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_providers_by_id($1)`;
    const values = [game_provider_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching provider by ID:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function createProviders(provider_name, slug, logo, public_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM create_providers($1, $2, $3, $4)`;
    const values = [provider_name, slug, logo, public_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating provider:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function updateProvider(
  provider_id,
  provider_name,
  slug,
  logo,
  public_id,
) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM update_providers($1, $2, $3, $4, $5) AS success`;
    const values = [provider_id, provider_name, slug, logo, public_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating provider:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function deleteProviders(provider_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM delete_providers($1) AS success`;
    const values = [provider_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting provider:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function updateProviderStatus(provider_id, status) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM update_provider_status($1, $2) AS success`;
    const values = [provider_id, status];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating provider status:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = {
  getProviders,
  getProviderById,
  createProviders,
  updateProvider,
  deleteProviders,
  updateProviderStatus,
};
