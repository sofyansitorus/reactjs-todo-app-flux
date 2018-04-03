let _counter = 0;

const Counter = {
  _counter: 0,
  increment() {
    return ++_counter;
  },
  reset(baseCounter) {
    const base = (baseCounter || 0);
    _counter = parseInt(base);
  },
};

export default Counter;
