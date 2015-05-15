/**
 * A writer.
 *
 * @abstract
 */
export class Writer {
  /**
   * Writes a result.
   *
   * @param res:Result  The result to write.
   */
  write(res) {
    throw new Error("Abstract method.");
  }
}
