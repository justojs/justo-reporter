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
      simple: "gray",
      composite: "cyan"
    },
    result: {
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
        color: "white"
      },
      running: {
        text: "CR",
        color: "yellow"
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
   * The default theme.
   *
   * @type object
   */
  static get DEFAULT_THEME() {
    return DEFAULT_THEME;
  }

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
   * @protected
   */
  getOkTitle() {
    return colors[this.theme.task.result.ok.color]("OK");
  }

  /**
   * @protected
   */
  getFailedTitle() {
    return colors[this.theme.task.result.failed.color]("Failed");
  }

  /**
   * @protected
   */
  getIgnoredTitle() {
    return colors[this.theme.task.result.ignored.color]("Ignored");
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
  formatTaskError(err) {
    return colors[this.theme.task.result.failed.color](super.formatTaskError(err));
  }

}
