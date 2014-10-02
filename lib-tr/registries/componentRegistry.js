"use strict";
var Registry = require('super-registry');
module.exports = new Registry({match: function(params, component) {
    return component.type === params.componentType;
  }});
