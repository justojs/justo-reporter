/**
 * A collection of reporters.
 */
export default class Reporters {
  /**
   * Constructor.
   */
  constructor() {
    Object.defineProperty(this, "items", {value: []});
    Object.defineProperty(this, "add", {value: Reporters.prototype.add});
    Object.defineProperty(this, "start", {value: Reporters.prototype.start});
    Object.defineProperty(this, "end", {value: Reporters.prototype.end});
    Object.defineProperty(this, "ignore", {value: Reporters.prototype.ignore});
  }

  /**
   * Number of reporters.
   *
   * @type number
   */
  get length() {
    return this.items.length;
  }

  /**
   * Adds a new reporter.
   *
   * @overload One reporter.
   * @param rep:Reporter  The reporter to add.
   *
   * @overload Several reporters.
   * @param reps:Reporter[] The reporters to add.
   */
  add(reps) {
    //(1) arguments
    if (!(reps instanceof Array)) reps = [reps];

    //(2) add reporters
    for (let rep of reps) this.items.push(rep);
  }

  /**
   * Invokes the reporters's start() method.
   */
  start(...args) {
    for (let rep of this.items) rep.start(...args);
  }

  /**
   * Invokes the reporters's end() method.
   */
  end(...args) {
    for (let rep of this.items) rep.end(...args);
  }

  /**
   * Invokes the reporters's ignore() method.
   */
  ignore(...args) {
    for (let rep of this.items) rep.ignore(...args);
  }
}
