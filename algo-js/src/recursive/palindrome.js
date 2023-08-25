const assert = require('assert');

// Returns the first character of the string str
var firstCharacter = function(str) {
  return str.slice(0, 1);
};

// Returns the last character of a string str
var lastCharacter = function(str) {
  return str.slice(-1);
};

// Returns the string that results from removing the first
//  and last characters from str
var middleCharacters = function(str) {
  return str.slice(1, -1);
};

var isPalindrome = function(str) {
  if (str.length === 0 || str.length === 1) {
    return true;
  }
  if (firstCharacter(str) !== lastCharacter(str)) {
    return false;
  }
  return isPalindrome(middleCharacters(str));
  // recursive case
};

var checkPalindrome = function(str) {
  console.log("Is this word a palindrome? " + str);
  console.log(isPalindrome(str));
};

checkPalindrome("a");
assert.deepStrictEqual(isPalindrome("a"), true);
checkPalindrome("motor");
assert.deepStrictEqual(isPalindrome("motor"), false);
checkPalindrome("rotor");
assert.deepStrictEqual(isPalindrome("rotor"), true);

assert.deepStrictEqual(isPalindrome("cac"), true);

assert.deepStrictEqual(isPalindrome("kec"), false);
