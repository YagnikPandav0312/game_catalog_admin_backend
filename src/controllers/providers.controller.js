const providerService = require("../service/providerService");
const cloudinary = require("../config/cloudinary");

async function getProviders(req, res) {
  try {
    const result = await providerService.getProviders();
    return res.status(200).json({
      success: true,
      message: "Providers Fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

async function getProvidersById(req, res) {
  try {
    const game_provider_id = req.params.id;
    const result = await providerService.getProvidersById(game_provider_id);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Provider Fetched Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function createProviders(req, res) {
  try {
    const { provider_name, slug } = req.body || {};
    const logo = req.file ? req.file.path : null;
    const public_id = req.file ? req.file.filename : null;
    const result = await providerService.createProviders(
      provider_name,
      slug,
      logo,
      public_id,
    );
    res.status(200).json({
      success: true,
      message: "Provider Created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function updateProviders(req, res) {
  try {
    const { id } = req.params;
    const { provider_name, slug } = req.body || {};

    // Fetch existing provider first
    const provider = await providerService.getProvidersById(id);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    let logo = provider.logo;
    let public_id = provider.public_id;

    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (provider.public_id) {
        await cloudinary.uploader.destroy(provider.public_id);
      }
      // Save new image details
      logo = req.file.path;
      public_id = req.file.filename;
    }

    const result = await providerService.updateProviders(
      id,
      provider_name,
      slug,
      logo,
      public_id,
    );

    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Update Provider Failed",
      });
    }
    res.status(200).json({
      success: true,
      message: "Updated Provider Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function deleteProviders(req, res) {
  try {
    const { id } = req.params;

    // Fetch provider first to get public_id
    const provider = await providerService.getProvidersById(id);
    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found",
      });
    }

    const result = await providerService.deleteProviders(id);
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "Delete Provider Failed",
      });
    }

    if (provider.public_id) {
      await cloudinary.uploader.destroy(provider.public_id);
    }

    res.status(200).json({
      success: true,
      message: "Deleted Provider Successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = {
  getProviders,
  getProvidersById,
  createProviders,
  updateProviders,
  deleteProviders,
};
