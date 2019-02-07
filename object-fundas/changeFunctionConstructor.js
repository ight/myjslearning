function Parent() {}
Parent.prototype.parentMethod = function parentMethod() {};

function Child() {}
Child.prototype = Object.create(Parent.prototype); // re-define child prototype to Parent prototype

Child.prototype.constructor = Child; // return original constructor to Child


// An example to show that return of orginal constructor to child not required
function Parent() {};
function CreatedConstructor() {}

CreatedConstructor.prototype = Object.create(Parent.prototype);

CreatedConstructor.prototype.create = function create() {
  return new this.constructor();
}

new CreatedConstructor().create().create(); // TypeError undefine is not a function since constructor === Parent


// Valid eample of returning constructor to Child
function Parent() {}
function CreatedConstructor() {}

CreatedConstructor.prototype = Object.create(Parent.prototype);
CreatedConstructor.prototype.constructor = CreatedConstructor; // set right constructor for further using

CreatedConstructor.prototype.create = function create() {
  return new this.constructor();
}

new CreatedConstructor().create().create(); // this is fine

// another example
function ParentWithStatic() {}

ParentWithStatic.startPostion = { x: 0, y: 0 };
ParentWithStatic.getStartPostiion = function getStartPostiion() {
  return this.startPostion;
}

function Child(x, y) {
  this.position = {
    x: x,
    y: y
  };
}

Child.prototype = Object.create(ParentWithStatic.prototype);
Child.prototype.constructor = Child; // comenting this line should work let the constructor be of parent.

Child.prototype.getOffsetByIntialPostion = function getOffsetByIntialPostion() {
  var position = this.position;
  var startPostion = this.constructor.getStartPostiion(); // error as the constructor is child

  return {
    offsetX: startPostion.x - position.x,
    offsetY: startPostion.y - position.y
  }
};











