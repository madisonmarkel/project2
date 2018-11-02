var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
   // ========================= PASSPORT.JS FUNCTIONALITY 
    app.post("/api/login", passport.authenticate("local"), function(req, res) {

    res.json("/members");
  });

  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
    
    
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
        recipe_name: req.params.recipe_name
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
      recipe_name: req.body.recipe_name,
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
      {recipe_name: req.body.recipe_name,
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
});
};