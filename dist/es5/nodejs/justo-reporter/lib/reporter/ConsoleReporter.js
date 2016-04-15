"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _justoResult = require("justo-result");
var _Reporter2 = require("../Reporter");var _Reporter3 = _interopRequireDefault(_Reporter2);
var _util = require("../util");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}


var DEFAULT_THEME = { 
  report: { 
    header: { 
      pre: { 
        text: "" }, 

      post: { 
        text: "" } } }, 



  task: { 
    header: { 
      pre: { 
        text: "" } }, 


    result: { 
      ok: { 
        text: "V" }, 

      failed: { 
        text: "X" }, 

      ignored: { 
        text: "I" } } } };var 













ConsoleReporter = function (_Reporter) {_inherits(ConsoleReporter, _Reporter);












  function ConsoleReporter() {var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];_classCallCheck(this, ConsoleReporter);var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConsoleReporter).call(this, 

    opts));


    if (!opts) opts = {};

    Object.defineProperty(_this, "print", { value: process.stdout.write.bind(process.stdout), writable: true });
    Object.defineProperty(_this, "println", { value: console.log, writable: true });
    _this.initTheme(opts.theme);return _this;}_createClass(ConsoleReporter, [{ key: "initTheme", value: function initTheme(







    theme) {

      Object.defineProperty(this, "theme", { value: Object.assign({}, DEFAULT_THEME, theme), enumerable: true });


      if (theme) {
        if (theme.report) {
          var report = theme.report;

          this.theme.report.header = Object.assign({}, DEFAULT_THEME.report.header, report.header);

          if (report.header) {
            this.theme.report.header.pre = Object.assign({}, DEFAULT_THEME.report.header.pre, report.header.pre);
            this.theme.report.header.post = Object.assign({}, DEFAULT_THEME.report.header.post, report.header.post);}}



        if (theme.task) {
          var task = theme.task;

          if (task.header) {
            this.theme.task.header = Object.assign({}, DEFAULT_THEME.task.header, task.header);
            this.theme.task.header.pre = Object.assign({}, DEFAULT_THEME.task.header.pre, task.header.pre);}


          if (task.result) {
            this.theme.task.result = Object.assign({}, DEFAULT_THEME.task.result, task.result);
            this.theme.task.result.ok = Object.assign({}, DEFAULT_THEME.task.result.ok, task.result.ok);
            this.theme.task.result.failed = Object.assign({}, DEFAULT_THEME.task.result.failed, task.result.failed);
            this.theme.task.result.ignored = Object.assign({}, DEFAULT_THEME.task.result.ignored, task.result.ignored);}}}} }, { key: "startReport", value: function startReport(








    title) {
      this.println(
      "\n  " + 
      this.formatReportPreTitle() + 
      this.formatReportTitle(title) + 
      this.formatReportPostTitle());} }, { key: "endReport", value: function endReport() 






    {
      var rep = this.report;
      var ok = rep.getNumberOf(_justoResult.ResultState.OK);
      var failed = rep.getNumberOf(_justoResult.ResultState.FAILED);
      var ignored = rep.getNumberOf(_justoResult.ResultState.IGNORED);

      this.println("");
      this.print("  OK " + ok);
      this.print(" | Failed " + failed);
      this.print(" | Ignored " + ignored);
      this.println(" | Total " + (ok + failed + ignored));
      this.println("");} }, { key: "startTask", value: function startTask(





    title, task) {
      if (task.isComposite()) {
        this.println(
        "  ".repeat(this.stack.length) + 
        this.formatTaskPreTitle() + 
        this.formatTaskTitle(title));}} }, { key: "endTask", value: function endTask(







    res) {
      if (res.task.isSimple()) {
        this.println(
        "  ".repeat(res.level) + 
        this.formatTaskPreTitle() + 
        this.formatTaskResult(res.state) + 
        " " + this.formatTaskTitle(res.title) + 
        " " + this.formatTaskTime(res.time));


        if (res.state === _justoResult.ResultState.FAILED) this.println(this.formatTaskError(res.error, res.level));}} }, { key: "ignoreTask", value: function ignoreTask(






    res) {
      this.println(
      "  ".repeat(res.level) + 
      this.formatTaskResult(_justoResult.ResultState.IGNORED) + 
      " " + this.formatTaskTitle(res.title));} }, { key: "formatReportPreTitle", value: function formatReportPreTitle() 






    {
      return this.theme.report.header.pre.text;} }, { key: "formatReportPostTitle", value: function formatReportPostTitle() 





    {
      return this.theme.report.header.post.text;} }, { key: "formatReportTitle", value: function formatReportTitle(





    title) {
      return title;} }, { key: "formatTaskPreTitle", value: function formatTaskPreTitle() 





    {
      return this.theme.task.header.pre.text;} }, { key: "formatTaskTitle", value: function formatTaskTitle(





    title) {
      return title;} }, { key: "formatTaskResult", value: function formatTaskResult(





    state) {
      return this.theme.task.result[state.name.toLowerCase()].text;} }, { key: "formatTaskTime", value: function formatTaskTime(





    time) {
      return "(" + time + " ms)";} }, { key: "formatTaskError", value: function formatTaskError(





    err, level) {
      return (0, _util.indent)(err.toString(), level, "    ");} }], [{ key: "DEFAULT_THEME", get: function get() 


    {
      return DEFAULT_THEME;} }]);return ConsoleReporter;}(_Reporter3.default);exports.default = ConsoleReporter;
