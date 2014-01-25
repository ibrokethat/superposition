var fs = require('fs');
var path = require('path');
var CONF = require('config');
var jsdom = require('jsdom').jsdom;


module.exports = function getDocument () {

  try {
    return document;
  }
  catch (e) {

    var index = fs.readFileSync(path.join(process.cwd(), CONF.files.index), {encoding:'utf8'});

    return jsdom(index);
  }
}
