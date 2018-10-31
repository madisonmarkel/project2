DROP DATABASE IF EXISTS recipe_db;
CREATE DATABASE recipe_db;

USE recipe_db;

-- cateogry: dietary type (veggie, vegan, gluten free, celiac friendly, kosher) - drop down menu
-- category: type (desserts, seafood, breakfast, lunch, brunch, dinner, meat, poultry, drinks, pasta)

CREATE TABLE recipes(
    id INTEGER NOT NULL AUTO_INCREMENT,
    recipe_title VARCHAR(100) NOT NULL,
    dietary_category VARCHAR(500),
    type_category VARCHAR(500),
    photo VARCHAR(500),
    instructions VARCHAR(10000) NOT NULL,
    ingredients VARCHAR(500) NOT NULL,
    serving VARCHAR(20),
    cook_time VARCHAR(100),
    cook_method VARCHAR(500),
    createdAt TIMESTAMP NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE users(
    id INTEGER NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password blob,
)

SELECT * FROM recipes