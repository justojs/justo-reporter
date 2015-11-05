export const Reporter = require("./Reporter");
export const Reporters = require("./Reporters");
export const reporter = {
  get ConsoleReporter() {
    "use strict";
    return require("./reporter/ConsoleReporter");
  },

  get ColoredConsoleReporter() {
    "use strict";
    return require("./reporter/ColoredConsoleReporter");
  }
};
