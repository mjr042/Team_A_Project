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
	//
	collection.createIndex({ "Group Name": 1}, {unique: true});
	
	//Create a group
	//Already created so will leave out for now	
	createGroup(collection, 'Team Project - Team C','CS4770', 'Bradley Gavan', 'open');
	
	//Adds an admin
	//for testing
	//addAdmin(collection, 'Team Project - Team B', 'Josh');
	
	//Adds a user
	//for testing
	//addUser(collection, 'Team Project - Team B' , "Rich homie ryan");
	
	//Removes a user
	//For testing
	//removeUser(collection, 'Team Project - Team B', 'Bradley Gavan');

	//Changes privacy
	//For testing
	//setPrivacy(collection, 'Team Project - Team B', 'Strict');

	db.close()
});


function createGroup(collection, groupName, course, user, privacy) { //also create a link 	
		var group = {
			"Group Name" : groupName, 
			"Course"     : course,
			"Users"      : [user],
			"Admins"     : [user],
			"Privacy"    : privacy	
		};
		collection.insert(group, function(error, result) {
		//here result will contain an array of records inserted
		if(!error) {
			console.log("Success : " + result.ops.length + " groups inserted!");
		} else {
			console.log("Some error was encountered!");
			console.log(error);
		}
		});

}

function addAdmin(collection, group, user) { // treat as a set $addToSet
	collection.update(
			{"Group Name" : group}, 
			{ $push: { Admins: user } }, function(error, result) {
	if(!error) {
		console.log("Success : " + result);
	} else {
		console.log("Some error was encountered!");
		console.log(error);
	}	
	}); //sort			
}
					
function removeUser(collection, group, user) { // if user is an admin, also remove them as an admin
	collection.update( 
		{"Group Name": group},
		{ $pull: { Users: user } },
		{ multi: false }, function(error, result) {
	if(!error) {
		console.log("Success : " + result);
	} else {
		console.log("Some error was encountered!");
		console.log(error);
	}	

	}); 			
}

function addUser(collection, group, user) { 
	collection.update(
		{"Group Name" : group}, 
		{ $push: { Users: user } }, function(error, result) {
	if(!error) {
		console.log("Success : " + result);
	} else {
		console.log("Some error was encountered!");
		console.log(error);
	}	

	}); 			
}
function setPrivacy(collection, group, privacy) {
	collection.update(
		{"Group Name": group},
		{ $set: {"Privacy": privacy } } , function(error, result) {
	if(!error) {
		console.log("Success : " + result);
	} else {
		console.log("Some error was encountered!");
		console.log(error);
	}	

	}); 			
}	


