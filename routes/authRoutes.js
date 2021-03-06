var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
    // ========================= PASSPORT.JS FUNCTIONALITY 
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        console.log(req.user);

        res.send("/members");
    });

    app.post("/api/signup", function (req, res) {
        console.log(req.body);
        db.User.create({
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username
        }).then(function (user) {
            req.login(user, function (err) {
                if (err) {
                    console.log(err)
                    return next(err);
                }
                return res.send('/members');
            });
            // res.send({
            //   url: "/members",
            // isAuthenticated: true
            // });


            // res.render("members");
        }).catch(function (err) {
            console.log(err);
            res.json(err);
            // res.status(422).json(err.errors[0].message);
        });
    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        req.session.destroy();
        res.redirect("/");
        console.log(req.user + " has logged off!")
    });

    // Route for getting some data about our user to be used client side
    app.get("/api/user_data", function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        } else {
            // Otherwise send back the user's email and id
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });
}