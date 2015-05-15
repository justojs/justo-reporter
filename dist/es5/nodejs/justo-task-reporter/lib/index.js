//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get = function get(_x4, _x5, _x6) { var _again = true; _function: while (_again) { var object = _x4, property = _x5, receiver = _x6; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x4 = parent; _x5 = property; _x6 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _justoTaskResult = require("justo-task-result");

var _justoUtil = require("justo-util");

/**
 * A reporter.
 *
 * @readonly suites:boolean             Must it report the suites?
 * @readonly finalizers:boolean         Must it report the finalizers?
 * @readonly initializers:boolean       Must it report the initializers?
 * @readonly simpleTasks:boolean        Must it report the simple tasks?
 * @readonly parameterizedTasks:boolean Must it report the parameterized tasks?
 * @readonly multiTasks:boolean         Must it report the multi tasks?
 * @readonly ignored:boolean            Must it report the ignored items?
 * @readonly passed:boolean             Must it report the passed items?
 * @readonly failed:boolean             Must it report the failed items?
 * @readonly writers:writers            The writers.
 */

var Reporter = (function () {
  /**
   * Constructor.
   *
   * @param [opts]:object The options: initializers (boolean), finalizers (boolean),
   *                      ignored (boolean), passed (boolean), failed (boolean),
   *                      suites (boolean), simpleTasks (boolean), parameterizedTasks
   *                      (boolean) and multiTasks (boolean).
   */

  function Reporter() {
    var opts = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Reporter);

    Object.defineProperty(this, "suites", { value: opts.hasOwnProperty("suites") ? !!opts.suites : true, enumerable: true, writable: true });
    Object.defineProperty(this, "finalizers", { value: opts.hasOwnProperty("finalizers") ? !!opts.finalizers : true, enumerable: true, writable: true });
    Object.defineProperty(this, "initializers", { value: opts.hasOwnProperty("initializers") ? !!opts.initializers : true, enumerable: true, writable: true });
    Object.defineProperty(this, "simpleTasks", { value: opts.hasOwnProperty("simpleTasks") ? !!opts.simpleTasks : true, enumerable: true, writable: true });
    Object.defineProperty(this, "parameterizedTasks", { value: opts.hasOwnProperty("parameterizedTasks") ? !!opts.parameterizedTasks : true, enumerable: true, writable: true });
    Object.defineProperty(this, "multiTasks", { value: opts.hasOwnProperty("multiTasks") ? !!opts.multiTasks : true, enumerable: true, writable: true });
    Object.defineProperty(this, "ignored", { value: opts.hasOwnProperty("ignored") ? !!opts.ignored : true, enumerable: true, writable: true });
    Object.defineProperty(this, "passed", { value: opts.hasOwnProperty("passed") ? !!opts.passed : true, enumerable: true, writable: true });
    Object.defineProperty(this, "failed", { value: opts.hasOwnProperty("failed") ? !!opts.failed : true, enumerable: true, writable: true });
    Object.defineProperty(this, "writers", { value: [] });
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
      if (!this.suites && res instanceof _justoTaskResult.SuiteResult) rep = false;
      if (!this.initializers && res instanceof _justoTaskResult.InitializerResult) rep = false;
      if (!this.finalizers && res instanceof _justoTaskResult.FinalizerResult) rep = false;
      if (!this.simpleTasks && res instanceof _justoTaskResult.SimpleTaskResult) rep = false;
      if (!this.parameterizedTasks && res instanceof _justoTaskResult.ParameterizedTaskResult) rep = false;
      if (!this.multiTasks && res instanceof _justoTaskResult.MultiTaskResult) rep = false;
      if (!this.ignored && res.state === _justoTaskResult.ResultState.IGNORED) rep = false;
      if (!this.passed && res.state === _justoTaskResult.ResultState.PASSED) rep = false;
      if (!this.failed && res.state === _justoTaskResult.ResultState.FAILED) rep = false;

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
 * @readonly passed:string  The text to write if passed.
 * @readonly failed:string  The text to write if failed.
 * @readonly ignored:string The text to write if ignored.
 */

var ConsoleWriter = (function (_Writer) {
  /**
   * Constructor.
   *
   * @param [opts]:object The options: passed (string), failed (string) and
   *                      ignored (string).
   */

  function ConsoleWriter() {
    var opts = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ConsoleWriter);

    _get(Object.getPrototypeOf(ConsoleWriter.prototype), "constructor", this).call(this);

    Object.defineProperty(this, "passed", { value: opts.passed || "✓", enumerable: true });
    Object.defineProperty(this, "failed", { value: opts.failed || "✖", enumerable: true });
    Object.defineProperty(this, "ignored", { value: opts.ignored || "#", enumerable: true });
  }

  _inherits(ConsoleWriter, _Writer);

  _createClass(ConsoleWriter, [{
    key: "write",

    /**
     * @override
     */
    value: function write(res) {
      var txt;

      //(1) format
      if (res instanceof _justoTaskResult.SuiteResult) {
        txt = this.formatTitle(res);
      } else {
        txt = this.formatStateText(res) + " " + this.formatTitle(res);
      }

      //(2) write
      if (res.state !== _justoTaskResult.ResultState.FAILED) {
        console.log((0, _justoUtil.indent)(txt, res.level + 1));
      } else {
        console.error((0, _justoUtil.indent)(txt, res.level + 1));
        console.error((0, _justoUtil.indent)(res.error.stack, res.level + 1));
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
        case _justoTaskResult.ResultState.PASSED:
          res = this.passed;break;
        case _justoTaskResult.ResultState.FAILED:
          res = this.failed;break;
        case _justoTaskResult.ResultState.IGNORED:
          res = this.ignored;break;
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
  /**
   * Constructor.
   *
   * @param opts:object The options.
   */

  function ColoredConsoleWriter() {
    var opts = arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ColoredConsoleWriter);

    _get(Object.getPrototypeOf(ColoredConsoleWriter.prototype), "constructor", this).call(this, opts);
  }

  _inherits(ColoredConsoleWriter, _ConsoleWriter);

  _createClass(ColoredConsoleWriter, [{
    key: "formatTitle",

    /**
     * @override
     */
    value: function formatTitle(res) {
      if (res instanceof _justoTaskResult.SuiteResult) res = colors.white(res.title);else res = colors.gray(res.title);

      return res;
    }
  }, {
    key: "formatStateText",

    /**
     * @override
     */
    value: function formatStateText(res) {
      switch (res.state) {
        case _justoTaskResult.ResultState.PASSED:
          res = colors.green(this.passed);break;
        case _justoTaskResult.ResultState.FAILED:
          res = colors.red(this.failed);break;
        case _justoTaskResult.ResultState.IGNORED:
          res = colors.blue(this.ignored);break;
      }

      return res;
    }
  }]);

  return ColoredConsoleWriter;
})(ConsoleWriter);

exports.ColoredConsoleWriter = ColoredConsoleWriter;