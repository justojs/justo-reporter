export {default as Reporter} from "./lib/Reporter";
export {default as Reporters} from "./lib/Reporters";

export const reporter = {
  get ConsoleReporter() {
    "use strict";
    return require("./lib/reporter/ConsoleReporter").default;
  },

  get ColoredConsoleReporter() {
    "use strict";
    return require("./lib/reporter/ColoredConsoleReporter").default;
  },

  get StateReporter() {
    "use strict";
    return require("./lib/reporter/StateReporter").default;
  }
};
