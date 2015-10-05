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

    this.passed.color = color(opts, "passed", "green");
    this.failed.color = color(opts, "failed", "red");
    this.ignored.color = color(opts, "ignored", "blue");

    //helper functions
    function color(opts, state, def) {
      var res = opts[state];

      if (!res || !res.hasOwnProperty("color")) res = def;
      else res = res.color;

      return res;
    }
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
      case ResultState.PASSED: res = colors[this.passed.color](this.passed.text); break;
      case ResultState.FAILED: res = colors[this.failed.color](this.failed.text); break;
      case ResultState.IGNORED: res = colors[this.ignored.color](this.ignored.text); break;
    }

    return res;
  }
}
