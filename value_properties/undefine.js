function test(t) {
  // body...
  if (t === undefined) {
    return 'undefined value!';
  }
  return t;
}

var x;

console.log(test(x)); // expected to have undefine


// bad use of undefine example
(function() { var undefined = 'foo'; console.log(undefined, typeof undefined); })();

(function(undefined) { console.log(undefined, typeof undefined); })('foo');


// expamles of undefine
var x;
if (x == undefine) {
  console.log("I am excuted");
}
else {
  console.log("else is excuted");
}