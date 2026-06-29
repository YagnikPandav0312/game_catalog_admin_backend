function validate(req, res, next) {
  const { provider_name } = req.body;

  if (!provider_name) {
    return res.status(400).json({
      success: false,
      message: "provider_name required",
    });
  }

  next();
}

module.exports = validate;
