// Get references to page elements
var $recipeName = $("#form_recipe_name");
var $recipeIngredients = $("#form_recipe_ingredients");
var $submitBtn = $("#submit");
var $recipeList = $("#recipe-list");

// The API object contains methods for each kind of request we'll make

var API = {
  saveRecipe: function(Recipe) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      url: "api/recipes",
      data: JSON.stringify(Recipe)
    });
  },
  getRecipes: function() {
    return $.ajax({
      url: "api/recipes",
      type: "GET"
    });
  },
  deleteRecipe: function(id) {
    return $.ajax({
      url: "api/recipes/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshRecipes = function() {
  API.getRecipes().then(function(data) {
    console.log("INDEX.JS REFRESH RECIPES DATA " + data);
    var $recipes = data.map(function(Recipe) {
      var $a = $("<a>")
        .text(Recipe.ingredients)
        .attr("href", "/recipe/" + Recipe.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": Recipe.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $recipeList.empty();
    $recipeList.append($recipes);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var recipe = {
    recipe_name: $recipeName.val().trim(),
    ingredients: $recipeIngredients.val().trim()
  };

  if (!(recipe.recipe_name && recipe.ingredients)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveRecipe(recipe).then(function() {
    refreshRecipes();
  });

  $recipeName.val("");
  $recipeIngredients.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteRecipe(idToDelete).then(function() {
    refreshRecipes();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$recipeList.on("click", ".delete", handleDeleteBtnClick);
