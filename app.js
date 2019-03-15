var express 	= require('express');
var app 	= express();
var bodyParser 	= require('body-parser');
var expressSanitizer = require("express-sanitizer");
var mongoose 	= require('mongoose');
var flash	= require("connect-flash");
var passport 	= require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");
var methodOverride = require("method-override");
var faker	= require("faker");
var User	= require("./models/user");
var Post 	= require("./models/post");
var Comment 	= require("./models/comment");

app.use(flash());

app.use(require("express-session")({
secret:"the voice of the voiceless",
resave:false,
saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

//mongoose.connect("mongodb://localhost/alias_db");
mongoose.connect("mongodb://tanish:dbuser1@ds145043.mlab.com:45043/alias_db");

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(methodOverride("_method"));

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var indexRoutes		= require("./routes/index");
var postRoutes		= require("./routes/posts");
var commentRoutes	= require("./routes/comments");

app.use(indexRoutes);
app.use(postRoutes);
app.use(commentRoutes);


app.listen(process.env.PORT, process.env.IP, function()
{
console.log("alias server is live!");
});

/*app.listen(3000,function()
{
console.log("alias server is live!");
});*/

//app.listen(8080,"192.168.1.15");
