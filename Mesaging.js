//require the mongoClient from mongodb module
var MongoClient = require('mongodb').MongoClient;

//mongodb configs
var connectionUrl = 'mongodb://localhost:27017/myproject',
	inboxCollection = 'Inbox';


MongoClient.connect(connectionUrl, function(err, db) {
	console.log("Connected correctly to server");

	// Get some collection
	var collection = db.collection(inboxCollection);
	collection.createIndex( {"Users": 1}, {unique: false});
	//dont create unqiue index, let findonenadupdate handle that

	//messages for testing
	//sendMessage(collection, "user1", ["user2"], "sup?");
	//sendMessage(collection, "user1", ["user2"], "dis is it by");
	//sendMessage(collection, "user2", ["user1", "user69"], "#1");
	//sendMessage(collection, "user2", ["user1", "user69"], "#2");

	//deleteConversation(collection, ["user69", "user1", "user2"]);
	deleteConversation(collection, ["user2", "user1"]);
	db.close()
});


function sendMessage(collection, sender, recipients, msg) { 
	if(recipients.length >= 1) {
		var Message = 
		recipients.push(sender);
		collection.findOneAndUpdate(
			{ Users: recipients.sort() },
			{ $push: { Messages : {
				"Message": msg, 
				"Time": Date.now(), 
				"Sender": sender 
				} } } ,

			{
				upsert: true
			},
		function(error, result) {
			if(!error) {
				console.log("Success : " + result);
			} else {
				console.log("Some error was encountered!");
				console.log(error);
			}	
		});
	}
	else {
		console.log("Error: Can't have no conversation witcha gawddamn self");
	} 			
}		

function deleteConversation(collection, users) {
	collection.remove(
		{ Users: users.sort() },
		function(error, result) {
			if(!error) {
				console.log("Success : " + result);
			} else {
				console.log("Some error was encountered!");
				console.log(error);
			}	
		});
}
		



