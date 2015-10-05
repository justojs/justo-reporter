//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _justoResult = require("justo-result");

/**
 * Indents a text.
 *
 * @param txt:string      The text to indent.
 * @param [level]:number  The level to indent.
 * @param [itxt]:string   The text that indents.
 */
function indent(txt) {
  var level = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
  var itxt = arguments.length <= 2 || arguments[2] === undefined ? "  " : arguments[2];

  var pre;

  //(1) indent
  pre = "";
  for (var i = 0; i < level; ++i) {
    pre += itxt;
  }txt = txt.replace(/^/gm, pre);

  //(2) return
  return txt;
}

/**
 * A reporter.
 *
 * @readonly name:string      The reporter name.
 * @readonly display:object   What to display.
 * @readonly writers:writers  The writers.
 */

var Reporter = (function () {
  /**
   * Constructor.
   *
   * @param(attr) name
   * @param [opts]:object Reporter options: display (object).
   */

  function Reporter(name) {
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Reporter);

    Object.defineProperty(this, "name", { value: name, enumerable: true });
    Object.defineProperty(this, "writers", { value: [] });
    Object.defineProperty(this, "display", { enumerable: true, value: {
        initializers: true,
        finalizers: true,
        suites: true,
        multitasks: true,
        simpleTasks: true,
        subtasks: true,
        ignored: true,
        passed: true,
        failed: true
      } });

    if (opts.display) {
      var d = opts.display;

      if (d.hasOwnProperty("initializers")) this.display.initializers = !!d.initializers;
      if (d.hasOwnProperty("finalizers")) this.display.finalizers = !!d.finalizers;
      if (d.hasOwnProperty("suites")) this.display.suites = !!d.suites;
      if (d.hasOwnProperty("multitasks")) this.display.multitasks = !!d.multitasks;
      if (d.hasOwnProperty("simpleTasks")) this.display.simpleTasks = !!d.simpleTasks;
      if (d.hasOwnProperty("subtasks")) this.display.subtasks = !!d.subtasks;
      if (d.hasOwnProperty("ignored")) this.display.ignored = !!d.ignored;
      if (d.hasOwnProperty("passed")) this.display.passed = !!d.passed;
      if (d.hasOwnProperty("failed")) this.display.failed = !!d.failed;
    }
  }

  _createClass(Reporter, [{
    key: "report",

    /**
     * Receives a result for reporting.
     *
     * @param res:Result  The result to report.
     */
    value: function report(res) {
      var rep = true;

      //(1) check constraints
      if (res instanceof _justoResult.SuiteResult && !this.display.suites) rep = false;
      if (res instanceof _justoResult.InitializerResult && !this.display.initializers) rep = false;
      if (res instanceof _justoResult.FinalizerResult && !this.display.finalizers) rep = false;
      if (res instanceof _justoResult.SimpleTaskResult && !this.display.simpleTasks) rep = false;
      if (res instanceof _justoResult.MultitaskResult && !this.display.multitasks) rep = false;
      if (res.state === _justoResult.ResultState.IGNORED && !this.display.ignored) rep = false;
      if (res.state === _justoResult.ResultState.PASSED && !this.display.passed) rep = false;
      if (res.state === _justoResult.ResultState.FAILED && !this.display.failed) rep = false;

      //(2) write
      if (rep) {
        for (var i = 0; i < this.writers.length; ++i) {
          this.writers[0].write(res);
        }
      }
    }
  }, {
    key: "add",

    /**
     * Adds a writer.
     *
     * @param writer:Writer The writer to add.
     */
    value: function add(writer) {
      this.writers.push(writer);
    }
  }]);

  return Reporter;
})();

exports.Reporter = Reporter;

/**
 * A writer.
 *
 * @abstract
 */

var Writer = (function () {
  function Writer() {
    _classCallCheck(this, Writer);
  }

  _createClass(Writer, [{
    key: "write",

    /**
     * Writes a result.
     *
     * @param res:Result  The result to write.
     */
    value: function write(res) {
      throw new Error("Abstract method.");
    }
  }]);

  return Writer;
})();

exports.Writer = Writer;

