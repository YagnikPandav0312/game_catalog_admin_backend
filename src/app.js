const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const app = express();
const morgan = require("morgan");
const logger = require("./middlewares/logger.middleware");
const indexRoutes = require("./routes/index.route");

app.use(cors(
  // {
  //   origin: [
  //     "http://localhost:4200",
  //     "https://your-frontend.vercel.app"
  //   ],
  //   credentials: true,
  // }
))
  ;
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/api", indexRoutes);

module.exports = app;

