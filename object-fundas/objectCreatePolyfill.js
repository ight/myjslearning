// the following polyfill works for ES5
// this polyfill covers the main use case, 
//which is creating a new object for which the prototype 
//has been chosen but doesn't take the second argument into account.

if (typeof Object.create !== "function") {
  Object.create = function (proto, propertiesObject) {
    if (typeof proto !== 'object' && typeof proto !== 'function') {
      throw new TypeError('Object prototype may only be an Object: ' + proto);
    } else if (proto === null) {
      throw new Error("This browser's implemention of Object.create is a shim and doesn't support 'null' as the first argument.");
    }
    if (typeof propertiesObject != 'undefined') {
      throw new Error("This browser's implemention of Object.create is shim and doesn't support a second argument");
    }
    function F() {}
    F.prototype = proto;
    return new F();
  };
}