//imports
const spy = require("justo-spy");
const jreporter = require("../../../dist/es5/nodejs/justo-reporter");
const Reporter = jreporter.Reporter;
const Reporters = jreporter.Reporters;

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

  describe("#start()", function() {
    var rr, rep1, rep2, rep3;

    describe("All enabled reporters", function() {
      beforeEach(function() {
        rr = new Reporters();

        rr.add(rep1 = spy(new Reporter(), "start() {}"));
        rr.add(rep2 = spy(new Reporter(), "start() {}"));
        rr.add(rep3 = spy(new Reporter(), "start() {}"));
      });

      it("start()", function() {
        //(1) start
        rr.start();

        //(2) check
        rep1.spy.called("start()").must.be.eq(1);
        rep2.spy.called("start()").must.be.eq(1);
        rep3.spy.called("start()").must.be.eq(1);
      });

      it("start(Result)", function() {
        var res = {};

        //(1) start
        rr.start(res);

        //(2) check
        rep1.spy.alwaysCalledWith("start()", [res]).must.be.eq(1);
        rep2.spy.alwaysCalledWith("start()", [res]).must.be.eq(1);
        rep3.spy.alwaysCalledWith("start()", [res]).must.be.eq(1);
      });
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

  describe("#end()", function() {
    var rr, rep1, rep2, rep3;

    describe("All enabled reporters", function() {
      beforeEach(function() {
        rr = new Reporters();

        rr.add(rep1 = spy(new Reporter(), "end() {}"));
        rr.add(rep2 = spy(new Reporter(), "end() {}"));
        rr.add(rep3 = spy(new Reporter(), "end() {}"));
      });

      it("end()", function() {
        //(1) start
        rr.end();

        //(2) check
        rep1.spy.called("end()").must.be.eq(1);
        rep2.spy.called("end()").must.be.eq(1);
        rep3.spy.called("end()").must.be.eq(1);
      });
    });

    describe("Some disabled", function() {
      var rr, rep1, rep2, rep3;

      describe("All enabled reporters", function() {
        beforeEach(function() {
          rr = new Reporters();

          rr.add(rep1 = spy(new Reporter("enabled"), "end() {}"));
          rr.add(rep2 = spy(new Reporter("disabled", {enabled: false}), "end() {}"));
          rr.add(rep3 = spy(new Reporter("enabled"), "end() {}"));
        });

        it("end()", function() {
          //(1) start
          rr.end();

          //(2) check
          rep1.spy.called("end()").must.be.eq(1);
          rep2.spy.called("end()").must.be.eq(0);
          rep3.spy.called("end()").must.be.eq(1);
        });
      });
    });
  });
});
