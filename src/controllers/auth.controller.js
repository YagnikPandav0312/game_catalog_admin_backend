const authService = require("../service/auth.service");
const { validate } = require("../utils/schemaValidation");
const { adminRegister, adminLogin, logOut } = require("../utils/validation");

async function login(req, res) {
  try {
    const validationError = await validate(req.body, adminLogin);
    if (validationError) {
      return res.status(400).json({
        status: {
          code: 3,
          message: validationError,
        },
      });
    }
    const email = req.body.email || req.body.username || req.body.user_name;
    const { password } = req.body || {};
    const data = await authService.login(email, password);
    if (!data) {
      return res.status(200).json({
        status: {
          code: 1,
          message: "Invalid Credentials",
        },
      });
    }
    return res.status(200).json({
      data,
      status: {
        code: 0,
        message: "Login Successfully !",
      },
    });
  } catch (error) {
    console.error("Error in login auth controller:", error);
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function register(req, res) {
  try {
    const validationError = await validate(req.body, adminRegister);
    if (validationError) {
      return res.status(400).json({
        status: {
          code: 3,
          message: validationError,
        },
      });
    }
    const email = req.body.email || req.body.username || req.body.user_name;
    const { full_name, password, role } = req.body || {};
    const result = await authService.register(full_name, email, password, role);
    if (!result) {
      return res.status(200).json({
        status: {
          code: 1,
          message: "Registration Failed",
        },
      });
    }
    return res.status(result.code === 0 ? 201 : 400).json({
      status: {
        code: result.code,
        message: result.message,
      },
    });
  } catch (error) {
    console.error("Error in register auth controller:", error);
    return res.status(500).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong",
      },
    });
  }
}

async function logout(req, res) {
  try {
    const validationError = await validate(req.body, logOut);
    if (validationError) {
      return res.status(400).json({
        status: {
          code: 3,
          message: validationError,
        },
      });
    }
    const { user_id } = req.body || {};
    const result = await authService.logout(user_id);
    return res.status(200).json({
      status: {
        code: result.code,
        message: result.message
      },
    });
  } catch (error) {
    console.error("Error in logout auth controller:", error);
    return res.status(200).json({
      status: {
        code: 2,
        error: error.message,
        message: "something went wrong"
      },
    });
  }
}


module.exports = {
  login,
  register,
  logout
};
