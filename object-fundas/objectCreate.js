// The Object.create() method creates a new object, using an existing object as the prototype
// of the newly created object.

const person = {
  isHuman: false,
  printIntoduction: function(){
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
  }
};

const me = Object.create(person);

me.name = "Prakash"; // "name" is a a property set on "me", but not on "person"
me.isHuman = true; // inherited properties can be overwritten

me.printIntoduction(); // "expected to get My name is prakash. Am I human? true"



// Below is an example of how to use Object.create() to achive
// classical inheritance. This is for single inheritance, which is
// all that javaScript support.

// Shape superclass
function shape() {
  this.x = 0;
  this.y = 0;
}

//superclass method
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.log('Shape Moved.');
};

// Rectangle - subclass
function Recatangle() {
  Shape.call(this); // call super constructor
}

//sub class extend  superclass
Recatangle.prototype = Object.create(Shape.prototype);
Recatangle.prototype.constructor = Recatangle;

var rect = new Recatangle();

console.log('Is rect an instance of Rectangle?',
  rect instanceof Recatangle); // true
console.log('Is rect an instance of Shape?',
  rect instanceof Shape); // true
rect.move(1, 1); // Outputs, 'Shape moved.'

// Mixin inheritance from multiple object

function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}

// inherit one class
MyClass.prototype = Object.create(SuperClass.prototype);

// mixin another
Object.assign(MyClass.prototype, OtherSuperClass.prototype);

//re-assign constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function(){
  //do something
}



// Using propertiesObject argument with Object.create()

var o;

// create an  object with null as prototype
o = Object.create(null);

o = {}

// is equivalent to:
o = Object.create(Object.prototype);


// Example where we create an object with a couple of
// sample properties. (Note that the second parameter
// maps keys to *property description*.)

o = Object.create(Object.prototype, {
  // foo is a regular 'value property'
  foo: {
    writable: true,
    configurable: true,
    value: 'hello'
  },
  // bar is a getter-and-setter (accessor) property
  bar: {
    configurable: false,
    get: function() { return 10; },
    set: function(value) {
      console.log('Setting `o.bar` to', value);
    }
  }
});

function Constructor() {}
o = new Constructor();
// is equivalent to:
o = Object.create(Constructor.prototype);
// of course, if there is actual initialization code
// in the Constructor function,
// the Object.create() cannot reflect it


// Create a new object whose prototype is a new, empty
// object and add a single propert 'p', with value 42.
o = Object.create({}, { p: {value: 42 } });

// by default properties ARE NOT writable,
// enumerable or configurable:

o.p = 24;
o.p;
// 42

o.q = 12;
for (var prop in o) {
  console.log(prop);
}

// 'q'

delete o.p;
// false

// to specify an ES3 property
o2 = Object.create({}, {
  p: {
    value: 42,
    writable: true,
    enumerable: true,
    configurable: true
  }
});


/*
A new object created from a completely custom object (especially one created from the null object, 
which is basically a custom object with NO members) can behave in unexpected ways. This is especially 
true when debugging, since common object-property converting/detecting utility functions may
generate errors, or simply lose information (especially if using silent error-traps that ignore errors).
For example, here are two objects:
*/
// Custome and Null objects
// example
oco = Object.create({}); // create a normal object
ocn = Object.create(null); // create a "null" object

console.log(oco); // {} --seems normal
console.log(ocn); // {} -- seems normal here too, so far

oco.p = 1; // create a simple property on normal object
ocn.p = 0; // create a simple property on "null" object

console.log(oco); // {p: 1} -- Still seems normal
console.log(ocn); // {p: 0} --  Still seems normal here too. But wait ...


// here we are going to see the diffrence
"oco is: " + oco; // shows "oco is: [object object]"
"ocn is: " + ocn; // throws error: can not convert object to primitive value


// some more problem
alert(oco); // shows [object object]
alert(ocn); // throws error: can not convert object to primitive value

oco.toString(); // shows [object object]
ocn.toString(); // throws error: ocn.toString is not a function

oco.valueOf(); // shows {}
ocn.valueOf(); // throws error: ocn.valueOf is not a function

oco.hasOwnProperty("p"); // shows true
ocn.hasOwnProperty("p"); // throws error: ocn.hasOwnProperty is not a function

oco.constructor ; // shows "Object() {[namtive code]}"
ocn.constructor ; // shows undefined

// a simple debuging function

//display top-level property name:value pairs of given object
function ShowProperties(b) {
  for(i in b) {
    console.log(i + ":" + b[i] + "\n")
  }
}


// a little complex example
// create a compound object using the test objects from above as property values
ob = {};
ob.po = oco;
ob.pn = ocn;

 // display top level properties
 // -po: [object object]
 //-error:  can not convert object to primitive value
 // only first property get displayed
ShowProperties(ob);


// when the above creation of the object is reversed
// then things will change like this
// we will not be able to see even the single property
ob = {}
ob.pn = ocn;
ob.po = oco;

ShowProperties(ob);

// some solution attampts to fix above
// Some NON-solution

ocn = Object.create(null); // create "null" object (same as above)
ocn.toString  = Object.toString; // Trying to assign methods  directky from standard Object

ocn.toString // shows "toString() { [native code] }" this looks to add the missing method
ocn.toString == Object.toString ; //shows true --method are same as standard object method

// now check this
/* 
Adding the missing object-method directly to new object's "prototype" 
does not work either, since new object does not have a real prototype 
(which is really the cause of ALL these problems) and one cannot be directly added:
*/
ocn.toString(); // error: Function.prototype.toString requires that 'this' be a function


// another way
ocn = Object.create(null); // create "null" object (same as above)
ocn.prototype.toString = Object.toString; // Error: can not set property toString of undefined

ocn.prototype = {} // now trying to create a prototype
ocn.prototype.toString = Object.toString; // now we don't get the error as we try to assign standard object method

//Adding the missing object-method by using the standard-object as new object's prototype does not work either
ocn.toString(); // still throws error: toString is not a function



// yet another way
ocn = Object.create(null); //as above null object
Object.setPrototypeOf(ocn, Object); // set new object's prototype to the standard-object
ocn.toString(); // still error: Function.prototype.toString requires that 'this' be a function



// Some what working solution
// adding from generic method of stanadard object
ocn = Object.create( null ); // create a "null" object
ocn.toString = toString //assigning genric method insted of Object standard method
ocn.toString() // does works gives [object object]
"ocn is: " + ocn; // shows "ocn is: [object object]"

ob = {};
ob.pn = ocn;
ob.po = ocn; // testing the above failed cases

// Now we get to see the properties
// -po : [object object]
// -pn : [object object]
ShowProperties(ob);


// another way by setting genric prototype
ocn = Object.create(null);
Object.setPrototypeOf(ocn, Object.prototype); // // set new object's prototype to the "generic" object (NOT standard-object)

// now
ocn.valueOf(); // show {}
ocn.hasOwnProperty("x"); // shows false
ocn.constructor // shows "Object() { [native code] }"



