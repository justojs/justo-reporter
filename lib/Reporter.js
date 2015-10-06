/**
 * A reporter.
 *
 * @readonly name:string      The reporter name.
 * @readonly enabled:boolean  Is the reported enabled?
 * @readonly display:object   What to display.
 * @readonly writers:Writers  The writers.
 */
export class Reporter {
  /**
   * Constructor.
   *
   * @param(attr) name
   * @param [opts]:object Reporter options: enabled (boolean), display (object).
   */
  constructor(name = "default", opts = {}) {
    Object.defineProperty(this, "name", {value: name, enumerable: true});
    Object.defineProperty(this, "enabled", {value: opts.hasOwnProperty("enabled") ? !!opts.enabled : true});
    Object.defineProperty(this, "writers", {value: new Writers()});
    Object.defineProperty(this, "display", {enumerable: true, value: {
      initializers: true,
      finalizers: true,
      suites: true,
      multitasks: true,
      simpleTasks: true,
      subtasks: true,
      ignored: true,
      passed: true,
      failed: true
    }});

    if (opts.display) {
      let d = opts.display;

      if (d.hasOwnProperty("initializers")) this.display.initializers = !!d.initializers;
      if (d.hasOwnProperty("finalizers")) this.display.finalizers = !!d.finalizers;
      if (d.hasOwnProperty("suites")) this.display.suites = !!d.suites;
      if (d.hasOwnProperty("multitasks")) this.display.multitasks = !!d.multitasks;
      if (d.hasOwnProperty("simpleTasks")) this.display.simpleTasks = !!d.simpleTasks;
      if (d.hasOwnProperty("subtasks")) this.display.subtasks = !!d.subtasks;
      if (d.hasOwnProperty("ignored")) this.display.ignored = !!d.ignored;
      if (d.hasOwnProperty("passed")) this.display.passed = !!d.passed;
      if (d.hasOwnProperty("failed")) this.display.failed = !!d.failed;
    }
  }

  /**
   * Receives a result for reporting.
   *
   * @param res:Result  The result to report.
   */
  report(res) {
    var rep = true;

    //(0) pre: enabled?
    if (!this.enabled) return;

    //(1) check constraints
    if (res instanceof SuiteResult && !this.display.suites) rep = false;
    if (res instanceof InitializerResult && !this.display.initializers) rep = false;
    if (res instanceof FinalizerResult && !this.display.finalizers) rep = false;
    if (res instanceof SimpleTaskResult && !this.display.simpleTasks) rep = false;
    if (res instanceof MultitaskResult && !this.display.multitasks) rep = false;
    if (res.state === ResultState.IGNORED && !this.display.ignored) rep = false;
    if (res.state === ResultState.PASSED && !this.display.passed) rep = false;
    if (res.state === ResultState.FAILED && !this.display.failed) rep = false;

    //(2) notify writers
    if (rep) this.writers.write(res);
  }

  /**
   * Adds a writer.
   *
   * @param writer:Writer The writer to add.
   */
  add(writer) {
    this.writers.add(writer);
  }
}
