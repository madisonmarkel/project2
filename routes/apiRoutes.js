var db = require("../models");

module.exports = function(app) {
  // ========================= GET ALL RECIPES
  app.get("/api/recipes", function(req, res) {
    db.Recipe.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // ========================= GET SPECIFIC RECIPES
  app.get("/api/:recipe", function(req, res) {
    db.Recipe.findAll({
      where: {
        title: req.params.recipe_title
      }
    }).then(function(results) {
      res.json(results);
    });
  });

  // ========================= CREATE NEW RECIPE
  app.post("/api/recipes", function(req, res) {
    console.log("Recipe Data:");
    console.log(req.body);
    db.Recipe.create({
      recipe_title: req.body.recipe_title,
      ingredients: req.body.ingredients,
      dietary_category: req.body.dietary_category,
      type_category: req.body.type_category, 
      photo: req.body.photo,
      instructions: req.body.instructions,
      serving: req.body.serving,
      cook_time: req.body.cook_time, 
      cook_method: req.body.cook_method, 
    });
  });

  // ========================= UPDATE RECIPE
  app.put("/recipe/:id", function(req, res) {
    console.log("UPDATE RECIPE APIROUTES:");
    console.log(req.body);
    db.Recipe.update(
      {recipe_title: req.body.recipe_title,
      dietary_category: req.body.dietary_category,
      type_category: req.body.type_category, 
      photo: req.body.photo,
      instructions: req.body.instructions,
      ingredients: req.body.ingredients,
      serving: req.body.serving,
      cook_time: req.body.cook_time, 
      cook_method: req.body.cook_method},

      {where: req.params.id}
    ).then(function(rowsUpdated) {
      res.json(rowsUpdated)
    });
  });

  // ========================= DELETE NEW RECIPE  
  app.delete("/api/recipes/:id", function(req, res) {
    db.Recipe.destroy({ 
      where: { 
        id: req.params.id 
      } 
    }).then(function(data) {
      res.json(data);
    });
  });
};
