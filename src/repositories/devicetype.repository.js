const pool = require("../config/db");

async function getDeviceTypes(page, limit, search, sort_by, sort_order, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_device_types($1, $2, $3, $4, $5, $6)`;
    const values = [page, limit, search, sort_by, sort_order, user_id];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching device types:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function getDeviceTypeById(id, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_device_type_by_id($1, $2)`;
    const values = [id, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching device type by ID:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function createDeviceType(name, slug, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM create_device_type($1, $2, $3)`;
    const values = [name, slug, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating device type:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function updateDeviceType(id, name, slug, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM update_device_type($1, $2, $3, $4) AS success`;
    const values = [id, name, slug, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating device type:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function deleteDeviceType(id, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM delete_device_type($1, $2) AS success`;
    const values = [id, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error deleting device type:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function updateDeviceTypeStatus(id, status, user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM update_device_type_status($1, $2, $3) AS success`;
    const values = [id, status, user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error updating device type status:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function getDeviceTypeDdl(user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_device_type_ddl($1)`;
    const values = [user_id];
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Error fetching device type ddl:", error);
  } finally {
    if (client) {
      client.release();
    }
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
