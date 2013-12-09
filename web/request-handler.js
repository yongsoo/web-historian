var path = require('path');
var httpHelpers = require('./http-helpers');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.

module.exports.handleRequest = function (req, res) {

  if (req.method === "GET" && req.url === "/") {
    var fileURL = "./public/index.html";
    httpHelpers.serveStaticAssets(res, req.url, fileURL);
  } else if (req.method === 'POST' && req.url === "/") {
    res.writeHead(302, httpHelpers.headers);
    res.end();
  }
    else {
    res.writeHead(404, httpHelpers.headers);
    res.end();
  }

  // console.log(exports.datadir);
};
