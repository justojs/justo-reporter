"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _justoResult = require("justo-result");function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var 







Report = function () {



  function Report(title) {_classCallCheck(this, Report);
    Object.defineProperty(this, "title", { value: title, enumerable: true });
    Object.defineProperty(this, "results", { value: new _justoResult.Results() });}_createClass(Report, [{ key: "add", value: function add(
















    result) {
      this.results.add(result);} }, { key: "getNumberOf", value: function getNumberOf(





    state) {
      return this.results.getNumberOf(state);} }, { key: "length", get: function get() {return this.results.length;} }]);return Report;}();exports.default = Report;
