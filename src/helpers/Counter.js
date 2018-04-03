let _counter = 0;

const Counter = {
  _counter: 0,
  increment() {
    return ++_counter;
  },
  reset(baseCounter) {
    _counter = parseInt((baseCounter || 0));
  },
};

export default Counter;
