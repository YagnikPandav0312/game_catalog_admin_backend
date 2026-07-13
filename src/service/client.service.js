const clientRepo = require("../repositories/client.repository");

async function getGames() {
    return await clientRepo.getGames();
}

async function getProviders() {
    return await clientRepo.getProviders();
}

async function getCategories() {
    return await clientRepo.getCategories();
}

module.exports = {
    getGames,
    getProviders,
    getCategories
};