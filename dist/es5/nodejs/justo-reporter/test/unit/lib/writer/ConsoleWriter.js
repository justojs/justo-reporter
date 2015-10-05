//imports
const ConsoleWriter = require("../../../../dist/es5/nodejs/justo-reporter").ConsoleWriter;

//suite
describe("writer.ConsoleWriter", function() {
  describe("#constructor()", function() {
    it("constructor()", function() {
      var writer = new ConsoleWriter();

      writer.must.have({
        passed: {text: "✓"},
        failed: {text: "✖"},
        ignored: {text: "#"}
      });
    });

    it("constructor(opts) - options as strings", function() {
      var writer = new ConsoleWriter({
        passed: "PASSED",
        failed: "FAILED",
        ignored: "IGNORED"
      });

      writer.must.have({
        passed: {text: "PASSED"},
        failed: {text: "FAILED"},
        ignored: {text: "IGNORED"}
      });
    });

    it("constructor(opts) - options as objects", function() {
      var writer = new ConsoleWriter({
        passed: {text: "PASSED"},
        failed: {text: "FAILED"},
        ignored: {text: "IGNORED"}
      });

      writer.must.have({
        passed: {text: "PASSED"},
        failed: {text: "FAILED"},
        ignored: {text: "IGNORED"}
      });
    });
  });
});
