const gameCategoryService = require("../service/gamecategory.service");
const providerService = require("../service/providerService");
const clientService = require("../service/client.service");

async function home(req, res) {
  try {
    const games = await clientService.getGames();
    const providers = await clientService.getProviders();
    const categories = await clientService.getCategories();
    return res.status(200).json({
      data: {
        games: games,
        providers: providers,
        categories: categories
      },
      status: {
        code: 0,
        message: "Home Fetched Successfully",
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

async function providers(req, res) {
  try {
    const { page, limit, search, user_id } = req.body || {};
    const result = await providerService.getProviders(page, limit, search, null, null, user_id);
    const totalRecords =
      result.length > 0 ? parseInt(result[0].total_records, 10) : 0;
    const data = result.map(({ total_records, ...rest }) => rest);
    return res.status(200).json({
      data: data,
      total_records: totalRecords,
      status: {
        code: 0,
        message: "Providers fetched successfully",
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

async function categories(req, res) {
  try {
    const { page, limit, search, user_id } = req.body || {};
    const result = await gameCategoryService.getGameCategories(
      page,
      limit,
      search,
      null,
      null,
      user_id,
    );
    const totalRecords =
      result.length > 0 ? parseInt(result[0].total_records, 10) : 0;
    const data = result.map(({ total_records, ...rest }) => rest);
    return res.status(200).json({
      data: data,
      total_records: totalRecords,
      status: {
        code: 0,
        message: "Categories fetched successfully",
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

async function games(req, res) {
  try {
    const { page, limit, search, user_id } = req.body || {};
    const result = await gamesService.getGames(page, limit, search, null, null, user_id);
    const totalRecords =
      result.length > 0 ? parseInt(result[0].total_records, 10) : 0;
    const data = result.map(({ total_records, ...rest }) => rest);
    return res.status(200).json({
      data: data,
      total_records: totalRecords,
      status: {
        code: 0,
        message: "Games fetched successfully",
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

async function gameDetail(req, res) {
  try {
    const { id, user_id } = req.body || {};
    const result = await gamesService.getGameById(id, user_id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Game not found",
        },
      });
    }
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Game details fetched successfully",
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
  home,
  games,
  gameDetail,
  providers,
  categories,
};
