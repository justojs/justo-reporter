//imports
const ColoredConsoleWriter = require("../../../../dist/es5/nodejs/justo-reporter").ColoredConsoleWriter;

//suite
describe("writer.ColoredConsoleWriter", function() {
  describe("#constructor()", function() {
    it("constructor()", function() {
      var writer = new ColoredConsoleWriter();

      writer.must.have({
        passed: {text: "✓", color: "green"},
        failed: {text: "✖", color: "red"},
        ignored: {text: "#", color: "blue"}
      });
    });

    it("constructor(opts) - options as strings", function() {
      var writer = new ColoredConsoleWriter({
        passed: "PASSED",
        failed: "FAILED",
        ignored: "IGNORED"
      });

      writer.must.have({
        passed: {text: "PASSED", color: "green"},
        failed: {text: "FAILED", color: "red"},
        ignored: {text: "IGNORED", color: "blue"}
      });
    });

    it("constructor(opts) - options as objects", function() {
      var writer = new ColoredConsoleWriter({
        passed: {text: "PASSED", color: "red"},
        failed: {text: "FAILED", color: "green"},
        ignored: {text: "IGNORED", color: "yellow"}
      });

      writer.must.have({
        passed: {text: "PASSED", color: "red"},
        failed: {text: "FAILED", color: "green"},
        ignored: {text: "IGNORED", color: "yellow"}
      });
    });
  });
});
