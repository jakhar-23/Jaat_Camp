 var express       = require("express");
 var router        = express.Router();
 var Campground    = require("../models/campground");
 var middleware    = require("../middleware");



 
  //INDEX - show all campgrounds
router.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
          res.render("campgrounds/index",{campgrounds: allCampgrounds, page: 'campgrounds'});
       }
    });
});

  // CREATE - add new campgrunds to DB
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
  // get data from & add to campgrounds array
  var name= req.body.name;
  var image = req.body.image;
  var description = req.body.description ;
  var price       = req.body.price;
  var author = {
    id: req.user._id,
    username: req.user.username
  }
  var newCampground = {name: name, image: image, price: price, description: description, author: author}
  // CREATE A NEW CAMPGROUND & SAVE TO DB
  Campground.create(newCampground, function(err, newlyCreated){
    if (err) {
      console.log(err);
    }else{
      // redirect back to campgrounds page
      console.log(newlyCreated)
      res.redirect("/campgrounds");
    }
  })
});

// NEW - show form to create new campgrounds
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){

  res.render("campgrounds/new");
});

router.get("/campgrounds/:id", function(req, res){
  // find the campgrounds with provided ID
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if (err) {
      console.log(err);
    }else{
      console.log(foundCampground); 
      // render show the template with that campground
      res.render("campgrounds/show", {campground: foundCampground});
    }
  });

});
// EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
  
  Campground.findById(req.params.id, function(err, foundCampground){
      
      res.render("campgrounds/edit", {campground: foundCampground});
  });

});
// UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
  // find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if (err) {
      res.redirect("/campgrounds");
    }else{
       // redirect somewhere (show page)
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
 
});
//  DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      res.redirect("/campgrounds");
    }else{
      res.redirect("/campgrounds");
    }
  });
  
});


// middleware is in middleware directory




module.exports = router;


//   var newCampground = {name: name, image: image, description: desc, cost: cost, author:author, location: location, lat: lat, lng: lng};
//     // Create a new campground and save to DB
//     Campground.create(newCampground, function(err, newlyCreated){
//         if(err){
//             console.log(err);
//         } else {
//             //redirect back to campgrounds page
//             console.log(newlyCreated);
//             res.redirect("/campgrounds");
//         }
//     });
//   });
// });
// //NEW - show form to create new campground
// router.get("/new", isLoggedIn, function(req, res){
//    res.render("campgrounds/new"); 
// });
// // SHOW - shows more info about one campground
// router.get("/:id", function(req, res){
//     //find the campground with provided ID
//     Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
//         if(err || foundCampground == undefined){
//         if(err || !foundCampground){
//             console.log(err);
//             req.flash('error', 'Sorry, that campground does not exist!');
//             return res.redirect('/campgrounds');
//         }
//         console.log(foundCampground)
//         //render show template with that campground
//         res.render("campgrounds/show", {campground: foundCampground});
//     });
// });

// // EDIT - shows edit form for a campground
// router.get("/:id/edit", checkUserCampground, function(req, res){
//     //find the campground with provided ID
//     Campground.findById(req.params.id, function(err, foundCampground){
//       if(err || foundCampground == undefined){
//           console.log(err);
//           req.flash('error', 'Sorry, that campground does not exist!');
//           return res.redirect('/campgrounds');
//       }
//       //render edit template with that campground
//       res.render("campgrounds/edit", {campground: foundCampground});
//     });
// router.get("/:id/edit", isLoggedIn, checkUserCampground, function(req, res){
//   //render edit template with that campground
//   res.render("campgrounds/edit", {campground: req.campground});
// });

// // PUT - updates campground in the database
// router.put("/:id", isSafe, function(req, res){
//   geocoder.geocode(req.body.location, function (err, data) {
//     var lat = data.results[0].geometry.location.lat;
//     var lng = data.results[0].geometry.location.lng;
//     var location = data.results[0].formatted_address;
//     var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
//     Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, campground){
//         if(err){
//             req.flash("error", err.message);
//             res.redirect("back");
//         } else {
//             req.flash("success","Successfully Updated!");
//             res.redirect("/campgrounds/" + campground._id);
//         }
//     });
//   });
// });

// // DELETE - removes campground and its comments from the database
// router.delete("/:id", function(req, res) {
//   Campground.findByIdAndRemove(req.params.id, function(err, campground) {
// router.delete("/:id", isLoggedIn, checkUserCampground, function(req, res) {
//     Comment.remove({
//       _id: {
//         $in: campground.comments
//         $in: req.campground.comments
//       }
//     }, function(err) {
//       if(err) {
//           req.flash('error', err.message);
//           res.redirect('/');
//       } else {
//           req.campground.remove(function(err) {
//             if(err) {
//                 req.flash('error', err.message);
//                 return res.redirect('/');
//             }
//             req.flash('error', 'Campground deleted!');
//             res.redirect('/campgrounds');
//           });
//       }
//     }, function(err, comments) {
//       req.flash('error', campground.name + ' deleted!');
//       res.redirect('/campgrounds');
//     })
//   });
// });

// module.exports = router