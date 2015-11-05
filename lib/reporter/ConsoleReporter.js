//imports
import Reporter from "../Reporter";

//default config
const DEFAULT_THEME = {
  ok: {
    text: "V"
  },
  failed: {
    text: "X"
  },
  ignored: {
    text: "#"
  }
};

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
   * @overload Anonymous.
   * @param [opts]:object The reporter options: enabled (boolean), display (object).
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
    if (args.length == 1 && typeof(args[0]) == "object") opts = args[0];
    else if (args.length >= 2) opts = args[1];


    Object.defineProperty(this, "print", {value: process.stdout.write.bind(process.stdout), writable: true});
    Object.defineProperty(this, "println", {value: console.log, writable: true});
    Object.defineProperty(this, "theme", {value: Object.assign({}, DEFAULT_THEME, opts.theme), enumerable: true});
  }

  /**
   * @override
   */
  startTask(title, task) {
    this.print(title);
  }

  /**
   * @override
   */
  endTask(res) {
    this.println(` ${this.formatResult(res.result)} (${res.time} ms)`);
    if (res.result == "failed") this.println(res.error);
  }

  /**
   * @override
   */
  endReport() {
    var rep = this.report;

    this.println("");
    this.println(`     OK: ${rep.ok.length}`);
    this.println(` Failed: ${rep.failed.length}`);
    this.println(`Ignored: ${rep.ignored.length}`);
    this.println(`  Total: ${rep.length}`);
  }

  /**
   * @protected
   */
  formatResult(result) {
    return this.theme[result].text;
  }

  static get DEFAULT_THEME() {
    return DEFAULT_THEME;
  }
}
