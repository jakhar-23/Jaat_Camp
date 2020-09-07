  require('dotenv').config();

 const express         = require("express"),
      app              = express(),
      bodyParser       = require("body-parser"),
      mongoose         = require("mongoose"),
      flash            = require("connect-flash"), 
      passport         = require("passport"),
      localStrategy    = require("passport-local",
      methodOverride   = require("method-override"),  
      Campground       = require("./models/campground"),
      campgroundSchema = require("./models/campground"),
      Comment          = require("./models/comment"),
      User             = require("./models/user"),
      seedDB           = require("./seeds"))

// requiring routes
  var commentRoutes    = require("./routes/comments"),
      campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes      = require("./routes/index")

mongoose.connect("mongodb://localhost:27017/yelp_campfinalDB", {useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false });
app.use(bodyParser.urlencoded({extended: true}));
 app.set("view engine", "ejs");
 app.use(express.static(__dirname + "/public"));
 app.use(methodOverride("_method"));
 app.use(flash());


 // ################ seed the database
 // seedDB();
 // ################

 // PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "JAAT BALWAN JAI BHAGWAAN",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
        res.locals.currentUser = req.user;
        res.locals.error       = req.flash("error");
        res.locals.success     = req.flash("success");
        next();
});



app.get("/", function(req, res){
	res.render("landing");
});


function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
       return next();
  }
  res.redirect("/login");
}

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);




app.listen(3000, function(req, res){
	console.log("Hurrayyyyyy!!!.. THE YELP-CAMP SERVER HAS STARTED......"); 
});