//imports
const jdouble = require("justo-double");
const spy = jdouble.spy;
const stub = jdouble.stub;
const jresult = require("justo-result");
const SuiteResult = jresult.SuiteResult;
const InitializerResult = jresult.InitializerResult;
const FinalizerResult = jresult.FinalizerResult;
const SimpleTaskResult = jresult.SimpleTaskResult;
const MultitaskResult = jresult.MultitaskResult;
const ResultState = jresult.ResultState;
const Reporter = require("../../../dist/es5/nodejs/justo-reporter").Reporter;

//suite
describe("Reporter", function() {
  describe("#constructor()", function() {
    it("constructor()", function() {
      var rep = new Reporter();

      rep.must.have({
        name: "default",
        enabled: true,
        writers: [],
        display: {
          initializers: true,
          finalizers: true,
          suites: true,
          simpleTasks: true,
          multitasks: true,
          subtasks: true,
          ignored: true,
          passed: true,
          failed: true
        }
      });
    });

    it("constructor(name)", function() {
      var rep = new Reporter("reporter");

      rep.must.have({
        name: "reporter",
        enabled: true,
        display: {
          suites: true,
          finalizers: true,
          initializers: true,
          simpleTasks: true,
          multitasks: true,
          subtasks: true,
          ignored: true,
          passed: true,
          failed: true
        },
        writers: []
      });
    });

    it("constructor(name, opts)", function() {
      var rep = new Reporter("reporter", {
        enabled: false,
        display: {
          initializers: false,
          finalizers: false,
          suites: false,
          multitasks: false,
          subtasks: false,
          simpleTasks: false,
          ignored: false,
          passed: false,
          failed: false
        }
      });

      rep.must.have({
        name: "reporter",
        enabled: false,
        display: {
          initializers: false,
          finalizers: false,
          suites: false,
          multitasks: false,
          subtasks: false,
          simpleTasks: false,
          ignored: false,
          passed: false,
          failed: false
        },
        writers: []
      });
    });
  });

  describe("#add()", function() {
    var reporter;

    beforeEach(function() {
      reporter = new Reporter("reporter");
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
      reporter = new Reporter("reporter");
      reporter.add(writer = spy({}, "write() {}"));
    });

    describe("report(suite)", function() {
      beforeEach(function() {
        res = stub(new SuiteResult(), {"@state": ResultState.PASSED});
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.display.suites = false;
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
        reporter.display.initializers = false;
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
        reporter.display.finalizers = false;
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(0);
      });
    });

    describe("report(simpleTask)", function() {
      beforeEach(function() {
        res = stub(new SimpleTaskResult(), {"@state": ResultState.PASSED});
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.display.simpleTasks = false;
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(0);
      });
    });

    describe("report(multiTask)", function() {
      beforeEach(function() {
        res = stub(new MultitaskResult(), {"@state": ResultState.PASSED});
      });

      it("report(res) - with write()", function() {
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(1);
        writer.spy.calledWith("write()", [res]).must.be.eq(1);
      });

      it("report(res) - no write()", function() {
        reporter.display.multitasks = false;
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
        reporter.display.passed = false;
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
        reporter.display.failed = false;
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
        reporter.display.ignored = false;
        reporter.report(res);
        writer.spy.called("write()").must.be.eq(0);
      });
    });
  });
});
