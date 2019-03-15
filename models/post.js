var mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
{
text:String,
author:{
id:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},
alias:String
}
});

var postSchema = mongoose.Schema({
title:String,
image:String,
body:String,
author:{
id:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},
alias:String
},
comments:[commentSchema],
created:{type:Date, default:Date.now}
});

module.exports = mongoose.model("Post",postSchema);
