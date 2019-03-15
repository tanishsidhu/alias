var express	= require("express");
var router	= express.Router();
var Post	= require("../models/post");
var middleware	= require("../middleware");


router.get("/posts",middleware.isLoggedIn,function(req,res)
{
Post.find({},function(err,posts)
{
if(err)
console.log(err);
else
res.render("index",{posts:posts,user:req.user,success:req.flash("success")});
});
});

router.get("/posts/:id",middleware.isLoggedIn,function(req,res)
{
Post.findById(req.params.id).populate("comments").exec(function(err,post)
{
if(err)
res.redirect("/posts");
else
{
res.render("show",{post:post,user:req.user});
}
});
});

router.get("/newpost",middleware.isLoggedIn,function(req,res)
{
res.render("newpost",{user:req.user});
});

router.get("/posts/:id/edit",middleware.checkPostOwnership,function(req,res)
{
Post.findById(req.params.id,function(err,post)
{
if(err)
console.log(err);
else
res.render("editpost",{post:post});
});
});

router.put("/posts/:id",middleware.checkPostOwnership,function(req,res)
{
req.body.updatedpost.body = req.sanitize(req.body.updatedpost.body);
Post.findByIdAndUpdate(req.params.id,req.body.updatedpost,function(err,post)
{
if(err)
res.redirect("/posts")
else
res.redirect("/posts/"+req.params.id);
});
});

router.delete("/posts/:id",middleware.checkPostOwnership,function(req,res)
{
Post.findByIdAndRemove(req.params.id,function(err)
{
if(err)
console.log(err);
else
{
req.flash("success","Post successfully deleted!");
res.redirect("/posts");
}
});
});

router.post("/newpost",middleware.isLoggedIn,function(req,res)
{
req.body.body = req.sanitize(req.body.body);
Post.create(
{
title:req.body.title,
image:req.body.image,
body:req.body.body,
author:{id:req.user._id,alias:req.user.alias}
},
function(err,post)
{
if(err)
console.log(err);
else
res.redirect("/posts");
}
);
});

module.exports = router;
