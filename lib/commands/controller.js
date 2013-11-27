
var pipe = require('pipe').pipe;

module.exports = function controller (interceptors, pipeline, req, res) {

  // var io = Io.new(req, res);
  var io = {
    req: req,
    res: res
  };

  var pipelines = [].concat(interceptors, pipeline);

  pipe(pipelines)(io);
}
