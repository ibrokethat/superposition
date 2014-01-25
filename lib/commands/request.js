var async = require('super-async');
var promise = async.promise;

var func = require('super-func');
var partial = func.partial;

var iter = require('super-iter');
var forEach = iter.forEach;


function process (type, url, response, headers, data) {

  var xhr = new XMLHttpRequest();

  var p = promise();

  var defaultHeaders = {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, application/json, application/javascript'
  };

  xhr.open(type, url, true);

  if (headers) {
    forEach(headers, function(header, i) {
      defaultHeaders[i] = header;
    });
  }

  forEach(defaultHeaders, function(header, i) {
    xhr.setRequestHeader(i, header);
  });


  xhr.onreadystatechange = function() {

    if(xhr.readyState === 4) {

      if (/(200|201|204|304)/.test(xhr.status)) {

        p.resolve(function(){
          switch (response) {
            case 'xml': return xhr.responseXML ? xhr.responseXML.documentElement : xhr.documentElement;
            case 'json': return JSON.parse(xhr.responseText);
            default: return xhr.responseText;
          }
        }());

      }
      else {
        p.reject(xhr.status);
      }
    }
  };

  //        send request
  xhr.send(data || null);

  return p;
};



// getData = function(url, response, options) {

//   options = options || {};
//   if (options.data) {
//           url += (url.indexOf("?") !== -1 ? "&" : "?") + formatDataToString(options.data, true);
//   }
//   var d = processRequest('GET', url, response, options.timeout || 5, options.headers || {}, options.repeat || 0);
//   d.then(options.success || false, options.error || false);
//   return d;

// };


module.exports = function request (type, uri, response,io) {

  var p = promise();

  process(type, uri, response).then(function (data) {
    io.data = data;
    p.resolve(io);
  });

  return p;
}
