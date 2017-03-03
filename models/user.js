/*
* User.js initializes a User object and stores inputted user information
* into MongoDB in encryted form to avoid other users seeing other 
* users' credentials.
*/

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	email: {
		type: String
		trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'E-mail must be a valid MUN e-mail.'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
		validate: {
    validator: function(value) {
      return value === '@mun.ca';
    },
    message: 'Invalid email.',
	},
	name: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

// Creates user and saves input to MongoDB
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

// Returns user based on username
module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

// Returns user by ID
module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

// Compares password to ensure that Password and Confirm Password fields match.
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}