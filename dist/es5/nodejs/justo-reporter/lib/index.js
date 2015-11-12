"use strict";Object.defineProperty(exports, "__esModule", { value: true });var Reporter = require("./Reporter");exports.Reporter = Reporter;
var Reporters = require("./Reporters");exports.Reporters = Reporters;
var reporter = Object.defineProperties({}, { 
  ConsoleReporter: { get: function get() {
      "use strict";
      return require("./reporter/ConsoleReporter");}, configurable: true, enumerable: true }, 


  ColoredConsoleReporter: { get: function get() {
      "use strict";
      return require("./reporter/ColoredConsoleReporter");}, configurable: true, enumerable: true } });exports.reporter = reporter;
