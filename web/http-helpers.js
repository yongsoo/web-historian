var path = require('path');
var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({ host: 'localhost', database: 'websites', user: 'root' });

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

var writeToDb = function(url, path, callback) {
  //connection.connect();
  connection.query('INSERT INTO urls SET ?', {url: url, path: path, timestamp: new Date()}, function(err, result) {
    if (err) { throw err; }
    //   console.log('we ending connection now');
    //   console.log('err: ', err);
      callback();
  });
};

var getWebPage = function(url, cb) {
  var archivePath = path.join(__dirname, "../data/sites/" + url);
  fs.readFile(archivePath, function(err, data) {
    if (err) {
      throw err;
    }
    cb(data);
  });
};

exports.serveStaticAssets = function(res, folder, asset) {
  var fullPath = path.join(__dirname, "../web" + folder + asset);
  fs.readFile(fullPath, function(err, data) {
    if (err) {
      console.log(err);
    }
    res.writeHead(200, headers);
    res.end(data);
  });
  //Write some code here that helps serve up your static files!
  //(Static files are things like html (yours or arhived from others...), css, or anything that doesn't change often.)
};

exports.writeUrlToFile = function(res, file, url) {

  var cb = function(){
    console.log('we are calling callback now!!!');
    headers.location = "http://127.0.0.1:8080/success.html";
    res.writeHead(302, headers);
    console.log('gomma end connection now');
    res.end();
    console.log('ok connection was ended bro');
  };

  var fullPath = path.join(__dirname, "../data/sites/" + url);
  writeToDb(url, fullPath, cb);
  url = url + "\n";
  // fs.appendFile(file, url, function(err) {
  //   if (err) {
  //     console.log(err);
  //   }

  // headers.location = "http://127.0.0.1:8080/success.html";
  //   res.writeHead(302, headers);
  //   res.end();
  // });


  //Write some code here that helps serve up your static files!
  //(Static files are things like html (yours or arhived from others...), css, or anything that doesn't change often.)
};

exports.readUrlFromFile = function(res, url, data) {
  fs.readFile(data, function(err, data) {
    if (err) {
      console.log(err);
    }

    var file = data + "";
    var re = new RegExp(url);

    if (file.match(re) === null) {
      res.writeHead(404, headers);
      res.end("404: No resource here");
    } else {
      getWebPage(url, function(data) {
        res.writeHead(200, headers);
        res.end(data);
      });
    }
  });
};








// As you go through, keep thinking about what helper functions you can put here!