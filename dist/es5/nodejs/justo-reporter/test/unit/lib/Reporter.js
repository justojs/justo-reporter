//imports
const spy = require("justo-spy");
const Reporter = require("../../../dist/es5/nodejs/justo-reporter").Reporter;

//suite
describe("Reporter", function() {
  describe("#constructor()", function() {
    it("constructor()", function() {
      var rep = new Reporter();
      rep.must.have({
        name: "reporter",
        enabled: true,
        disabled: false,
        stack: [],
        report: undefined,
        started: false
      });
    });

    it("constructor(name)", function() {
      var rep = new Reporter("test");
      rep.must.have({
        name: "test",
        enabled: true,
        disabled: false,
        stack: [],
        report: undefined,
        started: false
      });
    });

    it("constructor(opts)", function() {
      var rep = new Reporter({enabled: false});
      rep.must.have({
        name: "reporter",
        enabled: false,
        disabled: true,
        stack: [],
        report: undefined,
        started: false
      });
    });

    it("constructor(name, opts)", function() {
      var rep = new Reporter("test", {enabled: false});
      rep.must.have({
        name: "test",
        enabled: false,
        disabled: true,
        stack: [],
        report: undefined,
        started: false
      });
    });
  });

  describe("#start()", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new Reporter(), ["startReport() {}", "startTask()"]);
    });

    it("start() - start of report", function() {
      rep.start();
      rep.started.must.be.eq(true);
      rep.spy.called("startReport()").must.be.eq(1);
      rep.spy.getCall("startReport()").arguments.must.be.eq([]);
      rep.spy.called("startTask()").must.be.eq(0);
    });

    it("start(title)", function() {
      rep.start.bind(rep, "title").must.raise("Invalid number of arguments. Expected title and task. Only one received.");
    });

    it("start(title, task) - start of task", function() {
      rep.start("test", {});
      rep.started.must.be.eq(true);
      rep.stack.length.must.be.eq(1);
      rep.spy.called("startReport()").must.be.eq(1);
      rep.spy.getCall("startReport()").arguments.must.be.eq([]);
      rep.spy.called("startTask()").must.be.eq(1);
      rep.spy.getCall("startTask()").arguments.must.be.eq(["test", {}]);
    });

    it("start() - start of report with active tasks", function() {
      rep.start("test", {});
      rep.started.must.be.eq(true);
      rep.start.bind(rep).must.raise("Invalid start of report. There're tasks.");
      rep.stack.length.must.be.eq(1);
      rep.spy.called("startReport()").must.be.eq(1);
      rep.spy.called("startTask()").must.be.eq(1);
    });
  });

  describe("#end()", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new Reporter(), ["endReport() {}", "endTask()"]);
    });

    describe("End of report", function() {
      it("end()", function() {
        rep.start();
        rep.end();

        rep.started.must.be.eq(false);
        rep.stack.length.must.be.eq(0);
        rep.spy.called("endReport()").must.be.eq(1);
        rep.spy.getCall("endReport()").arguments.must.be.eq([]);
        rep.spy.called("endTask()").must.be.eq(0);
      });

      it("end() - end of report with active tasks", function() {
        rep.start("test1", {});
        rep.stack.length.must.be.eq(1);
        rep.end.bind(rep).must.raise("Invalid end of report. There're active tasks.");
      });
    });

    describe("End of task", function() {
      it("end(task) - forgot result", function() {
        var task = {};

        rep.start();
        rep.start("test", task);
        rep.end.bind(rep, task).must.raise("Invalid number of arguents. Expected, at least, task and result.");
        rep.stack.length.must.be.eq(1);
        rep.spy.called("endReport()").must.be.eq(0);
        rep.spy.called("endTask()").must.be.eq(0);
      });

      it("end(task, result) - none ended", function() {
        var task1 = {}, task2 = {};

        rep.start("test1", task1);
        rep.start("test2", task2);
        rep.end.bind(rep, task1, "ok").must.raise("Invalid end of task. Another task must be ended firstly.");
      });

      it("end(task, result) - one ended", function() {
        var task = {};

        rep.start();
        rep.start("test", task);
        rep.end(task, "ok", undefined, Date.now(), Date.now());

        rep.stack.length.must.be.eq(0);
        rep.report.length.must.be.eq(1);
        rep.report.ok.length.must.be.eq(1);
        rep.report.failed.length.must.be.eq(0);
        rep.report.ignored.length.must.be.eq(0);
        rep.spy.called("endReport()").must.be.eq(0);
        rep.spy.called("endTask()").must.be.eq(1);
        rep.spy.getCall("endTask()").arguments[0].must.have({
          title: "test",
          task: task,
          result: "ok",
          error: undefined
        });
      });

      it("end(task, result) - several ones ended", function() {
        var task1 = {}, task2 = {};

        rep.start();
        rep.start("test1", task1);
        rep.start("test2", task2);
        rep.end(task2, "ok");
        rep.end(task1, "ok");

        rep.stack.length.must.be.eq(0);
        rep.report.length.must.be.eq(2);
        rep.report.ok.length.must.be.eq(2);
        rep.report.failed.length.must.be.eq(0);
        rep.report.ignored.length.must.be.eq(0);
        rep.spy.called("endReport()").must.be.eq(0);
        rep.spy.called("endTask()").must.be.eq(2);
        rep.spy.getCall("endTask()", 0).arguments[0].must.have({
          title: "test2",
          task: task2,
          result: "ok",
          error: undefined
        });
        rep.spy.getCall("endTask()", 1).arguments[0].must.have({
          title: "test1",
          task: task1,
          result: "ok",
          error: undefined
        });
      });

      it("end(task, result) - several ones ended with different results", function() {
        var task1 = {}, task2 ={}, task3 = {}, task4 = {}, task5 = {}, task6 = {}, task7 = {};

        rep.start();
        rep.start("test1", task1);
        rep.start("test2", task2);
        rep.start("test3", task3);
        rep.start("test4", task4);
        rep.start("test5", task5);
        rep.start("test6", task6);
        rep.start("test7", task7);
        rep.end(task7, "ok");
        rep.end(task6, "failed");
        rep.end(task5, "ignored");
        rep.end(task4, "ok");
        rep.end(task3, "failed");
        rep.end(task2, "ignored");
        rep.end(task1, "ok");
        rep.stack.length.must.be.eq(0);
        rep.report.length.must.be.eq(7);
        rep.report.ok.length.must.be.eq(3);
        rep.report.failed.length.must.be.eq(2);
        rep.report.ignored.length.must.be.eq(2);
        rep.spy.called("endReport()").must.be.eq(0);
        rep.spy.called("endTask()").must.be.eq(7);
      });
    });
  });
});