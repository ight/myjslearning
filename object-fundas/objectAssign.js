/* The Object.assign() method is used to copy the values
of all enumerable own properties from one or more
source objects to a target object. It will return the target object
*/

const object1 = {
  a: 1,
  b: 2,
  c: 3
};

const object2 = Object.assign({c: 4, d: 5}, object1); // Object.assign(target, ..source)

console.log(object2.c, object2.d); // expected output 3 5

// clone an object
var obj = { a: 1 };
var copy = Object.assign({}, obj);
console.log(copy); //  { a: 1 }

// deep clone
/*
For deep cloning, we need to use other alternatives because Object.assign() 
copies property values. If the source value is a reference to an object, 
it only copies that reference value.
*/

function test() {
  'use strict';

  let obj1 = { a: 0, b: { c: 0 }};
  let obj2 = Object.assign({}, obj1);
  console.log(JSON.stringfy(obj2)); // { a: 0, b: { c: 0}}

  obj1.a = 1;
  console.log(JSON.stringfy(obj1)); // { a: 1, b: { c: 0 }}
  console.log(JSON.stringfy(obj2)); // { a: 0, b: { c: 0 }}

  obj2.a = 2;
  console.log(JSON.stringfy(obj1)); // { a: 0, b: { c: 0 }}
  console.log(JSON.stringfy(obj2)); // { a: 2, b: { c: 0 }}

  // Object.assign() fails here, the refrence got updated.
  obj2.b.c = 3;
  console.log(JSON.stringfy(obj1)); // { a: 0, b { c: 3 }}
  console.log(JSON.stringfy(obj2)); // { a: 0, b { c: 3 }}


  // Deep clone
  obj1 = { a: 0, b: { c: 0 }}
  let obj3 = JSON.parse(JSON.stringfy(obj1)); // deep cloning hapening here
  obj1.a = 4;
  obj1.b.c = 5;
  console.log(JSON.stringfy(obj3)); // { a: 0, b: { c: 0 }}
}

test();

