const pool = require("../config/db");

async function getDashboardStatistics(user_id) {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_dashboard_statistics($1)`;
    const values = [user_id];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching dashboard statistics:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

module.exports = {
  getDashboardStatistics,
};
