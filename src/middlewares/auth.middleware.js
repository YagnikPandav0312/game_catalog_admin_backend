const { verifyToken: jwtVerify } = require('../utils/jwt');

function verifyToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            status: {
                code: 1,
                message: 'Unauthorized: Access Token is Missing'
            }
        });
    }
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }
    const decoded = jwtVerify(token);
    if (!decoded) {
        return res.status(401).json({
            status: {
                code: 1,
                message: 'Unauthorized: Access Token is Invalid or Expired'
            }
        });
    }
    req.user = decoded;
    next();
}

module.exports = verifyToken;