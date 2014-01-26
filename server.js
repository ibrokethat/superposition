// Define third-party libraries
var util = require('util');
var cluster = require('cluster');
var express = require('express');
var app = express();
var CONF = require('config');
var forEach = require('super-iter').forEach;
// var log     = require('metalogger')();


//  do this properly
function updateConf (defaultConf, hostConf) {

  forEach(hostConf, function (value, key) {
    defaultConf[key] = value;
  });

}

function setLogLevels () {

  if ('log' in CONF) {

    if ('plugin' in CONF.log) { process.env.NODE_LOGGER_PLUGIN = CONF.log.plugin; }
    if ('level'  in CONF.log) { process.env.NODE_LOGGER_LEVEL  = CONF.log.level; }

    if ('customlevels' in CONF.log) {
      for (var key in CONF.log.customlevels) {
        process.env['NODE_LOGGER_LEVEL_' + key] = CONF.log.customlevels[key];
      }
    }
  }

}

function start () {

  // require('./lib/services').setup();
  require('./lib/app/server').setup(app);

  var isClusterMaster = (cluster.isMaster && (process.env.NODE_CLUSTERED == 1));

  var is_http_thread = true;
  if (isClusterMaster ||
      ( 'undefined' !== typeof process.env.NODE_ISNOT_HTTP_SERVER_THREAD &&
          process.env.NODE_ISNOT_HTTP_SERVER_THREAD != 'true')) {
    is_http_thread = false;
  }


  console.log("is http thread? " + is_http_thread);

  if (isClusterMaster) {
    require('./lib/clustering').setup();
  }

  if (is_http_thread) {
    app.listen(CONF.app.port);
  }

  // If we are not running a cluster at all:
  if (!isClusterMaster && cluster.isMaster) {
    console.log("Express server instance listening on port " + CONF.app.port);
  }


}



module.exports = function superposition (conf) {

  updateConf(CONF, conf);
  setLogLevels();

  return {
    start: start
  }
}


module.exports.updateConf = updateConf;
module.exports.setLogLevels = setLogLevels;
