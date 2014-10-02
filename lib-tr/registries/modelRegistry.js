"use strict";
var Registry = require('super-registry');
var version = require('../utils/getVersion')(module);
module.exports = new Registry({match: function(params, Model) {
    return Model === require(path.resolve(process.cwd() + '/src/' + version + '/models/' + params.model));
  }});
