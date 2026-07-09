const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const path = require("path");
const authRoutes = require("./routes/auth.routes");
const providersRoutes = require("./routes/providers.routes");
const gametypeRoutes = require("./routes/gametype.routes");
const devicetypeRoutes = require("./routes/devicetype.routes");
const gamesRoutes = require("./routes/games.routes");
const gamecategoryRoutes = require("./routes/gamecategory.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const logger = require("./middlewares/logger.middleware");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(logger);

//login register
app.use("/api/auth", authRoutes);
// game providers
app.use("/api/providers", providersRoutes);
// game type
app.use("/api/gametype", gametypeRoutes);
// game device type
app.use("/api/devicetype", devicetypeRoutes);
// game
app.use("/api/games", gamesRoutes);
// game category
app.use("/api/gamecategory", gamecategoryRoutes);
// dashboard
app.use("/api/dashboard", dashboardRoutes);

module.exports = app;
