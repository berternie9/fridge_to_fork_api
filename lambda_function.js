const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const app = express();

const spoonacularRouter = require("./routes/spoonacular_router");
const apiRouter = require("./routes/api_router");
const authRouter = require("./routes/auth_router");
const errorHandler = require("./middlewares/error_handler");

router.use(
  cors({
    origin: "https://d1qtxu7qgkj0oi.cloudfront.net",
    credentials: true,
  })
);

app.use(express.json());
app.use(authRouter);
app.use(spoonacularRouter);
app.use(apiRouter);
app.use(errorHandler);

module.exports.handler = serverless(app);
