function getVowels(str) {
  var m = str.match(/[aeiou]/gi);
  if (m == null) {
    return 0;
  }
  return m.length;
}

// expected output is 0
console.log(getVowels('sky'));

// foo is not defined when tried access gives error
foo;
"ReferenceError: foo is not defined"

// foo is know to exist now but it has no type or value:
var foo = null;

typeof null; // returns object
typeof undefined; // return "undefine"
console.log(null === undefined); // return false
console.log(null == undefined); // return true
console.log(null === null); // return true
console.log(null == null); // return true
console.log(!null); // true
console.log(isNaN(1 + null)); // false
console.log(isNaN(1 + undefined)); // true
