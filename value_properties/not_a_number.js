function sanitise(x) {
  // body...
  if (isNaN(x)) {
    return NaN;
  }
  return x;
}

// expected output 1, autotype cast of string to number 1
console.log(sanitise('1'));

// expected out put NaN as it could not be auto type cast a number
console.log(sanitise('NotANumber'));

console.log(NaN === NaN); // NaN compare to self as false
console.log(Number.NaN === NaN); // false Number.NaN and NaN are intialy set to Not a number so false
console.log(isNaN(NaN)); // return true is the value is NaN currently or going to be NaN
console.log(isNaN(Number.NaN));

function valueIsNaN(v) { return v!== v; }
console.log(valueIsNaN(1)); // false
console.log(valueIsNaN(NaN)); //true
console.log(valueIsNaN(Number.NaN)); // true


/* the difference between isNaN() and Number.isNaN(): 
the former will return true if the value is currently NaN, 
or if it is going to be NaN after it is coerced to a number, 
while the latter will return true only if the value is currently NaN: */

console.log(isNaN("Hello World!")); // true
console.log(Number.isNaN('hello world')); // false
