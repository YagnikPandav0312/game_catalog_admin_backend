const pool = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

async function login(email, password) {
    const result = await pool.query(
        `SELECT * FROM get_user_by_email($1)`,
        [email]
    );
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const match = await comparePassword(password, user.password);
    if (!match) {
        return null;
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken({
        user_id: user.user_id,
        email: user.email,
        role: user.role
    });
    return { token, user: userWithoutPassword };
}

async function register(fullName, email, password, role) {
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
        `SELECT * FROM register_user($1, $2, $3, $4)`,
        [fullName, email, hashedPassword, role]
    );
    return result.rows[0];
}

module.exports = {
    login,
    register
};