require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 10000;
const spoonacularRouter = require("./routes/spoonacular_router");
const apiRouter = require("./routes/api_router");
const authRouter = require("./routes/auth_router");
const errorHandler = require("./middlewares/error_handler");

app.use(
  cors({
    origin: "https://d3sz4nnc22evgw.cloudfront.net",
    credentials: true,
  })
);

app.use(express.json());

app.use(authRouter);
app.use(spoonacularRouter);
app.use(apiRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
