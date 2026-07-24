const dashboardService = require("../service/dashboard.service");
const { validate } = require("../utils/schemaValidation");
const { getDashboardStatistics: getDashboardStatisticsSchema } = require("../utils/validation");

async function getDashboardStatistics(req, res) {
  try {
    const validationError = await validate(req.body, getDashboardStatisticsSchema);
    if (validationError) {
      return res.status(400).json({
        status: {
          code: 3,
          message: validationError,
        },
      });
    }
    const { user_id } = req.body;
    const result = await dashboardService.getDashboardStatistics(user_id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Dashboard statistics not found",
        },
      });
    }
    return res.status(200).json({
      data: {
        total_games: Number(result.total_games),
        total_providers: Number(result.total_providers),
        total_categories: Number(result.total_categories),
        total_active_games: Number(result.total_active_games),
      },
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
