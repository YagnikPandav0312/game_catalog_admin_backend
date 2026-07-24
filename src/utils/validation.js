const Joi = require('joi');



exports.adminLogin = Joi.object({
    email: Joi.string().email().min(3).max(30),
    username: Joi.string().email().min(3).max(30),
    user_name: Joi.string().email().min(3).max(30),
    password: Joi.string().min(3).max(12).required()
}).or('email', 'username', 'user_name');

exports.adminRegister = Joi.object({
    email: Joi.string().email().min(3).max(30),
    username: Joi.string().email().min(3).max(30),
    user_name: Joi.string().email().min(3).max(30),
    full_name: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(3).max(12).required(),
    role: Joi.string().optional()
}).or('email', 'username', 'user_name');

exports.logOut = Joi.object({
    user_id: Joi.number().optional()
})

exports.getProvider = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
    search: Joi.string().allow('').optional(),
    sort_by: Joi.string().optional(),
    sort_order: Joi.string().optional(),
    user_id: Joi.number().optional()
})

exports.getProviderById = Joi.object({
    provider_id: Joi.number().required(),
    user_id: Joi.number().required()
})

exports.createProvider = Joi.object({
    provider_name: Joi.string().min(3).max(12).required(),
    slug: Joi.string().min(3).max(12).optional(),
    logo: Joi.any().optional(),
    public_id: Joi.string().optional(),
    user_id: Joi.number().required()
})

exports.updateProvider = Joi.object({
    provider_id: Joi.number().required(),
    provider_name: Joi.string().min(3).max(12).optional(),
    slug: Joi.string().min(3).max(12).optional(),
    logo: Joi.any().optional(),
    public_id: Joi.string().optional(),
    user_id: Joi.number().required()
})

exports.deleteProvider = Joi.object({
    provider_id: Joi.number().required(),
    user_id: Joi.number().required()
})

exports.updateProviderstatus = Joi.object({
    provider_id: Joi.number().required(),
    user_id: Joi.number().required(),
    status: Joi.boolean().optional()
})

exports.getProviderddl = Joi.object({
    user_id: Joi.number().required()
})

// Dashboard
exports.getDashboardStatistics = Joi.object({
    user_id: Joi.number().required()
})

// Device Type
exports.getDeviceType = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
    search: Joi.string().allow('').optional(),
    sort_by: Joi.string().optional(),
    sort_order: Joi.string().optional(),
    user_id: Joi.number().optional()
})

exports.getDeviceTypeById = Joi.object({
    id: Joi.number().required(),
    user_id: Joi.number().required()
})

exports.createDeviceType = Joi.object({
    device_type_name: Joi.string().min(2).max(50).required(),
    slug: Joi.string().min(2).max(50).optional(),
    user_id: Joi.number().required()
})

exports.updateDeviceType = Joi.object({
    id: Joi.number().optional(),
    device_type_id: Joi.number().optional(),
    device_type_name: Joi.string().min(2).max(50).optional(),
    slug: Joi.string().min(2).max(50).optional(),
    user_id: Joi.number().required()
}).or('id', 'device_type_id')

exports.deleteDeviceType = Joi.object({
    id: Joi.number().optional(),
    device_type_id: Joi.number().optional(),
    user_id: Joi.number().required()
}).or('id', 'device_type_id')

exports.updateDeviceTypeStatus = Joi.object({
    id: Joi.number().optional(),
    device_type_id: Joi.number().optional(),
    status: Joi.boolean().optional(),
    is_active: Joi.boolean().optional(),
    user_id: Joi.number().required()
}).or('id', 'device_type_id').or('status', 'is_active')

exports.getDeviceTypeDdl = Joi.object({
    user_id: Joi.number().required()
})

// Game Category
exports.getGameCategory = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
    search: Joi.string().allow('').optional(),
    sort_by: Joi.string().optional(),
    sort_order: Joi.string().optional(),
    user_id: Joi.number().optional()
})

exports.getGameCategoryById = Joi.object({
    id: Joi.number().required(),
    user_id: Joi.number().required()
})

