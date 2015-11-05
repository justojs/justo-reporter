"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Result = (function () {
  function Result(title, task, result, error, start, end) {
    _classCallCheck(this, Result);

    Object.defineProperty(this, "title", { value: title, enumerable: true });
    Object.defineProperty(this, "task", { value: task, enumerable: true });
    Object.defineProperty(this, "result", { value: result, enumerable: true });
    Object.defineProperty(this, "error", { value: error, enumerable: true });
    Object.defineProperty(this, "start", { value: start || 0, enumerable: true });
    Object.defineProperty(this, "end", { value: end || 0, enumerable: true });
  }

  _createClass(Result, [{
    key: "time",
    get: function get() {
      return this.end - this.start;
    }
  }, {
    key: "ok",
    get: function get() {
      return this.result == "ok";
    }
  }, {
    key: "failed",
    get: function get() {
      return this.result == "failed";
    }
  }, {
    key: "ignored",
    get: function get() {
      return this.result == "ignored";
    }
  }]);

  return Result;
})();

exports["default"] = Result;
module.exports = exports["default"];
