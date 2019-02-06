// Changing the constructor of an object

function Type() {}

var types = [
new Array(),
new Boolean(),
true,              //  // this will not change constructor as they have read-only native constructors
new Date(),
new Error(),
new Function(),
function () {},
Math,
new Number(),
1,                 //  // this will not change constructor as they have read-only native constructors
new Object(),
{},
new RegExp(),
/(?:)/,
new String(),
'test'           // this will not change constructor as they have read-only native constructors
];

for (var i = 0; i < types.length; i++) {
  types[i].constructor = Type;   // changing the constructor
  types[i] = [types[i].constructor, types[i] instanceof Type, types[i].toString()];
}

console.log(types.join('\n'));