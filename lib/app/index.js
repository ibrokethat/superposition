var express   = require('express');
var log     = require('metalogger')();
var CONF    = require('config');

exports = module.exports;

exports.setup = function(app) {

  app.use(express.compress({ threshold : 8 }));

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.query());
  app.use(express.cookieParser(CONF.app.cookie_secret));
  app.use(express.session());

  //app.use(express.responseTime());

  //---- Mounting application modules
  app.use(require('../apis'));
  //--- End of Internal modules

  //-- ATTENTION: make sure app.router and errorHandler are the very last two app.use() calls
  //-- ATTENTION: and in the sequence they are in, or it won't work!!!
  app.use(app.router);

  // Catch-all error handler. Modify as you see fit, but don't overuse.
  // Throwing exceptions is not how we normally handle errors in Node.
  app.use(function catchAllErrorHandler(err, req, res, next){
    // Emergency: means system is unusable
    log.emergency(err.stack);
    res.send(500);

    // We aren't in the business of hiding exceptions under the rug. It should
    // still crush the process. All we want is: to properly log the error before
    // that happens.
    //
    // Clustering code in the lib/clustering module will restart the crashed process.
    // Make sure to always run clustering in production!
    setTimeout(function() { // Give a chance for response to be sent, before killing the process
      process.exit(1);
    }, 10);
  });
};
