"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();var _get = function get(_x2, _x3, _x4) {var _again = true;_function: while (_again) {var object = _x2, property = _x3, receiver = _x4;desc = parent = getter = undefined;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {_x2 = parent;_x3 = property;_x4 = receiver;_again = true;continue _function;}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}}};function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var _Reporter2 = require(
"../Reporter");var _Reporter3 = _interopRequireDefault(_Reporter2);var _util = require(
"../util");


var DEFAULT_THEME = { 
  report: { 
    header: { 
      pre: { 
        text: "\n  " }, 

      post: { 
        text: "" } }, 


    footer: { 
      pre: { 
        text: "\n" }, 

      post: { 
        text: "\n" } } }, 



  task: { 
    header: { 
      pre: { 
        text: "  " } }, 


    result: { 
      ok: { 
        text: "V" }, 

      failed: { 
        text: "X" }, 

      ignored: { 
        text: "-" } } } };var 













ConsoleReporter = (function (_Reporter) {_inherits(ConsoleReporter, _Reporter);












  function ConsoleReporter() {var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];_classCallCheck(this, ConsoleReporter);

    _get(Object.getPrototypeOf(ConsoleReporter.prototype), "constructor", this).call(this, opts);


    if (!opts) opts = {};

    Object.defineProperty(this, "print", { value: process.stdout.write.bind(process.stdout), writable: true });
    Object.defineProperty(this, "println", { value: console.log, writable: true });
    this.initTheme(opts.theme);}_createClass(ConsoleReporter, [{ key: "initTheme", value: 







    function initTheme(theme) {

      Object.defineProperty(this, "theme", { value: Object.assign({}, DEFAULT_THEME, theme), enumerable: true });


      if (theme) {
        if (theme.report) {
          var report = theme.report;

          this.theme.report.header = Object.assign({}, DEFAULT_THEME.report.header, report.header);
          this.theme.report.footer = Object.assign({}, DEFAULT_THEME.report.footer, report.footer);

          if (report.header) {
            this.theme.report.header.pre = Object.assign({}, DEFAULT_THEME.report.header.pre, report.header.pre);
            this.theme.report.header.post = Object.assign({}, DEFAULT_THEME.report.header.post, report.header.post);}


          if (report.footer) {
            this.theme.report.footer.pre = Object.assign({}, DEFAULT_THEME.report.footer.pre, report.footer.pre);
            this.theme.report.footer.post = Object.assign({}, DEFAULT_THEME.report.footer.post, report.footer.post);}}



        if (theme.task) {
          var task = theme.task;

          if (task.header) {
            this.theme.task.header = Object.assign({}, DEFAULT_THEME.task.header, task.header);
            this.theme.task.header.pre = Object.assign({}, DEFAULT_THEME.task.header.pre, task.header.pre);}


          if (task.result) {
            this.theme.task.result = Object.assign({}, DEFAULT_THEME.task.result, task.result);
            this.theme.task.result.ok = Object.assign({}, DEFAULT_THEME.task.result.ok, task.result.ok);
            this.theme.task.result.failed = Object.assign({}, DEFAULT_THEME.task.result.failed, task.result.failed);
            this.theme.task.result.ignored = Object.assign({}, DEFAULT_THEME.task.result.ignored, task.result.ignored);}}}} }, { key: "startReport", value: 








    function startReport(title) {
      this.println(
      this.formatReportPreTitle() + 
      this.formatReportTitle(title) + 
      this.formatReportPostTitle());} }, { key: "endReport", value: 






    function endReport() {
      var rep = this.report;

      this.print(this.theme.report.footer.pre.text);
      this.println("     OK: " + rep.ok.length);
      this.println(" Failed: " + rep.failed.length);
      this.println("Ignored: " + rep.ignored.length);
      this.println("  Total: " + rep.length);
      this.print(this.theme.report.footer.post.text);} }, { key: "endTask", value: 





    function endTask(res) {
      this.println(
      this.formatTaskPreTitle() + 
      this.formatTaskResult(res.result) + 
      " " + this.formatTaskTitle(res.title) + (
      res.result == "ignored" ? "" : " " + this.formatTaskTime(res.time)));


      if (res.result == "failed") this.println(this.formatTaskError(res.error));} }, { key: "formatReportPreTitle", value: 





    function formatReportPreTitle() {
      return this.theme.report.header.pre.text;} }, { key: "formatReportPostTitle", value: 





    function formatReportPostTitle() {
      return this.theme.report.header.post.text;} }, { key: "formatReportTitle", value: 





    function formatReportTitle(title) {
      return title;} }, { key: "formatTaskPreTitle", value: 





    function formatTaskPreTitle() {
      return this.theme.task.header.pre.text;} }, { key: "formatTaskTitle", value: 





    function formatTaskTitle(title) {
      return title;} }, { key: "formatTaskResult", value: 





    function formatTaskResult(result) {
      return this.theme.task.result[result].text;} }, { key: "formatTaskTime", value: 





    function formatTaskTime(time) {
      return "(" + time + " ms)";} }, { key: "formatTaskError", value: 





    function formatTaskError(err) {
      return err.toString();} }], [{ key: "DEFAULT_THEME", get: 


    function get() {
      return DEFAULT_THEME;} }]);return ConsoleReporter;})(_Reporter3["default"]);exports["default"] = ConsoleReporter;module.exports = exports["default"];
