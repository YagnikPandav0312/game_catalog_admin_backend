const gameCategoryService = require("../service/gamecategory.service");
const providerService = require("../service/providerService");
const gamesService = require("../service/games.service");

async function home(req, res) {
  try {
    const games = await gamesService.getGames(1, 10, "");
    const providers = await providerService.getProviders(1, 10, "");
    const categories = await gameCategoryService.getGameCategories(1, 10, "");

    return res.status(200).json({
      data: {
        games: games.map(({ total_records, ...rest }) => rest),
        providers: providers.map(({ total_records, ...rest }) => rest),
        categories: categories.map(({ total_records, ...rest }) => rest),
      },
      status: {
        code: 0,
        message: "Home data fetched successfully",
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

async function game(req, res) {
  try {
    const { page, limit, search } = req.body || {};
    const result = await gamesService.getGames(page, limit, search);
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
    const { id } = req.body || {};
    const result = await gamesService.getGameById(id);
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

async function providers(req, res) {
  try {
    const { page, limit, search } = req.body || {};
    const result = await providerService.getProviders(page, limit, search);
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

async function category(req, res) {
  try {
    const { page, limit, search } = req.body || {};
    const result = await gameCategoryService.getGameCategories(
      page,
      limit,
      search,
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

module.exports = {
  home,
  game,
  gameDetail,
  providers,
  category,
};
