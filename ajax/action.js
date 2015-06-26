
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/news';

exports.insertComment = function(res, data){
	MongoClient.connect(url, function(err, db){
		res.writeHead(200, { 'Content-Type': 'application/json' });
		if(err){
			console.log('Unable to connect to the mongoDB server. Error:' + err);
			msg = {"error" : false};
			res.end(JSON.stringify(msg));
		} else {
			db.collection('comments').find({ publisher : data.publisher }).toArray(function(err, result){
				result[0].comments =  result[0].comments.concat([data.comment]);
				
				db.collection('comments').update(
					{ publisher : data.publisher },
					{ $set : { comments : result[0].comments } }
				);
				db.close();
				msg = {"error" : true};
				res.end(JSON.stringify(msg));
			});
		}
	});
}

exports.getComments = function(res){
	MongoClient.connect(url, function(err, db){
		res.writeHead(200, { 'Content-Type': 'application/json' });
		if(err){
			console.log('Unable to connect to the mongoDB server. Error:' + err);
			return {"error":false};
		} else {
			db.collection('comments').find().toArray(function(err, result){
				if(err){
					console.log(err);
				} else {
					res.end(JSON.stringify(result));
				}
				db.close();
				msg = {"error" : true};
				res.end(JSON.stringify(msg));
			});
		}
	});
}
