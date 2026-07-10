const dashboardRepo = require("../repositories/dashboard.repository");

async function getDashboardStatistics(user_id) {
  return await dashboardRepo.getDashboardStatistics(user_id);
}

module.exports = {
  getDashboardStatistics,
};
