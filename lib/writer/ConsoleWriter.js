/**
 * A console writer.
 *
 * @readonly passed:string  The text to write if passed.
 * @readonly failed:string  The text to write if failed.
 * @readonly ignored:string The text to write if ignored.
 */
export class ConsoleWriter extends Writer {
  /**
   * Constructor.
   *
   * @param [opts]:object The options: passed (string), failed (string) and
   *                      ignored (string).
   */
  constructor(opts = {}) {
    super();

    Object.defineProperty(this, "passed", {value: opts.passed || "✓", enumerable: true});
    Object.defineProperty(this, "failed", {value: opts.failed || "✖", enumerable: true});
    Object.defineProperty(this, "ignored", {value: opts.ignored || "#", enumerable: true});
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
      case ResultState.PASSED: res = this.passed; break;
      case ResultState.FAILED: res = this.failed; break;
      case ResultState.IGNORED: res = this.ignored; break;
    }

    return res;
  }
}
