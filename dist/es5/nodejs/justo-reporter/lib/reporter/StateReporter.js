"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();
var _justoResult = require("justo-result");
var _Reporter2 = require("../Reporter");var _Reporter3 = _interopRequireDefault(_Reporter2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var 




StateReporter = function (_Reporter) {_inherits(StateReporter, _Reporter);





  function StateReporter(opts) {_classCallCheck(this, StateReporter);var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StateReporter).call(this, 

    opts));


    Object.defineProperty(_this, "state", { value: _justoResult.ResultState.OK, enumerable: true, writable: true });return _this;}_createClass(StateReporter, [{ key: "endTask", value: function endTask(





    res) {
      if (res.state === _justoResult.ResultState.FAILED) this.state = _justoResult.ResultState.FAILED;} }]);return StateReporter;}(_Reporter3.default);exports.default = StateReporter;
