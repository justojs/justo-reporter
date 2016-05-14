"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _deepAssign = require("deep-assign");var _deepAssign2 = _interopRequireDefault(_deepAssign);
var _justoResult = require("justo-result");
var _Reporter2 = require("../Reporter");var _Reporter3 = _interopRequireDefault(_Reporter2);
var _util = require("../util");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}


var DEFAULT_THEME = { 
  header: { 
    title: {} }, 

  task: { 
    title: {}, 
    result: { 
      location: "pre", 
      between: ["[ ", " ]"], 
      ok: { 
        text: "OK" }, 

      failed: { 
        text: "ER" }, 

      ignored: { 
        text: "IG" } } } };






var endSimpleTask = Symbol();
var endCompositeTask = Symbol();

var printError = Symbol();
var printSimpleResult = Symbol();
var printSimpleResultStart = Symbol();
var printSimpleResultEnd = Symbol();var 









ConsoleReporter = function (_Reporter) {_inherits(ConsoleReporter, _Reporter);












  function ConsoleReporter() {var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];_classCallCheck(this, ConsoleReporter);var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConsoleReporter).call(this, 

    opts));


    if (!opts) opts = {};

    Object.defineProperty(_this, "print", { value: process.stdout.write.bind(process.stdout), writable: true });
    Object.defineProperty(_this, "println", { value: console.log, writable: true });
    Object.defineProperty(_this, "theme", { value: (0, _deepAssign2.default)({}, _this.getDefaultTheme(), opts.theme || {}), enumerable: true });return _this;}_createClass(ConsoleReporter, [{ key: "getDefaultTheme", value: function getDefaultTheme() 

















    {
      return JSON.parse(JSON.stringify(DEFAULT_THEME));} }, { key: "startReport", value: function startReport(





    title) {
      this.println("\n  " + this.formatReportTitle(title));} }, { key: "formatReportTitle", value: function formatReportTitle(





    title) {
      return title;} }, { key: "endReport", value: function endReport() 





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
      this.println("");} }, { key: "formatCompositeTaskTitle", value: function formatCompositeTaskTitle(





    title) {
      return title;} }, { key: "formatSimpleTaskTitle", value: function formatSimpleTaskTitle(





    title) {
      return title;} }, { key: "formatTaskResult", value: function formatTaskResult(





    state) {
      return this.theme.task.result[state.name.toLowerCase()].text;} }, { key: "formatTaskTime", value: function formatTaskTime(





    time) {
      return "(" + time + " ms)";} }, { key: "formatTaskError", value: function formatTaskError(





    err, level) {
      return (0, _util.indent)(this.stackTrace ? err.stack || err.toString() : err.toString(), level, "  ");} }, { key: "ignoreTask", value: function ignoreTask(





    res) {
      this[printSimpleResult](res.level, _justoResult.ResultState.IGNORED, res.title, 0);} }, { key: "startTask", value: function startTask(





    title, task) {
      var result = this.theme.task.result;

      if (task.isComposite()) {
        this.println(
        "  ".repeat(this.stack.length) + 
        this.formatCompositeTaskTitle(title));} else 

      {
        if (result.location == "post") this[printSimpleResultStart](this.stack.length - 1, title);}} }, { key: "endTask", value: function endTask(






    res) {
      if (res.isComposite()) this[endCompositeTask](res);else 
      this[endSimpleTask](res);} }, { key: 


    endCompositeTask, value: function value(res) {
      var result = this.theme.task.result;

      if (res.ownState === _justoResult.ResultState.FAILED) {
        if (result.location == "pre") {
          this[printSimpleResult](res.level, res.ownState, "Workflow function", res.time);} else 
        {
          this[printSimpleResultStart](res.level, "Workflow function");
          this[printSimpleResultEnd](res.ownState, res.time);}


        if (res.ownError) this[printError](res.level, res.ownError);}} }, { key: 



    endSimpleTask, value: function value(res) {
      if (this.theme.task.result.location == "pre") this[printSimpleResult](res.level, res.state, res.title, res.time);else 
      this[printSimpleResultEnd](res.state, res.time);

      if (res.state === _justoResult.ResultState.FAILED) this[printError](res.level, res.error);} }, { key: 



    printError, value: function value(level, error) {
      this.println(this.formatTaskError(error, level));} }, { key: 


    printSimpleResult, value: function value(level, state, title, time) {
      var result = this.theme.task.result;
      var txt;

      txt = "  ".repeat(level - 1);
      if (result.between) txt += result.between[0];
      txt += this.formatTaskResult(state);
      if (result.between) txt += result.between[1];
      txt += " " + this.formatSimpleTaskTitle(title) + " " + this.formatTaskTime(time);

      this.println(txt);} }, { key: 


    printSimpleResultStart, value: function value(level, title) {
      this.print(
      "  ".repeat(level) + 
      this.formatSimpleTaskTitle(title));} }, { key: 



    printSimpleResultEnd, value: function value(state, time) {
      var result = this.theme.task.result;
      var txt = " ";

      if (result.between) txt += result.between[0];
      txt += this.formatTaskResult(state);
      if (result.between) txt += result.between[1];
      txt += " " + this.formatTaskTime(time);

      this.println(txt);} }], [{ key: "DEFAULT_THEME", get: function get() {return DEFAULT_THEME;} }]);return ConsoleReporter;}(_Reporter3.default);exports.default = ConsoleReporter;
