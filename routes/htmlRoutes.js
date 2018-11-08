var db = require("../models");

// Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  // Login Passport routes that we need to figure out how it works with our handlebars
  //
  //-------------------------------------------------------------
  // When the website loads... the homepage is displayed
  app.get("/", function (req, res) {

    res.render("index", {
      layout: 'main.handlebars'
    });
  });
  // If the user does not have a login, and click on "sign up" they are directed to this page
  app.get("/signup", function (req, res) {

    res.render("signup", {
      layout: 'signup.handlebars'
    });
  });

  app.get("/members", isAuthenticated, function (req, res) {
    db.Recipe.findAll({}).then(function (dbRecipes) {
      res.render("members", {
        msg: "Reciprocity",
        recipe: dbRecipes
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/recipe/:id", function (req, res) {
    db.Recipe.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbRecipe) {
      console.log(dbRecipe)
      var newDietary = dbRecipe.dietary_category.split(",");
      var newCategory = dbRecipe.type_category.split(",");
      var newIngredients = dbRecipe.ingredients.split("\n")
      var newPrettyRecipe = {
        recipe_name: dbRecipe.recipe_name,
        ingredients: newIngredients,
        dietary_category: newDietary,
        type_category: newCategory,
        photo: dbRecipe.photo,
        instructions: dbRecipe.instructions,
        serving: dbRecipe.serving,
        cook_time: dbRecipe.cook_time,
        cook_method: dbRecipe.cook_method,
      }
      res.render("recipe", {
        Recipe: newPrettyRecipe
      });
    });
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });

};