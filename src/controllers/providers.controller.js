const providerService = require("../service/providerService");
const cloudinary = require("../config/cloudinary");

async function getProviders(req, res) {
  try {
    const { page, limit, search, sort_by, sort_order, user_id } = req.body || {};
    const result = await providerService.getProviders(
      page,
      limit,
      search,
      sort_by,
      sort_order,
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
        message: "Providers Fetched successfully",
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

async function getProvidersById(req, res) {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const result = await providerService.getProvidersById(id, user_id);
    if (!result) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Provider not found",
        },
      });
    }
    return res.status(200).json({
      data: result,
      status: {
        code: 0,
        message: "Provider Fetched Successfully",
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

async function createProviders(req, res) {
  try {
    const { provider_name, slug, user_id } = req.body || {};
    const logo = req.file ? req.file.path : null;
    const public_id = req.file ? req.file.filename : null;
    const result = await providerService.createProviders(
      provider_name,
      slug,
      logo,
      user_id,
      public_id
    );
    return res.status(201).json({
      status: {
        code: result.code,
        message: result.message,
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

async function updateProviders(req, res) {
  try {
    const { provider_id, user_id } = req.body || {};
    const provider = await providerService.getProvidersById(provider_id, user_id);
    if (!provider) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Provider not found",
        },
      });
    }
    let logo = provider.logo;
    let public_id = provider.public_id;
    if (req.file) {
      if (provider.public_id) {
        await cloudinary.uploader.destroy(provider.public_id);
      }
      logo = req.file.path;
      public_id = req.file.filename;
    }
    const result = await providerService.updateProviders(
      provider_id,
      provider_name,
      slug,
      logo,
      public_id,
      user_id
    );
    if (!result) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Update Provider Failed",
        },
      });
    }
    return res.status(200).json({
      status: {
        code: result.code,
        message: result.message,
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

async function deleteProviders(req, res) {
  try {
    const { provider_id, user_id } = req.body;
    const provider = await providerService.getProvidersById(provider_id, user_id);
    if (!provider) {
      return res.status(404).json({
        status: {
          code: 1,
          message: "Provider not found",
        },
      });
    }

    const result = await providerService.deleteProviders(provider_id, user_id);
    if (!result) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Delete Provider Failed",
        },
      });
    }

    if (provider.public_id) {
      await cloudinary.uploader.destroy(provider.public_id);
    }

    return res.status(200).json({
      status: {
        code: result.code,
        message: result.message,
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

async function updateProviderStatus(req, res) {
  try {
    const { status, provider_id, user_id, is_active } = req.body || {};
    const newStatus = status !== undefined ? status : is_active;
    if (newStatus === undefined) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Status is required (use 'status' or 'is_active')",
        },
      });
    }
    const result = await providerService.updateProviderStatus(provider_id, newStatus, user_id);
    if (!result) {
      return res.status(400).json({
        status: {
          code: 1,
          message: "Update Provider Status Failed",
        },
      });
    }
    return res.status(result.code === 0 ? 200 : 400).json({
      status: {
        code: result.code,
        message: result.message,
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

async function getProviderDdl(req, res) {
  try {
    const { user_id } = req.body;

    const providers = await providerService.getProviderDdl(user_id);

    return res.status(200).json({
      status: {
        code: 0,
        message: "Providers fetched successfully"
      },
      data: providers
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 1,
        message: error.message
      }
    });
  }
}

module.exports = {
  getProviders,
  getProvidersById,
  createProviders,
  updateProviders,
  deleteProviders,
  updateProviderStatus,
  getProviderDdl
};
