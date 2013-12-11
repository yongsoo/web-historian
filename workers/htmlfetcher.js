// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.
var path = require('path');
var helpers = require('./lib/html-fetcher-helpers');

// var datadir = path.join(__dirname, "../data/sites.txt");
var urls;

// console.log("about to call readUrls with: " + datadir);


// helpers.readUrls(datadir, function(data) {
//   urls = data;

//   if (urls === undefined) {
//     throw err;
//   } else {
//     console.log("about to call downloadUrls with: " + urls);
//     helpers.downloadUrls(urls);
//   }
// });

helpers.readUrlsFromDb(function(data) {
  urls = [];
  data.forEach(function(row) {
    urls.push(row.path);
  });

  if (urls === undefined) {
    throw err;
  } else {
    console.log(urls);
    helpers.downloadUrls(urls);
  }
});

