const pool = require("../config/db");

async function getDashboardStatistics() {
  const query = `SELECT * FROM get_dashboard_statistics()`;
  const result = await pool.query(query);
  return result.rows[0];
}

module.exports = {
  getDashboardStatistics,
};
