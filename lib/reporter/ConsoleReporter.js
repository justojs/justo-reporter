//imports
import deepAssign from "deep-assign";
import Console from "justo-console";
import {ResultState} from "justo-result";
import Reporter from "../Reporter";

//default config
const DEFAULT_THEME = {
  header: {
    title: {}
  },
  task: {
    title: {},
    result: {
      between: ["[ ", " ]"],
      ok: {
        text: "OK"
      },
      failed: {
        text: "ER"
      },
      ignored: {
        text: "IG"
      },
      running: {
        text: "CR"
      }
    }
  }
};

//internal members
const printError = Symbol();
const buildSimpleResult = Symbol();
const printSimpleResult = Symbol();
const logSimpleResult = Symbol();
const confirmSimpleResult = Symbol();
const logCompositeResult = Symbol();

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
   * @param opts:object The reporter options: theme (object), console (Console).
   */
  constructor(opts) {
    //(1) arguments
    if (!opts) opts = {};

    //(2) init
    super(opts);
    Object.defineProperty(this, "theme", {value: deepAssign({}, this.getDefaultTheme(), opts.theme || {}), enumerable: true});
    Object.defineProperty(this, "console", {value: opts.console || new Console()});
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
    this.console.level = 1;
    this.console.log("\n" + this.formatReportTitle(title));
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

    //(1) print result
    this.console.log();

    this.console.log(
      `${this.getOkTitle()} ${ok}`,
      `| ${this.getFailedTitle()} ${failed}`,
      `| ${this.getIgnoredTitle()} ${ignored}`,
      `| Total ${ok + failed + ignored}`
    );

    this.console.log();

    //(2) decrement console level
    this.console.level = 0;
  }

  /**
   * @protected
   */
  getOkTitle() {
    return "OK";
  }

  /**
   * @protected
   */
  getFailedTitle() {
    return "Failed";
  }

  /**
   * @protected
   */
  getIgnoredTitle() {
    return "Ignored";
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
  formatTaskError(err) {
    return this.stackTrace ? err.stack || err.toString() : err.toString();
  }

  /**
   * @override
   */
  ignoreTask(res) {
    this[logSimpleResult](ResultState.IGNORED, res.title);
  }

  /**
   * @override
   */
  startTask(title, task) {
    const result = this.theme.task.result;

    if (task.isComposite()) {
      this.console.level += 1;
      this[logCompositeResult](title);
    } else {  //simple
      this[printSimpleResult](ResultState.RUNNING, title);
    }
  }

  /**
   * @override
   */
  endTask(res) {
    if (res.isComposite()) {
      if (res.ownState === ResultState.FAILED) {  //workflow with error into its function
        this[logSimpleResult](res.ownState, "Workflow function", res.time);
        if (res.ownError) this[printError](res.ownError);
      }

      this.console.level -= 1;
    } else {
      this[confirmSimpleResult](res.state, res.title, res.time);
      if (res.state === ResultState.FAILED) this[printError](res.error);
    }
  }

  //print helpers
  [printError](error) {
    this.console.log(this.formatTaskError(error));
  }

  [buildSimpleResult](state, title, time) {
    const result = this.theme.task.result;
    var txt;

    //(1) build
    txt = "";

    if (result.between) txt += result.between[0];
    txt += this.formatTaskResult(state);
    if (result.between) txt += result.between[1];

    txt += " " + this.formatSimpleTaskTitle(title);
    if (time !== undefined && time !== null) txt += " " + this.formatTaskTime(time);

    //(2) return
    return txt;
  }

  [printSimpleResult](state, title, time) {
    this.console.print(this[buildSimpleResult](state, title, time));
  }

  [logSimpleResult](state, title, time) {
    this.console.log(this[buildSimpleResult](state, title, time));
  }

  [confirmSimpleResult](state, title, time) {
    this.console.confirm(this[buildSimpleResult](state, title, time));
  }

  [logCompositeResult](title) {
    this.console.log(this.formatCompositeTaskTitle(title));
  }
}
