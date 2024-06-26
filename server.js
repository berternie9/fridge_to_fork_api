require("dotenv").config();

const express = require("express");
const app = express();
const port = 8080;
const errorHandler = require("./middlewares/error_handler");
const spoonacularRouter = require("./routes/spoonacular_router");
const apiRouter = require("./routes/api_router");

app.use(express.json());
app.use(spoonacularRouter);
app.use(apiRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
