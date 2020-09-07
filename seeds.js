  
var mongoose     = require("mongoose");
var Campground = require("./models/campground");
var Comment    = require("./models/comment");

const data = [
  {        name: "jalaun",
         image: "https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&h=350",
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"

  },
    
    {    name: "balya",
         image: "https://images.pexels.com/photos/587976/pexels-photo-587976.jpeg?auto=compress&cs=tinysrgb&h=350",
         description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book5"
    },
        {        name: "gaunda",
                 image: "https://images.pexels.com/photos/1840394/pexels-photo-1840394.jpeg?auto=compress&cs=tinysrgb&h=350",
                 description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book"
        } 
 
]

function seedDB(){
	// REMOVE CAMPGROUNDS
	Campground.deleteMany({}, function(err){
		if (err) {
			console.log(err);
		}
		console.log("removed campgrounds !");
		//  add a few campgrounds
	            data.forEach(function(seed){
		        Campground.create(seed, function(err, campground){
			          if (err) {
				          console.log(err)
			          }else{
				          console.log("added a campground");
                         //  create comments
                         Comment.create(
                         {
                         	text:"This place is great",
                         	author:"jaat"

                         },function(err, comment){
                         	if (err) {
                         		console.log("an error has occured");
                                      console.log(err);

                         	}else{
                         		campground.comments.push(comment);
                         		campground.save();
                         		console.log("created new comment")

                         	  }
                         	

                         });

			          }

		})
	});
	
	});

	//  add a few comments
}


module.exports = seedDB;