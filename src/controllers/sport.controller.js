const sportService = require('../service/sport.service');
const cloudinary = require("../config/cloudinary");

async function getSports(req, res) {
    try {
        const { page, limit, search, sort_by, sort_order } = req.body || {};
        const user_id = req.user?.user_id || req.body?.user_id;
        const result = await sportService.getSports(page, limit, search, sort_by, sort_order, user_id);
        const totalRecords = result.length > 0 ? parseInt(result[0].total_records, 10) : 0;
        const data = result.map(({ total_records, ...rest }) => rest);
        return res.status(200).json({
            data: data,
            total_records: totalRecords,
            status: {
                code: 0,
                message: "Sports Fetched successfully",
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

async function getSportById(req, res) {
    try {
        const { id } = req.params;
        const user_id = req.user?.user_id || req.body?.user_id;
        const result = await sportService.getSportById(id, user_id);
        if (!result) {
            return res.status(404).json({
                status: {
                    code: 1,
                    message: "Sport not found",
                },
            });
        }
        return res.status(200).json({
            data: result,
            status: {
                code: 0,
                message: "Sport Fetched Successfully",
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

async function createSport(req, res) {
    try {
        const { sport_name, slug } = req.body || {};
        const user_id = req.user?.user_id || req.body?.user_id;
        const logo = req.file ? req.file.path : null;
        const public_id = req.file ? req.file.filename : null;
        const result = await sportService.createSport(sport_name, slug, logo, public_id, user_id);
        if (!result) {
            return res.status(404).json({
                status: {
                    code: 1,
                    message: "Sport Creation Failed",
                },
            });
        }
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

async function updateSport(req, res) {
    try {
        const { sport_id, sport_name, slug } = req.body || {};
        const user_id = req.user?.user_id || req.body?.user_id;
        const sport = await sportService.getSportById(sport_id, user_id);
        if (!sport) {
            return res.status(404).json({
                status: {
                    code: 1,
                    message: "Sport not found",
                },
            });
        }
        let logo = sport.logo;
        let public_id = sport.public_id;
        if (req.file) {
            if (sport.public_id) {
                await cloudinary.uploader.destroy(sport.public_id);
            }
            logo = req.file.path;
            public_id = req.file.filename;
        }
        const result = await sportService.updateSport(
            sport_id,
            sport_name,
            slug,
            logo,
            public_id,
            user_id
        );
        if (!result) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: "Update Sport Failed",
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

async function deleteSport(req, res) {
    try {
        const { sport_id, user_id } = req.body || {};
        const sport = await sportService.getSportById(sport_id, user_id);
        if (!sport) {
            return res.status(404).json({
                status: {
                    code: 1,
                    message: "Sport not found",
                },
            });
        }

        const result = await sportService.deleteSport(sport_id, user_id);
        if (!result) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: "Delete Sport Failed",
                },
            });
        }

        if (sport.public_id) {
            await cloudinary.uploader.destroy(sport.public_id);
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

async function updateSportStatus(req, res) {
    try {
        const { status, sport_id, is_active } = req.body || {};
        const user_id = req.user?.user_id || req.body?.user_id;
        const newStatus = status !== undefined ? status : is_active;
        if (newStatus === undefined) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: "Status is required (use 'status' or 'is_active')",
                },
            });
        }
        const result = await sportService.updateSportStatus(sport_id, newStatus, user_id);
        if (!result) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: "Update Sport Status Failed",
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


module.exports = {
    getSports,
    getSportById,
    createSport,
    updateSport,
    deleteSport,
    updateSportStatus
}