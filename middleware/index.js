var Post = require("../models/post");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next)
{
if(req.isAuthenticated())
return next();
req.flash("error","Please login first!");
res.redirect("/login");
}


middlewareObj.checkPostOwnership = function(req,res,next)
{
if(req.isAuthenticated())
{
Post.findById(req.params.id,function(err,post)
{
if(err)
res.redirect("back");
else
{
if(String(post.author.id) == String(req.user._id))
{
next();
}
else
{
res.redirect("back");
}
}
});
}
else
{
req.flash("error","Please Login First!")
res.redirect("/login");
}
}

module.exports = middlewareObj;
