"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();var _get = function get(object, property, receiver) {if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {var parent = Object.getPrototypeOf(object);if (parent === null) {return undefined;} else {return get(parent, property, receiver);}} else if ("value" in desc) {return desc.value;} else {var getter = desc.get;if (getter === undefined) {return undefined;}return getter.call(receiver);}};
var _colors = require("colors");var _colors2 = _interopRequireDefault(_colors);
var _justoResult = require("justo-result");
var _ConsoleReporter2 = require("./ConsoleReporter");var _ConsoleReporter3 = _interopRequireDefault(_ConsoleReporter2);
var _util = require("../util.js");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}


var DEFAULT_THEME = { 
  header: { 
    title: { 
      color: "yellow" } }, 


  task: { 
    title: { 
      simple: "gray", 
      composite: "cyan" }, 

    result: { 
      between: ["[ ", " ]"], 
      ok: { 
        text: "OK", 
        color: "green" }, 

      failed: { 
        text: "ER", 
        color: "red" }, 

      ignored: { 
        text: "IG", 
        color: "white" }, 

      running: { 
        text: "CR", 
        color: "yellow" } } } };var 










ColoredConsoleReporter = function (_ConsoleReporter) {_inherits(ColoredConsoleReporter, _ConsoleReporter);function ColoredConsoleReporter() {_classCallCheck(this, ColoredConsoleReporter);return _possibleConstructorReturn(this, Object.getPrototypeOf(ColoredConsoleReporter).apply(this, arguments));}_createClass(ColoredConsoleReporter, [{ key: "getDefaultTheme", value: function getDefaultTheme() 















    {
      return JSON.parse(JSON.stringify(DEFAULT_THEME));} }, { key: "getOkTitle", value: function getOkTitle() 





    {
      return _colors2.default[this.theme.task.result.ok.color]("OK");} }, { key: "getFailedTitle", value: function getFailedTitle() 





    {
      return _colors2.default[this.theme.task.result.failed.color]("Failed");} }, { key: "getIgnoredTitle", value: function getIgnoredTitle() 





    {
      return _colors2.default[this.theme.task.result.ignored.color]("Ignored");} }, { key: "formatReportTitle", value: function formatReportTitle(





    title) {
      return _colors2.default[this.theme.header.title.color](title);} }, { key: "formatSimpleTaskTitle", value: function formatSimpleTaskTitle(





    title) {
      return _colors2.default[this.theme.task.title.simple](title);} }, { key: "formatCompositeTaskTitle", value: function formatCompositeTaskTitle(





    title) {
      return _colors2.default[this.theme.task.title.composite](title);} }, { key: "formatTaskResult", value: function formatTaskResult(





    state) {
      state = state.name.toLowerCase();
      return _colors2.default[this.theme.task.result[state].color](this.theme.task.result[state].text);} }, { key: "formatTaskTime", value: function formatTaskTime(





    time) {
      return _colors2.default.gray("(" + time + " ms)");} }, { key: "formatTaskError", value: function formatTaskError(





    err) {
      return _colors2.default[this.theme.task.result.failed.color](_get(Object.getPrototypeOf(ColoredConsoleReporter.prototype), "formatTaskError", this).call(this, err));} }], [{ key: "DEFAULT_THEME", get: function get() {return DEFAULT_THEME;} }]);return ColoredConsoleReporter;}(_ConsoleReporter3.default);exports.default = ColoredConsoleReporter;
