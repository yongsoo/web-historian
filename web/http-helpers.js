var path = require('path');
var fs = require('fs');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
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

exports.writeUrlToFile = function(res, file, data) {
  data = data + "\n";
  fs.appendFile(file, data, function(err) {
    if (err) {
      console.log(err);
    }
    res.writeHead(302, headers);
    res.end();
  });
  //Write some code here that helps serve up your static files!
  //(Static files are things like html (yours or arhived from others...), css, or anything that doesn't change often.)
};

exports.readUrlToFile = function(res, url, data) {
  fs.readFile(data, { encoding: 'utf-8' }, function(err, data) {
    if (err) {
      console.log(err);
    }

    var file = data + "";
    var re = new RegExp(url);

    if (file.match(re) === null) {
      res.writeHead(404, headers);
      res.end();
    } else {
      res.writeHead(200, headers);
      res.end(file.match(re)[0]);
    }
  });
};

// As you go through, keep thinking about what helper functions you can put here!