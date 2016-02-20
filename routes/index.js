var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:30005/test');

var Account = mongoose.model('User', { name: String });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' });
});

/* GET Basic page. */
router.get('/basic', function(req, res) {
    res.render('basic', { title: 'basic website!' });
});

router.get('/loadTest', function(req, res) {
    //var db = req.db;

    // get all the users
	Account.find({}, function(err, users) {
	  if (err) throw err;

	  // object of all the users
	  return users;
	});
});

router.put('/saveTest', function(req, res) {
	console.log('hit the saveTest method')
	var newUser = new Account({name : 'Dave'});

    // save the user
	newUser.save(function(err) {
	  if (err) throw err;

	  res.writeHead(200, {'Content-Type': 'application/json'});
	  console.log('User created!');
	});
});

module.exports = router;
