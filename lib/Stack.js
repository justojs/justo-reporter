export default class Stack extends Array {
  get top() {
    return (this.hasResults() ? this[this.length-1] : undefined);
  }

  hasResults() {
    return this.length > 0;
  }
}
