let _counter = 0;

const Counter = {
  increment() {
    return ++_counter;
  },
  reset(baseCounter) {
    _counter = parseInt((baseCounter || 0));
  },
};

export default Counter;
