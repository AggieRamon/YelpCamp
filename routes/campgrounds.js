var express = require("express"),
    Campground = require("../models/campground"),
    router  = express.Router(),
    middleware = require("../middleware");
    
//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });   
});
//Update Camground Route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
          console.log(err);
      } 
      else{
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

//Delete Campground
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          console.log(err);
          res.redirect("/campgrounds");
      }
      else{
          res.redirect("/campgrounds");
      }
   });
});
    
//Index - get all campgrounds
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find(function(err, allCampgrounds){
       if(err){
            console.log("Err" + err);
       } 
       else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});  
       }
    });
});

// Create - Create new campground
router.post("/", middleware.isLoggedIn, function(req, res){
    // Get data from form, and add to campgrounds array
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = {name: name, price: price, image: image, description: desc, author:author};
    // Create new campground in DB
    Campground.create(newCampground, function(err, campground){
        if(err){
            console.log("Error " + err);
        }
        else{
            // Redirect to campgrounds page
            console.log(campground);
            res.redirect("/campgrounds");
        }
    });
});

//New - Display form to create new campground
router.get("/new", middleware.isLoggedIn, function(req,res){
   res.render("campgrounds/new"); 
});

// Show - Shows more info on a campground
router.get("/:id", function(req, res){
    //find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
           //render show template of the campground
           res.render("campgrounds/show", {campground:foundCampground});
        }
    });
});

module.exports = router;