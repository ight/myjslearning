/* All objects (with the exception of objects created with Object.create(null)) 
will have a constructor property. Objects created without the explicit use of 
a constructor function (i.e. the object and array literals) will have a constructor 
property that points to the Fundamental Object constructor type for that object.
*/

var o = {};
o.constructor === Object; // ture

var o = new Object;
o.constructor == Object; //true

var a = [];
a.constructor == Array; // true

var a = new Array;
a.constructor === Array; // true

var n = new Number(3);
n.constructor === Number;


//Displaying the constructor of an object

function Tree(name) {
  this.name;
}

var theTree = new Tree('Redwood');
console.log('theTree.constructor is' + theTree.constructor);
s
