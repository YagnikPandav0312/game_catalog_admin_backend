const authService = require('../service/auth.service');

async function login(req, res) {
    try {
        const email = req.body.email || req.body.username || req.body.user_name;
        const { password } = req.body || {};

        if (!email || !password) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: "Email And Password Are Required"
                }
            });
        }
        const data = await authService.login(email, password);
        if (!data) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: 'Invalid Credentials'
                }
            });
        }
        return res.status(200).json({
            data,
            status: {
                code: 0,
                message: 'Login Successfully !'
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            status: {
                code: 2,
                message: error.message
            }
        });
    }
}

async function register(req, res) {
    try {
        const email = req.body.email || req.body.username || req.body.user_name;
        const { full_name, password, role } = req.body || {};

        if (!full_name || !email || !password) {
            return res.status(400).json({
                status: {
                    code: 1,
                    message: "Full Name, Email, And Password Are Required"
                }
            });
        }
        const result = await authService.register(full_name, email, password, role);
        return res.status(result.code === 0 ? 201 : 400).json({
            status: {
                code: result.code,
                message: result.message
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            status: {
                code: 2,
                message: error.message
            }
        });
    }
}

module.exports = {
    login,
    register
};