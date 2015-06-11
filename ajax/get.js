
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/news';

MongoClient.connect(url, function(err, db){
	if(err){
		console.log('Unable to connect to the mongoDB server. Error:', err);
	} else {
		var news = db.collection('comments');

		var result = news.find().toArray(function(err, result){
			if(err){
				console.log(err);
			} else if(result.length){
				return result;
			} else {
				console.log("No document found.");
			}

			db.close();
		});
	}
});
