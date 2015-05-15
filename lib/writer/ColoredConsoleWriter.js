//imports
const colors = require("colors/safe");

/**
 * A colored console writer.
 */
export class ColoredConsoleWriter extends ConsoleWriter {
  /**
   * Constructor.
   *
   * @param opts:object The options.
   */
  constructor(opts = {}) {
    super(opts);
  }

  /**
   * @override
   */
  formatTitle(res) {
    if (res instanceof SuiteResult) res = colors.white(res.title);
    else res = colors.gray(res.title);

    return res;
  }

  /**
   * @override
   */
  formatStateText(res) {
    switch (res.state) {
      case ResultState.PASSED: res = colors.green(this.passed); break;
      case ResultState.FAILED: res = colors.red(this.failed); break;
      case ResultState.IGNORED: res = colors.blue(this.ignored); break;
    }

    return res;
  }
}
