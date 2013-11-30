var fs = require('fs');
var path = require('path');
var CONF = require('config');
var jsdom = require('jsdom').jsdom;

var index = fs.readFileSync(path.resolve(__dirname, '../../static/', CONF.files.index), {encoding:'utf8'});

module.exports = function getDocument () {

  try {
    return document;
  }
  catch (e) {
    return jsdom(index);
  }
}
