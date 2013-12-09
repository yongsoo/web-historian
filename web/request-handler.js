var path = require('path');
var httpHelpers = require('./http-helpers');
module.exports.datadir = path.join(__dirname, "../data/sites.txt"); // tests will need to override this.

module.exports.handleRequest = function (req, res) {

  if (req.method === "GET" && req.url === "/") {
    var fileURL = "./public/index.html";
    httpHelpers.serveStaticAssets(res, req.url, fileURL);
  }

  // console.log(exports.datadir);
};
