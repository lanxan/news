
var mongodb = require('mongodb');

var mongodbServer = new mongodb.Server('localhost', 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db('news', mongodbServer);

// open db
db.open(function(){
	var collection = db.collection("comments");
	collection.insert(
		[
			{"publisher" : "china", "link" : "http://www.chinatimes.com/newspapers/20150625000437-260102", "title" : "全美學位紀錄機構確認 洪秀柱的碩士係真ㄟ", "comments" : [ { "author" : "lanxan", "comment" : "rurururu" } ] },
			{"publisher" : "apple", "link" : "http://www.appledaily.com.tw/appledaily/article/headline/20150625/36628919/%E9%A9%9A%E9%BA%A5%E7%95%B6%E5%8B%9E%E6%B1%82%E5%94%AE", "title" : "驚 麥當勞求售", "comments" : [ { "author" : "lanxan", "comment" : "first" } ] }
		]
	);
	db.close();
});
