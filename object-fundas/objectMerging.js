var o1 = { a: 1 };
var o2 = { b: 2 };
var o3 = { c: 3 };


var obj = Object.assign(o1, o2, o3);
console.log(obj); // { a: 1, b: 2, c: 3 }
console.log(o1); //  { a: 1, b: 2, c: 3 }, target object itself is changed.


// the properies of the object are overiden
// { a: 1, b: 1, c: 1 } + { b: 2, c: 2 } => { a: 1, b: 2, c: 2 }
// { a: 1, b: 2, c: 2 } + { c: 3 } => { a: 1, b: 2, c: 3 }
var o1 = { a: 1, b: 1, c: 1 };
var o2 = { b: 2, c: 2 };
var o3 = { c: 3 };

var obj = Object.assign({}, o1, o2, o3);
console.log(obj);  //  { a: 1, b: 2, c: 3}


//copying symbol-typed properties
var o1 = { a: 1 };
var o2 = { [Symbol('foo')]: 2 };

var obj = Object.assign({}, o1, o2);
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

var copy = Object.assign({}, obj);
console.log(copy); // { baz: 3 }

// wrapping privitive types to object

var v1 = 'abc';
var v2 = true;
var v3 = 10;
var v4 = Symbol('foo');
var v5 = 30;

var obj = Object.assign({}, v1, null, v2, undefined, v3, v4, v5);
// Primitives will be wrapped, null and undefine will be ignored.
// Note, only string wrapper can have own enumerable properties.
console.log(obj); // { "0": "a", "1": "b", "3": "c"}


// Exceptions will interrupt the ongoing copying task

var target = Object.defineProperty({}, 'foo', {
  value: 1,
  writeable: false
}); // target.foo is read-only property

Object.assign(target, { bar: 2 }, { foo2: 3, foo: 3, foo3: 3}, { baz: 4 });
// TypeError: "foo" is read-only
// The Exception will be thrown when assigning target.foo

console.log(target.bar);   //2, the first source was coupied sucessfully.
console.log(target.foo2);  // 3, the first property of the second source was copied sucessfully.
console.log(target.foo);   // 1, exceptionis thrown here
console.log(target.foo3);  // undefined, assign method has finished, foo3 will not be copied
console.log(target.baz);  //  undefined, the third source will not be copied either.

console.log(target); //{bar: 2, foo2: 3, foo: 1}
