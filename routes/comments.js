var express	= require("express");
var router	= express.Router();
var Post	= require("../models/post");
var Comment	= require("../models/comment");
var middleware	= require("../middleware");

router.get("/posts/:id/comments/new",middleware.isLoggedIn,function(req,res)
{
Post.findById(req.params.id,function(err,post)
{
res.render("comment",{post:post,user:req.user});
});
});

router.post("/posts/:id/comments",middleware.isLoggedIn,function(req,res)
{
Post.findById(req.params.id,function(err,post)
{
if(err)
{
console.log(err);
res.redirect("/posts");
}
else
{
Comment.create(req.body.comment,function(err,comment)
{
if(err)
{
console.log(err);
}
else
{
comment.author.id = req.user._id;
comment.author.alias = req.user.alias;
comment.markModified("author");
comment.save();
post.comments.push(comment);
post.markModified("comments");
post.save();
res.redirect("/posts/" + post._id);
}
});
}
});
});

module.exports = router;
