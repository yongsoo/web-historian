var path = require('path');
var httpHelpers = require('./http-helpers');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.
var postData = "";

module.exports.handleRequest = function (req, res) {

  if (req.method === "GET" && req.url === "/") {
    var fileURL = "./public/index.html";
    httpHelpers.serveStaticAssets(res, req.url, fileURL);
  } else if (req.method === 'POST' && req.url === "/") {
    req.on('data', function(chunk) {
      postData += chunk;
    });
    req.on('end', function() {
      var url = postData.slice(4);
      console.log(url);
      httpHelpers.writeUrlToFile(res, module.exports.datadir, url);
    });
  }
    else {
    res.writeHead(404, httpHelpers.headers);
    res.end("404: No resource here!");
  }

  // console.log(exports.datadir);
};
