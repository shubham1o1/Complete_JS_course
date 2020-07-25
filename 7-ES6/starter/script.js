////////////////////////////////////////////////////
///////////////////let and const///////////////////
////////////////////////////////////////////////////
/*
// ES5
var name5 = "Jane Smith";
var age5 = 23;
name5 = "Jane Miller";

console.log(name5); // Jane Miller

// ES6
const name6 = "Jane Smith"; // Immutable
let age6 = 23;
name6 = "Jane Miller";
console.log(name6);
*/

/*
// ES5
function driverLicence(passedTest) {
  if (passedTest) {
    var firstName = "John";
    var yearOfBirth = 1990;
  }
  console.log(
    firstName +
      ", born in " +
      yearOfBirth +
      " is now officially allowd to deive a car"
  );
}

driverLicence(true);

// ES6
function driverLicence6(passedTest) {
  let firstName;
  const yearOfBirth = 1990;
  if (passedTest) {
    firstName = "John";
    console.log(
      firstName +
        ", born in " +
        yearOfBirth +
        " is now officially allowd to deive a car"
    );
  }
}

driverLicence6(true);

let j = 23;
for (let i = 0; i < 5; i++) {
  console.log(j * i);
}

console.log(j);

// 0;
// 23;
// 46;
// 69;
// 92;
// 23;

*/

/*

var i = 23;
for (var i = 0; i < 5; i++) {
  console.log(i);
}

console.log(i);

//  0
//  1
//  2
//  3
//  4
//  5
*/

////////////////////////////////////////////////////
//////////////    Blocks and IIFEs   ///////////////
////////////////////////////////////////////////////
/*
{
  const a = 1;
  let b = 2;
  var c = 3;
}

console.log(c);
// console.log(a+b);
// Uncaught ReferenceError: a is not defined

*/

////////////////////////////////////////////////////
/////////////     Strings in ES6     ///////////////
////////////////////////////////////////////////////
/*
let firstName = "John";
let lastName = "Smith";

const yearOfBirth = 1990;

function calcAge(year) {
  return 2020 - year;
}

// ES5
console.log(
  "This is " +
    firstName +
    " " +
    lastName +
    ". He was born in " +
    yearOfBirth +
    ". Today, he is  " +
    calcAge(yearOfBirth)
);

// ES6:
console.log(
  `This is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today, he is ${calcAge(
    yearOfBirth
  )} years old.`
);
// This is john Smith. He was born in 1990. Today, he is 30 years old.

const n = `${firstName} ${lastName}`;
console.log(n.startsWith("J")); //true ( because n = John Smith starts with J)
console.log(n.endsWith("h")); //true
console.log(n.includes(" ")); //true (Ther is a space in string)
console.log(firstName.repeat(5)); // JohnJohnJohnJohnJohn
console.log(`${firstName} `.repeat(5)); // John John John John John
*/

////////////////////////////////////////////////////
///////////  Arrow Functions Basics   //////////////
////////////////////////////////////////////////////

const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function (el) {
  return 2020 - el;
});

console.log(ages5);
/*
Array(4)
0: 30
1: 55
2: 38
3: 83
length: 4
__proto__: Array(0)
*/

//ES6:
let ages6 = years.map((el) => 2020 - el);
console.log(ages6);
/*
Array(4)
0: 30
1: 55
2: 38
3: 83
length: 4
__proto__: Array(0)
*/

ages6 = years.map((el, index) => `Age element ${index + 1}: ${2020 - el}`);
console.log(ages6);
/*
(4) ["Age element 1: 30", "Age element 2: 55", "Age element 3: 38", "Age element 4: 83"]
0: "Age element 1: 30"
1: "Age element 2: 55"
2: "Age element 3: 38"
3: "Age element 4: 83"
length: 4
__proto__: Array(0)
*/

ages6 = years.map((el, index) => {
  const now = new Date().getFullYear();
  const age = now - el;
  return `Age element ${index + 1}: ${age}`;
});

console.log(ages6);
/*
(4) ["Age element 1: 30", "Age element 2: 55", "Age element 3: 38", "Age element 4: 83"]
0: "Age element 1: 30"
1: "Age element 2: 55"
2: "Age element 3: 38"
3: "Age element 4: 83"
length: 4
__proto__: Array(0)
*/
