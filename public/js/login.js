$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("#formlogin"); // we can make these class/id any name we want
  var emailInput = $("#email"); // we can make these class/id any name we want
  var passwordInput = $("#password"); // we can make these class/id any name we want

  console.log(loginForm);

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    console.log('Hi')
    event.preventDefault();
    var userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    console.log('Howdy')
    $.post("/api/login", {
      email: email,
      password: password
    }).done(function(data) {
      window.location.href = data;
      // If there's an error, log the error
    }).fail(function(err) {
      console.log(err);
    });
  }


