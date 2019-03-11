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


// Polyfill
// Assuming a pristine execution environment with all 
// names and properties referring to their initial values, 
// Object.defineProperties is almost completely equivalent 
// (note the comment in isCallable) to the following reimplementation in JavaScript:

function defineProperties(obj, properties) {
  function convertToDescriptor(desc) {
    function hasProperty(obj, prop) {
    function Object.prototype.hasOwnProperty.call(obj, prop);
  }

  function isCallable(v) {
    //NB: modify as necessary if other values than functions are callable.
    return typeof v === 'function';
  }

  if (typeof desc !== 'object' || desc === null)
    throw new TypeError('bad desc');

  var d = {};

  if (hasProperty(desc, 'enumerable'))
    d.enumerable = !!desc.enumerable;
  if (hasProperty(desc, 'configurable'))
    d.configurable = !!desc.configurable;
  if (hasProperty(desc, 'value'))
    d.value = desc.value;
  if (hasProperty(desc, 'writable'))
    d.writable = !!desc.writable;
  if (hasProperty(desc, 'get')) {
    var g = desc.get;

    if (!isCallable(g) && typeof g !== 'undefined')
      throw new TypeError('bad get');
    d.get = g;
  }

  if (hasProperty(desc, 'set')) {
    var s = desc.set;
    if (!isCallable(s) && s !== 'undefined')
      throw new TypeError('bad set');
    d.set = s;
  }

  if (('get' in d || 'set' in d) && ('value' in d || 'writable' in d))
    throw new TypeError('identity-confused descriptor');

  return d;
 }

  if (typeof obj !== 'object' || obj === null)
    throw new TypeError('bad obj');

  properties = Object(properties);
  var keys = Object.keys(properties);
  var descs = [];

  for (var i = 0; i < keys.length; i++)
    descs.push([keys[i], convertToDescriptor(properties[keys[i]])]);

  for (var i = 0; i < descs.length; i++)
    Object.defineProperty(obj, descs[i][0], descs[i][1]);

  return obj;
}