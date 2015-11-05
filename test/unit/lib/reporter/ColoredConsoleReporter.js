//imports
const spy = require("justo-spy");
const ColoredConsoleReporter = require("../../../../dist/es5/nodejs/justo-reporter").reporter.ColoredConsoleReporter;

//suite
describe("ColoredConsoleReporter", function() {
  describe("#constructor()", function() {
    const DEFAULT_THEME = ColoredConsoleReporter.DEFAULT_THEME;

    it("constructor()", function() {
      var rep = new ColoredConsoleReporter();
      rep.must.have({
        name: "reporter",
        enabled: true,
        disabled: false,
        stack: [],
        theme: DEFAULT_THEME
      });
    });

    it("constructor(name)", function() {
      var rep = new ColoredConsoleReporter("test");
      rep.must.have({
        name: "test",
        enabled: true,
        disabled: false,
        stack: [],
        theme: DEFAULT_THEME
      });
    });

    it("constructor(opts)", function() {
      var rep = new ColoredConsoleReporter({
        enabled: false,
        theme: {
          ok: {text: "OK", color: "black"},
          failed: {text: "FAILED"},
          ignored: {text: "IGNORED"}
        }
      });
      rep.must.have({
        name: "reporter",
        enabled: false,
        disabled: true,
        stack: [],
        theme: {
          ok: {text: "OK", color: "black"},
          failed: {text: "FAILED", color: DEFAULT_THEME.failed.color},
          ignored: {text: "IGNORED", color: DEFAULT_THEME.ignored.color}
        }
      });
    });

    it("constructor(name, opts)", function() {
      var rep = new ColoredConsoleReporter(
        "test",
        {
          enabled: false,
          theme: {
            ok: {text: "OK", color: "black"},
            failed: {text: "FAILED"},
            ignored: {text: "IGNORED"}
          }
        }
      );
      rep.must.have({
        name: "test",
        enabled: false,
        disabled: true,
        stack: [],
        theme: {
          ok: {text: "OK", color: "black"},
          failed: {text: "FAILED", color: DEFAULT_THEME.failed.color},
          ignored: {text: "IGNORED", color: DEFAULT_THEME.ignored.color}
        }
      });
    });
  });

  describe("#endTask()", function() {
    var rep, task;

    beforeEach(function() {
      rep = spy(new ColoredConsoleReporter(), ["endTask()", "print() {}", "println() {}"]);
      task = {};
    });

    it("endTask()", function() {
      rep.start("test", task);
      rep.end(task, "ok", undefined, Date.now(), Date.now() + 10);
      rep.spy.called("endTask()").must.be.eq(1);
      rep.spy.called("print()").must.be.eq(1);  //by start()
      rep.spy.called("println()").must.be.eq(1);
      rep.spy.getCall("println()").arguments[0].must.match(/^ .+V.+ \([0-9]+ ms\)$/);
    });
  });
});
