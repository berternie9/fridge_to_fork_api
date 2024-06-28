const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const app = express();
const winston = require("winston");
const expressWinston = require("express-winston");

const spoonacularRouter = require("./routes/spoonacular_router");
const apiRouter = require("./routes/api_router");
const authRouter = require("./routes/auth_router");
const errorHandler = require("./middlewares/error_handler");

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(express.json());
app.use(authRouter);
app.use(spoonacularRouter);
app.use(apiRouter);
app.use(errorHandler);

module.exports.handler = serverless(app);
