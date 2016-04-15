"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _justoResult = require("justo-result");
var _Report = require("./Report");var _Report2 = _interopRequireDefault(_Report);
var _Stack = require("./Stack");var _Stack2 = _interopRequireDefault(_Stack);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}


var startReport = Symbol();
var startTask = Symbol();
var endTask = Symbol();
var endReport = Symbol();var 










Reporter = function () {












  function Reporter() {var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];_classCallCheck(this, Reporter);

    if (typeof opts == "string") opts = { name: opts };
    if (!opts) opts = {};


    Object.defineProperty(this, "name", { value: opts.name || "reporter", enumerable: true });
    Object.defineProperty(this, "enabled", { value: opts.hasOwnProperty("enabled") ? !!opts.enabled : true, enumerable: true });
    Object.defineProperty(this, "stack", { value: new _Stack2.default() });
    Object.defineProperty(this, "_report", { value: undefined, writable: true });}_createClass(Reporter, [{ key: "start", value: function start(








































    title, task) {

      if (this.disabled) return;


      if (arguments.length === 0) throw new Error("Invalid number of arguments. Expected at least one.");else 
      if (arguments.length === 1) this[startReport](title);else 
      this[startTask](title, task);} }, { key: "end", value: function end() 















    {

      if (this.disabled) return;


      if (arguments.length === 0) this[endReport]();else 
      this[endTask].apply(this, arguments);} }, { key: "ignore", value: function ignore(








    title, task) {
      var res, parent;


      if (this.disabled) return;

      if (!this.started) {
        throw new Error("No report started.");}



      if (arguments.length < 2) throw new Error("Invalid number of arguments. Expected two.");


      parent = this.stack.top;

      if (task.isSimple()) res = new _justoResult.SimpleTaskResult(parent, title, task, _justoResult.ResultState.IGNORED);else 
      res = new _justoResult.CompositeTaskResult(parent, title, task, _justoResult.ResultState.IGNORED);


      if (!res.hasParent()) {
        this.report.add(res);}



      this.ignoreTask(res);} }, { key: "ignoreTask", value: function ignoreTask(








    res) {} }, { key: 






    startReport, value: function value(title) {
      if (this.stack.hasResults()) {
        throw new Error("Invalid start of report. There're tasks.");} else 
      {
        if (this.started) {
          throw new Error("Report already started.");} else 
        {
          this._report = new _Report2.default(title);
          this.startReport(title);}}} }, { key: "startReport", value: function startReport(










    title) {} }, { key: 






    endReport, value: function value() {

      if (!this.started) {
        throw new Error("Invalid end of report. No report started.");}


      if (this.stack.hasResults()) {
        throw new Error("Invalid end of report. There're active tasks.");}


      this.endReport();
      this._report = undefined;} }, { key: "endReport", value: function endReport() 







    {} }, { key: 






    startTask, value: function value(title, task) {
      var res, parent;


      if (!task) {
        throw new Error("Invalid number of arguments. Expected title and task. Only one received.");}


      if (!this.started) {
        throw new Error("No report started.");}



      parent = this.stack.top;

      if (task.isSimple()) res = new _justoResult.SimpleTaskResult(parent, title, task);else 
      res = new _justoResult.CompositeTaskResult(parent, title, task);

      this.stack.push(res);


      this.startTask(title, task);} }, { key: "startTask", value: function startTask(









    title, task) {} }, { key: 






    endTask, value: function value(task, state, error, start, end) {
      var res;


      res = this.stack.pop();

      if (res.task !== task) {
        throw new Error("Invalid end of task. Another task must be ended firstly.");}



      if (res instanceof _justoResult.SimpleTaskResult) res.setResult(state, error, start, end);


      if (!res.hasParent()) {
        this.report.add(res);}



      this.endTask(res);} }, { key: "endTask", value: function endTask(








    res) {} }, { key: "report", get: function get() {return this._report;} }, { key: "started", get: function get() {return !!this.report;} }, { key: "disabled", get: function get() {return !this.enabled;} }]);return Reporter;}();exports.default = Reporter;
