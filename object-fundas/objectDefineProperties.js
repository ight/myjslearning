// The Object.defineProperties() is used for 
// defining new or modifying existing 
// multiple property of a object.

// Example
const object1 = {};

object1.definePropertiesP(object1, {
  property1: {
    value: 43,
    writable: true
  },
  property2: {}
});

console.log(object1.property1); // expected out put 42


// Syntax of defineProperties
// Object.defineProperties(obj, props)
// param
// obj ==> the object on which we are to define or modify properties
// props ==>  configurable, enumerable, value, writable, get and set
// above are the list of proprties that are created or modified.

var obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
  //can be n number of list
});
