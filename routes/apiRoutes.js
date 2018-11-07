var db = require("../models");

module.exports = function (app) {

  // ========================= GET ALL RECIPES
  app.get("/api/recipes", function (req, res) {
    db.Recipe.findAll({}).then(function (data) {
      console.log(data);
      res.json(data);
    });
  });

  // ========================= GET SPECIFIC RECIPES
  app.get("/api/:recipe", function (req, res) {
    db.Recipe.findAll({
      where: {
        recipe_name: req.params.recipe_name
      }
    }).then(function (results) {
      res.json(results);
    });
  });

  // ========================= CREATE NEW RECIPE
  // app.post("/api/recipes", function (req, res) {

  //   db.Recipe.create({
  //     recipe_name: req.body.recipe_name,
  //     ingredients: req.body.ingredients,
  //     dietary_category: req.body.dietary_category,
  //     type_category: req.body.type_category,
  //     photo: req.body.photo,
  //     instructions: req.body.instructions,
  //     serving: req.body.serving,
  //     cook_time: req.body.cook_time,
  //     cook_method: req.body.cook_method,
  //   });
  // });

  app.post("/api/recipes", function (req, res) {
    console.log(req.user.username);
    db.Recipe.create({
      recipe_name: req.body.recipe_name,
      // dietary_category: DataTypes.TEXT,
      // type_category: DataTypes.TEXT,
      photo: req.body.photo,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      serving: req.body.serving,
      cook_time: req.body.cook_time,
      cook_method: req.body.cook_method,
      user: req.user.username
    }).then(function (dbRecipe) {
      console.log(dbRecipe);
      res.json(req.body);
    });
  });

  // ========================= UPDATE RECIPE
  app.put("/recipe/:id", function (req, res) {
    console.log("UPDATE RECIPE APIROUTES:");
    console.log(req.body);
    db.Recipe.update({
        recipe_name: req.body.recipe_name,
        dietary_category: req.body.dietary_category,
        type_category: req.body.type_category,
        photo: req.body.photo,
        instructions: req.body.instructions,
        ingredients: req.body.ingredients,
        serving: req.body.serving,
        cook_time: req.body.cook_time,
        cook_method: req.body.cook_method
      },

      {
        where: req.params.id
      }
    ).then(function (rowsUpdated) {
      res.json(rowsUpdated)
    });
  });

  app.get("/api/recipes", function (req, res) {
    db.Recipe.findAll({}).then(function (data) {

      res.json(data);
    });
  });


  // ========================= DELETE NEW RECIPE  
  app.delete("/api/recipes/:id", function (req, res) {
    db.Recipe.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });
}