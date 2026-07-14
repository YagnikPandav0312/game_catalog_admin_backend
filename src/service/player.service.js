const playerRepo = require("../repositories/player.repository");

async function getPlayers(page, limit, search, sort_by, sort_order, user_id) {
    const pPage = (page !== undefined && page !== null && page !== '') ? parseInt(page, 10) : null;
    const pLimit = (limit !== undefined && limit !== null && limit !== '') ? parseInt(limit, 10) : null;
    const pSearch = search ? String(search) : "";
    const pSortBy = sort_by ? String(sort_by) : null;
    const pSortOrder = sort_order ? String(sort_order) : null;
    return await playerRepo.getPlayer(pPage, pLimit, pSearch, pSortBy, pSortOrder, user_id);
}
async function getPlayerById(id, user_id) {
    return await playerRepo.getPlayerById(id, user_id);
}
async function createPlayer(first_name, last_name, email, mobile, user_id, password, full_name) {
    const finalFullName = full_name || `${first_name || ''} ${last_name || ''}`.trim();
    const finalPassword = password || "Player@123";
    const result = await playerRepo.createPlayer(finalFullName, email, finalPassword, user_id);
    if (result.code !== 0) {
        return null;
    }
    return result;
}
async function updatePlayer(id, first_name, last_name, email, mobile, user_id, full_name) {
    const finalFullName = full_name || `${first_name || ''} ${last_name || ''}`.trim();
    const result = await playerRepo.updatePlayer(id, finalFullName, email, user_id);
    if (result.code !== 0) {
        return null;
    }
    return result;
}
async function deletePlayer(id, user_id) {
    const result = await playerRepo.deletePlayer(id, user_id);
    if (result.code !== 0) {
        return null;
    }
    return result;
}
async function updatePlayerStatus(id, status, user_id) {
    const result = await playerRepo.updatePlayerStatus(id, status, user_id);
    if (result.code !== 0) {
        return null;
    }
    return result;
}
module.exports = {
    getPlayers,
    getPlayerById,
    createPlayer,
    updatePlayer,
    deletePlayer,
    updatePlayerStatus,
};
