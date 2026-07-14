const express = require("express");
const app = express();

const authRoutes = require("./auth.routes");
const providersRoutes = require("./providers.routes");
const gametypeRoutes = require("./gametype.routes");
const devicetypeRoutes = require("./devicetype.routes");
const gamesRoutes = require("./games.routes");
const gamecategoryRoutes = require("./gamecategory.routes");
const dashboardRoutes = require("./dashboard.routes");
const clientRoutes = require("./client.routes");
const playerRoutes = require("./player.routes");

app.use("/auth", authRoutes);
app.use("/providers", providersRoutes);
app.use("/gametype", gametypeRoutes);
app.use("/devicetype", devicetypeRoutes);
app.use("/games", gamesRoutes);
app.use("/gamecategory", gamecategoryRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/player", playerRoutes);
// app.use("/client", clientRoutes);

module.exports = app;
