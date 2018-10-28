module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Recipe;
};
