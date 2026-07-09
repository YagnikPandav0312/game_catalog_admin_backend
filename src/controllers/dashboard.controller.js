const dashboardService = require("../service/dashboard.service");

async function getDashboardStatistics(req, res) {
  try {
    const result = await dashboardService.getDashboardStatistics();

    // Parse numeric/bigint fields from PostgreSQL return type to integer
    const statistics = {
      total_games: result ? parseInt(result.total_games, 10) : 0,
      total_providers: result ? parseInt(result.total_providers, 10) : 0,
      total_categories: result ? parseInt(result.total_categories, 10) : 0,
      total_active_games: result ? parseInt(result.total_active_games, 10) : 0,
    };

    return res.status(200).json({
      data: statistics,
      status: {
        code: 0,
        message: "Dashboard statistics fetched successfully",
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

module.exports = {
  getDashboardStatistics,
};
