const express = require('express');
const router = express.Router();

const { login, register, logout } = require('../controllers/auth.controller');
const verifyToken = require('../middlewares/auth.middleware');

router.post('/login', login);
router.post('/register', register);
router.post('/logout', verifyToken, logout);

module.exports = router;