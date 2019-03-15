var express	= require("express");
var faker	= require("faker");
var router	= express.Router();
var passport	= require("passport");
var User	= require("../models/user");


router.get("/",function(req,res){
res.render("homepage");
});

router.get("/login",function(req,res)
{
res.render("login",{error:req.flash("error")});
});

router.get("/register",function(req,res)
{
res.render("register",{error:req.flash("error")});
});


router.get("/logout",function(req,res)
{
req.logout();
res.redirect("/");
});


router.post('/login',passport.authenticate("local",{successRedirect:"/posts",failureRedirect:"/login"}),function(req,res)
{

});

router.post("/register",function(req,res)
{
var password = req.body.password;
var alias = faker.internet.userName();
var username = req.body.username;

var newUser = new User({username:username,alias:alias});

User.register(newUser,password,function(err,user)
{
if(err)
{
req.flash("error",err.message);
res.redirect("/register");
}
else
{
passport.authenticate("local")(req,res,function()
{
req.flash("success","Welcome @"+req.user.alias);
res.redirect("/posts");
});
}
});
});


module.exports = router;
