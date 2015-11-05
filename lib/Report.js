/**
 * A report.
 *
 * @param results:Result[]  The results.
 */
export default class Report {
  /**
   * Constructor.
   */
  constructor() {
    Object.defineProperty(this, "results", {value: []});
  }

  /**
   * Number of results.
   *
   * @type number
   */
  get length() {
    return this.results.length;
  }

  /**
   * Adds a result.
   *
   * @param result:Result The result to add.
   */
  add(result) {
    this.results.push(result);
  }

  /**
   * The OK results.
   *
   * @type Result[]
   */
  get ok() {
    var res = [];

    //(1) get results
    for (let r of this.results) {
      if (r.ok) res.push(r);
    }

    //(2) return
    return res;
  }

  /**
   * The failed results.
   *
   * @type Result[]
   */
  get failed() {
    var res = [];

    //(1) get results
    for (let r of this.results) {
      if (r.failed) res.push(r);
    }

    //(2) return
    return res;
  }

  /**
   * The ignored results.
   *
   * @type Result[]
   */
  get ignored() {
    var res = [];

    //(1) get results
    for (let r of this.results) {
      if (r.ignored) res.push(r);
    }

    //(2) return
    return res;
  }
}
