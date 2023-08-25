const assert = require('assert');
var swap = function(array, firstIndex, secondIndex) {
  var temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
};

var indexOfMinimum = function(array, startIndex) {

  var minValue = array[startIndex];
  var minIndex = startIndex;

  for(var i = minIndex + 1; i < array.length; i++) {
    if(array[i] < minValue) {
      minIndex = i;
      minValue = array[i];
    }
  }
  return minIndex;
};

var selectionSort = function(array) {
  for (var i = 0; i < array.length; i++) {
    var minIndex = indexOfMinimum(array, i);
    swap(array, i, minIndex);
  }
};

var array = [22, 11, 99, 88, 9, 7, 42];
selectionSort(array);
console.log("Array after sorting:  " + array);

assert.deepStrictEqual(array, [7, 9, 11, 22, 42, 88, 99]);


var array = [-1, 3, 5, -14, 100];
selectionSort(array);
assert.deepStrictEqual(array, [-14, -1, 3, 5, 100]);