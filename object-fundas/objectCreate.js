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