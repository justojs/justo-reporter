//imports
const spy = require("justo-spy");
const stub = require("justo-stub");
const ResultState = require("justo-result").ResultState;
const StateReporter = require("../../../../dist/es5/nodejs/justo-reporter").reporter.StateReporter;

//suite
describe("StateReporter", function() {
  var task;

  beforeEach(function() {
    task = stub({}, {"isSimple()": true, "isComposite()": false});
  });

  describe("#constructor()", function() {
    it("constructor()", function() {
      var rep = new StateReporter();

      rep.must.have({
        name: "reporter",
        enabled: true,
        disabled: false,
        state: ResultState.OK
      });
    });

    it("constructor(undefined)", function() {
      var rep = new StateReporter(undefined);

      rep.must.have({
        name: "reporter",
        enabled: true,
        disabled: false,
        state: ResultState.OK
      });
    });

    it("constructor(null)", function() {
      var rep = new StateReporter(null);

      rep.must.have({
        name: "reporter",
        enabled: true,
        disabled: false,
        state: ResultState.OK
      });
    });

    it("constructor(name)", function() {
      var rep = new StateReporter("test");

      rep.must.have({
        name: "test",
        enabled: true,
        disabled: false,
        state: ResultState.OK
      });
    });
  });

  describe("Report", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new StateReporter(), ["startReport()", "endReport()"]);
    });

    it("#startReport()", function() {
      rep.start("Test report");

      rep.spy.called("startReport()").must.be.eq(1);
      rep.spy.calledWith("startReport()", ["Test report"]).must.be.eq(1);
      rep.spy.called("endReport()").must.be.eq(0);

      rep.state.must.be.eq(ResultState.OK);
    });

    it("#endReport()", function() {
      rep.start("Test report");
      rep.end();

      rep.spy.called("startReport()").must.be.eq(1);
      rep.spy.getArguments("startReport()").must.be.eq(["Test report"]);
      rep.spy.called("endReport()").must.be.eq(1);
      rep.spy.calledWith("endReport()", []).must.be.eq(1);

      rep.state.must.be.eq(ResultState.OK);
    });
  });

  describe("Task", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new StateReporter(), ["endTask()", "print() {}", "println() {}"]);
    });

    it("endTask() - OK", function() {
      rep.start("Test report");
      rep.start("test", task);
      rep.end(task, ResultState.OK, undefined, 0, 10);
      rep.spy.called("endTask()").must.be.eq(1);
      rep.state.must.be.eq(ResultState.OK);
    });

    it("endTask() - FAILED", function() {
      rep.start("Test report");
      rep.start("test", task);
      rep.end(task, ResultState.FAILED, new Error("Syntax error."), 0, 10);

      rep.spy.called("endTask()").must.be.eq(1);
      rep.state.must.be.eq(ResultState.FAILED);
    });
  });
});
