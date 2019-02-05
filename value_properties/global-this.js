function canMakeHTTPRequest() {
  return typeof globalThis.XMLHttpRequest === 'function';
}

console.log(canMakeHTTPRequest());


// can use this to check globalthis
var getGlobal = function () { 
  if (typeof self !== 'undefined') { return self; } 
  if (typeof window !== 'undefined') { return window; } 
  if (typeof global !== 'undefined') { return global; } 
  throw new Error('unable to locate global object'); 
}; 

var globals = getGlobal(); 

if (typeof globals.setTimeout !== 'function') { 
  // no setTimeout in this environment! 
}

// also we can use this way
if (typeof globalThis.setTimeout !== 'function') {
  // no setTimeout in this environment!
}