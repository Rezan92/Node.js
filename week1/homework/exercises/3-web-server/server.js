/**
 * Exercise 3: Create an HTTP web server
 */

var http = require('http');
const fs = require("fs");
const path = require("path");

//create a server
let server = http.createServer(function (req, res) {
  // YOUR CODE GOES IN HERE
	const filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
	let contentType = "text/html";
	if (path.extname(filePath) === ".js") contentType = "text/js";
	if (path.extname(filePath) === ".css") contentType = "text/css";
	fs.readFile(filePath, function (err, data) {
		if (err) {
			if (err.code == "ENOENT") {
				console.log(err)
			} else {
				res.writeHead(500);
				res.write(`Server Error: ${err.code}`);
				res.end();
			};
		} else {
			res.writeHead(200, { 'Content-Type': contentType });
			res.write(data);
			res.end()
		};
	});
});

server.listen(3000); // The server starts to listen on port 3000