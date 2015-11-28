//imports
const spy = require("justo-spy");
const stub = require("justo-stub");
const ResultState = require("justo-result").ResultState;
const ColoredConsoleReporter = require("../../../../dist/es5/nodejs/justo-reporter").reporter.ColoredConsoleReporter;

//suite
describe("ColoredConsoleReporter", function() {
  var task;

  beforeEach(function() {
    task = stub({}, {"isSimple()": true, "isComposite()": false});
  });

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

    it("constructor(undefined)", function() {
      var rep = new ColoredConsoleReporter(undefined);

      rep.must.have({
        name: "reporter",
        enabled: true,
        disabled: false,
        stack: [],
        theme: DEFAULT_THEME
      });
    });

    it("constructor(null)", function() {
      var rep = new ColoredConsoleReporter(null);

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
          task: {
            result: {
              ok: {text: "OK", color: "black"},
              failed: {text: "FAILED", color: "blue"},
              ignored: {text: "IGNORED", color: "blue"}
            }
          }
        }
      });

      rep.must.have({
        name: "reporter",
        enabled: false,
        disabled: true,
        stack: [],
        theme: {
          report: DEFAULT_THEME.report,
          task: {
            result: {
              ok: {text: "OK", color: "black"},
              failed: {text: "FAILED", color: "blue"},
              ignored: {text: "IGNORED", color: "blue"}
            }
          }
        }
      });
    });
  });

  describe("#endTask()", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new ColoredConsoleReporter(), ["endTask()", "print() {}", "println() {}"]);
    });

    it("endTask()", function() {
      rep.start("Test report");
      rep.start("test", task);

      rep.end(task, ResultState.OK, undefined, Date.now(), Date.now() + 10);

      rep.spy.called("endTask()").must.be.eq(1);
      rep.spy.called("println()").must.be.eq(2);
      rep.spy.called("print()").must.be.eq(0);
      rep.spy.getArguments("println()", 0)[0].must.match(/.+Test report.+/);
      rep.spy.getArguments("println()", 1)[0].must.match(/^.+V.+ .+test.+ .+\([0-9]+ ms\).+$/);
    });
  });
});
