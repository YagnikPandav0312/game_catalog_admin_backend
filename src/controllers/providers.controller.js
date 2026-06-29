const providerService = require("../service/providerService");

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
     const id = req.params.id; 
    const result = await providerService.getProvidersById(id);
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
    const { provider_name } = req.body;
    const result = await providerService.createProviders(provider_name);
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
    const { provider_name } = req.body;
    const result = await providerService.updateProviders(id, provider_name);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Update Failed",
      });
    }
    res.status(200).json({
      success: true,
      message: "Provider Updated Successfully",
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
    const result = await providerService.deleteProviders(id);
    res.status(200).json({
      success: true,
      message: "Provider Deleted Successfully",
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
