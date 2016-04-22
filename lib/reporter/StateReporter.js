//imports
import {ResultState} from "justo-result";
import Reporter from "../Reporter";

/**
 * A reporter to recollect the end state.
 */
export default class StateReporter extends Reporter {
  /**
   * Constructor.
   *
   * @param opts:object The reporter options.
   */
  constructor(opts) {
    //(1) super
    super(opts);

    //(2) this
    Object.defineProperty(this, "state", {value: ResultState.OK, enumerable: true, writable: true});
  }

  /**
   * @override
   */
  endTask(res) {
    if (res.state === ResultState.FAILED) this.state = ResultState.FAILED;
  }
}
