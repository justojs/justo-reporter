//imports
import {Results, ResultState} from "justo-result";

/**
 * A report.
 *
 * @param title:string      The report title.
 * @param results:Result[]  The results.
 */
export default class Report {
  /**
   * Constructor.
   */
  constructor(title) {
    Object.defineProperty(this, "title", {value: title, enumerable: true});
    Object.defineProperty(this, "results", {value: new Results()});
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
   * Returns the number of task ended with the state indicated.
   */
  getNumberOf(state) {
    return this.results.getNumberOf(state);
  }
}
