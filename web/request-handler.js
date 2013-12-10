var path = require('path');
var httpHelpers = require('./http-helpers');
var url = require('url');

module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.

module.exports.handleRequest = function (req, res) {
  var postData = "";
  var actualUrl = url.parse(req.url).pathname;
  console.log(typeof actualUrl);

  if (req.method === "GET" && actualUrl === "/") {
    var fileURL = "./public/index.html";
    httpHelpers.serveStaticAssets(res, req.url, fileURL);
  } else if (req.method === "GET" && /www/.test(actualUrl)) {
    console.log('about to call readUrlToFile');
    httpHelpers.readUrlToFile(res, actualUrl.slice(1), module.exports.datadir);
  }
  else if (req.method === 'POST' && req.url === "/") {
    req.on('data', function(chunk) {
      postData += chunk;
    });
    req.on('end', function() {
      var url = postData.slice(4);
      httpHelpers.writeUrlToFile(res, module.exports.datadir, url);
    });
  }
    else {
    res.writeHead(404, httpHelpers.headers);
    res.end("404: No resource here!");
  }

  // console.log(exports.datadir);
};


