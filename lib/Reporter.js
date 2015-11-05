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
 * @attr(#) report:Report       The report.
 */
export default class Reporter {
  /**
   * Constructor.
   *
   * @overload Anonymous.
   * @param [opts]:object The reporter options: enabled (boolean), display (object).
   *
   * @overload With name.
   * @param(attr) name
   * @param [opts]:object Reporter options.
   */
  constructor(...args) {
    var name, opts;

    //(1) arguments
    if (args.length == 1) {
      if (typeof(args[0]) == "string") name = args[0];
      else opts = args[0];
    } else if (args.length >= 2) {
      [name, opts] = args;
    }

    if (!opts) opts = {};

    //(2) init
    Object.defineProperty(this, "name", {value: name || "reporter", enumerable: true});
    Object.defineProperty(this, "enabled", {value: opts.hasOwnProperty("enabled") ? !!opts.enabled : true, enumerable: true});
    Object.defineProperty(this, "stack", {value: []});
    Object.defineProperty(this, "report", {value: undefined, writable: true});
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
   * @noparam
   *
   * @overload Starts a task.
   * @param title:string  The call title.
   * @param task:Task     The task.
   */
  start(...args) {
    //(0) pre
    if (this.disabled) return;

    //(1) notify
    if (args.length === 0) this[startReport]();
    else this[startTask](...args);
  }

  /**
   * @private
   */
  [startReport]() {
    if (this.stack.length) {
      throw new Error("Invalid start of report. There're tasks.");
    } else {
      if (this.started) {
        throw new Error("Report already started.");
      } else {
        this.report = new Report();
        this.startReport();
      }
    }
  }

  /**
   * Invoked by start() if start of report.
   *
   * @protected
   */
  startReport() {
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

    //(1) push item
    if (!this.started) this.start();
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
    if (this.stack.length > 0) {
      throw new Error("Invalid end of report. There're active tasks.");
    }

    this.endReport();
    this.report = undefined;
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
   * @param res:Result  The result.
   */
  endTask(res) {
    //to reimplement if needed in subclasses
  }
}
