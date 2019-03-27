// The Object.entries() method returns an array of a given object's
// own enumerable string-keyed property [key, value].

// Example
const object1 = {foo: 'bar', baz: 42};
console.log(Object.entries(object1)[1]); // expected Array ["baz", 42]

const object2 = { 0: 'a', 1: 'b', 2: 'c' };
console.log(Object.entries(object2)[2]); // expected Array ["2", "c"]

const result = Object.entries(object2).sort((a, b) => a - b);
console.log(Object.entries(result)[1]); // expected Array ["1", Array["1", "b"]]


// Syntax
// Object.entries(obj)
// obj => is the object whoes key value pair has to be returned

// Example
const obj = { foo: 'bar', baz: 42 }
console.log(Object.entries(obj)); // [['foo', 'bar'], ['baz', 42]]

//array like object
const obj = { 0: 'a', 1: 'b', 2: 'c'};
console.log(Object.entries(obj)); // [['0', 'a'], ['1', 'b'], ['2', 'c']]

//array like object with random key ordering
const anObj = { 100: 'a', 2: 'b', 7: 'c' };
console.log(Object.entries(anObj)); // [['2','b'], ['7', 'c'], ['100', 'a']]

// getFoo is property which isn't enumerable
const myObj = Object.create({}, { getFoo: { value() { return this.foo; }}});
myObj.foo = 'bar';
console.log(Object.entries(myObj)); //[['foo', 'bar']]

// non object argument will be coerced to an object
console.log(Object.entries('foo'));

// return an empty array for any primtive type