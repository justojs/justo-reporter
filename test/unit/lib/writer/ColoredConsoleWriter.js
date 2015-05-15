//imports
const stub = require("justo-double").stub;
const jresult = require("justo-task-result");
const SuiteResult = jresult.SuiteResult;
const InitializerResult = jresult.InitializerResult;
const FinalizerResult = jresult.FinalizerResult;
const SimpleTaskResult = jresult.SimpleTaskResult;
const MultiTaskResult = jresult.MultiTaskResult;
const ParameterizedTaskResult = jresult.ParameterizedTaskResult;
const ResultState = jresult.ResultState;
const reporter = require("../../../../dist/es5/nodejs/justo-task-reporter");
const ColoredConsoleWriter = reporter.ColoredConsoleWriter;

//suite
describe("writer.ConsoleWriter", function() {
  describe("#construtor()", function() {
    it("constructor()", function() {
      var writer = new ColoredConsoleWriter();

      writer.must.have({
        passed: "✓",
        failed: "✖",
        ignored: "#"
      });
    });

    it("constructor(opts)", function() {
      var writer = new ColoredConsoleWriter({
        passed: "PASSED",
        failed: "FAILED",
        ignored: "IGNORED"
      });

      writer.must.have({
        passed: "PASSED",
        failed: "FAILED",
        ignored: "IGNORED"
      });
    });
  });
});