/**
 * A console writer.
 *
 * @readonly passed:object  The text to write if passed.
 * @readonly failed:object  The text to write if failed.
 * @readonly ignored:object The text to write if ignored.
 */

var ConsoleWriter = (function (_Writer) {
  _inherits(ConsoleWriter, _Writer);

  /**
   * Constructor.
   *
   * @param [opts]:object The options: passed (string or object),
   *                      failed (string or object) and ignored (string or object).
   */

  function ConsoleWriter() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ConsoleWriter);

    _get(Object.getPrototypeOf(ConsoleWriter.prototype), "constructor", this).call(this);

    Object.defineProperty(this, "passed", { value: value(opts, "passed", "✓"), enumerable: true });
    Object.defineProperty(this, "failed", { value: value(opts, "failed", "✖"), enumerable: true });
    Object.defineProperty(this, "ignored", { value: value(opts, "ignored", "#"), enumerable: true });

    //helper
    function value(opts, state, def) {
      var res = opts[state];

      if (!res) res = { text: def };else if (typeof res == "string") res = { text: res };

      return res;
    }
  }

  _createClass(ConsoleWriter, [{
    key: "write",

    /**
     * @override
     */
    value: function write(res) {
      var txt;

      //(1) format
      if (res instanceof _justoResult.SuiteResult) {
        txt = this.formatTitle(res);
      } else {
        txt = this.formatStateText(res) + " " + this.formatTitle(res);
      }

      //(2) write
      if (res.state !== _justoResult.ResultState.FAILED) {
        console.log(indent(txt, res.level + 1));
      } else {
        console.error(indent(txt, res.level + 1));
        console.error(indent(res.error.stack, res.level + 1));
      }
    }
  }, {
    key: "formatTitle",

    /**
     * Returns the title to display.
     *
     * @protected
     * @param res:Result  The result to check.
     * @return string
     */
    value: function formatTitle(res) {
      return res.title;
    }
  }, {
    key: "formatStateText",

    /**
     * Returns the state text to display.
       * @protected
     * @param res:Result  The result to check.
     * @return string
     */
    value: function formatStateText(res) {
      switch (res.state) {
        case _justoResult.ResultState.PASSED:
          res = this.passed.text;break;
        case _justoResult.ResultState.FAILED:
          res = this.failed.text;break;
        case _justoResult.ResultState.IGNORED:
          res = this.ignored.text;break;
      }

      return res;
    }
  }]);

  return ConsoleWriter;
})(Writer);

exports.ConsoleWriter = ConsoleWriter;

//imports
var colors = require("colors/safe");

/**
 * A colored console writer.
 */

var ColoredConsoleWriter = (function (_ConsoleWriter) {
  _inherits(ColoredConsoleWriter, _ConsoleWriter);

  /**
   * Constructor.
   *
   * @param opts:object The options.
   */

  function ColoredConsoleWriter() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ColoredConsoleWriter);

    _get(Object.getPrototypeOf(ColoredConsoleWriter.prototype), "constructor", this).call(this, opts);

    this.passed.color = color(opts, "passed", "green");
    this.failed.color = color(opts, "failed", "red");
    this.ignored.color = color(opts, "ignored", "blue");

    //helper functions
    function color(opts, state, def) {
      var res = opts[state];

      if (!res || !res.hasOwnProperty("color")) res = def;else res = res.color;

      return res;
    }
  }

  _createClass(ColoredConsoleWriter, [{
    key: "formatTitle",

    /**
     * @override
     */
    value: function formatTitle(res) {
      if (res instanceof _justoResult.SuiteResult) res = colors.white(res.title);else res = colors.gray(res.title);

      return res;
    }
  }, {
    key: "formatStateText",

    /**
     * @override
     */
    value: function formatStateText(res) {
      switch (res.state) {
        case _justoResult.ResultState.PASSED:
          res = colors[this.passed.color](this.passed.text);break;
        case _justoResult.ResultState.FAILED:
          res = colors[this.failed.color](this.failed.text);break;
        case _justoResult.ResultState.IGNORED:
          res = colors[this.ignored.color](this.ignored.text);break;
      }

      return res;
    }
  }]);

  return ColoredConsoleWriter;
})(ConsoleWriter);

exports.ColoredConsoleWriter = ColoredConsoleWriter;
