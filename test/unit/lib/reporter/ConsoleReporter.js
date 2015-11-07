//imports
const spy = require("justo-spy");
const ConsoleReporter = require("../../../../dist/es5/nodejs/justo-reporter").reporter.ConsoleReporter;

//suite
describe("ConsoleReporter", function() {
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

    it("constructor(opts)", function() {
      var rep = new ConsoleReporter({
        enabled: false,
        theme: {
          ok: {text: "OK"},
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
          ok: {text: "OK"},
          failed: {text: "FAILED"},
          ignored: {text: "IGNORED"}
        }
      });
    });

    it("constructor(name, opts)", function() {
      var rep = new ConsoleReporter(
        "test",
        {
          enabled: false,
          theme: {
            ok: {text: "OK"},
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
          ok: {text: "OK"},
          failed: {text: "FAILED"},
          ignored: {text: "IGNORED"}
        }
      });
    });
  });

  describe("#startReport()", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new ConsoleReporter(), ["startReport()", "print() {}", "println() {}"]);
    });

    it("startReport()", function() {
      rep.start("Test report");
      rep.spy.called("startReport()").must.be.eq(1);
      rep.spy.getArguments("startReport()").must.be.eq(["Test report"]);
      rep.spy.called("print()").must.be.eq(0);
      rep.spy.called("println()").must.be.eq(1);
      rep.spy.getArguments("println()").must.be.eq(["Test report"]);
    });
  });

  describe("#startTask()", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new ConsoleReporter(), ["startTask()", "print() {}", "println() {}"]);
    });

    it("startTask()", function() {
      rep.start("Test report");
      rep.start("test", {});
      rep.spy.called("startTask()").must.be.eq(1);
      rep.spy.calledWith("startTask()", ["test", {}]).must.be.eq(1);
      rep.spy.called("print()").must.be.eq(1);
      rep.spy.calledWith("print()", ["test"]).must.be.eq(1);
      rep.spy.called("println()").must.be.eq(1);
    });
  });

  describe("#endTask()", function() {
    var rep, task;

    beforeEach(function() {
      rep = spy(new ConsoleReporter(), ["endTask()", "print() {}", "println() {}"]);
      task = {};
    });

    it("endTask()", function() {
      rep.start("Test report");
      rep.start("test", task);

      rep.end(task, "ok", undefined, Date.now(), Date.now() + 10);

      rep.spy.called("endTask()").must.be.eq(1);
      rep.spy.called("print()").must.be.eq(1);
      rep.spy.called("println()").must.be.eq(2);
      rep.spy.getArguments("println()", 0).must.be.eq(["Test report"]);
      rep.spy.getArguments("print()").must.be.eq(["test"]);
      rep.spy.getArguments("println()", 1)[0].must.match(/^ V \([0-9]+ ms\)$/);
    });
  });
});
