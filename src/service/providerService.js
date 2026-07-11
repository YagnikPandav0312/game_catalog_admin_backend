const providerRepo = require("../repositories/providers.repository");

async function getProviders(page, limit, search, sort_by, sort_order, user_id) {
  const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
  const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
  const pSearch = search ? String(search) : "";
  const pSortBy = sort_by ? String(sort_by) : null;
  const pSortOrder = sort_order ? String(sort_order) : null;
  return await providerRepo.getProviders(pPage, pLimit, pSearch, pSortBy, pSortOrder, user_id);
}

async function getProvidersById(provider_id, user_id) {
  return await providerRepo.getProviderById(provider_id, user_id);
}

async function createProviders(provider_name, slug, logo, public_id, user_id) {
  if (!provider_name || provider_name.trim() === "") {
    throw new Error("Provider name is required");
  }
  const result = await providerRepo.createProviders(
    provider_name,
    slug,
    logo,
    public_id,
    user_id
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
  user_id
) {
  const result = await providerRepo.updateProvider(
    provider_id,
    provider_name,
    slug,
    logo,
    public_id,
    user_id
  );
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function deleteProviders(provider_id, user_id) {
  const result = await providerRepo.deleteProviders(provider_id, user_id);
  if (result.code !== 0) {
    return null;
  }
  return result;
}

async function updateProviderStatus(provider_id, status, user_id) {
  return await providerRepo.updateProviderStatus(provider_id, status, user_id);
}

async function getProviderDdl(user_id) {
  return await providerRepo.getProviderDdl(user_id);
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
