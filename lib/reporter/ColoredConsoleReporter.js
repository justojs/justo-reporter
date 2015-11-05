//imports
import colors from "colors";
import ConsoleReporter from "./ConsoleReporter";

//default config
const DEFAULT_THEME = {
  ok: {
    text: "V",
    color: "green"
  },
  failed: {
    text: "X",
    color: "red"
  },
  ignored: {
    text: "#",
    color: "gray"
  }
};

/**
 * A console reporter with colors.
 *
 * @readonly theme:object The color theme.
 */
export default class ColoredConsoleReporter extends ConsoleReporter {
  /**
   * Constructor.
   *
   * @overload Anonymous.
   * @param [opts]:object The reporter options: enabled (boolean), display (object), theme (object).
   *
   * @overload With name.
   * @param(attr) name
   * @param [opts]:object Reporter options.
   */
  constructor(...args) {
    var opts = {};

    //(1) super
    super(...args);

    //(2) this
    this.theme.ok = Object.assign({}, DEFAULT_THEME.ok, this.theme.ok);
    this.theme.failed = Object.assign({}, DEFAULT_THEME.failed, this.theme.failed);
    this.theme.ignored = Object.assign({}, DEFAULT_THEME.ignored, this.theme.ignored);
  }

  /**
   * @override
   */
  formatResult(result) {
    return colors[this.theme[result].color](this.theme[result].text);
  }

  static get DEFAULT_THEME() {
    return DEFAULT_THEME;
  }
}
