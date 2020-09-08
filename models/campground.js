 var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
 	name: String,
 	price: String,
 	image: String,
 	description: String,
 	location: String,
 	lat: Number,
 	lng: Number,
 	createdAt: {type:Date, default: Date.now },
 	author: {
 		id: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User"
 		},
 		username: String
 	},
 	comments: [
              {
              	// referencce to the coment id's
              	type: mongoose.Schema.Types.ObjectId,
              	ref: "Comment"
              }
 	]
 });
 module.exports = mongoose.model("Campground", campgroundSchema);


  