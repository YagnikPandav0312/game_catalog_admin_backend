
const pool = require("../config/db");

async function logout(user_id) {
    let client;
    try {
        const query = `SELECT * FROM logout_user($1)`;
        const values = [user_id];
        client = await pool.connect();
        const result = await client.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error("Error in logout:", error);
        return {
            status: {
                code: 2,
                error: error.message,
                message: "Something went wrong",
            },
        };
    } finally {
        if (client) {
            client.release();
        }
    }
}


async function getUserByEmail(email) {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM get_user_by_email($1)`,
            [email]
        );
        return result.rows[0] || null;
    } catch (error) {
        console.error("Error in getUserByEmail:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function registerUser(fullName, email, hashedPassword, role) {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(
            `SELECT * FROM register_user($1, $2, $3, $4)`,
            [fullName, email, hashedPassword, role]
        );
        return result.rows[0];
    } catch (error) {
        console.error("Error in registerUser:", error);
        throw error;
    } finally {
        if (client) {
            client.release();
        }
    }
}


module.exports = {
    logout,
    getUserByEmail,
    registerUser,
};
