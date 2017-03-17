//Lost and found will be part of the groups collection. It will follow the decorator design pattern, decorating Groups

//set collection as a global variable so no need to keep calling it
//_________________________________________________________________

//require the mongoClient from mongodb module
var MongoClient = require('mongodb').MongoClient;

//mongodb configs
var connectionUrl = 'mongodb://localhost:27017/myproject',
	groupsCollection = 'groups';


MongoClient.connect(connectionUrl, function(err, db) {
	console.log("Connected correctly to server");

	// Get some collection
	var collection = db.collection(groupsCollection);

	//Creates an index on group name
	collection.createIndex({ "Group Name": 1}, {unique: true});

	//Create lost and found
	//createLostAndFound(collection);
	
	//For testing
	//Create a post
	//makePost(collection, "Found phone", "Found this around", "your moms house", "phone.jpg", "FOUND");
	//For testing. Time may need to be changed
	setFound(collection, 1489631366883);

	db.close()
});


function createLostAndFound(collection) { //OVERRIDE GROUP.JS CREATEGROUP FUNCTION
		var lostAndFound = {
			"Group Name" : "Lost and Found", 
			"Privacy"    : "open"	
		};
		collection.insert(lostAndFound, function(error, result) {
		//here result will contain an array of records inserted
		if(!error) {
			console.log("Success : " + result.ops.length + " groups inserted!");
		} else {
			console.log("Some error was encountered!");
			console.log(error);
		}
		});

}

function makePost(collection,title, description, location, picURL, found) { //THIS IS TO OVERRIDE REGULAR MAKEPOST() FUNCITON
	var post = {
			"Title"       : title, 
			"Description" : description,
			"Location"    : location, //location will be used to match goople maps api
			"PicURL"      : picURL,
			"Found"       : found,
			"Time"        : Date.now()
		};
	collection.update(
		{"Group Name" : "Lost and Found"}, 
		{ $push: { "Posts" : post } }, 
	function(error, result) {
		if(!error) {
			console.log("Success : " + result);
		} else {
			console.log("Some error was encountered!");
			console.log(error);
		mongo}	
	}); 			
}

function setFound(collection, postTime) { //uses the post time to uniquely identify it 
	collection.update(
		{"Group Name" : "Lost and Found", "Posts.Time" : postTime } ,
		{ $set: {"Posts.$.Found" : "FOUND" } }, 
	function(error, result) {
		if(!error) {
			console.log("Success : " + result);
		} else {
			console.log("Some error was encountered!");
			console.log(error);
		}	
	}); 			
}

function setLost(collection, postTime) { //uses the post time to uniquely identify it
	collection.update(
		{"Group Name" : "Lost and Found", "Posts.Time" : postTime } ,
		{ $set: {"Posts.$.Found" : "LOST" } }, 
	function(error, result) {
		if(!error) {
			console.log("Success : " + result);
		} else {
			console.log("Some error was encountered!");
			console.log(error);
		}	
	}); 			
}


