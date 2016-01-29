export default class Stack extends Array {
  constructor() {
    super();

    Object.defineProperty(this, "top", {get: () => {
      return (this.hasResults() ? this[this.length-1] : undefined);
    }});

    Object.defineProperty(this, "hasResults", {value: Stack.prototype.hasResults});
  }

  hasResults() {
    return this.length > 0;
  }
}
