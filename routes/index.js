var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:30005/test');

var url = require('url');

var Account = mongoose.model('User', { firstName: String, middleName: String, lastName: String });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/loadTest', function(req, res) {
    //var db = req.db;

    // get all the users
	Account.find({}, function(err, users) {
	  if (err) throw err;

	  res.write(JSON.stringify(users));
	  res.end();
	});
});

router.put('/saveTest', function(req, res) {
	console.log('hit the saveTest method')

	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	var firstName = query['firstName'];
	var middleName = query['middleName'];
	var lastName = query['lastName'];

	var newUser = new Account({firstName : firstName, middleName: middleName, lastName: lastName});

    // save the user
	newUser.save(function(err) {
	  if (err) throw err;

	  res.writeHead(200, {'Content-Type': 'application/json'});
	  console.log('User created!');
	});
});

module.exports = router;
