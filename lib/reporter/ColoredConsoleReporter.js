//imports
import colors from "colors";
import ConsoleReporter from "./ConsoleReporter";

//default config
const DEFAULT_THEME = {
  report: {
    header: {
      title: {
        color: "yellow"
      },
      pre: {
        text: "■ ",
        color:"yellow"
      },
      post: {
        text: "",
        color: "yellow"
      }
    },
    footer: {
      pre: {
        text: "---",
        color: "yellow"
      },
      post: {
        text: "---",
        color: "yellow"
      }
    }
  },
  task: {
    header: {
      title: {
        color: "yellow"
      },
      pre: {
        text: "♦ ",
        color: "yellow"
      }
    },
    result: {
      ok: {
        text: "✓",
        color: "green"
      },
      failed: {
        text: "✗",
        color: "red"
      },
      ignored: {
        text: "#",
        color: "gray"
      }
    }
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
    super(...args);
  }

  /**
   * @override
   */
  initTheme(theme) {
    //(1) create attribute
    Object.defineProperty(this, "theme", {value: Object.assign({}, DEFAULT_THEME, theme), enumerable: true});

    //(2) set real theme with default values
    if (theme) {
      if (theme.report) {
        let report = theme.report;

        this.theme.report.header = Object.assign({}, DEFAULT_THEME.report.header, report.header);
        this.theme.report.footer = Object.assign({}, DEFAULT_THEME.report.footer, report.footer);

        if (report.header) {
          this.theme.report.header.title = Object.assign({}, DEFAULT_THEME.report.header.title, report.header.title);
          this.theme.report.header.pre = Object.assign({}, DEFAULT_THEME.report.header.pre, report.header.pre);
          this.theme.report.header.post = Object.assign({}, DEFAULT_THEME.report.header.post, report.header.post);
        }

        if (report.footer) {
          this.theme.report.footer.pre = Object.assign({}, DEFAULT_THEME.report.footer.pre, report.footer.pre);
          this.theme.report.footer.post = Object.assign({}, DEFAULT_THEME.report.footer.post, report.footer.post);
        }
      }

      if (theme.task) {
        let task = theme.task;


        if (task.header) {
          this.theme.task.title = Object.assign({}, DEFAULT_THEME.task.title, task.title);
          this.theme.task.header = Object.assign({}, DEFAULT_THEME.task.header, task.header);
          this.theme.task.header.pre = Object.assign({}, DEFAULT_THEME.task.header.pre, task.header.pre);
        }

        if (task.result) {
          this.theme.task.result = Object.assign({}, DEFAULT_THEME.task.result, task.result);
          this.theme.task.result.ok = Object.assign({}, DEFAULT_THEME.task.result.ok, task.result.ok);
          this.theme.task.result.failed = Object.assign({}, DEFAULT_THEME.task.result.failed, task.result.failed);
          this.theme.task.result.ignored = Object.assign({}, DEFAULT_THEME.task.result.ignored, task.result.ignored);
        }
      }
    }
  }

  /**
   * @override
   */
  formatReportTitle(title) {
    return colors[this.theme.report.header.title.color](title);
  }

  /**
   * @override
   */
  formatTaskTitle(title) {
    return colors[this.theme.task.header.title.color](title);
  }

  /**
   * @override
   */
  formatResult(result) {
    return colors[this.theme.task.result[result].color](this.theme.task.result[result].text);
  }

  static get DEFAULT_THEME() {
    return DEFAULT_THEME;
  }
}
