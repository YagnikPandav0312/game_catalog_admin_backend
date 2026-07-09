const dashboardRepo = require("../repositories/dashboard.repository");

async function getDashboardStatistics() {
  return await dashboardRepo.getDashboardStatistics();
}

module.exports = {
  getDashboardStatistics,
};
