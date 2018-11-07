// ========= SPOONCULAR API ===========
// SEARCH
$( "#api_submit" ).click(function() {
  event.preventDefault();
  var userInput = $("#user_apiSearch1").val().trim() + "," + $("#user_apiSearch2").val().trim() + "," + $("#user_apiSearch3").val().trim() + "," + $("#user_apiSearch4").val().trim();

  var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=" + userInput;
  $.ajax({
      headers: { "X-Mashape-Key" : "YL7sjzCOlkmshn4ncJBHXNwxEE76p1coUtgjsnMqZOuhZvIUcy",
      "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"},
      method: "GET",
      url: queryURL,
      data: {

      }
    }).then(function(result) {
      console.log(result);

      // =================== SEARCH RESULTS
      for (var i=0; i < result.length; i++) {
        recipeID = result[i].id;
        recipePhoto = result[i].image;
        recipeTitle = result[i].title;
        console.log("Results[i].id: " + result[i].id);

        var tBody = $("#api_search_append");
        var tRowData = $("<tr>");
        // MORE INFO
        var tRowInfo = $("<button class='api_more_info btn btn-primary' data-toggle='modal' data-target='#exampleModalLong'" + "value=" + recipeID + ">More Info</button>");
        // PHOTO
        var tRowPhoto = $("<br><img class='apiImages' src=" + recipePhoto + ">");
        // ADD TO BOOK
        var tRowAdd = $("<button class='api_add btn btn-primary'" + "value=" + recipeID + ">Add to Recipe Book</button>");

        tRowData.append(tRowPhoto);
        tRowData.append(tRowAdd);
        tRowData.append(tRowInfo);
        tRowData.prepend(recipeTitle);
        tBody.append(tRowData);
      };
      
    // ================= MORE INFO
        // MORE INFORMATION ABOUT RECIPE
        $(".api_more_info" ).click(function() {
          event.preventDefault();
          //var recipeID = $(this).result.id;
          //console.log($(this).attr('value'));
          var thisRecipeID = $(this).attr('value');
          var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + thisRecipeID + "/information?includeNutrition=false";
          $.ajax({
              headers: { "X-Mashape-Key" : "YL7sjzCOlkmshn4ncJBHXNwxEE76p1coUtgjsnMqZOuhZvIUcy",
              "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"},
              method: "GET",
              url: queryURL,
              data: {

              }
            }).then(function(result) {
              console.log(result);
                    $("#recipeName").text(result.title);
                    $("#recipePic").attr("src", result.image);
                    $("#recipeServing").text("Servings: " + result.servings);
                    $("#recipeInstructions").html("Instructions: " + result.instructions);
                    $("#recipeIngredients").text("Ingredients: " + result.extendedIngredients[0].originalString);
                    // shows modal
                    $("#recipe-api-modal").modal("toggle");
                    //});
             });
                
          });

// ================= ADD TO BOOK
        // ADD TO RECIPE
        $( ".api_add" ).click(function(recipeID) {
          event.preventDefault();
          var thisRecipeID = $(this).attr('value');
          //var recipeID = $(this).result.id;
          // console.log( "ADD TO BOOK RECIPE ID: " + recipeID );
          // console.log( "ADD TO BOOK $this RECIPE ID: " + $(this).recipeID );
          // console.log( "ADD TO BOOK this.recipeID" + this.recipeID);
          //console.log( "ADD TO BOOK result[i].recipeID" + result[i].recipeID);

          var queryURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + thisRecipeID + "/information?includeNutrition=false";
          $.ajax({
              headers: { "X-Mashape-Key" : "YL7sjzCOlkmshn4ncJBHXNwxEE76p1coUtgjsnMqZOuhZvIUcy",
              "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com"},
              method: "GET",
              url: queryURL,
              data: {

              }
            }).then(function(result) {
                var recipe = {
                  recipe_name: result.title,
                  instructions: result.instructions,
                  ingredients: result.extendedIngredients[0].originalString,
                  cook_time: result.readyInMinutes,
                  serving: result.servings,
                  photo: result.image,
              }
            //};
              API.saveRecipe(recipe).then(function() {
                refreshRecipes();
              });
            
              $recipeName.val("");
              $recipeIngredients.val("");
              $recipeInstructions.val("");
              $recipeTime.val("");
              $recipeMethod.val("");
              $recipeServings.val("");
              $recipePhoto.val("");
              $recipeCategory.val("");
              $recipeDietary.val("");

              });
          });
    });
});


// RECIPE APPENDS AND WHAT NOTS

// Get references to page elements
var $recipeName = $("#form_recipe_name");
var $recipeIngredients = $("#form_recipe_ingredients");
var $recipeInstructions = $("#form_recipe_instructions");
var $recipeTime = $("#form_recipe_time");
var $recipeMethod = $("#form_recipe_method");
var $recipeServings = $("#form_recipe_servings");
var $recipePhoto = $("#form_recipe_photo");
var $recipeCategory = $("#form_recipe_category");
var $recipeDietary = $("#form_recipe_dietary");

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
    console.log(data);
    var $recipes = data.map(function(Recipe) {
      var $a = $("<a>")
        .text(Recipe.recipe_name)
        .attr("href", "/recipe/" + Recipe.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": Recipe.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("Delete");

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
    ingredients: $recipeIngredients.val().trim(),
    instructions: $recipeInstructions.val().trim(),
    cook_time: $recipeTime.val().trim(),
    cook_method: $recipeMethod.val().trim(),
    serving: $recipeServings.val().trim(),
    photo: $recipePhoto.val().trim(),
    type_category: $recipeCategory.val(),
    dietary_category: $recipeDietary.val(),
  };

  if (!(recipe.recipe_name && recipe.ingredients && recipe.instructions)) {
    alert("You must enter a name, ingredients, and instructions!");
    return;
  }

  console.log(recipe);

  API.saveRecipe(recipe).then(function() {
    refreshRecipes();
  });

  $recipeName.val("");
  $recipeIngredients.val("");
  $recipeInstructions.val("");
  $recipeTime.val("");
  $recipeMethod.val("");
  $recipeServings.val("");
  $recipePhoto.val("");
  $recipeCategory.val("");
  $recipeDietary.val("");
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
