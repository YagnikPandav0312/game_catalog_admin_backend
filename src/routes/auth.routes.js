const express = require('express');
const router = express.Router();

const { login, register, logout } = require('../controllers/auth.controller');
const { verifyToken: jwtVerify } = require('../utils/jwt');

function optionalVerifyToken(req, res, next) {
    let token = req.headers.authorization;
    if (token) {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        const decoded = jwtVerify(token);
        if (decoded) {
            req.user = decoded;
        }
    }
    next();
}

router.post('/login', login);
router.post('/register', register);
router.post('/logout', optionalVerifyToken, logout);

module.exports = router;