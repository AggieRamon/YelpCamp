var express     = require("express"),
    Campground  = require("../models/campground"),
    Comment     = require("../models/comment"),
    router      = express.Router({mergeParams: true}),
    middleware  = require("../middleware");

//Comments New   
router.get("/new", middleware.isLoggedIn, function(req, res){
   Campground.findById(req.params.id, function(err, campground){
      if(err){
          console.log(err);
      }
      else{
          res.render("comments/new", {campground: campground});    
      }
   });
});

//Comments Create
router.post("/", middleware.isLoggedIn, function(req, res){
   //Lookup campground using id
   Campground.findById(req.params.id, function(err, campground){
      if(err){
          req.flash("error", "Something went wrong");
          res.redirect("/campgrounds");
      } 
      else{
          Comment.create(req.body.comment, function(err, comment){
             if(err){
                 console.log(err);
             } 
             else{
                //Add username and id to comment
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                //Save comment
                comment.save();
                campground.comments.push(comment);
                campground.save();
                req.flash("success", "Successfully added comment");
                res.redirect("/campgrounds/" + campground._id);
             }
          });
      }
   });
});

// Show edit comment form
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
       if(err){
            console.log(err);
       }
       else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});  
       }
    });
});

//Update comment collection, with new comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
      if(err){
          console.log(err);
      }
      else{
          req.flash("success", "Comment deleted");
          res.redirect("/campgrounds/" + req.params.id);
      }
   });
});

module.exports = router;
