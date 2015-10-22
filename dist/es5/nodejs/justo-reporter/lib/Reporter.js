//imports
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _justoResult = require("justo-result");

/**
 * A reporter.
 *
 * @abstract
 * @readonly name:string      The reporter name.
 * @readonly enabled:boolean  Is the reported enabled?
 * @readonly display:object   What to display.
 * @readonly writers:Writers  The writers.
 */

var Reporter = (function () {
  /**
   * Constructor.
   *
   * @param(attr) name
   * @param [opts]:object Reporter options: enabled (boolean), display (object).
   */

  function Reporter() {
    var name = arguments.length <= 0 || arguments[0] === undefined ? "default" : arguments[0];
    var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    _classCallCheck(this, Reporter);

    Object.defineProperty(this, "name", { value: name, enumerable: true });
    Object.defineProperty(this, "enabled", { value: opts.hasOwnProperty("enabled") ? !!opts.enabled : true });
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

  /**
   * Starts the report or starts a composite task result.
   *
   * @overload Starts the report.
   * @noparam
   *
   * @overload Starts a composite task result.
   * @param result:CompositeTaskResult  The composite result.
   */

  _createClass(Reporter, [{
    key: "start",
    value: function start() {
      throw new Error("Abstract method.");
    }

    /**
     * Ends the report or ends a composite task result.
     * If some result is pending, this ends the result; otherwise,
     * it ends the report.
     */
  }, {
    key: "end",
    value: function end() {
      throw new Error("Abstract method.");
    }

    /**
     * Receives a result for reporting.
     *
     * @param res:Result  The result to report.
     */
  }, {
    key: "report",
    value: function report(res) {
      var rep = true;

      //(0) pre: enabled?
      if (!this.enabled) return;

      //(1) check constraints
      if (res instanceof _justoResult.SuiteResult && !this.display.suites) rep = false;
      if (res instanceof _justoResult.InitializerResult && !this.display.initializers) rep = false;
      if (res instanceof _justoResult.FinalizerResult && !this.display.finalizers) rep = false;
      if (res instanceof _justoResult.SimpleTaskResult && !this.display.simpleTasks) rep = false;
      if (res instanceof MultitaskResult && !this.display.multitasks) rep = false;
      if (res.state === _justoResult.ResultState.IGNORED && !this.display.ignored) rep = false;
      if (res.state === _justoResult.ResultState.PASSED && !this.display.passed) rep = false;
      if (res.state === _justoResult.ResultState.FAILED && !this.display.failed) rep = false;

      //(2) notify writers
      if (rep) this.write(res);
    }

    /**
     * Writes the result.
     *
     * @protected
     */
  }, {
    key: "write",
    value: function write(res) {
      //to override by the subclasses
    }
  }]);

  return Reporter;
})();

exports["default"] = Reporter;
module.exports = exports["default"];
