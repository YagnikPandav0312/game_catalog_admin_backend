const providerRepo = require("../repositories/providers.repository");

async function getProviders(page, limit, search) {
  const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
  const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
  const pSearch = search ? String(search) : "";
  return await providerRepo.getProviders(pPage, pLimit, pSearch);
}

async function getProvidersById(provider_id) {
  return await providerRepo.getProviderById(provider_id);
}

async function createProviders(provider_name, slug, logo, public_id) {
  if (!provider_name || provider_name.trim() === "") {
    throw new Error("Provider name is required");
  }
  const result = await providerRepo.createProviders(
    provider_name,
    slug,
    logo,
    public_id,
  );
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateProviders(
  provider_id,
  provider_name,
  slug,
  logo,
  public_id,
) {
  const result = await providerRepo.updateProvider(
    provider_id,
    provider_name,
    slug,
    logo,
    public_id,
  );
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function deleteProviders(provider_id) {
  const result = await providerRepo.deleteProviders(provider_id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateProviderStatus(provider_id, status) {
  return await providerRepo.updateProviderStatus(provider_id, status);
}

module.exports = {
  getProviders,
  getProvidersById,
  createProviders,
  updateProviders,
  deleteProviders,
  updateProviderStatus,
};
