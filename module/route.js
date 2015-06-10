
var fs = require('fs');
var qs = require('querystring');

function route(req, res, pathname) {
	
	var dirname = '.';

	if(pathname.indexOf('.html') != -1) {
		fs.readFile(dirname+pathname, function(err, text){
			if (err) console.log(err);
			res.writeHead(200, {'Content-Type' : 'text/html'});
			res.end(text);
		});
	} else if(pathname.indexOf('.js') != -1) {
		
		if (req.method == 'POST') {
			var body = '';
			req.on('data', function (data) {
				body += data;
				// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
				if (body.length > 1e6) { 
				// FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
					req.connection.destroy();
				}
			});
			req.on('end', function () {
				var POST = qs.parse(body);
			});
		}
		
		fs.readFile(dirname+pathname, function(err, text){
			if (err) console.log(err);
			res.writeHead(200, {'Content-Type' : 'text/javascript'});
			res.end(text);
		});
	} else if(pathname.indexOf('.css') != -1) {
		fs.readFile(dirname+pathname, function(err, text){
			if (err) console.log(err);
			res.writeHead(200, {'Content-Type' : 'text/css'});
			res.end(text);
		});
	} else if(pathname.indexOf('.json') != -1) {
		fs.readFile(dirname+pathname, function(err, text){
			if (err) console.log(err);
			res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
			res.end(text);
		});
	} else {
		if (pathname === '/favicon.ico') {
			res.writeHead(200, {'Content-Type': 'image/x-icon'} );
			res.end();
			//console.log('favicon requested');
			return;
		}
		res.writeHead(200, {'Content-Type' : 'text/plain'});
		res.end('Hello world!');
	}
}

exports.route = route;
