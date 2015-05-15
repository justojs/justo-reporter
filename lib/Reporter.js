/**
 * A reporter.
 *
 * @readonly suites:boolean             Must it report the suites?
 * @readonly finalizers:boolean         Must it report the finalizers?
 * @readonly initializers:boolean       Must it report the initializers?
 * @readonly simpleTasks:boolean        Must it report the simple tasks?
 * @readonly parameterizedTasks:boolean Must it report the parameterized tasks?
 * @readonly multiTasks:boolean         Must it report the multi tasks?
 * @readonly ignored:boolean            Must it report the ignored items?
 * @readonly passed:boolean             Must it report the passed items?
 * @readonly failed:boolean             Must it report the failed items?
 * @readonly writers:writers            The writers.
 */
export class Reporter {
  /**
   * Constructor.
   *
   * @param [opts]:object The options: initializers (boolean), finalizers (boolean),
   *                      ignored (boolean), passed (boolean), failed (boolean),
   *                      suites (boolean), simpleTasks (boolean), parameterizedTasks
   *                      (boolean) and multiTasks (boolean).
   */
  constructor(opts = {}) {
    Object.defineProperty(this, "suites", {value: opts.hasOwnProperty("suites") ? !!opts.suites : true, enumerable: true, writable: true});
    Object.defineProperty(this, "finalizers", {value: opts.hasOwnProperty("finalizers") ? !!opts.finalizers : true, enumerable: true, writable: true});
    Object.defineProperty(this, "initializers", {value: opts.hasOwnProperty("initializers") ? !!opts.initializers : true, enumerable: true, writable: true});
    Object.defineProperty(this, "simpleTasks", {value: opts.hasOwnProperty("simpleTasks") ? !!opts.simpleTasks : true, enumerable: true, writable: true});
    Object.defineProperty(this, "parameterizedTasks", {value: opts.hasOwnProperty("parameterizedTasks") ? !!opts.parameterizedTasks : true, enumerable: true, writable: true});
    Object.defineProperty(this, "multiTasks", {value: opts.hasOwnProperty("multiTasks") ? !!opts.multiTasks : true, enumerable: true, writable: true});
    Object.defineProperty(this, "ignored", {value: opts.hasOwnProperty("ignored") ? !!opts.ignored : true, enumerable: true, writable: true});
    Object.defineProperty(this, "passed", {value: opts.hasOwnProperty("passed") ? !!opts.passed : true, enumerable: true, writable: true});
    Object.defineProperty(this, "failed", {value: opts.hasOwnProperty("failed") ? !!opts.failed : true, enumerable: true, writable: true});
    Object.defineProperty(this, "writers", {value: []});
  }

  /**
   * Receives a result for reporting.
   *
   * @param res:Result  The result to report.
   */
  report(res) {
    var rep = true;

    //(1) check constraints
    if (!this.suites && res instanceof SuiteResult) rep = false;
    if (!this.initializers && res instanceof InitializerResult) rep = false;
    if (!this.finalizers && res instanceof FinalizerResult) rep = false;
    if (!this.simpleTasks && res instanceof SimpleTaskResult) rep = false;
    if (!this.parameterizedTasks && res instanceof ParameterizedTaskResult) rep = false;
    if (!this.multiTasks && res instanceof MultiTaskResult) rep = false;
    if (!this.ignored && res.state === ResultState.IGNORED) rep = false;
    if (!this.passed && res.state === ResultState.PASSED) rep = false;
    if (!this.failed && res.state === ResultState.FAILED) rep = false;

    //(2) write
    if (rep) {
      for (let i = 0; i < this.writers.length; ++i) {
        this.writers[0].write(res);
      }
    }
  }

  /**
   * Adds a writer.
   *
   * @param writer:Writer The writer to add.
   */
  add(writer) {
    this.writers.push(writer);
  }
}
