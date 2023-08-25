const assert = require('assert');

var factorial = function(n) {
  // base case:
  if (n === 0) {
    return 1;
  }
  return n * factorial(n - 1);
  // recursive case:
};

console.log("The value of 0! is " + factorial(0) + ".");
console.log("The value of 5! is " + factorial(5) + ".");

assert.deepStrictEqual(factorial(0), 1);
assert.deepStrictEqual(factorial(5), 120);

assert.deepStrictEqual(factorial(4), 24);
assert.deepStrictEqual(factorial(2), 2);
