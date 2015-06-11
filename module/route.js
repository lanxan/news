
var fs = require('fs');
var qs = require('querystring');

//var server = require('serverRoute');

function load_static_file(uri, res){
	var filename = '.'+uri;
	fs.exists(filename, function(exists){
		if(!exists){
			res.writeHead(404, {'Content-Type' : 'text/plain'});
			res.end("404 not found!");
			return;
		}
		/*
		fs.readFile(filename, "binary", function(err, text) {
			if(err) console.log(err);

			res.statusCode = 200;
			res.write(text, "binary");
			res.end();
		});*/

		fs.readFile(filename, function(err, text){
			if (err) console.log(err);
			
			if(filename.indexOf('.html') != -1){
				header = {'Content-Type' : 'text/html'};
		  	} else if(filename.indexOf('.js') != -1) {
				header = {'Content-Type' : 'text/javascript'};
		  	} else if(filename.indexOf('.css') != -1) {
				header = {'Content-Type' : 'text/css'};
		  	} else if(filename.indexOf('.json') != -1) {
				header = {'Content-Type' : 'application/json; charset=utf-8'};
		  	} else if(filename.indexOf('/favionc.ico') != -1) {
				header = {'Content-Type': 'image/x-icon'};
			} else {
				header = {'Content-Type' : 'text/plain'};
				text = 'Not support file format!';
			}
			res.writeHead(200, header);
			res.end(text);
			
		});
	});
}

function route(req, res, pathname) {
	
	var dirname = '.';
	if(pathname.indexOf('/public/') == -1){
		load_static_file(pathname, res);
	} else {
		if(pathname.indexOf('/ajax/') != -1) {
			var param;
			  
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
					//var POST = qs.parse(body);
					param = qs.parse(body);
				});
			}

			res.writeHead(200, {'Content-Type' : 'application/json; charset=utf-8'});
			res.end(server.route(pathname, param));
		}
	}
}

exports.route = route;
