require("dotenv").config();
const express = require("express");
const app = express();
const port = 8080;
const spoonacularRouter = require("./routes/spoonacular_router");
const apiRouter = require("./routes/api_router");
const authRouter = require("./routes/auth_router");
const errorHandler = require("./middlewares/error_handler");

app.use(express.json());

app.use(authRouter);
app.use(spoonacularRouter);
app.use(apiRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
