//imports
const Reporter = require("../../../dist/es5/nodejs/justo-reporter").Reporter;

//suite
describe("Reporter", function() {
  describe("#constructor()", function() {
    it("constructor()", function() {
      var rep = new Reporter();

      rep.must.have({
        name: "default",
        enabled: true,
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
        }
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
        }
      });
    });
  });
});
