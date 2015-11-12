"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var _Report = require(
"./Report");var _Report2 = _interopRequireDefault(_Report);var _Result = require(
"./Result");var _Result2 = _interopRequireDefault(_Result);


var startReport = Symbol();
var startTask = Symbol();
var endTask = Symbol();
var endReport = Symbol();var 










Reporter = (function () {












  function Reporter() {var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];_classCallCheck(this, Reporter);

    if (typeof opts == "string") opts = { name: opts };
    if (!opts) opts = {};


    Object.defineProperty(this, "name", { value: opts.name || "reporter", enumerable: true });
    Object.defineProperty(this, "enabled", { value: opts.hasOwnProperty("enabled") ? !!opts.enabled : true, enumerable: true });
    Object.defineProperty(this, "stack", { value: [] });
    Object.defineProperty(this, "_report", { value: undefined, writable: true });}_createClass(Reporter, [{ key: "start", value: 








































    function start(title, task) {

      if (this.disabled) return;


      if (arguments.length === 0) throw new Error("Invalid number of arguments. Expected at least one.");else 
      if (arguments.length === 1) this[startReport](title);else 
      this[startTask](title, task);} }, { key: 





    startReport, value: function value(title) {
      if (this.stack.length) {
        throw new Error("Invalid start of report. There're tasks.");} else 
      {
        if (this.started) {
          throw new Error("Report already started.");} else 
        {
          this._report = new _Report2["default"](title);
          this.startReport(title);}}} }, { key: "startReport", value: 










    function startReport(title) {} }, { key: 






    startTask, value: function value(title, task) {

      if (!task) {
        throw new Error("Invalid number of arguments. Expected title and task. Only one received.");}


      if (!this.started) {
        throw new Error("No report started.");}



      this.stack.push({ title: title, task: task });


      this.startTask(title, task);} }, { key: "startTask", value: 









    function startTask(title, task) {} }, { key: "end", value: 
















    function end() {

      if (this.disabled) return;for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}


      if (args.length === 0) this[endReport]();else 
      this[endTask].apply(this, args);} }, { key: 





    endReport, value: function value() {

      if (!this.started) {
        throw new Error("Invalid end of report. No report started.");}


      if (this.stack.length > 0) {
        throw new Error("Invalid end of report. There're active tasks.");}


      this.endReport();
      this._report = undefined;} }, { key: "endReport", value: 







    function endReport() {} }, { key: 






    endTask, value: function value(task, result, error, start, end) {
      var item, res;


      if (arguments.length == 1) {
        throw new Error("Invalid number of arguents. Expected, at least, task and result.");}



      item = this.stack.pop();

      if (item.task !== task) {
        throw new Error("Invalid end of task. Another task must be ended firstly.");}



      this.report.add(res = new _Result2["default"](item.title, task, result, error, start, end));
      this.endTask(res);} }, { key: "endTask", value: 









    function endTask(res) {} }, { key: "report", get: function get() {return this._report;} }, { key: "started", get: function get() {return !!this.report;} }, { key: "disabled", get: function get() {return !this.enabled;} }]);return Reporter;})();exports["default"] = Reporter;module.exports = exports["default"];
