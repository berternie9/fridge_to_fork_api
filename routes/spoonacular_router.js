const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/spoonacularApi/recipes", async (req, res) => {
  const { includeIngredients, cuisine, diet } = req.query;
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch`,
      {
        params: {
          apiKey: process.env.SPOONACULAR_KEY,
          includeIngredients,
          cuisine,
          diet,
          number: 4,
          limitLicense: true,
          ignorePantry: false,
        },
      }
    );
    console.log("Spoonacular API Response:", response.data);
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching recipes from Spoonacular:", err.message);
    res.status(500).send(`Error: ${err.message}`);
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
