$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("#signupForm"); // we can make these class/id any name we want
  var emailInput = $("#inputEmail4"); // we can make these class/id any name we want
  var passwordInput = $("#inputPassword4"); // we can make these class/id any name we want
  var userName = $("#inputUserName"); // we can make these class/id any name we want
  var firstName = $("#inputFirstName"); // we can make these class/id any name we want
  var lastName = $("#inputLastName"); // we can make these class/id any name we want

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      firstname: firstName.val().trim(),
      lastname: lastName.val().trim(),
      username: userName.val().trim()
    };

    console.log(userData);
    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.firstname, userData.lastname, userData.username, userData.email, userData.password);

  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstname, lastname, username, email, password) {
    console.log(arguments);
    $.post("/api/signup", {
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
    }).done(function (data) {
      // window.location.replace(data);
      emailInput.val("");
      passwordInput.val("");
      // If there's an error, handle it by throwing up a bootstrap alert
    }).fail(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});