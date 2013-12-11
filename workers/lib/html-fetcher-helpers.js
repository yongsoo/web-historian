var fs = require('fs');
var httpRequest = require('http-request');
var path = require('path');
var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost', database: 'websites', user: 'root' });

exports.readUrls = function(filePath, cb){

  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    } else {
      data += "";
      cb(data.split('\n'));
    }
  });
};

exports.downloadUrls = function(urls){
  urls.pop();
  urls.forEach(function(url) {
    httpRequest.get({ url: url }, path.join(__dirname, "../../data/sites/" + url), function(err) {
      if (err) {
        throw err;
      }
    });
  });
};

exports.readUrlsFromDb = function(cb) {
  connection.connect();
  connection.query('SELECT path from urls', function(err, rows) {
    if (err) { throw err; }
    console.log(rows);
    cb(rows);
    connection.end();
  });
};