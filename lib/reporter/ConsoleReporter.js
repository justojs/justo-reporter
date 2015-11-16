//imports
import {ResultState} from "justo-result";
import Reporter from "../Reporter";
import {indent} from "../util";

//default config
const DEFAULT_THEME = {
  report: {
    header: {
      pre: {
        text: "\n  "
      },
      post: {
        text: ""
      }
    },
    footer: {
      pre: {
        text: "\n"
      },
      post: {
        text: "\n"
      }
    }
  },
  task: {
    header: {
      pre: {
        text: "  "
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
        text: "-"
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
        this.theme.report.footer = Object.assign({}, DEFAULT_THEME.report.footer, report.footer);

        if (report.header) {
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

    this.print(this.theme.report.footer.pre.text);
    this.println(`     OK: ${ok}`);
    this.println(` Failed: ${failed}`);
    this.println(`Ignored: ${ignored}`);
    this.println(`  Total: ${ok + failed + ignored}`);
    this.print(this.theme.report.footer.post.text);
  }

  /**
   * @override
   */
  startTask(title, task) {
    if (task.isMacro() || task.isWorkflow()) {
      this.println(
        this.formatTaskPreTitle(res.level) +
        " " + this.formatTaskTitle(res.title)
      );

      if (res.result == "failed") this.println(this.formatTaskError(res.error));
    }
  }

  /**
   * @override
   */
  endTask(res) {
    this.println(
      this.formatTaskPreTitle(res.level) +
      this.formatTaskResult(res.state) +
      " " + this.formatTaskTitle(res.title) +
      " " + this.formatTaskTime(res.time)
    );

    if (res.result == "failed") this.println(this.formatTaskError(res.error));
  }

  /**
   * @override
   */
  ignoreTask(res) {
    this.println(
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
  formatTaskPreTitle(level) {
    return this.theme.task.header.pre.text.repeat(level);
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
  formatTaskError(err) {
    return err.toString();
  }

  static get DEFAULT_THEME() {
    return DEFAULT_THEME;
  }
}
