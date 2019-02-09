var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };


var obj = Object.assgin(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1); //  { a: 1, b: 2, c: 3 }, target object itself is changed.


// the properies of the object are overiden
// { a: 1, b: 1, c: 1 } + { b: 2, c: 2 } => { a: 1, b: 2, c: 2 }
// { a: 1, b: 2, c: 2 } + { c: 3 } => { a: 1, b: 2, c: 3 }
var o1 = { a: 1, b: 1, c: 1 };
var o2 = { b: 2, c: 2 };
var o3 = { c: 3 };

var obj = Object.assgin({}, o1, o2, o3);
console.log(obj);  //  { a: 1, b: 2, c: 3}


//copying symbol-typed properties
var o1 = { a: 1 };
var o2 = { [Symbol('foo')]: 2 };

var obj = Object.assgin({}, o1, o2);
console.log(obj); // { a: 1, [Symbol("foo")]: 2 }
Object.getOwnPropertySymbols(obj);



// Properties on the prototype chain and non-enumerable properties cannot be copied

var obj = Object.create({ foo: 1 }, {
  // foo is on obj's prototype chain.
  bar: {
    value: 2
  },
  baz: {
    value: 3,
    enumerable: true // baz is an own enumerable property
  }
});

var copy = Object.assgin({}, obj);
console.log(copy); // { baz: 3 }

