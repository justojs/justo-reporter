//imports
const jdouble = require("justo-double");
const spy = jdouble.spy;
const dummy = jdouble.dummy;
const stub = jdouble.stub;
const jresult = require("justo-task-result");
const SuiteResult = jresult.SuiteResult;
const InitializerResult = jresult.InitializerResult;
const FinalizerResult = jresult.FinalizerResult;
const SimpleTaskResult = jresult.SimpleTaskResult;
const MultiTaskResult = jresult.MultiTaskResult;
const ParameterizedTaskResult = jresult.ParameterizedTaskResult;
const ResultState = jresult.ResultState;
const reporter = require("../../../dist/es5/nodejs/justo-reporter");
const Reporter = reporter.Reporter;

//suite
describe("Reporter", function() {
  describe("#constructor()", function() {
    it("constructor()", function() {
      var rep = new Reporter();

      rep.must.have({
        suites: true,
        finalizers: true,
        initializers: true,
        simpleTasks: true,
        parameterizedTasks: true,
        multiTasks: true,
        ignored: true,
        passed: true,
        failed: true,
        writers: []
      });
    });

    it("constructor(opts)", function() {
      var rep = new Reporter({
        suites: false,
        finalizers: false,
        initializers: false,
        simpleTasks: false,
        parameterizedTasks: false,
        multiTasks: false,
        ignored: false,
        passed: false,
        failed: false
      });

      rep.must.have({
        suites: false,
        finalizers: false,
        initializers: false,
        simpleTasks: false,
        parameterizedTasks: false,
        multiTasks: false,
        ignored: false,
        passed: false,
        failed: false,
        writers: []
      });
    });
  });

  describe("#add()", function() {
    var reporter;

    beforeEach(function() {
      reporter = new Reporter();
    });

    it("add(writer) - once", function() {
      reporter.add({});
      reporter.writers.length.must.be.eq(1);
    });

    it("add(writer) - twice", function() {
      reporter.add({});
      reporter.add({});
      reporter.writers.length.must.be.eq(2);
    });
  });

  describe("#report()", function() {
    var reporter, writer, res;

    beforeEach(function() {
      reporter = new Reporter();
      reporter.add(writer = spy({write: dummy()}, "write()"));
    });

    describe("report(suite)", function() {
      beforeEach(function() {
        res = new SuiteResult({});
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.suites = false;
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(0);
      });
    });

    describe("report(initializer)", function() {
      beforeEach(function() {
        res = new InitializerResult();
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.initializers = false;
        writer.spy.called("write()").must.be.eq(0);
      });
    });

    describe("report(finalizer)", function() {
      beforeEach(function() {
        res = new FinalizerResult();
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.finalizers = false;
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(0);
      });
    });

    describe("report(simpleTask)", function() {
      beforeEach(function() {
        res = new SimpleTaskResult();
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.simpleTasks = false;
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(0);
      });
    });

    describe("report(multiTask)", function() {
      beforeEach(function() {
        res = new MultiTaskResult();
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.multiTasks = false;
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(0);
      });
    });

    describe("report(parameterizedTask)", function() {
      beforeEach(function() {
        res = new ParameterizedTaskResult();
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.parameterizedTasks = false;
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(0);
      });
    });

    describe("report(passed)", function() {
      beforeEach(function() {
        res = stub(new SimpleTaskResult(), {"@state": ResultState.PASSED});
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.passed = false;
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(0);
      });
    });

    describe("report(failed)", function() {
      beforeEach(function() {
        res = stub(new SimpleTaskResult(), {"@state": ResultState.FAILED});
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.failed = false;
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(0);
      });
    });

    describe("report(ignored)", function() {
      beforeEach(function() {
        res = stub(new SimpleTaskResult(), {"@state": ResultState.IGNORED});
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.ignored = false;
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(0);
      });
    });
  });
});
