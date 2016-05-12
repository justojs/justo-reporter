//imports
import deepAssign from "deep-assign";
import {ResultState} from "justo-result";
import Reporter from "../Reporter";
import {indent} from "../util";

//default config
const DEFAULT_THEME = {
  header: {
    title: {}
  },
  task: {
    title: {},
    result: {
      location: "pre",
      between: ["[ ", " ]"],
      ok: {
        text: "OK"
      },
      failed: {
        text: "ER"
      },
      ignored: {
        text: "IG"
      }
    }
  }
};

//internal members
const endSimpleTask = Symbol();
const endCompositeTask = Symbol();

const printError = Symbol();
const printSimpleResult = Symbol();
const printSimpleResultStart = Symbol();
const printSimpleResultEnd = Symbol();

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
    Object.defineProperty(this, "theme", {value: deepAssign({}, this.getDefaultTheme(), opts.theme || {}), enumerable: true});
  }

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
   * @override
   */
  startReport(title) {
    this.println("\n  " + this.formatReportTitle(title));
  }

  /**
   * @protected
   */
  formatReportTitle(title) {
    return title;
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
   * @protected
   */
  formatCompositeTaskTitle(title) {
    return title;
  }

  /**
   * @protected
   */
  formatSimpleTaskTitle(title) {
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
    return indent(this.stackTrace ? err.stack || err.toString() : err.toString(), level, "  ");
  }

  /**
   * @override
   */
  ignoreTask(res) {
    this[printSimpleResult](res.level, ResultState.IGNORED, res.title, 0);
  }

  /**
   * @override
   */
  startTask(title, task) {
    const result = this.theme.task.result;

    if (task.isComposite()) {
      this.println(
        "  ".repeat(this.stack.length) +
        this.formatCompositeTaskTitle(title)
      );
    } else {
      if (result.location == "post") this[printSimpleResultStart](this.stack.length - 1, title);
    }
  }

  /**
   * @override
   */
  endTask(res) {
    if (res.isComposite()) this[endCompositeTask](res);
    else this[endSimpleTask](res);
  }

  [endCompositeTask](res) {
    var result = this.theme.task.result;

    if (res.ownState === ResultState.FAILED) {  //workflow with error into its function
      if (result.location == "pre") {
        this.printSimpleResult(res.level, res.ownState, "Workflow function", res.time);
      } else {  //result.location == "post"
        this.printSimpleResultStart(res.level, "Workflow function");
        this.printSimpleResultEnd(res.ownState, res.time);
      }

      if (res.ownError) this[printError](res.level, res.ownError);
    }
  }

  [endSimpleTask](res) {
    if (this.theme.task.result.location == "pre") this[printSimpleResult](res.level, res.state, res.title, res.time);
    else this[printSimpleResultEnd](res.state, res.time);

    if (res.state === ResultState.FAILED) this[printError](res.level, res.error);
  }

  //print helpers
  [printError](level, error) {
    this.println(this.formatTaskError(error, level));
  }

  [printSimpleResult](level, state, title, time) {
    const result = this.theme.task.result;
    var txt;

    txt = "  ".repeat(level - 1);
    if (result.between) txt += result.between[0];
    txt += this.formatTaskResult(state);
    if (result.between) txt += result.between[1];
    txt += " " + this.formatSimpleTaskTitle(title) + " " + this.formatTaskTime(time);

    this.println(txt);
  }

  [printSimpleResultStart](level, title) {
    this.print(
      "  ".repeat(level) +
      this.formatSimpleTaskTitle(title)
    );
  }

  [printSimpleResultEnd](state, time) {
    const result = this.theme.task.result;
    var txt = " ";

    if (result.between) txt += result.between[0];
    txt += this.formatTaskResult(state);
    if (result.between) txt += result.between[1];
    txt += " " + this.formatTaskTime(time);

    this.println(txt);
  }
}
