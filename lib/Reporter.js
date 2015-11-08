//imports
import Report from "./Report";
import Result from "./Result";

//private members
const startReport = Symbol();
const startTask = Symbol();
const endTask = Symbol();
const endReport = Symbol();

/**
 * A reporter.
 *
 * @abstract
 * @readonly name:string        The reporter name.
 * @readonly enabled:boolean    Is the reported enabled?
 * @readonly(#) stack:object[]  The active tasks.
 * @attr(#) _report:Report      The report.
 */
export default class Reporter {
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
    //(1) arguments
    if (typeof(opts) == "string") opts = {name: opts};
    if (!opts) opts = {};

    //(2) init
    Object.defineProperty(this, "name", {value: opts.name || "reporter", enumerable: true});
    Object.defineProperty(this, "enabled", {value: opts.hasOwnProperty("enabled") ? !!opts.enabled : true, enumerable: true});
    Object.defineProperty(this, "stack", {value: []});
    Object.defineProperty(this, "_report", {value: undefined, writable: true});
  }

  /**
   * The report.
   *
   * @type Report
   */
  get report() {
    return this._report;
  }

  /**
   * Has it been started?
   *
   * @protected
   * @type boolean
   */
  get started() {
    return !!this.report;
  }

  /**
   * Is it disabled? true, yep; false, nope.
   *
   * @type boolean
   */
  get disabled() {
    return !this.enabled;
  }

  /**
   * Starts the report or starts a composite task result.
   *
   * @overload Starts the report.
   * @param title:string  The report title.
   *
   * @overload Starts a task.
   * @param title:string  The call title.
   * @param task:Task     The task.
   */
  start(title, task) {
    //(0) pre
    if (this.disabled) return;

    //(1) notify
    if (arguments.length === 0) throw new Error("Invalid number of arguments. Expected at least one.");
    else if (arguments.length === 1) this[startReport](title);
    else this[startTask](title, task);
  }

  /**
   * @private
   */
  [startReport](title) {
    if (this.stack.length) {
      throw new Error("Invalid start of report. There're tasks.");
    } else {
      if (this.started) {
        throw new Error("Report already started.");
      } else {
        this._report = new Report(title);
        this.startReport(title);
      }
    }
  }

  /**
   * Invoked by start() if start of report.
   *
   * @protected
   * @param title:string  The report title.
   */
  startReport(title) {
    //to reimplement if needed in subclasses
  }

  /**
   * @private
   */
  [startTask](title, task) {
    //(0) pre
    if (!task) {
      throw new Error("Invalid number of arguments. Expected title and task. Only one received.");
    }

    if (!this.started) {
      throw new Error("No report started.");
    }

    //(1) push item
    this.stack.push({title, task});

    //(2) notify
    this.startTask(title, task);
  }

  /**
   * Invoked by start() if start of task.
   *
   * @protected
   * @param title:string  The call title.
   * @param task:Task     The task.
   */
  startTask(title, task) {
    //to reimplement if needed in subclasses
  }

  /**
   * Ends the report or ends last task.
   *
   * @overload Ends the report.
   * @noparam
   *
   * @overload
   * @param task:Task         The task.
   * @param result:string     The result: ok, failed, ignored.
   * @param error:object      The error if occurred.
   * @param start:Date        The start date.
   * @param end:Date          The end date.
   */
  end(...args) {
    //(0) pre
    if (this.disabled) return;

    //(2) notify
    if (args.length === 0) this[endReport]();
    else this[endTask](...args);
  }

  /**
   * @private
   */
  [endReport]() {
    //(0) pre
    if (!this.started) {
      throw new Error("Invalid end of report. No report started.");
    }

    if (this.stack.length > 0) {
      throw new Error("Invalid end of report. There're active tasks.");
    }

    this.endReport();
    this._report = undefined;
  }

  /**
   * Invoked by end() when end of report.
   *
   * @protected
   */
  endReport() {
    //to reimplement if needed in subclasses
  }

  /**
   * @private
   */
  [endTask](task, result, error, start, end) {
    var item, res;

    //(0) pre:
    if (arguments.length == 1) {
      throw new Error("Invalid number of arguents. Expected, at least, task and result.");
    }

    //(1) pop active task
    item = this.stack.pop();

    if (item.task !== task) {
      throw new Error("Invalid end of task. Another task must be ended firstly.");
    }

    //(2) add to report and notify
    this.report.add(res = new Result(item.title, task, result, error, start, end));
    this.endTask(res);
  }

  /**
   * Invokes by end() when end of task.
   *
   * @protected
   *
   * @param res:Result    The result.
   */
  endTask(res) {
    //to reimplement if needed in subclasses
  }
}
