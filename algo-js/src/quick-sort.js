const assert = require('assert');
var swap = function(array, firstIndex, secondIndex) {
  var temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
};
// This function partitions given array and returns
//  the index of the pivot.
var partition=function(array, p, r){
  var pivot = array[r];
  var q = p;
  var j = p;
  for (j = p; j < r; j++) {
    if (array[j] < pivot) {
      swap(array, q, j);
      q++;
    }
  }
  swap(array, q, r);
  return q;
};


var quickSort = function(array, p, r) {
  if (r - p < 1) {
    return;
  }
  var pivotIndex = partition(array, p, r);
  quickSort(array, p, pivotIndex - 1);
  quickSort(array, pivotIndex + 1, r);
};

var array = [9, 7, 5, 11, 12, 2, 14, 3, 10, 6];
quickSort(array, 0, array.length-1);
console.log("Array after sorting: " + array);
assert.deepStrictEqual(array, [2,3,5,6,7,9,10,11,12,14]);



var array = [9, 7, 5, 11, 6, 2, 14, 3, 10, 6];
quickSort(array, 0, array.length-1);
console.log("Array after sorting: " + array);
assert.deepStrictEqual(array, [2,3,5,6,6,7,9,10,11,14]);
