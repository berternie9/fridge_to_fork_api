const serverless = require("serverless-http");
const express = require("express");
const app = express();
const axios = require("axios");

const spoonacularRouter = require("./routes/spoonacular_router");
const apiRouter = require("./routes/api_router");
const authRouter = require("./routes/auth_router");
const errorHandler = require("./middlewares/error_handler");

app.use(express.json());
app.use(authRouter);
app.use(spoonacularRouter);
app.use(apiRouter);
app.use(errorHandler);

module.exports.handler = serverless(app);
