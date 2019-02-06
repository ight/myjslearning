//object initialiser or literal
{ [nameValuePair1[, nameValuePair2[, ...nameValuePairN]]]}

// Called as a constructor
new Object([value]);


var object1 = {a: 'foo', b: 42, c: {}};

console.log(object1.a);

var a = 'foo';
var b = 42;
var c = {};
var object2 = {a: a, b: b, c: c};

console.log(object2.b);

console.log(object2.length);
