const assert = require('assert');

var isEven = function(n) {
  return n % 2 === 0;
};

var isOdd = function(n) {
  return !isEven(n);
};

var power = function(x, n) {
  console.log("Computing " + x + " raised to power " + n + ".");
  // base case
  if (n === 0) {
    return 1;
  }
  // recursive case: n is negative
  if (n < 0) {
    return 1/power(x, -n);
  }
  // recursive case: n is odd
  if (isOdd(n)) {
    return x * power(x, n - 1);
  } else {
    var val = power(x, n / 2);
    return val * val;
  }
  // recursive case: n is even
};

var displayPower = function(x, n) {
  console.log(x + " to the " + n + " is " + power(x, n));
};

displayPower(3, 0);
assert.deepStrictEqual(power(3, 0), 1);
displayPower(3, 1);
assert.deepStrictEqual(power(3, 1), 3);
displayPower(3, 2);
assert.deepStrictEqual(power(3, 2), 9);
displayPower(3, -1);
assert.deepStrictEqual(power(3, -1), 1/3);

assert.deepStrictEqual(power(5, 3), 125);

assert.deepStrictEqual(power(2, -2), 0.25);