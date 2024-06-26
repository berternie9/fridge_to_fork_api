const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/spoonacularApi/recipes", async (req, res) => {
  const { includeIngredients, cuisine, diet } = req.query;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_KEY}&includeIngredients=${includeIngredients}&cuisine=${cuisine}&diet=${diet}&number=4&limitLicense=true&ignorePantry=false`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/spoonacularApi/recipeIngredients", async (req, res) => {
  const { id } = req.query;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/ingredientWidget.json?apiKey=${process.env.SPOONACULAR_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/spoonacularApi/recipeInstructions", async (req, res) => {
  const { id } = req.query;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=${process.env.SPOONACULAR_KEY}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
