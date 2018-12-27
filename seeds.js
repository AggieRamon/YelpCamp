var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    data = [
        {
            name: "Cloud's Rest",
            image: "https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            description: "This is Cloud's Rest"
        },
        {
            name: "Desert Willow",
            image: "https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            description: "This is Desert Willow"  
        },
        {
            name: "Sky Ranch",
            image: "https://images.unsplash.com/photo-1525209149972-1d3faa797c3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
            description: "This is Sky Ranch"
        }
    ];

function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Removed Campgrounds");
            //remove comments
            Comment.remove({}, function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Removed Comments");
                    //add a few campgrounds
                    data.forEach(function(seed){
                        Campground.create(seed, function(err, campground){
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("Added a campground");
                                //add a few comments
                                Comment.create({
                                    text: "This place is great, but I wish there was internet",
                                    author: "Homer"
                                }, function(err, comment){
                                    if(err){
                                        console.log(err);
                                    }
                                    else{
                                        campground.comments.push(comment);
                                        campground.save();
                                        console.log("Created new comment");
                                    }
                                    
                                });
                            }
                        });
                    });
                }
            });
        }
    });
}



module.exports = seedDB;