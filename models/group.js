// Model

var mongoose = require('mongoose');


// create Group schema
var GroupSchema = mongoose.Schema({
  groupName   : { type: String, required: true, unique: true, index:true },
  course      : { type: String, required: true, unique: true },
  users       : String, //CHANGE *************
  admins      : String,
  privacy     : String, 
  description : String,
  groupPic    : String,
  created_at  : { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', GroupSchema);

module.exports.doCreate = function(newGroup) {
	console.log(newGroup.groupName);
	newGroup.save(); 

	}

/*module.exports.index = function() {}

moudle.exports.findGroupByGroupName = function(groupName, callback);
	// Perform database query that calls callback when it's done

*/
/*module.exports = {
	index   : function(req, res) {
		res.send('The group: index controller ' + req.params.group_name);
 	},
	create  : function(req, res) {
		res.render('createGroup');
		//res.send('The group:create GET controller');
	},
module.exports.doCreate : function(newGroup, callback) {
		newGroup.privacy = 'privacy setting';
		newGroup.save(callback);
	},

	addAdmin: function(req, res) {
		res.send('The group:admin POST controller');
	}
};
	*/




