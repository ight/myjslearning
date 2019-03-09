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


// creating a property
// We can create a property using Object.defineProperty()
// if a property does not exist.
// fields may be omited from the description 
// default values will be set
var o = {}; // creating a new object

//Example of an object property added
// with defineProperty with a data property descriptor

Object.defineProperty(o, 'a', {
  value: 37,
  writable: true,
  enumerable: true,
  configurable: true
});

// 'a' property exists in the o object and its value is 37

//Example of an object property added
// with defineProperty with an accessor proprty descriptor
var bValue = 38;
Object.defineProperty(o, 'b', {
  // Using shorthand method names (ES2015 feature)
  // this is equivaent to:
  // get: function() { return bValue; },
  // set: function(newValue) { bValue: newValue },
  get() { return bValue; },
  set(newValue) { bValue = newValue; },
  enumerable: true,
  configurable: true
});

o.b; // gives out put as 38
// b property exists in the o object and its value is 38
// the value of o.b is now always identical to bValue,
// unless o.b is redefined

// You cannot try to mix both:
Object.defineProperty(o, 'conflict', {
  value: 0x9f91102,
  get() { return 0xdeadadd; }
});

// the above code gives TypeError: value appears
// only in data descriptor
// get appears only in accessor description



// ModifyPropert
// We can modify the property if the property already exist.
// if the object has configurable proerty set to false then
// it is not possible to change any attribute of 
// non-configurable accessor property
// data properties

var o = {}; //create a new object

Object.defineProperty(o, 'a', {
  value: 37,
  writable: false
});


console.log(o.a); // logs 37
o.a = 25; // No error thrown
// (it would throw in strict mode,
// even if the value had been the same)

console.log(o.a); // logs 37, The assignment did not work.


// strict mode
(function() {
  'use strict';
  var o = {};
  object.defineProperty(o, 'b', {
    value: 2,
    writable: false
  });
  o.b = 3 // throws TypeError: "b" is read only
  return o.b // return 2 without the line above
}());


// Enumerable attribute
// the enumerable property defines wether the property picked by
// Object.assign() or spread operator. For non-symbols properties
// it also define whether it shows up in a for..in loop and Object.keys

var o = {};
Object.defineProperty(o, 'a', {
  value: 1,
  enumerable: true
});

Object.defineProperty(o, 'b', {
  value: 2,
  enumerable: false
});

// Enumerbale default to false
Object.defineProperty(o, 'c', {
  value: 3
});

// enumerable default to false
// when creating a property by setting it
o.d = 4;


Object.defineProperty(o, Symbol.for('e'), {
  value: 5,
  enumerable: true
});

Object.defineProperty(o, Symbol.for('f'), {
  value: 6,
  enumerable: false
});

// logs 'a' and 'd' as undefined
for (var i in o) {
  console.log(i);
}

// ['a', 'd']
Object.keys(o);


o.propertyIsEnumerable('a'); // true
o.propertyIsEnumerable('b'); // false
o.propertyIsEnumerable('c'); // false
o.propertyIsEnumerable('d'); // true
o.propertyIsEnumerable(Symbol.for('e')); // true
o.propertyIsEnumerable(Symbol.for('f')); // false

var p = { ...o }
p.a // 1
p.b // undefined
p.c // undefined
p.d // 4
p[Symbol.for('e')] // 5
p[Symbol.for('f')] // undefined

// Configurable attribute
//The configurable attribute controls at the same time whether 
// the property can be deleted from the object and whether its 
// attributes (other than value and writable) can be changed.
var o = {};
Object.defineProperty(o, 'a', {
  get() { return 1; },
  configurable: false
});

Object.defineProperty(o, 'a', {
  configurable: true
}); // throws a TypeError
Object.defineProperty(o, 'a', {
  enumerable: true
}); // throws a TypeError
Object.defineProperty(o, 'a', {
  set() {}
}); // throws a TypeError (set was undefined previously)
Object.defineProperty(o, 'a', {
  get() { return 1; }
}); // throws a TypeError
// (even though the new get does exactly the same thing)
Object.defineProperty(o, 'a', {
  value: 12
}); // throws a TypeError

console.log(o.a); // logs 1
delete o.a; // Nothing happens
console.log(o.a); // logs 1


// Adding properties and default values
// There is often a difference between simply using dot notation 
// to assign a value and using Object.defineProperty()
// here is an example to show the concept

var o ={};

o.a = 1;

// is equivalent to
Object.defineProperty(o, 'a', {
  value: 1,
  writable: true;
  configurable: true;
  enumerable: true;
});

// on the other hand
Object.defineProperty(o, 'a', { value: 1 });

// is equivalent to
Object.defineProperty(o, 'a', {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false
});

// custom setter and getter
// The example below shows how to implement a self-archiving object. 
// When temperature property is set, the archive array gets a log entry.

function Archiver() {
  var temperature = null;
  var archive = [];

  Object.defineProperty(this, 'temperature', {
    get() {
      console.log('get');
      return temperature;
    },
    set(value) {
      temperature = value;
      archive.push({ val: temperature });
    }
  });

  this.getArchive = function() { return archive; };
}

var arc = new Archiver();
arc.temperature; //'get!'
arc.temperature = 11;
arc.temperature = 12;
arc.getArchive(); // [{ val: 11 }, { val: 13 }]


// now in this exmple getter always return same value
var pattern = {
  get() {
    return "JavaScript is awsome";
  },
  set() {
    this.myname = "Tmon";
  }
};

function TestDefineSetAndGet() {
  Object.defineProperty(this, 'myproperty', pattern);
}

var instance = new TestDefineSetAndGet();
instance.myproperty = 'test';
console.log(instance.myproperty);
// returns: JavaScript is awsome
console.log(instance.myname); // returns: Tmon


// Inheritance of properties
// If an accessor property is inherited, its get and set methods will be called 
// when the property is accessed and modified on descendant objects. 
// If these methods use a variable to store the value, this value will be shared by all objects.

// example
function myclass() {

}

var value;
Object.defineProperty(myclass.prototype, "x", {
  get() {
    return value;
  },
  set(x) {
    value = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // will give 1

// Now this can be overcomed by storing the value
// in someother property
// in get and set method this is used to the object
// which is being accessed or modified
function myclass() {

}

Object.defineProperty(myclass.prototype, "x", {
  get() {
    return this.stored_x;
  }
  set(x) {
    this.stored_x = x;
  }
});

var a = new myclass();
var b = new myclass();
a.x = 1;
console.log(b.x); // undefined not set.


// Unlike accessor properties, value properties are always set on the object itself, 
// not on a prototype. However, if a non-writable value property is inherited, 
// it still prevents from modifying the property on the object.
function myclass(){

}

myclass.prototype.x = 1;
Object.defineProperty(myclass.prototype, "y", {
  writable: false,
  value: 1
});

var a = new myclass();
a.x = 2;
console.log(a.x); // 2
console.log(myclass.prototype.x); // 1
a.y = 2; // Ignored, throws in strict mode
console.log(a.y); // 1
console.log(myclass.prototype.y); // 1