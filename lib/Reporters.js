/**
 * A collection of reporters.
 */
export default class Reporters extends Array {
  /**
   * Constructor.
   */
  constructor() {
    super();
    
    Object.defineProperty(this, "add", {value: Reporters.prototype.add});
    Object.defineProperty(this, "start", {value: Reporters.prototype.start});
    Object.defineProperty(this, "end", {value: Reporters.prototype.end});
    Object.defineProperty(this, "ignore", {value: Reporters.prototype.ignore});
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
    for (let i = 0; i < reps.length; ++i) {
      this.push(reps[i]);
    }
  }

  /**
   * Invokes the reporters's start() method.
   */
  start(...args) {
    for (let rep of this) {
      rep.start(...args);
    }
  }

  /**
   * Invokes the reporters's end() method.
   */
  end(...args) {
    for (let rep of this) {
      rep.end(...args);
    }
  }

  /**
   * Invokes the reporters's ignore() method.
   */
  ignore(...args) {
    for (let rep of this) {
      rep.ignore(...args);
    }
  }
}
