// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.
var path = require('path');
var helpers = require('./lib/html-fetcher-helpers');

var datadir = path.join(__dirname, "../data/sites.txt");
var urls;

helpers.readUrls(datadir, function(data) {
  urls = data;

  if (urls === undefined) {
    throw err;
  } else {
    helpers.downloadUrls(urls);
  }
});