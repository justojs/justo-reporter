"use strict";Object.defineProperty(exports, "__esModule", { value: true });var _Reporter = require("./lib/Reporter");Object.defineProperty(exports, "Reporter", { enumerable: true, get: function get() {return _interopRequireDefault(_Reporter).default;} });var _Reporters = require("./lib/Reporters");Object.defineProperty(exports, "Reporters", { enumerable: true, get: function get() {return _interopRequireDefault(_Reporters).
    default;} });function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var reporter = exports.reporter = { 
  get ConsoleReporter() {
    "use strict";
    return require("./lib/reporter/ConsoleReporter").default;}, 


  get ColoredConsoleReporter() {
    "use strict";
    return require("./lib/reporter/ColoredConsoleReporter").default;} };
