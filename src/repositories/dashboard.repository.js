const pool = require("../config/db");

async function getDashboardStatistics() {
  let client;
  try {
    client = await pool.connect();
    const query = `SELECT * FROM get_dashboard_statistics()`;
    const result = await client.query(query);
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
