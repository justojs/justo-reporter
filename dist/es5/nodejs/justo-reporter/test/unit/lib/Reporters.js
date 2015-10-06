//imports
const spy = require("justo-double").spy;
const jreporter = require("../../../dist/es5/nodejs/justo-reporter");
const Reporters = jreporter.Reporters;
const Reporter = jreporter.Reporter;

//suite
describe("Reporters", function() {
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

  describe("#report()", function() {
    var rr, rep1, rep2, rep3;

    beforeEach(function() {
      rr = new Reporters();
    });

    it("All enabled reporters", function() {
      //(1) init
      rr.add(rep1 = spy(new Reporter(), "report() {}"));
      rr.add(rep2 = spy(new Reporter(), "report() {}"));
      rr.add(rep3 = spy(new Reporter(), "report() {}"));

      //(2) report
      rr.report("The result");

      //(3) check
      rep1.spy.called("report()").must.be.eq(1);
      rep2.spy.called("report()").must.be.eq(1);
      rep3.spy.called("report()").must.be.eq(1);
    });

    it("Not all enabled reporters", function() {
      //(1) init
      rr.add(rep1 = spy(new Reporter("enabled"), "report() {}"));
      rr.add(rep2 = spy(new Reporter("disabled", {enabled: false}), "report() {}"));
      rr.add(rep3 = spy(new Reporter("enabled"), "report() {}"));

      //(2) report
      rr.report("The result");

      //(3) check
      rep1.spy.called("report()").must.be.eq(1);
      rep2.spy.called("report()").must.be.eq(0);
      rep3.spy.called("report()").must.be.eq(1);
    });
  });
});
