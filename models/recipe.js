module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    recipe_title: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    photo: DataTypes.TEXT,
    serving: DataTypes.TEXT,
    cook_time: DataTypes.TEXT,
    cook_method: DataTypes.TEXT,
    dietary_category: DataTypes.TEXT,
    type_category: DataTypes.TEXT,
  });
  return Recipe;
};
