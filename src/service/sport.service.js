const sportRepo = require("../repositories/sport.repository");

async function getSports(page, limit, search, sort_by, sort_order, user_id) {
    try {
        const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
        const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
        const pSearch = search ? String(search) : "";
        const pSortBy = sort_by ? String(sort_by) : null;
        const pSortOrder = sort_order ? String(sort_order) : null;
        return await sportRepo.getSports(pPage, pLimit, pSearch, pSortBy, pSortOrder, user_id);
    } catch (error) {
        throw error
    }
}

async function getSportById(id, user_id) {
    return await sportRepo.getSportById(id, user_id);
}

async function createSport(sport_name, slug, logo, public_id, user_id) {
    if (!sport_name || sport_name.trim() === "") {
        throw new Error("Sport name is required");
    }
    if (!slug || slug.trim() === "") {
        throw new Error("Sport slug is required");
    }
    const result = await sportRepo.createSport(sport_name, slug, logo, public_id, user_id);
    if (result.code !== 0) {
        return null;
    }
    return result;
}

async function updateSport(id, name, slug, logo, public_id, user_id) {
    const result = await sportRepo.updateSport(
        id,
        name,
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

async function deleteSport(id, user_id) {
    const result = await sportRepo.deleteSport(id, user_id);
    if (result.code !== 0) {
        return null;
    }
    return result;
}

async function updateSportStatus(id, status, user_id) {
    const result = await sportRepo.updateSportStatus(id, status, user_id);
    if (result.code !== 0) {
        return null;
    }
    return result;
}

module.exports = {
    getSports,
    getSportById,
    createSport,
    updateSport,
    deleteSport,
    updateSportStatus
}