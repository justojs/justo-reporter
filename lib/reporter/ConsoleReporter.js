//imports
import {ResultState} from "justo-result";
import Reporter from "../Reporter";
import {indent} from "../util";

//default config
const DEFAULT_THEME = {
  report: {
    header: {
      pre: {
        text: ""
      },
      post: {
        text: ""
      }
    },
  },
  task: {
    header: {
      pre: {
        text: ""
      }
    },
    result: {
      ok: {
        text: "V"
      },
      failed: {
        text: "X"
      },
      ignored: {
        text: "I"
      }
    }
  }
};

/**
 * A reporter to display the task run in the console.
 *
 * @readonly(-) print:function    The print function.
 * @readonly(-) println:function  The println function.
 * @readonly theme:object         The theme to use: ok.text (string),
 *                                failed.text (string) and ignored.text (string).
 */
export default class ConsoleReporter extends Reporter {
  /**
   * Constructor.
   *
   * @overload
   * @noparam
   *
   * @overload
   * @param(attr) name
   *
   * @overload
   * @param opts:object The reporter options.
   */
  constructor(opts = {}) {
    //(1) super
    super(opts);

    //(2) this
    if (!opts) opts = {};

    Object.defineProperty(this, "print", {value: process.stdout.write.bind(process.stdout), writable: true});
    Object.defineProperty(this, "println", {value: console.log, writable: true});
    this.initTheme(opts.theme);
  }

  /**
   * Sets the theme object.
   *
   * @protected
   */
  initTheme(theme) {
    //(1) create attribute
    Object.defineProperty(this, "theme", {value: Object.assign({}, DEFAULT_THEME, theme), enumerable: true});

    //(2) set real theme with default values
    if (theme) {
      if (theme.report) {
        let report = theme.report;

        this.theme.report.header = Object.assign({}, DEFAULT_THEME.report.header, report.header);

        if (report.header) {
          this.theme.report.header.pre = Object.assign({}, DEFAULT_THEME.report.header.pre, report.header.pre);
          this.theme.report.header.post = Object.assign({}, DEFAULT_THEME.report.header.post, report.header.post);
        }
      }

      if (theme.task) {
        let task = theme.task;

        if (task.header) {
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
  startReport(title) {
    this.println(
      "\n  " +
      this.formatReportPreTitle() +
      this.formatReportTitle(title) +
      this.formatReportPostTitle()
    );
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
    this.print(`  OK ${ok}`);
    this.print(` | Failed ${failed}`);
    this.print(` | Ignored ${ignored}`);
    this.println(` | Total ${ok + failed + ignored}`);
    this.println("");
  }

  /**
   * @override
   */
  startTask(title, task) {
    if (task.isComposite()) {
      this.println(
        "  ".repeat(this.stack.length) +
        this.formatTaskPreTitle() +
        this.formatTaskTitle(title)
      );
    }
  }

  /**
   * @override
   */
  endTask(res) {
    if (res.isSimple()) {
      this.println(
        "  ".repeat(res.level) +
        this.formatTaskPreTitle() +
        this.formatTaskResult(res.state) +
        " " + this.formatTaskTitle(res.title) +
        " " + this.formatTaskTime(res.time)
      );

      if (res.state === ResultState.FAILED) this.println(this.formatTaskError(res.error, res.level));
    } else {  //isComposite() : true
      if (res.ownState === ResultState.FAILED) { //workflow with error in its function
        this.println(
          "  ".repeat(res.level + 1) +
          this.formatTaskPreTitle() +
          this.formatTaskResult(res.ownState) +
          " " + this.formatTaskTitle("Workflow function") +
          " " + this.formatTaskTime(res.time)
        );

        if (res.ownError) this.println(this.formatTaskError(res.ownError, res.level));
      }
    }
  }

  /**
   * @override
   */
  ignoreTask(res) {
    this.println(
      "  ".repeat(res.level) +
      this.formatTaskResult(ResultState.IGNORED) +
      " " + this.formatTaskTitle(res.title)
    );
  }

  /**
   * @protected
   */
  formatReportPreTitle() {
    return this.theme.report.header.pre.text;
  }

  /**
   * @protected
   */
  formatReportPostTitle() {
    return this.theme.report.header.post.text;
  }

  /**
   * @protected
   */
  formatReportTitle(title) {
    return title;
  }

  /**
   * @protected
   */
  formatTaskPreTitle() {
    return this.theme.task.header.pre.text;
  }

  /**
   * @protected
   */
  formatTaskTitle(title) {
    return title;
  }

  /**
   * @protected
   */
  formatTaskResult(state) {
    return this.theme.task.result[state.name.toLowerCase()].text;
  }

  /**
   * @protected
   */
  formatTaskTime(time) {
    return `(${time} ms)`;
  }

  /**
   * @protected
   */
  formatTaskError(err, level) {
    return indent(this.stackTrace ? err.stack : err.toString(), level+1, "  ");
  }

  static get DEFAULT_THEME() {
    return DEFAULT_THEME;
  }
}
