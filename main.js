var mongoose = require('mongoose');
var http = require("http");

mongoose.connect('mongodb://localhost:30005/test');

// mongo collection will be called 'users'
var Account = mongoose.model('User', { name: String });

http.createServer(

function saveFunction(request, response) {

	console.log('hit the save function')

	var testAcc = new Account( { name : 'Dave' } );

	testAcc.save(function(err) {
		if (err) console.log('failed to save for some reason');
	});
	
	var callback = {};
	var results = Account.find({});
	
	//console.log(JSON.stringify(results));


   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'application/json'});
   
   // Send the response body as "Hello World"
   response.end('User added\n');
   
}

function loadFunction(request, response) {
	console.log('hit the LOAD function');
}

).listen(8081);

/*http.createServer(function (request, response) {

	console.log('hit the load function')

	var callback = {};
	Account.find({}, callback);

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'application/json'});
   
   console.log(JSON.stringify(callback));
   
   response.send(JSON.stringify(callback));
}).listen(8082);*/

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');