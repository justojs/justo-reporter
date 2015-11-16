//imports
const spy = require("justo-spy");
const stub = require("justo-stub");
const ResultState = require("justo-result").ResultState;
const Reporter = require("../../../dist/es5/nodejs/justo-reporter").Reporter;

//suite
describe("Reporter", function() {
  var task, task1, task2, task3, task4, task5, task6, task7, macro, workflow;

  beforeEach(function() {
    task = stub({}, {"isSimple()": true, "isMacro()": false, "isWorkflow()": false});
    task1 = stub({}, {"isSimple()": true, "isMacro()": false, "isWorkflow()": false});
    task2 = stub({}, {"isSimple()": true, "isMacro()": false, "isWorkflow()": false});
    task3 = stub({}, {"isSimple()": true, "isMacro()": false, "isWorkflow()": false});
    task4 = stub({}, {"isSimple()": true, "isMacro()": false, "isWorkflow()": false});
    task5 = stub({}, {"isSimple()": true, "isMacro()": false, "isWorkflow()": false});
    task6 = stub({}, {"isSimple()": true, "isMacro()": false, "isWorkflow()": false});
    task7 = stub({}, {"isSimple()": true, "isMacro()": false, "isWorkflow()": false});
    macro = stub({}, {"isSimple()": false, "isMacro()": true, "isWorkflow()": false});
    workflow = stub({}, {"isSimple()": false, "isMacro()": false, "isWorkflow()": false});
  });

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

    it("constructor(undefined)", function() {
      var rep = new Reporter(undefined);

      rep.must.have({
        name: "reporter",
        enabled: true,
        disabled: false,
        stack: [],
        report: undefined,
        started: false
      });
    });

    it("constructor(null)", function() {
      var rep = new Reporter(null);

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
  });

  describe("#start()", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new Reporter(), ["startReport() {}", "startTask()"]);
    });

    describe("Start of report", function() {
      it("start(title) - start of report", function() {
        rep.start("Test report");
        rep.started.must.be.eq(true);
        rep.spy.called("startReport()").must.be.eq(1);
        rep.spy.calledWith("startReport()", ["Test report"]).must.be.eq(1);
        rep.spy.called("startTask()").must.be.eq(0);
      });

      it("start() - start of report with active tasks", function() {
        rep.start("Test report");
        rep.start("test", task);
        rep.started.must.be.eq(true);
        rep.start.bind(rep, "New test report").must.raise("Invalid start of report. There're tasks.");
        rep.stack.length.must.be.eq(1);
        rep.spy.called("startReport()").must.be.eq(1);
        rep.spy.called("startTask()").must.be.eq(1);
      });
    });

    describe("Start of task", function() {
      it("start(title, task) - orphan simple task", function() {
        rep.start("Test report");
        rep.start("test", task);

        rep.started.must.be.eq(true);
        rep.stack.length.must.be.eq(1);
        rep.stack[0].must.be.instanceOf("SimpleTaskResult");
        rep.stack[0].must.have({parent: undefined});
        rep.spy.called("startReport()").must.be.eq(1);
        rep.spy.calledWith("startReport()", ["Test report"]).must.be.eq(1);
        rep.spy.called("startTask()").must.be.eq(1);
        rep.spy.calledWith("startTask()", ["test", task]).must.be.eq(1);
      });

      it("start(title, task) - child simple task", function() {
        rep.start("Test report");
        rep.start("macro", macro);
        rep.start("task", task);

        rep.started.must.be.eq(true);
        rep.stack.length.must.be.eq(2);
        rep.stack[0].must.be.instanceOf("MacroResult");
        rep.stack[0].must.have({parent: undefined});
        rep.stack[1].must.be.instanceOf("SimpleTaskResult");
        rep.stack[1].parent.task.must.be.same(macro);
        rep.spy.called("startReport()").must.be.eq(1);
        rep.spy.calledWith("startReport()", ["Test report"]).must.be.eq(1);
        rep.spy.called("startTask()").must.be.eq(2);
        rep.spy.calledWith("startTask()", ["macro", macro]).must.be.eq(1);
        rep.spy.calledWith("startTask()", ["task", task]).must.be.eq(1);
      });
    });
  });

  describe("#ignore()", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new Reporter(), ["startReport() {}", "startTask() {}", "ignoreTask()"]);
    });

    it("ignore(title, task)", function() {
      var res;

      rep.start("Test report");
      rep.ignore("test", macro);

      rep.started.must.be.eq(true);
      rep.stack.length.must.be.eq(0);
      rep.spy.called("ignoreTask()").must.be.eq(1);
      res = rep.spy.getArguments("ignoreTask()")[0];
      res.must.be.instanceOf("MacroResult");
      res.must.have({
        title: "test",
        state: ResultState.IGNORED,
        task: macro
      });
    });
  });

  describe("#end()", function() {
    var rep;

    beforeEach(function() {
      rep = spy(new Reporter(), ["endReport() {}", "endTask()"]);
    });

    describe("End of report", function() {
      it("end()", function() {
        rep.start("Test report");
        rep.end();

        rep.started.must.be.eq(false);
        rep.stack.length.must.be.eq(0);
        rep.spy.called("endReport()").must.be.eq(1);
        rep.spy.calledWith("endReport()", []).must.be.eq(1);
        rep.spy.called("endTask()").must.be.eq(0);
      });

      it("end() - end of report with active tasks", function() {
        rep.start("Test report");
        rep.start("test1", task);
        rep.stack.length.must.be.eq(1);
        rep.end.bind(rep).must.raise("Invalid end of report. There're active tasks.");
      });

      it("end() - end of report with no report started", function() {
        rep.end.bind(rep).must.raise("Invalid end of report. No report started.");
      });
    });

    describe("End of task", function() {
      it("end(compositeTask)", function() {
        rep.start("Test report");
        rep.start("test", macro);
        rep.end(macro);
        rep.stack.length.must.be.eq(0);
        rep.spy.called("endReport()").must.be.eq(0);
        rep.spy.called("endTask()").must.be.eq(1);
      });

      it("end(task, result) - none ended", function() {
        rep.start("Test report");
        rep.start("test1", macro);
        rep.start("test2", task);
        rep.end.bind(rep, macro, ResultState.OK).must.raise("Invalid end of task. Another task must be ended firstly.");
      });

      it("end(task, result) - one ended", function() {
        rep.start("Test report");
        rep.start("test", task);
        rep.end(task, ResultState.OK, undefined, Date.now(), Date.now());

        rep.stack.length.must.be.eq(0);
        rep.report.length.must.be.eq(1);
        rep.report.getNumberOf(ResultState.OK).must.be.eq(1);
        rep.report.getNumberOf(ResultState.FAILED).must.be.eq(0);
        rep.report.getNumberOf(ResultState.IGNORED).must.be.eq(0);
        rep.spy.called("endReport()").must.be.eq(0);
        rep.spy.called("endTask()").must.be.eq(1);
        rep.spy.getArguments("endTask()")[0].must.have({
          title: "test",
          task: task,
          state: ResultState.OK,
          error: undefined
        });
      });

      it("end(task, result) - several orphan ones ended", function() {
        rep.start("Test report");
        rep.start("task1", task1);
        rep.end(task1, ResultState.OK);
        rep.start("task2", task2);
        rep.end(task2, ResultState.OK);

        rep.stack.length.must.be.eq(0);
        rep.report.length.must.be.eq(2);
        rep.report.getNumberOf(ResultState.OK).must.be.eq(2);
        rep.spy.called("endReport()").must.be.eq(0);
        rep.spy.called("endTask()").must.be.eq(2);
        rep.spy.getArguments("endTask()", 0)[0].must.have({
          title: "task1",
          task: task1,
          state: ResultState.OK,
          error: undefined
        });
        rep.spy.getArguments("endTask()", 1)[0].must.have({
          title: "task2",
          task: task2,
          state: ResultState.OK,
          error: undefined
        });
      });

      it("end(task, result) - macro with several tasks", function() {
        rep.start("Test report");
        rep.start("macro", macro);
        rep.start("task1", task1);
        rep.end(task1, ResultState.OK);
        rep.start("task2", task2);
        rep.end(task2, ResultState.OK);
        rep.end(macro, ResultState.OK);

        rep.stack.length.must.be.eq(0);
        rep.report.length.must.be.eq(1);
        rep.report.getNumberOf(ResultState.OK).must.be.eq(2);
        rep.spy.called("endReport()").must.be.eq(0);
        rep.spy.called("endTask()").must.be.eq(3);
        rep.spy.getArguments("endTask()", 0)[0].must.have({
          title: "task1",
          task: task1,
          state: ResultState.OK,
          error: undefined
        });
        rep.spy.getArguments("endTask()", 1)[0].must.have({
          title: "task2",
          task: task2,
          state: ResultState.OK,
          error: undefined
        });
        rep.spy.getArguments("endTask()", 2)[0].must.have({
          title: "macro",
          task: macro,
          state: ResultState.OK,
          error: undefined
        });
      });

      it("end(task, result) - several ones ended with different results", function() {
        rep.start("Test report");
        rep.start("test1", task1);
        rep.end(task1, ResultState.OK);
        rep.start("test2", task2);
        rep.end(task2, ResultState.IGNORED);
        rep.start("test3", task3);
        rep.end(task3, ResultState.FAILED);
        rep.start("test4", task4);
        rep.end(task4, ResultState.OK);
        rep.start("test5", task5);
        rep.end(task5, ResultState.IGNORED);
        rep.start("test6", task6);
        rep.end(task6, ResultState.FAILED);
        rep.start("test7", task7);
        rep.end(task7, ResultState.OK);
        rep.stack.length.must.be.eq(0);
        rep.report.length.must.be.eq(7);
        rep.report.getNumberOf(ResultState.OK).must.be.eq(3);
        rep.report.getNumberOf(ResultState.FAILED).must.be.eq(2);
        rep.report.getNumberOf(ResultState.IGNORED).must.be.eq(2);
        rep.spy.called("endReport()").must.be.eq(0);
        rep.spy.called("endTask()").must.be.eq(7);
      });
    });
  });
});
