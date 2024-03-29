var path = require('path');
var httpHelpers = require('./http-helpers');
var url = require('url');

module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.

module.exports.handleRequest = function (req, res) {
  var postData = "";
  var actualUrl = url.parse(req.url).pathname;

  if (req.method === "GET" && actualUrl === "/") {
    var fileURL = "./public/index.html";
    httpHelpers.serveStaticAssets(res, req.url, fileURL);
  }

  else if (req.method === "GET" && /www/.test(actualUrl)) {
    httpHelpers.readUrlFromFile(res, actualUrl.slice(1), module.exports.datadir);
  }

  else if (req.method === 'POST' && req.url === "/") {
    req.on('data', function(chunk) {
      postData += chunk;
    });
    req.on('end', function() {
      var url = postData.slice(4);
      if (/^www\./.test(url)) {
        httpHelpers.writeUrlToFile(res, module.exports.datadir, url);
      } else {
        res.writeHead(500, httpHelpers.headers);
        res.end("500: Please put in a real address starting with www.");
      }
    });
  }

  else {
    if (req.method === "GET" && actualUrl === "/success.html") {
      res.writeHead(200, headers);
      res.end();
    } else {
      res.writeHead(404, httpHelpers.headers);
      res.end("404: No resource here!");
    }
  }

  // console.log(exports.datadir);
};


