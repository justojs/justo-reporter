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
              ignored: {text: "IGNORED", color: "blue"},
              running: {text: "RUNNING", color: "cyan"}
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
          header: DEFAULT_THEME.header,
          task: {
            title: {
              simple: DEFAULT_THEME.task.title.simple,
              composite: DEFAULT_THEME.task.title.composite
            },
            result: {
              between: DEFAULT_THEME.task.result.between,
              ok: {text: "OK", color: "black"},
              failed: {text: "FAILED", color: "blue"},
              ignored: {text: "IGNORED", color: "blue"},
              running: {text: "RUNNING", color: "cyan"}
            }
          }
        }
      });
    });
  });

  describe("#endTask()", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new ColoredConsoleReporter(), ["endTask() {}"]);
    });

    it("endTask() - OK", function() {
      rep.start("Test report");
      rep.start("test", task);

      rep.end(task, ResultState.OK, undefined, Date.now(), Date.now() + 10);

      rep.spy.called("endTask()").must.be.eq(1);
    });

    it("endTask() - FAILED", function() {
      rep.start("Test report");
      rep.start("test", task);
      rep.end(task, ResultState.FAILED, new Error("Syntax error."), 0, 10);

      rep.spy.called("endTask()").must.be.eq(1);
    });
  });
});
