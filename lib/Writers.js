/**
 * A collection of writers.
 */
class Writers extends Array {
  /**
   * Constructor.
   */
  constructor() {
    super();
  }

  /**
   * Adds a new writer.
   *
   * @overload One writer.
   * @param wrt:Writer    The writer to add.
   *
   * @overload Several writers.
   * @param wrts:Writer[] The writers to add.
   */
  add(wrts) {
    //(1) arguments
    if (!(wrts instanceof Array)) wrts = [wrts];

    //(2) add
    for (let i = 0; i < wrts.length; ++i) {
      this.push(wrts[i]);
    }
  }

  /**
   * Writes a result.
   *
   * @param res:Result  The result to write.
   */
  write(res) {
    for (let i = 0; i < this.length; ++i) {
      this[i].write(res);
    }
  }
}
