# news
  This is a demo website for React + Nodejs + mongodb.

## Install
  - nodejs 
    - [nodejs download page](https://nodejs.org/download/)
  - mongodb 
    - [install mongodb on mac](https://mongodb.github.io/node-mongodb-native/api-articles/nodekoarticle1.html)

## Run
  
  After install nodejs and mongodb, run mongodb first.
  
    mongod --config /usr/local/etc/mongod.conf --fork
  
  Second, run initialDB.js.
  
    node initialDB.js
  
  Finally, open server.
  
    node server.js
  
  And open this link : http://127.0.0.1:8080/news/index.html
  
  *Note: directory name can't be news*
  
## mongodb test data

    {"publisher" : "china", "link" : "http://www.chinatimes.com/newspapers/20150625000437-260102", "title" : "全美學位紀錄機構確認 洪秀柱的碩士係真ㄟ", "comments" : [ { "author" : "lanxan", "comment" : "rurururu" } ] }
    {"publisher" : "apple", "link" : "http://www.appledaily.com.tw/appledaily/article/headline/20150625/36628919/%E9%A9%9A%E9%BA%A5%E7%95%B6%E5%8B%9E%E6%B1%82%E5%94%AE", "title" : "驚 麥當勞求售", "comments" : [ { "author" : "lanxan", "comment" : "first" } ] }
    
  - db : news
  - collection : comments
