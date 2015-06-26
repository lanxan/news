
var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('mydb', mongodbServer);

// open db
db.open(function(){
	
	// select 'content' collection
	collection.insert({
		//data
		author : 'lanxan',
		comment : 'test'
	}, function(err, data){
		if(data){
			console.log('success');
		} else {
			console.log('fail');
		}
	});

	collection.find({author : 'lanxan'}, function(err, data){
		if(data){
			console.log(data);
		} else {
			console.log('fail');
		}
		
	});
});
