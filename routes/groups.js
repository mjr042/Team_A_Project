var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var fileUpload = require('express-fileupload');
var fs = require('fs');

var Group = require('../models/group');

router.use(fileUpload());

// Create new group form page
router.get('/new', function(req, res) {
	res.render('createGroup');
	});

// POST new group



router.post('/new', function(req, res) {
		console.log('router POST /group/new');
		//console.log(req.files.img.data);
		//var pic = req.files.img.data;
		var group       = req.body.groupName;
		var course      = req.body.course;
		var users       = req.body.users;
		var admins      = req.body.admins;
		var description = req.body.description;
		//console.log(image);
		// validation of form data
		req.checkBody('groupName', 'Group name is required.').notEmpty();
		req.checkBody('course', 'Course is required.').notEmpty();
	
		var errors = req.validationErrors();

		if(errors) {
			console.log('errors');
			res.render('createGroup', {erros:errors}); //NOT WORKING
		}
		else {
			var newGroup = new Group({
				groupName   : group, 
				course      : course,
				users       : users,
				admins      : admins,
				description : description,
				privacy     : 'test'	//need to implement this JOSH
			});
			console.log(newGroup.groupPic);
			Group.doCreate(newGroup, function(err, group) {
        		if (err) throw err;
  			});

  			req.flash('success_msg', 'Group creation sucessful');
			//res.redirect('groups/' + group);
			res.redirect('/');
	}
});

router.get('/:groupName', function(req, res) { 
	Group.findOne({ groupName: { $regex: req.params.groupName } }, 
		function(err, thisGroup) {
			if (err) { throw err; }
			if(thisGroup) {	
				res.render('group', thisGroup);
				//res.render('group');
				//console.log('Group: ' + thisGroup);
			}
		})
});

module.exports = router;

