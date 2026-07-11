const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');
const authRepository = require('../repositories/auth.repository');

async function login(email, password) {
    const user = await authRepository.getUserByEmail(email);
    if (!user) {
        return null;
    }
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
    return await authRepository.registerUser(fullName, email, hashedPassword, role);
}


// async function verifyRefreshToken(refreshToken) {
//     return new Promise((resolve) => {
//         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
//             if (err) {
//                 return resolve({
//                     status: {
//                         code: 1,
//                         message: "Invalid or expired refresh token",
//                     },
//                 });
//             }

//             try {
//                 const result = await pool.query(`SELECT * FROM users WHERE user_id = $1 AND email = $2`, [
//                     user.user_id,
//                     user.email,
//                 ]);

//                 if (result.rows.length === 0) {
//                     return resolve({
//                         status: {
//                             code: 1,
//                             message: "User not found",
//                         },
//                     });
//                 }

//                 const { password: _, ...userWithoutPassword } = result.rows[0];

//                 const accessToken = generateToken({
//                     user_id: user.user_id,
//                     email: user.email,
//                     role: user.role,
//                 });

//                 const newRefreshToken = generateRefreshToken({
//                     user_id: user.user_id,
//                     email: user.email,
//                     role: user.role,
//                 });

//                 // Update refresh token in database
//                 await pool.query(`UPDATE users SET refresh_token = $1 WHERE user_id = $2`, [
//                     newRefreshToken,
//                     user.user_id,
//                 ]);

//                 resolve({
//                     status: {
//                         code: 0,
//                         message: "Access token refreshed successfully",
//                     },
//                     data: {
//                         accessToken,
//                         refreshToken: newRefreshToken,
//                         user: userWithoutPassword,
//                     },
//                 });
//             } catch (error) {
//                 console.error("Error in verifyRefreshToken:", error);
//                 resolve({
//                     status: {
//                         code: 2,
//                         error: error.message,
//                         message: "Something went wrong",
//                     },
//                 });
//             }
//         });
//     });
// }

async function logout(user_id) {
    return await authRepository.logout(user_id);
}

module.exports = {
    login,
    register,
    logout
};