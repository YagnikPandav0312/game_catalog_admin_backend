const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const indexRoutes = require("./routes/index.route");
const logger = require("./middlewares/logger.middleware");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/api", indexRoutes);

module.exports = app;
