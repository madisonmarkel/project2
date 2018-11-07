var db = require("../models");

// Requiring path to so we can use relative routes to our HTML files
// var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  
  // Login Passport routes that we need to figure out how it works with our handlebars
  //
  //-------------------------------------------------------------
  // When the website loads... the homepage is displayed
  app.get("/", function(req, res) {

    res.render("index");
  });
  // If the user does not have a login, and click on "sign up" they are directed to this page
  app.get("/signup", function(req, res) {

    res.render("signup");
  });

  // =================== WASN'T WORKING
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, function(req, res) {
    
  //   res.render("members");
  // });

  // app.get("/members", function(req, res) {
    
  //   res.render("members");
  // });
  //-----------------------------------------------
  //

  app.get("/members", isAuthenticated, function(req, res) {
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("members", {
        msg: "Reciprocity",
        recipe: dbRecipes
      });
    });
  });

  // =================== WASN'T WORKING
  // Load page
  // app.get("/members", function(req, res) {
  //   db.Recipe.findAll({}).then(function(dbRecipes) {
  //     res.send("members", {
  //       msg: "Reciprocity",
  //       recipe: dbRecipes
  //     });
  //   });
  // });

  // Load example page and pass in an example by id
  app.get("/recipe/:id", function(req, res) {
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(dbRecipe) {
      res.render("recipe", {
        Recipe: dbRecipe
      });
    });
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function(req, res) {
  //   res.render("404");
  // });

  app.post("/api/recipes", function(req, res) {
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
    }).then(function(dbRecipe){
      console.log(dbRecipe);
      res.json(req.body);
    });
    });

    app.get("/api/recipes", function (req, res) {
      db.Recipe.findAll({}).then(function (data) {

        res.json(data);
      });
    });

    app.delete("/api/recipes/:id", function (req, res) {
      db.Recipe.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (data) {
        res.json(data);
      });
    });
};
