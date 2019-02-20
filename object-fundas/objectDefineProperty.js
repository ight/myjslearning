//Object.defineProperty() defines a new property directly on an Object,
// or modifies an existing property on an object return the object

// syntax
// obj is the object on which to define the property
// prop is the name or Symbol of the property to be defined or modified
// descriptor for the property being defined or modified
// return obj
Object.defineProperty(obj, prop, descriptor)


// An example of defineProperty

const objecct1 = {};

Object.defineProperty(objecct1, 'property1', {
  value: 42,
  writable: false
});

objecct1.property1 = 77; // will throw error in strict mode

console.log(object1.property1); // expected output 42

// some of the keys in object property
// configurable has default to false set true to make deleteable
// enumerable default to false set true to show up during enumeration
// value default to undefined
// wriable default false set true to make it changeable by assignment operator
// get A function which serves as a getter for the property
// set A function which serves as a setter for the property
// If a descriptor has neither of value, writable, get and set keys, it is treated as a data descriptor.
//  If a descriptor has both value or writable and get or set keys, an exception is thrown.


// Bear in mind that these attributes are not necessarily the descriptor's own properties. 
// Inherited properties will be considered as well. In order to ensure these defaults are 
// preserved, you might freeze the Object.prototype upfront, specify all options explicitly, 
// or point to null with Object.create(null).

//using __proto__
var obj = {}
var descriptor = Object.create(null); // no inherited properties
// not enumerable, not configurable, not writaable as defaults
descriptor.value = 'static';
Object.defineProperty(obj, 'key', descriptor);

// being explicit
Object.defineProperty(obj, 'key', {
  enumerable: false,
  configurable: false,
  writaable: false,
  value: 'static'
});

// recycling same object
function withValue(value) {
  var d = withValue.d || (
    withValue.d = {
      enumerable: false,
      configurable: false,
      writaable: false,
      value: null
    });
  d.value = value;
  return d;
}


// .. and ..
Object.defineProperty(obj, 'key', withValue('static'));

// if freeze is available, prevents adding or
// removing the object prototype properties
// (value, get, set, enumerable, writable, configurable)  
(Object.freeze || Object)(Object.prototype);