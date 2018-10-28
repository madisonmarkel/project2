var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Recipe.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Recipe.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Recipe.destroy({ where: { id: req.params.id } }).then(function(data) {
      res.json(data);
    });
  });
};
