/**
 * A console writer.
 *
 * @readonly passed:object  The text to write if passed.
 * @readonly failed:object  The text to write if failed.
 * @readonly ignored:object The text to write if ignored.
 */
export class ConsoleWriter extends Writer {
  /**
   * Constructor.
   *
   * @param [opts]:object The options: passed (string or object),
   *                      failed (string or object) and ignored (string or object).
   */
  constructor(opts = {}) {
    super();

    Object.defineProperty(this, "passed", {value: value(opts, "passed", "✓"), enumerable: true});
    Object.defineProperty(this, "failed", {value: value(opts, "failed", "✖"), enumerable: true});
    Object.defineProperty(this, "ignored", {value: value(opts, "ignored", "#"), enumerable: true});

    //helper
    function value(opts, state, def) {
      var res = opts[state];

      if (!res) res = {text: def};
      else if (typeof(res) == "string") res = {text: res};

      return res;
    }
  }

  /**
   * @override
   */
  write(res) {
    var txt;

    //(1) format
    if (res instanceof SuiteResult) {
      txt = this.formatTitle(res);
    } else {
      txt = this.formatStateText(res) + " " + this.formatTitle(res);
    }

    //(2) write
    if (res.state !== ResultState.FAILED) {
      console.log(indent(txt, res.level + 1));
    } else {
      console.error(indent(txt, res.level + 1));
      console.error(indent(res.error.stack, res.level + 1));
    }
  }

  /**
   * Returns the title to display.
   *
   * @protected
   * @param res:Result  The result to check.
   * @return string
   */
  formatTitle(res) {
    return res.title;
  }

  /**
   * Returns the state text to display.

   * @protected
   * @param res:Result  The result to check.
   * @return string
   */
  formatStateText(res) {
    switch (res.state) {
      case ResultState.PASSED: res = this.passed.text; break;
      case ResultState.FAILED: res = this.failed.text; break;
      case ResultState.IGNORED: res = this.ignored.text; break;
    }

    return res;
  }
}
