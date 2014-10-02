"use strict";
var $__2 = $traceurRuntime.initGeneratorFunction(getDocument);
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__path__,
    $__config__,
    $__jsdom__,
    $__openFile__;
var path = ($__path__ = require("path"), $__path__ && $__path__.__esModule && $__path__ || {default: $__path__});
var CONF = ($__config__ = require("config"), $__config__ && $__config__.__esModule && $__config__ || {default: $__config__});
var jsdom = ($__jsdom__ = require("jsdom"), $__jsdom__ && $__jsdom__.__esModule && $__jsdom__ || {default: $__jsdom__}).jsdom;
var openFile = ($__openFile__ = require("./openFile"), $__openFile__ && $__openFile__.__esModule && $__openFile__ || {default: $__openFile__}).default;
var index;
function getDocument() {
  var index,
      $__3,
      $__4,
      $__5,
      $__6,
      $__7,
      $__8,
      $__9,
      $__10,
      e;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          $ctx.pushTry(18, null);
          $ctx.state = 21;
          break;
        case 21:
          $ctx.returnValue = document;
          $ctx.state = -2;
          break;
        case 2:
          $ctx.popTry();
          $ctx.state = -2;
          break;
        case 18:
          $ctx.popTry();
          e = $ctx.storedException;
          $ctx.state = 13;
          break;
        case 13:
          $ctx.state = (index) ? 11 : 7;
          break;
        case 11:
          $__10 = index;
          $ctx.state = 12;
          break;
        case 7:
          $__3 = path.resolve;
          $__4 = CONF.files;
          $__5 = $__4.static;
          $__6 = $__3.call(path, $__5);
          $__7 = openFile($__6, 'index.html');
          $ctx.state = 8;
          break;
        case 8:
          $ctx.state = 4;
          return $__7;
        case 4:
          $__8 = $ctx.sent;
          $ctx.state = 6;
          break;
        case 6:
          $__9 = $__8.content;
          $__10 = $__9;
          $ctx.state = 12;
          break;
        case 12:
          index = $__10;
          $ctx.state = 15;
          break;
        case 15:
          $ctx.returnValue = jsdom(index);
          $ctx.state = -2;
          break;
        default:
          return $ctx.end();
      }
  }, $__2, this);
}
var $__default = getDocument;
