const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/api/recipeSpoonacular", (req, res, next) => {
  const { recipeData, userId } = req.body;
  const sql = `
    INSERT INTO recipes (title, user_id, is_owned_by_user, recipe_data)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const sqlParams = [recipeData.title, userId, false, recipeData];
  return db
    .query(sql, sqlParams)
    .then((result) => result.rows[0])
    .then((data) => res.status(201).json(data))
    .catch(next);
});

router.post("/api/recipeUser", (req, res, next) => {
  const { recipeData, userId } = req.body;
  const sql = `
    INSERT INTO recipes (title, user_id, is_owned_by_user, recipe_data)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const sqlParams = [recipeData.title, userId, true, recipeData];
  return db
    .query(sql, sqlParams)
    .then((result) => result.rows[0])
    .then((data) => res.status(201).json(data))
    .catch(next);
});

router.delete("/api/recipeSpoonacular/:recipeId/:userId", (req, res, next) => {
  const { recipeId, userId } = req.params;
  const sql = `
    DELETE FROM recipes 
    WHERE recipe_data->>'id' = $1
    AND user_id = $2
    RETURNING *;
  `;
  const sqlParams = [recipeId, userId];
  return db
    .query(sql, sqlParams)
    .then((result) => result.rows[0])
    .then((data) => res.status(200).json(data))
    .catch(next);
});

router.delete("/api/recipeUser/:recipeId/:userId", (req, res, next) => {
  const { recipeId, userId } = req.params;
  const sql = `
    DELETE FROM recipes 
    WHERE id = $1
    AND user_id = $2
    RETURNING *;
  `;
  const sqlParams = [recipeId, userId];
  return db
    .query(sql, sqlParams)
    .then((result) => result.rows[0])
    .then((data) => res.status(200).json(data))
    .catch(next);
});

router.get("/api/recipeSpoonacular/:recipeId", (req, res, next) => {
  const { recipeId } = req.params;
  const sql = `SELECT * FROM recipes WHERE recipe_data->>'id' = $1;`;
  const sqlParams = [recipeId];
  return db
    .query(sql, sqlParams)
    .then((result) => result.rows[0])
    .then((data) => res.status(200).json(data))
    .catch(next);
});

router.get("/api/recipeUser/:recipeId", (req, res, next) => {
  const { recipeId } = req.params;
  const sql = `SELECT * FROM recipes WHERE id = $1;`;
  const sqlParams = [recipeId];
  return db
    .query(sql, sqlParams)
    .then((result) => result.rows[0])
    .then((data) => res.status(200).json(data))
    .catch(next);
});

router.get("/api/recipeSpoonacular/recipes/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const sql = `
    SELECT * FROM recipes
    WHERE user_id = $1
    AND is_owned_by_user = $2;
  `;
  const sqlParams = [userId, false];
  return db
    .query(sql, sqlParams)
    .then((result) => result.rows)
    .then((data) => res.status(200).json(data))
    .catch(next);
});

router.get("/api/recipeUser/recipes/:userId", async (req, res, next) => {
  const { userId } = req.params;
  const sql = `
    SELECT * FROM recipes
    WHERE user_id = $1
    AND is_owned_by_user = $2;
  `;
  const sqlParams = [userId, true];
  return db
    .query(sql, sqlParams)
    .then((result) => result.rows)
    .then((data) => res.status(200).json(data))
    .catch(next);
});

module.exports = router;
