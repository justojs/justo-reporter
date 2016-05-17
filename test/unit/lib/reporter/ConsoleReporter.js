//imports
const spy = require("justo-spy");
const stub = require("justo-stub");
const ResultState = require("justo-result").ResultState;
const ConsoleReporter = require("../../../../dist/es5/nodejs/justo-reporter").reporter.ConsoleReporter;

//suite
describe("ConsoleReporter", function() {
  var task;

  beforeEach(function() {
    task = stub({}, {"isSimple()": true, "isComposite()": false});
  });

  describe("#constructor()", function() {
    const DEFAULT_THEME = ConsoleReporter.DEFAULT_THEME;

    it("constructor()", function() {
      var rep = new ConsoleReporter();

      rep.must.have({
        name: "reporter",
        enabled: true,
        disabled: false,
        stack: [],
        theme: DEFAULT_THEME
      });
    });

    it("constructor(undefined)", function() {
      var rep = new ConsoleReporter(undefined);

      rep.must.have({
        name: "reporter",
        enabled: true,
        disabled: false,
        stack: [],
        theme: DEFAULT_THEME
      });
    });

    it("constructor(null)", function() {
      var rep = new ConsoleReporter(null);

      rep.must.have({
        name: "reporter",
        enabled: true,
        disabled: false,
        stack: [],
        theme: DEFAULT_THEME
      });
    });

    it("constructor(name)", function() {
      var rep = new ConsoleReporter("test");

      rep.must.have({
        name: "test",
        enabled: true,
        disabled: false,
        stack: [],
        theme: DEFAULT_THEME
      });
    });

    it("constructor(opts) - with header", function() {
      var rep = new ConsoleReporter({
        enabled: false,
        theme: {
          header: {

          }
        }
      });
      rep.must.have({
        name: "reporter",
        enabled: false,
        disabled: true,
        stack: [],
        theme: DEFAULT_THEME
      });
    });

    it("constructor(opts) - with task", function() {
      var rep = new ConsoleReporter({
        enabled: false,
        theme: {
          task: {
            title: {},
            result: {
              ok: {
                text: "V"
              },
              failed: {
                text: "X"
              },
              ignored: {
                text: "-"
              },
              running: {
                text: "R"
              }
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
            title: DEFAULT_THEME.task.title,
            result: {
              between: DEFAULT_THEME.task.result.between,
              ok: {
                text: "V"
              },
              failed: {
                text: "X"
              },
              ignored: {
                text: "-"
              },
              running: {
                text: "R"
              }
            }
          }
        }
      });
    });
  });

  describe("Report", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new ConsoleReporter(), ["startReport() {}", "endReport() {}"]);
    });

    it("#startReport()", function() {
      rep.start("Test report");

      rep.spy.called("startReport()").must.be.eq(1);
      rep.spy.calledWith("startReport()", ["Test report"]).must.be.eq(1);
      rep.spy.called("endReport()").must.be.eq(0);
    });

    it("#endReport()", function() {
      rep.start("Test report");
      rep.end();

      rep.spy.called("startReport()").must.be.eq(1);
      rep.spy.getArguments("startReport()").must.be.eq(["Test report"]);
      rep.spy.called("endReport()").must.be.eq(1);
      rep.spy.calledWith("endReport()", []).must.be.eq(1);
    });
  });

  describe("Task", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new ConsoleReporter(), ["endTask() {}"]);
    });

    it("endTask() - OK", function() {
      rep.start("Test report");
      rep.start("test", task);
      rep.end(task, ResultState.OK, undefined, 0, 10);

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
