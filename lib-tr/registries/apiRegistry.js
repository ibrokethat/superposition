"use strict";
var Registry = require('super-registry');
module.exports = new Registry({match: function(params, api) {
    return api.id === params.apiKey;
  }});
