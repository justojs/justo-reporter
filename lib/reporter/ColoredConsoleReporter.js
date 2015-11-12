//imports
import colors from "colors";
import ConsoleReporter from "./ConsoleReporter";
import {indent} from "../util.js";

//default config
const DEFAULT_THEME = {
  report: {
    header: {
      title: {
        color: "yellow"
      },
      pre: {
        text: "  ",
        color:"yellow"
      },
      post: {
        text: "",
        color: "yellow"
      }
    },
    footer: {
      pre: {
        text: "\n",
        color: "gray"
      },
      post: {
        text: "\n",
        color: "gray"
      }
    }
  },
  task: {
    header: {
      title: {
        color: "white"
      },
      pre: {
        text: "  ",
        color: "white"
      }
    },
    result: {
      ok: {
        text: "V",
        color: "green"
      },
      failed: {
        text: "X",
        color: "red"
      },
      ignored: {
        text: "-",
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
   * @override
   */
  initTheme(theme) {
    //(1) create attribute
    Object.defineProperty(this, "theme", {value: Object.assign({}, DEFAULT_THEME, theme), enumerable: true});

    //(2) set real theme with default values
    if (theme) {
      if (theme.report) {
        let report = theme.report;

        this.theme.report.header = Object.assign({}, DEFAULT_THEME.report.header, report.header);
        this.theme.report.footer = Object.assign({}, DEFAULT_THEME.report.footer, report.footer);

        if (report.header) {
          this.theme.report.header.title = Object.assign({}, DEFAULT_THEME.report.header.title, report.header.title);
          this.theme.report.header.pre = Object.assign({}, DEFAULT_THEME.report.header.pre, report.header.pre);
          this.theme.report.header.post = Object.assign({}, DEFAULT_THEME.report.header.post, report.header.post);
        }

        if (report.footer) {
          this.theme.report.footer.pre = Object.assign({}, DEFAULT_THEME.report.footer.pre, report.footer.pre);
          this.theme.report.footer.post = Object.assign({}, DEFAULT_THEME.report.footer.post, report.footer.post);
        }
      }

      if (theme.task) {
        let task = theme.task;


        if (task.header) {
          this.theme.task.title = Object.assign({}, DEFAULT_THEME.task.title, task.title);
          this.theme.task.header = Object.assign({}, DEFAULT_THEME.task.header, task.header);
          this.theme.task.header.pre = Object.assign({}, DEFAULT_THEME.task.header.pre, task.header.pre);
        }

        if (task.result) {
          this.theme.task.result = Object.assign({}, DEFAULT_THEME.task.result, task.result);
          this.theme.task.result.ok = Object.assign({}, DEFAULT_THEME.task.result.ok, task.result.ok);
          this.theme.task.result.failed = Object.assign({}, DEFAULT_THEME.task.result.failed, task.result.failed);
          this.theme.task.result.ignored = Object.assign({}, DEFAULT_THEME.task.result.ignored, task.result.ignored);
        }
      }
    }
  }

  /**
   * @override
   */
  endReport() {
    var rep = this.report;

    this.print(colors[this.theme.report.footer.pre.color](this.theme.report.footer.pre.text));
    this.println(`  ${colors[this.theme.task.result.ok.color]("OK")}      ${rep.ok.length}`);
    this.println(`  ${colors[this.theme.task.result.failed.color]("Failed")}  ${rep.failed.length}`);
    this.println(`  ${colors[this.theme.task.result.ignored.color]("Ignored")} ${rep.ignored.length}`);
    this.println(`  Total   ${rep.length}`);
    this.print(colors[this.theme.report.footer.post.color](this.theme.report.footer.post.text));
  }

  /**
   * @override
   */
  formatReportPreTitle() {
    return colors[this.theme.report.header.pre.color](this.theme.report.header.pre.text);
  }

  /**
   * @override
   */
  formatReportTitle(title) {
    return colors[this.theme.report.header.title.color](title);
  }

  /**
   * @override
   */
  formatReportPostTitle() {
    return colors[this.theme.report.header.post.color](this.theme.report.header.post.text);
  }

  /**
   * @override
   */
  formatTaskPreTitle() {
    return colors[this.theme.task.header.pre.color](this.theme.task.header.pre.text);
  }

  /**
   * @override
   */
  formatTaskTitle(title) {
    return colors[this.theme.task.header.title.color](title);
  }

  /**
   * @override
   */
  formatTaskResult(result) {
    return colors[this.theme.task.result[result].color](this.theme.task.result[result].text);
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
    return colors[this.theme.task.result.failed.color](indent(err.toString(), 1, "    "));
  }

  static get DEFAULT_THEME() {
    return DEFAULT_THEME;
  }
}
