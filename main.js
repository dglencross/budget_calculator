var mongoose = require('mongoose');
var http = require("http");

mongoose.connect('mongodb://localhost:30005/test');

// mongo collection will be called 'users'
var Account = mongoose.model('User', { name: String });

http.createServer(function (request, response) {

	console.log('hit the function')

	var testAcc = new Account( { name : 'Dave' } );

	testAcc.save(function(err) {
		if (err) console.log('failed to save for some reason');
	});

   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('User added\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');