module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstname: DataTypes.STRING,
        lastname: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.TEXT,
        password: DataTypes.TEXT,
    });
    return User;
  }