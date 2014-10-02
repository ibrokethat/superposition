"use strict";
var Registry = require('super-registry');
module.exports = new Registry({match: function(params, transform) {
    return (transform.Model === params.Model && transform.apiKey === param.apiKey);
  }});
