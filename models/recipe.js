module.exports = function(sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    recipe_name: DataTypes.STRING,
    dietary_category: DataTypes.TEXT,
    type_category: DataTypes.TEXT,
    photo: DataTypes.TEXT,
    instructions: DataTypes.TEXT,
    ingredients: DataTypes.TEXT,
    serving: DataTypes.TEXT,
    cook_time: DataTypes.TEXT,
    cook_method: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
  return Recipe;
};
