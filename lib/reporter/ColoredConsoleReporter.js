//imports
import colors from "colors";
import {ResultState} from "justo-result";
import ConsoleReporter from "./ConsoleReporter";
import {indent} from "../util.js";

//default config
const DEFAULT_THEME = {
  header: {
    title: {
      color: "yellow"
    },
  },
  task: {
    title: {
      simple: "white",
      composite: "black"
    },
    result: {
      location: "pre",
      between: ["[ ", " ]"],
      ok: {
        text: "OK",
        color: "green"
      },
      failed: {
        text: "ER",
        color: "red"
      },
      ignored: {
        text: "IG",
        color: "grey"
      }
    }
  }
};

/**
 * A console reporter with colors.
 *
 * @readonly theme:object The color theme.
 */
export default class ColoredConsoleReporter extends ConsoleReporter {
  /**
   * Return the default theme.
   *
   * @private
   * @return object
   */
  getDefaultTheme() {
    return JSON.parse(JSON.stringify(DEFAULT_THEME));
  }

  /**
   * @override
   */
  endReport() {
    var rep = this.report;
    var ok = rep.getNumberOf(ResultState.OK);
    var failed = rep.getNumberOf(ResultState.FAILED);
    var ignored = rep.getNumberOf(ResultState.IGNORED);

    this.println("");
    this.print(`  ${colors[this.theme.task.result.ok.color]("OK")} ${ok}`);
    this.print(` | ${colors[this.theme.task.result.failed.color]("Failed")} ${failed}`);
    this.print(` | ${colors[this.theme.task.result.ignored.color]("Ignored")} ${ignored}`);
    this.println(` | Total ${ok + failed + ignored}`);
    this.println("");
  }

  /**
   * @override
   */
  formatReportTitle(title) {
    return colors[this.theme.header.title.color](title);
  }

  /**
   * @override
   */
  formatSimpleTaskTitle(title) {
    return colors[this.theme.task.title.simple](title);
  }

  /**
   * @override
   */
  formatCompositeTaskTitle(title) {
    return colors[this.theme.task.title.composite](title);
  }

  /**
   * @override
   */
  formatTaskResult(state) {
    state = state.name.toLowerCase();
    return colors[this.theme.task.result[state].color](this.theme.task.result[state].text);
  }

  /**
   * @override
   */
  formatTaskTime(time) {
    return colors.gray(`(${time} ms)`);
  }

  /**
   * @override
   */
  formatTaskError(err, level) {
    return colors[this.theme.task.result.failed.color](indent(this.stackTrace ? err.stack || err.toString() : err.toString(), level+1, "  "));
  }

  static get DEFAULT_THEME() {
    return DEFAULT_THEME;
  }
}
