"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Reporter2 = require("../Reporter");

var _Reporter3 = _interopRequireDefault(_Reporter2);

var DEFAULT_THEME = {
  ok: {
    text: "V"
  },
  failed: {
    text: "X"
  },
  ignored: {
    text: "#"
  }
};

var ConsoleReporter = (function (_Reporter) {
  _inherits(ConsoleReporter, _Reporter);

  function ConsoleReporter() {
    _classCallCheck(this, ConsoleReporter);

    var opts = {};

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _get(Object.getPrototypeOf(ConsoleReporter.prototype), "constructor", this).apply(this, args);

    if (args.length == 1 && typeof args[0] == "object") opts = args[0];else if (args.length >= 2) opts = args[1];

    Object.defineProperty(this, "print", { value: process.stdout.write.bind(process.stdout), writable: true });
    Object.defineProperty(this, "println", { value: console.log, writable: true });
    Object.defineProperty(this, "theme", { value: Object.assign({}, DEFAULT_THEME, opts.theme), enumerable: true });
  }

  _createClass(ConsoleReporter, [{
    key: "startReport",
    value: function startReport(title) {
      this.println(title);
    }
  }, {
    key: "startTask",
    value: function startTask(title, task) {
      this.print(title);
    }
  }, {
    key: "endTask",
    value: function endTask(res) {
      this.println(" " + this.formatResult(res.result) + " (" + res.time + " ms)");
      if (res.result == "failed") this.println(res.error);
    }
  }, {
    key: "endReport",
    value: function endReport() {
      var rep = this.report;

      this.println("");
      this.println("     OK: " + rep.ok.length);
      this.println(" Failed: " + rep.failed.length);
      this.println("Ignored: " + rep.ignored.length);
      this.println("  Total: " + rep.length);
    }
  }, {
    key: "formatResult",
    value: function formatResult(result) {
      return this.theme[result].text;
    }
  }], [{
    key: "DEFAULT_THEME",
    get: function get() {
      return DEFAULT_THEME;
    }
  }]);

  return ConsoleReporter;
})(_Reporter3["default"]);

exports["default"] = ConsoleReporter;
module.exports = exports["default"];