exports.createGameCategory = Joi.object({
    game_categorie_name: Joi.string().min(2).max(50).required(),
    slug: Joi.string().min(2).max(50).optional(),
    user_id: Joi.number().required(),
    game_type_id: Joi.number().required()
})

exports.updateGameCategory = Joi.object({
    id: Joi.number().optional(),
    game_categorie_id: Joi.number().optional(),
    game_categorie_name: Joi.string().min(2).max(50).optional(),
    slug: Joi.string().min(2).max(50).optional(),
    user_id: Joi.number().required(),
    game_type_id: Joi.number().optional()
}).or('id', 'game_categorie_id')

exports.deleteGameCategory = Joi.object({
    id: Joi.number().optional(),
    game_categorie_id: Joi.number().optional(),
    user_id: Joi.number().required()
}).or('id', 'game_categorie_id')

exports.updateGameCategoryStatus = Joi.object({
    id: Joi.number().optional(),
    game_categorie_id: Joi.number().optional(),
    status: Joi.boolean().optional(),
    is_active: Joi.boolean().optional(),
    user_id: Joi.number().required()
}).or('id', 'game_categorie_id').or('status', 'is_active')

exports.getGameCategoryDdl = Joi.object({
    user_id: Joi.number().required()
})

// Game Type
exports.getGameType = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
    search: Joi.string().allow('').optional(),
    sort_by: Joi.string().optional(),
    sort_order: Joi.string().optional(),
    user_id: Joi.number().optional()
})

exports.getGameTypeById = Joi.object({
    id: Joi.number().required(),
    user_id: Joi.number().required()
})

exports.createGameType = Joi.object({
    game_types_name: Joi.string().min(2).max(50).required(),
    slug: Joi.string().min(2).max(50).optional(),
    user_id: Joi.number().required()
})

exports.updateGameType = Joi.object({
    id: Joi.number().optional(),
    game_type_id: Joi.number().optional(),
    game_types_name: Joi.string().min(2).max(50).optional(),
    slug: Joi.string().min(2).max(50).optional(),
    user_id: Joi.number().required()
}).or('id', 'game_type_id')

exports.deleteGameType = Joi.object({
    id: Joi.number().optional(),
    game_type_id: Joi.number().optional(),
    user_id: Joi.number().required()
}).or('id', 'game_type_id')

exports.updateGameTypeStatus = Joi.object({
    id: Joi.number().optional(),
    game_type_id: Joi.number().optional(),
    status: Joi.boolean().optional(),
    is_active: Joi.boolean().optional(),
    user_id: Joi.number().required()
}).or('id', 'game_type_id').or('status', 'is_active')

exports.getGameTypeDdl = Joi.object({
    user_id: Joi.number().required()
})

// Games
exports.getGame = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
    search: Joi.string().allow('').optional(),
    sort_by: Joi.string().optional(),
    sort_order: Joi.string().optional(),
    user_id: Joi.number().optional()
})

exports.getGameById = Joi.object({
    id: Joi.number().required()
})

exports.createGame = Joi.object({
    provider_id: Joi.number().required(),
    category_id: Joi.any().optional(),
    game_type_id: Joi.any().optional(),
    device_type_id: Joi.any().optional(),
    game_name: Joi.string().min(2).max(100).required(),
    slug: Joi.string().min(2).max(100).optional(),
    thumbnail: Joi.any().optional(),
    release_date: Joi.string().optional(),
    max_win: Joi.any().optional(),
    min_bet: Joi.number().optional(),
    max_bet: Joi.number().optional(),
    rtp: Joi.number().optional(),
    variance: Joi.string().optional(),
    public_id: Joi.string().optional(),
    user_id: Joi.number().optional()
})

exports.updateGame = Joi.object({
    id: Joi.number().optional(),
    game_id: Joi.number().optional(),
    provider_id: Joi.number().optional(),
    category_id: Joi.any().optional(),
    game_type_id: Joi.any().optional(),
    device_type_id: Joi.any().optional(),
    game_name: Joi.string().min(2).max(100).optional(),
    slug: Joi.string().min(2).max(100).optional(),
    thumbnail: Joi.any().optional(),
    release_date: Joi.string().optional(),
    max_win: Joi.any().optional(),
    min_bet: Joi.number().optional(),
    max_bet: Joi.number().optional(),
    rtp: Joi.number().optional(),
    variance: Joi.string().optional(),
    public_id: Joi.string().optional(),
    user_id: Joi.number().optional()
}).or('id', 'game_id')

