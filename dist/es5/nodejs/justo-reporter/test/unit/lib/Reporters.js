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
    var reps, rep1, rep2;

    beforeEach(function() {
      reps = new Reporters();
      reps.add(rep1 = spy(new Reporter(), "start() {}"));
      reps.add(rep2 = spy(new Reporter(), "start() {}"));
    });

    it("start() - start of report", function() {
      reps.start();
      rep1.spy.called("start()").must.be.eq(1);
      rep1.spy.getCall("start()").arguments.must.be.eq([]);
      rep2.spy.called("start()").must.be.eq(1);
      rep2.spy.getCall("start()").arguments.must.be.eq([]);
    });

    it("start() - start of task", function() {
      reps.start("title", {});
      rep1.spy.called("start()").must.be.eq(1);
      rep1.spy.getCall("start()").arguments.must.be.eq(["title", {}]);
      rep2.spy.called("start()").must.be.eq(1);
      rep2.spy.getCall("start()").arguments.must.be.eq(["title", {}]);
    });

    it("start() - start of two tasks", function() {
      reps.start("one", {});
      reps.start("two", {});
      rep1.spy.called("start()").must.be.eq(2);
      rep1.spy.getCall("start()", 0).arguments.must.be.eq(["one", {}]);
      rep1.spy.getCall("start()", 1).arguments.must.be.eq(["two", {}]);
      rep2.spy.called("start()").must.be.eq(2);
      rep2.spy.getCall("start()", 0).arguments.must.be.eq(["one", {}]);
      rep2.spy.getCall("start()", 1).arguments.must.be.eq(["two", {}]);
    });
  });

  describe("#end()", function() {
    var reps, rep1, rep2;

    beforeEach(function() {
      reps = new Reporters();
      reps.add(rep1 = spy(new Reporter(), "end() {}"));
      reps.add(rep2 = spy(new Reporter(), "end() {}"));
    });

    it("end() - start of report", function() {
      reps.end();
      rep1.spy.called("end()").must.be.eq(1);
      rep1.spy.getCall("end()").arguments.must.be.eq([]);
      rep2.spy.called("end()").must.be.eq(1);
      rep2.spy.getCall("end()").arguments.must.be.eq([]);
    });

    it("end() - end of task", function() {
      reps.start("test", {});
      reps.end({}, "ok");
      rep1.spy.called("end()").must.be.eq(1);
      rep1.spy.getCall("end()").arguments.must.be.eq([{}, "ok"]);
      rep2.spy.called("end()").must.be.eq(1);
      rep2.spy.getCall("end()").arguments.must.be.eq([{}, "ok"]);
    });

    it("end() - end of two tasks", function() {
      reps.start("one", {});
      reps.start("two", {});
      reps.end({}, "ok");
      reps.end({}, "ok");
      rep1.spy.called("end()").must.be.eq(2);
      rep1.spy.getCall("end()", 0).arguments.must.be.eq([{}, "ok"]);
      rep1.spy.getCall("end()", 1).arguments.must.be.eq([{}, "ok"]);
      rep2.spy.called("end()").must.be.eq(2);
      rep2.spy.getCall("end()", 0).arguments.must.be.eq([{}, "ok"]);
      rep2.spy.getCall("end()", 1).arguments.must.be.eq([{}, "ok"]);
    });
  });
});
