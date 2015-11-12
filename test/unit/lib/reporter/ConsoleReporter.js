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

    it("constructor(opts) - with report", function() {
      var rep = new ConsoleReporter({
        enabled: false,
        theme: {
          report: {
            header: {
              pre: {
                text: "="
              },
              post: {
                text: "="
              }
            },
            footer: {
              pre: {
                text: "---"
              },
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
          report: {
            header: {
              pre: {
                text: "="
              },
              post: {
                text: "="
              }
            },
            footer: {
              pre: {
                text: "---"
              },
              post: DEFAULT_THEME.report.footer.post
            }
          },
          task: DEFAULT_THEME.task
        }
      });
    });

    it("constructor(opts) - with task", function() {
      var rep = new ConsoleReporter({
        enabled: false,
        theme: {
          task: {
            header: {
              pre: {
                text: "="
              }
            },
            result: {
              ok: {
                text: "OK"
              },
              failed: {
                text: "FAILED"
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
          report: DEFAULT_THEME.report,
          task: {
            header: {
              pre: {
                text: "="
              }
            },
            result: {
              ok: {
                text: "OK"
              },
              failed: {
                text: "FAILED"
              },
              ignored: DEFAULT_THEME.task.result.ignored
            }
          }
        }
      });
    });
  });

  describe("Report", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new ConsoleReporter(), ["startReport()", "endReport()", "print() {}", "println() {}"]);
    });

    it("#startReport()", function() {
      rep.start("Test report");

      rep.spy.called("startReport()").must.be.eq(1);
      rep.spy.calledWith("startReport()", ["Test report"]).must.be.eq(1);
      rep.spy.called("endReport()").must.be.eq(0);

      rep.spy.called("print()").must.be.eq(0);
      rep.spy.called("println()").must.be.eq(1);
      rep.spy.getArguments("println()").must.be.eq(["  Test report"]);
      rep.spy.called("endReport()").must.be.eq(0);
    });

    it("#endReport()", function() {
      rep.start("Test report");
      rep.end();

      rep.spy.called("startReport()").must.be.eq(1);
      rep.spy.getArguments("startReport()").must.be.eq(["Test report"]);
      rep.spy.called("endReport()").must.be.eq(1);
      rep.spy.calledWith("endReport()", []).must.be.eq(1);

      rep.spy.called("print()").must.be.eq(2);
      rep.spy.getArguments("print()", 0).must.be.eq(["\n"]);
      rep.spy.getArguments("print()", 1).must.be.eq(["\n"]);
      rep.spy.called("println()").must.be.eq(5);
      rep.spy.getArguments("println()", 0).must.be.eq(["  Test report"]);
      rep.spy.getArguments("println()", 1)[0].must.match(/OK: .+/);
      rep.spy.getArguments("println()", 2)[0].must.match(/Failed: .+/);
      rep.spy.getArguments("println()", 3)[0].must.match(/Ignored: .+/);
      rep.spy.getArguments("println()", 4)[0].must.match(/Total: .+/);
    });
  });

  describe("Task", function() {
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

      rep.spy.called("print()").must.be.eq(0);
      rep.spy.called("println()").must.be.eq(2);
      rep.spy.getArguments("println()", 0).must.be.eq(["  Test report"]);
      rep.spy.getArguments("println()", 1)[0].must.match(/^  V test \([0-9]+ ms\)$/);
    });
  });
});
