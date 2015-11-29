//imports
const spy = require("justo-spy");
const stub = require("justo-stub");
const ResultState = require("justo-result").ResultState;
const jreporter = require("../../../dist/es5/nodejs/justo-reporter");
const Reporter = jreporter.Reporter;
const Reporters = jreporter.Reporters;

//suite
describe("Reporters", function() {
  var task, task1, task2;

  beforeEach(function() {
    task = stub({}, {"isSimple()": true, "isComposite()": false});
    task1 = stub({}, {"isSimple()": true, "isComposite()": false});
    task2 = stub({}, {"isSimple()": true, "isComposite()": false});
  });

  describe("#constructor()", function() {
    it("constructor()", function() {
      new Reporters().length.must.be.eq(0);
    });
  });

  describe("#add()", function() {
    it("add(rep)", function() {
      var rr = new Reporters();
      rr.add(new Reporter());
      rr.length.must.be.eq(1);
    });
  });

  describe("#start()", function() {
    var reps, rep1, rep2;

    beforeEach(function() {
      reps = new Reporters();
      reps.add(rep1 = spy(new Reporter(), "start() {}"));
      reps.add(rep2 = spy(new Reporter(), "start() {}"));
    });

    it("start() - start of report", function() {
      reps.start("Test report");
      rep1.spy.called("start()").must.be.eq(1);
      rep1.spy.getCall("start()").arguments.must.be.eq(["Test report"]);
      rep2.spy.called("start()").must.be.eq(1);
      rep2.spy.getCall("start()").arguments.must.be.eq(["Test report"]);
    });

    it("start() - start of task", function() {
      reps.start("title", {});
      rep1.spy.called("start()").must.be.eq(1);
      rep1.spy.getCall("start()").arguments.must.be.eq(["title", {}]);
      rep2.spy.called("start()").must.be.eq(1);
      rep2.spy.getCall("start()").arguments.must.be.eq(["title", {}]);
    });

    it("start() - start of two tasks", function() {
      reps.start("one", {});
      reps.start("two", {});
      rep1.spy.called("start()").must.be.eq(2);
      rep1.spy.getCall("start()", 0).arguments.must.be.eq(["one", {}]);
      rep1.spy.getCall("start()", 1).arguments.must.be.eq(["two", {}]);
      rep2.spy.called("start()").must.be.eq(2);
      rep2.spy.getCall("start()", 0).arguments.must.be.eq(["one", {}]);
      rep2.spy.getCall("start()", 1).arguments.must.be.eq(["two", {}]);
    });
  });

  describe("#end()", function() {
    var reps, rep1, rep2;

    beforeEach(function() {
      reps = new Reporters();
      reps.add(rep1 = spy(new Reporter("one"), "end()"));
      reps.add(rep2 = spy(new Reporter("two"), "end()"));
    });

    it("end() - end of report", function() {
      reps.start("Test report");
      reps.end();
      rep1.spy.called("end()").must.be.eq(1);
      rep1.spy.getCall("end()").arguments.must.be.eq([]);
      rep2.spy.called("end()").must.be.eq(1);
      rep2.spy.getCall("end()").arguments.must.be.eq([]);
    });

    it("end() - end of one task", function() {
      reps.start("Test report");
      reps.start("test", task);
      reps.end(task, ResultState.OK);

      rep1.spy.called("end()").must.be.eq(1);
      rep1.spy.getCall("end()").arguments.must.be.eq([task, ResultState.OK]);
      rep2.spy.called("end()").must.be.eq(1);
      rep2.spy.getCall("end()").arguments.must.be.eq([task, ResultState.OK]);
    });

    it("end() - end of two tasks", function() {
      reps.start("Test report");
      reps.start("task1", task1);
      reps.end(task1, ResultState.OK);
      reps.start("task2", task2);
      reps.end(task2, ResultState.OK);

      rep1.spy.called("end()").must.be.eq(2);
      rep1.spy.getCall("end()", 0).arguments.must.be.eq([task1, ResultState.OK]);
      rep1.spy.getCall("end()", 1).arguments.must.be.eq([task2, ResultState.OK]);
      rep2.spy.called("end()").must.be.eq(2);
      rep2.spy.getCall("end()", 0).arguments.must.be.eq([task1, ResultState.OK]);
      rep2.spy.getCall("end()", 1).arguments.must.be.eq([task2, ResultState.OK]);
    });
  });

  describe("#ignore()", function() {
    var reps, rep1, rep2;

    beforeEach(function() {
      reps = new Reporters();
      reps.add(rep1 = spy(new Reporter("one"), "ignore()"));
      reps.add(rep2 = spy(new Reporter("two"), "ignore()"));
    });

    it("ignore()", function() {
      reps.start("Test report");
      reps.ignore("test", task);

      rep1.spy.called("ignore()").must.be.eq(1);
      rep1.spy.calledWith("ignore()", ["test", task]).must.be.eq(1);
      rep2.spy.called("ignore()").must.be.eq(1);
      rep2.spy.calledWith("ignore()", ["test", task]).must.be.eq(1);
    });
  });
});
