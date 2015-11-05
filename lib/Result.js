/**
 * A result.
 *
 * @readonly title:string   The call title.
 * @readonly task:Task      The task.
 * @readonly result:string  The result: ok, failed, ignored.
 * @readonly error:object   The error if failed.
 * @readonly start:Date     The start date.
 */
export default class Result {
  /**
   * Constructor.
   *
   * @param(attr) title
   * @param(attr) task
   * @param(attr) result
   * @param(attr) error
   * @param(attr) start
   * @param(attr) end
   */
  constructor(title, task, result, error, start, end) {
    Object.defineProperty(this, "title", {value: title, enumerable: true});
    Object.defineProperty(this, "task", {value: task, enumerable: true});
    Object.defineProperty(this, "result", {value: result, enumerable: true});
    Object.defineProperty(this, "error", {value: error, enumerable: true});
    Object.defineProperty(this, "start", {value: start || 0, enumerable: true});
    Object.defineProperty(this, "end", {value: end || 0, enumerable: true});
  }

  /**
   * Time.
   *
   * @type number
   */
  get time() {
    return this.end - this.start;
  }

  /**
   * Has it finished OK?
   *
   * @type boolean
   */
  get ok() {
    return this.result == "ok";
  }

  /**
   * Has it failed?
   *
   * @type boolean
   */
  get failed() {
    return this.result == "failed";
  }

  /**
   * Has it been ignored?
   *
   * @type boolean
   */
  get ignored() {
    return this.result == "ignored";
  }
}
