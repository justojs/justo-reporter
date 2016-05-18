"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _deepAssign = require("deep-assign");var _deepAssign2 = _interopRequireDefault(_deepAssign);
var _justoConsole = require("justo-console");var _justoConsole2 = _interopRequireDefault(_justoConsole);
var _justoResult = require("justo-result");
var _Reporter2 = require("../Reporter");var _Reporter3 = _interopRequireDefault(_Reporter2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}


var DEFAULT_THEME = { 
  header: { 
    title: {} }, 

  task: { 
    title: {}, 
    result: { 
      between: ["[ ", " ]"], 
      ok: { 
        text: "OK" }, 

      failed: { 
        text: "ER" }, 

      ignored: { 
        text: "IG" }, 

      running: { 
        text: "CR" } } } };






var printError = Symbol();
var buildSimpleResult = Symbol();
var printSimpleResult = Symbol();
var logSimpleResult = Symbol();
var logCompositeResult = Symbol();var 









ConsoleReporter = function (_Reporter) {_inherits(ConsoleReporter, _Reporter);












  function ConsoleReporter(opts) {_classCallCheck(this, ConsoleReporter);

    if (!opts) opts = {};var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConsoleReporter).call(this, 


    opts));
    Object.defineProperty(_this, "theme", { value: (0, _deepAssign2.default)({}, _this.getDefaultTheme(), opts.theme || {}), enumerable: true });
    Object.defineProperty(_this, "console", { value: opts.console || new _justoConsole2.default() });return _this;}_createClass(ConsoleReporter, [{ key: "getDefaultTheme", value: function getDefaultTheme() 

















    {
      return JSON.parse(JSON.stringify(DEFAULT_THEME));} }, { key: "startReport", value: function startReport(





    title) {
      this.console.level = 1;
      this.console.log("\n", this.formatReportTitle(title));} }, { key: "formatReportTitle", value: function formatReportTitle(





    title) {
      return title;} }, { key: "endReport", value: function endReport() 





    {
      var rep = this.report;
      var ok = rep.getNumberOf(_justoResult.ResultState.OK);
      var failed = rep.getNumberOf(_justoResult.ResultState.FAILED);
      var ignored = rep.getNumberOf(_justoResult.ResultState.IGNORED);


      this.console.log();

      this.console.log(
      this.getOkTitle() + " " + ok, "| " + 
      this.getFailedTitle() + " " + failed, "| " + 
      this.getIgnoredTitle() + " " + ignored, "| Total " + (
      ok + failed + ignored));


      this.console.log();


      this.console.level = 0;} }, { key: "getOkTitle", value: function getOkTitle() 





    {
      return "OK";} }, { key: "getFailedTitle", value: function getFailedTitle() 





    {
      return "Failed";} }, { key: "getIgnoredTitle", value: function getIgnoredTitle() 





    {
      return "Ignored";} }, { key: "formatCompositeTaskTitle", value: function formatCompositeTaskTitle(





    title) {
      return title;} }, { key: "formatSimpleTaskTitle", value: function formatSimpleTaskTitle(





    title) {
      return title;} }, { key: "formatTaskResult", value: function formatTaskResult(





    state) {
      return this.theme.task.result[state.name.toLowerCase()].text;} }, { key: "formatTaskTime", value: function formatTaskTime(





    time) {
      return "(" + time + " ms)";} }, { key: "formatTaskError", value: function formatTaskError(





    err) {
      return this.stackTrace ? err.stack || err.toString() : err.toString();} }, { key: "ignoreTask", value: function ignoreTask(





    res) {
      this[logSimpleResult](_justoResult.ResultState.IGNORED, res.title);} }, { key: "startTask", value: function startTask(





    title, task) {
      var result = this.theme.task.result;

      if (task.isComposite()) {
        this.console.level += 1;
        this[logCompositeResult](title);} else 
      {
        this[printSimpleResult](_justoResult.ResultState.RUNNING, title);}} }, { key: "endTask", value: function endTask(






    res) {
      if (res.isComposite()) {
        if (res.ownState === _justoResult.ResultState.FAILED) {
          this[logSimpleResult](res.ownState, "Workflow function", res.time);
          if (res.ownError) this[printError](res.ownError);}


        this.console.level -= 1;} else 
      {
        this[logSimpleResult](res.state, res.title, res.time);
        if (res.state === _justoResult.ResultState.FAILED) this[printError](res.error);}} }, { key: 




    printError, value: function value(error) {
      this.console.log(this.formatTaskError(error));} }, { key: 


    buildSimpleResult, value: function value(state, title, time) {
      var result = this.theme.task.result;
      var txt;


      txt = "";

      if (result.between) txt += result.between[0];
      txt += this.formatTaskResult(state);
      if (result.between) txt += result.between[1];

      txt += " " + this.formatSimpleTaskTitle(title);
      if (time !== undefined && time !== null) txt += " " + this.formatTaskTime(time);


      return txt;} }, { key: 


    printSimpleResult, value: function value(state, title, time) {
      this.console.print(this[buildSimpleResult](state, title, time));} }, { key: 


    logSimpleResult, value: function value(state, title, time) {
      this.console.log(this[buildSimpleResult](state, title, time));} }, { key: 


    logCompositeResult, value: function value(title) {
      this.console.log(this.formatCompositeTaskTitle(title));} }], [{ key: "DEFAULT_THEME", get: function get() {return DEFAULT_THEME;} }]);return ConsoleReporter;}(_Reporter3.default);exports.default = ConsoleReporter;
