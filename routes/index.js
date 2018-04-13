var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User    =  require("../models/user");

//AUTH ROUTES

//SHOW REGISTER FORM

router.get("/", function(req, res){
    res.render("landing");
});

router.get("/about", function(req, res){
    res.render("about");
});


router.get("/register",function(req,res){
   res.render("register",{page:'register'}); 
});

// Handle Sign Up Logic

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
           res.redirect("/dishes"); 
        });
    });
});

//show Login Form

router.get("/login", function(req, res) {
   res.render("login",{page:'login'}); 
});

//Handling Logic
router.post("/login", passport.authenticate("local",
{
    successRedirect:"/dishes",
    failureRedirect:"/login",
    successFlash: "Welcome",
    failureFlash: "Invalid Username or Password"
}),function(req,res){
    
});

//LOGOUT ROUTE

router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/dishes");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports=router;