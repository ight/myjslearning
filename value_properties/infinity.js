var maxNumber = Math.pow(10, 1000);

if (maxNumber === Infinity) {
  /* this is line is expected to execute 
   as 10 to the power 1000 is out of number
   type capacity  64bit */
  console.log("Let's call it Infinity!");
}

// expected to be zero
console.log(1 / maxNumber);

// examples of infinity
console.log(Infinity); // infinity
console.log(Infinity + 1); // infinity
console.log(Math.pow(10, 1000)); // infinity
console.log(Math.log(0)); // infinity
console.log(1 / Infinity); // zero
