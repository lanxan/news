
var sys = require('sys');
var http = require('http');
var url = require('url');

//custom module
var route = require('./module/route');

var port = '8080';
var serverUrl = '127.0.0.1';

function onRequest(req, res){
	pathname = url.parse(req.url).pathname;
	route.route(req, res, pathname);
}

http.createServer(onRequest).listen(port, serverUrl);
console.log('Server running at http://'+serverUrl+':'+port+'/');

