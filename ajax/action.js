
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/news';

exports.insertComment = function(res, data){
	MongoClient.connect(url, function(err, db){
		if(err){
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			db.collection('comments').insertOne(
			{ 
				publisher : data.publisher, 
				comments	: data.comment
			}
			);
		}
	});
}

exports.getComments = function(res){
	MongoClient.connect(url, function(err, db){
		if(err){
			console.log('Unable to connect to the mongoDB server. Error:', err);
		} else {
			db.collection('comments').find().toArray(function(err, result){
				if(err){
					console.log(err);
				} else {
					res.end(JSON.stringify(result));
				}
				db.close();
			});
		}
	});
}