exports.deleteGame = Joi.object({
    games_id: Joi.number().required(),
    user_id: Joi.number().optional()
})

exports.updateGameStatus = Joi.object({
    id: Joi.number().optional(),
    game_id: Joi.number().optional(),
    status: Joi.boolean().optional(),
    is_active: Joi.boolean().optional()
}).or('id', 'game_id').or('status', 'is_active')

// Players
exports.getPlayer = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
    search: Joi.string().allow('').optional(),
    sort_by: Joi.string().optional(),
    sort_order: Joi.string().optional(),
    user_id: Joi.number().optional()
})

exports.getPlayerById = Joi.object({
    id: Joi.number().required(),
    user_id: Joi.number().required()
})

exports.createPlayer = Joi.object({
    first_name: Joi.string().min(2).max(50).required(),
    last_name: Joi.string().min(2).max(50).required(),
    full_name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().required(),
    mobile: Joi.string().min(8).max(20).required(),
    password: Joi.string().min(3).max(100).required(),
    user_id: Joi.number().required()
})

exports.updatePlayer = Joi.object({
    id: Joi.number().optional(),
    player_id: Joi.number().optional(),
    first_name: Joi.string().min(2).max(50).optional(),
    last_name: Joi.string().min(2).max(50).optional(),
    full_name: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    mobile: Joi.string().min(8).max(20).optional(),
    user_id: Joi.number().required()
}).or('id', 'player_id')

exports.deletePlayer = Joi.object({
    id: Joi.number().optional(),
    player_id: Joi.number().optional(),
    user_id: Joi.number().required()
}).or('id', 'player_id')

exports.updatePlayerStatus = Joi.object({
    id: Joi.number().optional(),
    player_id: Joi.number().optional(),
    status: Joi.boolean().optional(),
    is_active: Joi.boolean().optional(),
    user_id: Joi.number().required()
}).or('id', 'player_id').or('status', 'is_active')

// Sports
exports.getSport = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
    search: Joi.string().allow('').optional(),
    sort_by: Joi.string().optional(),
    sort_order: Joi.string().optional(),
    user_id: Joi.number().optional()
})

exports.getSportById = Joi.object({
    id: Joi.number().required(),
    user_id: Joi.number().optional()
})

exports.createSport = Joi.object({
    sport_name: Joi.string().min(2).max(100).required(),
    slug: Joi.string().min(2).max(100).optional(),
    logo: Joi.any().optional(),
    public_id: Joi.string().optional(),
    user_id: Joi.number().optional()
})

exports.updateSport = Joi.object({
    sport_id: Joi.number().required(),
    sport_name: Joi.string().min(2).max(100).optional(),
    slug: Joi.string().min(2).max(100).optional(),
    logo: Joi.any().optional(),
    public_id: Joi.string().optional(),
    user_id: Joi.number().optional()
})

exports.deleteSport = Joi.object({
    sport_id: Joi.number().required(),
    user_id: Joi.number().optional()
})

exports.updateSportStatus = Joi.object({
    sport_id: Joi.number().required(),
    status: Joi.boolean().optional(),
    is_active: Joi.boolean().optional(),
    user_id: Joi.number().optional()
}).or('status', 'is_active')

// Clients
exports.clientGetProviders = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
    search: Joi.string().allow('').optional(),
    user_id: Joi.number().optional()
})

exports.clientGetCategories = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
    search: Joi.string().allow('').optional(),
    user_id: Joi.number().optional()
})

exports.clientGetGames = Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(10),
    search: Joi.string().allow('').optional(),
    user_id: Joi.number().optional()
})

exports.clientGameDetail = Joi.object({
    id: Joi.number().required(),
    user_id: Joi.number().optional()
})

