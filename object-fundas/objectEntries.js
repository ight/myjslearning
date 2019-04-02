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

// return an empty array for any primitive type, since primitives have no own properties
console.log(Object.entries(100)); // []

//iterate through key-values gracefully
const obj = { a: 5, b: 7, c: 9 };
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key} ${value}`); // "a 5", "b 7", "c 9"
}

//or using aray extras
Object.entries(obj).forEach(([key, value]) => {
  console.log(`${key} ${value}`); // // "a 5", "b 7", "c 9"
});

// The new Map() constructor accepts an iterable of entries. 
// With Object.entries, you can easily convert from Object to Map:

const obj = {foo: 'bar', baz: 42};
const map = new Map(Object.entries(obj));
console.log(map); // Map {foo: "bar", baz: 42}

// Using Array Destructuring, you can iterate through objects easily.
const obj = { foo: "bar", baz: 42};
Object.entries(obj).forEach(([key, value]) => console.log(`${key} ${value}`)); // "foo: bar", "baz: 42"

//Pollyfill
if(!Object.entries) {
  Object.entries = function(obj){
    var ownPros = Object.keys( obj ),
      i = ownPros.length,
      resArray = new Array(i);//prellocated the array
    while (i--)
      resArray[i] = [ownPros[i], obj[ownPros[i]]];
    return resArray;
  };
}

