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