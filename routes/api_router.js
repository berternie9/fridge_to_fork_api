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
  db.query(sql, sqlParams)
    .then((result) => res.status(201).json(result.rows[0]))
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
  db.query(sql, sqlParams)
    .then((result) => res.status(201).json(result.rows[0]))
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
  db.query(sql, sqlParams)
    .then((result) => {
      if (!result.rows.length) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.status(200).json(result.rows[0]);
    })
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
  db.query(sql, sqlParams)
    .then((result) => {
      if (!result.rows.length) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(next);
});

router.get("/api/recipeSpoonacular/:recipeId", (req, res, next) => {
  const { recipeId } = req.params;
  const sql = `SELECT * FROM recipes WHERE recipe_data->>'id' = $1;`;
  const sqlParams = [recipeId];
  db.query(sql, sqlParams)
    .then((result) => {
      if (!result.rows.length) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(next);
});

router.get("/api/recipeUser/:recipeId", (req, res, next) => {
  const { recipeId } = req.params;
  const sql = `SELECT * FROM recipes WHERE id = $1;`;
  const sqlParams = [recipeId];
  db.query(sql, sqlParams)
    .then((result) => {
      if (!result.rows.length) {
        return res.status(404).json({ error: "Recipe not found" });
      }
      res.status(200).json(result.rows[0]);
    })
    .catch(next);
});

router.get("/api/recipeSpoonacular/recipes/:userId", (req, res, next) => {
  const { userId } = req.params;
  const sql = `
    SELECT * FROM recipes
    WHERE user_id = $1
    AND is_owned_by_user = $2;
  `;
  const sqlParams = [userId, false];
  db.query(sql, sqlParams)
    .then((result) => res.status(200).json(result.rows))
    .catch(next);
});

router.get("/api/recipeUser/recipes/:userId", (req, res, next) => {
  const { userId } = req.params;
  const sql = `
    SELECT * FROM recipes
    WHERE user_id = $1
    AND is_owned_by_user = $2;
  `;
  const sqlParams = [userId, true];
  db.query(sql, sqlParams)
    .then((result) => res.status(200).json(result.rows))
    .catch(next);
});

router.get("/api/user/:email", (req, res, next) => {
  const { email } = req.params;
  const sql = `
    SELECT id FROM users
    WHERE email = $1;
  `;
  const sqlParams = [email];
  db.query(sql, sqlParams)
    .then((result) => {
      if (!result.rows.length) {
        return res.status(404).json({ error: "User not found" });
      }
      res.status(200).json(result.rows[0].id);
    })
    .catch(next);
});

module.exports = router;
