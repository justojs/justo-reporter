"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Report = require("./Report");

var _Report2 = _interopRequireDefault(_Report);

var _Result = require("./Result");

var _Result2 = _interopRequireDefault(_Result);

var startReport = Symbol();
var startTask = Symbol();
var endTask = Symbol();
var endReport = Symbol();

var Reporter = (function () {
  function Reporter() {
    _classCallCheck(this, Reporter);

    var name, opts;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (args.length == 1) {
      if (typeof args[0] == "string") name = args[0];else opts = args[0];
    } else if (args.length >= 2) {
      name = args[0];
      opts = args[1];
    }

    if (!opts) opts = {};

    Object.defineProperty(this, "name", { value: name || "reporter", enumerable: true });
    Object.defineProperty(this, "enabled", { value: opts.hasOwnProperty("enabled") ? !!opts.enabled : true, enumerable: true });
    Object.defineProperty(this, "stack", { value: [] });
    Object.defineProperty(this, "report", { value: undefined, writable: true });
  }

  _createClass(Reporter, [{
    key: "start",
    value: function start() {
      if (this.disabled) return;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (args.length === 0) this[startReport]();else this[startTask].apply(this, args);
    }
  }, {
    key: startReport,
    value: function value() {
      if (this.stack.length) {
        throw new Error("Invalid start of report. There're tasks.");
      } else {
        if (this.started) {
          throw new Error("Report already started.");
        } else {
          this.report = new _Report2["default"]();
          this.startReport();
        }
      }
    }
  }, {
    key: "startReport",
    value: function startReport() {}
  }, {
    key: startTask,
    value: function value(title, task) {
      if (!task) {
        throw new Error("Invalid number of arguments. Expected title and task. Only one received.");
      }

      if (!this.started) this.start();
      this.stack.push({ title: title, task: task });

      this.startTask(title, task);
    }
  }, {
    key: "startTask",
    value: function startTask(title, task) {}
  }, {
    key: "end",
    value: function end() {
      if (this.disabled) return;

      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (args.length === 0) this[endReport]();else this[endTask].apply(this, args);
    }
  }, {
    key: endReport,
    value: function value() {
      if (this.stack.length > 0) {
        throw new Error("Invalid end of report. There're active tasks.");
      }

      this.endReport();
      this.report = undefined;
    }
  }, {
    key: "endReport",
    value: function endReport() {}
  }, {
    key: endTask,
    value: function value(task, result, error, start, end) {
      var item, res;

      if (arguments.length == 1) {
        throw new Error("Invalid number of arguents. Expected, at least, task and result.");
      }

      item = this.stack.pop();

      if (item.task !== task) {
        throw new Error("Invalid end of task. Another task must be ended firstly.");
      }

      this.report.add(res = new _Result2["default"](item.title, task, result, error, start, end));
      this.endTask(res);
    }
  }, {
    key: "endTask",
    value: function endTask(res) {}
  }, {
    key: "started",
    get: function get() {
      return !!this.report;
    }
  }, {
    key: "disabled",
    get: function get() {
      return !this.enabled;
    }
  }]);

  return Reporter;
})();

exports["default"] = Reporter;
module.exports = exports["default"];
