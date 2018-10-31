var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {

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
  });

    // Get all examples
    app.get("/api/examples", function (req, res) {
      db.Recipe.findAll({}).then(function (data) {
        res.json(data);
      });
    });
  
    // Create a new example
    app.post("/api/examples", function (req, res) {
      db.Recipe.create(req.body).then(function (data) {
        res.json(data);
      });
    });
  
    // Delete an example by id
    app.delete("/api/examples/:id", function (req, res) {
      db.Recipe.destroy({
        where: {
          id: req.params.id
        }
      }).then(function (data) {
        res.json(data);
      });
    });

};