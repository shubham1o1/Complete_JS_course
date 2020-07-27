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
/*
const years = [1990, 1965, 1982, 1937];

// ES5
var ages5 = years.map(function (el) {
  return 2020 - el;
});

console.log(ages5);


// ES6:
let ages6 = years.map((el) => 2020 - el);
console.log(ages6);


ages6 = years.map((el, index) => `Age element ${index + 1}: ${2020 - el}`);
console.log(ages6);


ages6 = years.map((el, index) => {
  const now = new Date().getFullYear();
  const age = now - el;
  return `Age element ${index + 1}: ${age}`;
});

console.log(ages6);
*/

////////////////////////////////////////////////////
/////  Arrow Functions Lexical 'this' Keyword  /////
////////////////////////////////////////////////////

/*
//ES5
var box5 = {
  color: "green",
  position: 1,
  clickMe: function () {
    var self = this;
    document.querySelector(".green").addEventListener("click", function () {
      var str =
        "This is box number " + self.position + " and it is " + self.color;
      alert(str);
    });
  },
};

// box5.clickMe();

//ES6
const box6 = {
  color: "green",
  position: 1,
  clickMe: function () {
    document.querySelector(".green").addEventListener("click", () => {
      var str =
        "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    });
  },
};

box6.clickMe();
*/

/*
function Person(name) {
  this.name = name;
}

// ES5
Person.prototype.myFriends5 = function (friends) {
  var arr = friends.map(
    function (el) {
      return this.name + " is friends with " + el;
    }.bind(this)
  );
  console.log(arr);
};

var friends = ["Bob", "Jane", "Mark"];
new Person("John").myFriends5(friends);
*/

// ES6
/*
function Person(name) {
  this.name = name;
}

Person.prototype.myFriends6 = function (friends) {
  var arr = friends.map((el) => `${this.name} is friends with ${el}`);
  console.log(arr);
};

var friends = ["Bob", "Jane", "Mark"];
new Person("Mike").myFriends6(friends);
*/

////////////////////////////////////////////////////
/////            Destructuring                 /////
////////////////////////////////////////////////////

//ES5
// var john = ["John", 26];
// var name = john[0];
// var age = john[1];
/*
// ES6
const [name, age] = ["John", 26];
console.log(name); // John
console.log(age); // 26

//With Objects
const obj = {
  firstName: "John",
  lastName: "Smith",
};

const { firstName, lastName } = obj;
console.log(firstName); // John
console.log(lastName); // Smith

const { firstName: a, lastName: b } = obj;
console.log(a); // john
console.log(b); // smith

function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2); // 30
console.log(retirement); // 35
*/

////////////////////////////////////////////////////
/////             Arrays in ES6                /////
////////////////////////////////////////////////////
/*
const boxes = document.querySelectorAll(".box");

// querySelectorAll returns a NodeList not a array. We transformed using call() in ES5

// ES5
var boxesArr5 = Array.prototype.slice.call(boxes);

boxesArr5.forEach(function (cur) {
  cur.style.backgroundColor = "dodgerblue";
});

//ES6

const boxesArr6 = Array.from(boxes);
// Transform nodeslist into array

boxesArr6.forEach((cur) => (cur.style.backgroundColor = "dodgerblue"));
*/
// ES5
/*
for (var i = 0; i < boxesArr5.length; i++) {
  if (boxesArr5[i].className === "box blue") {
    continue;
  }
  boxesArr5[i].textContent = "I Changed to blue";
}
*/
/*
//ES6
for (const cur of boxesArr6) {
  if (cur.className.includes("blue")) {
    continue;
  }
  cur.textContent = "I Changed to blue";
}

//ES5
var ages = [12, 17, 8, 21, 14, 11];

var full = ages.map(function (cur) {
  return cur >= 18;
});
console.log(full);

console.log(full.indexOf(true)); //3 first index of true

console.log(ages[full.indexOf(true)]); // 21

// ES6:
console.log(ages.findIndex((cur) => cur >= 18)); //3
console.log(ages.find((cur) => cur >= 18)); //21
*/

////////////////////////////////////////////////////
/////          The Spread Operator             /////
////////////////////////////////////////////////////
/*
function addFourAges(a, b, c, d) {
  return a + b + c + d;
}

var sum1 = addFourAges(10, 30, 12, 21);
console.log(sum1); //73

// Passing numbers from array:
var ages = [10, 30, 12, 21];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2); //73

// ES6
const sum3 = addFourAges(...ages);
console.log(sum3); // 73

const familySmith = ["John", "Jane", "Mark"];
const familyMiller = ["Mary", "Bob", "Ann"];
const bigFamily = [...familySmith, "Lily", ...familyMiller];
console.log(bigFamily);
*/
/*
(7) ["John", "Jane", "Mark", "Lily", "Mary", "Bob", "Ann"]
0: "John"
1: "Jane"
2: "Mark"
3: "Lily"
4: "Mary"
5: "Bob"
6: "Ann"
length: 7
__proto__: Array(0)
*/
/*

const h = document.querySelector("h1");
const boxes = document.querySelectorAll(".box"); // NodeList
const all = [h, ...boxes];

Array.from(all).forEach((curr) => (curr.style.color = "purple"));
*/

////////////////////////////////////////////////////
/////           The Rest Parameters            /////
////////////////////////////////////////////////////
/*
// ES5
function isFullAge5() {
  var argsArr = Array.prototype.slice.call(arguments);
  console.log(argsArr);
  argsArr.forEach(function (cur) {
    console.log(2020 - cur >= 18);
  });
}

isFullAge5(1990, 2009, 1965);

// isFullAge5(1990, 2009, 1965, 2018); // Works with all number of params

// ES6

function isFullAge6(...years) {
  console.log(years);
  years.forEach((curr) => console.log(2020 - curr >= 18));
}

isFullAge6(2011, 2001, 2012, 2000);
*/

/*
function isFullAge5(limit) {
  var argsArr = Array.prototype.slice.call(arguments, 1);
  console.log(argsArr);
  // (3) [1990, 2009, 1965]

  console.log(limit); // 21

  argsArr.forEach(function (cur) {
    console.log(2020 - cur >= limit);
  });
  // true
  // false
  // true
}

// isFullAge5(21, 1990, 2009, 1965);

// isFullAge5(1990, 2009, 1965, 2018); // Works with all number of params

// ES6

function isFullAge6(limit, ...years) {
  console.log(years);
  years.forEach((curr) => console.log(2020 - curr >= limit));
}

isFullAge6(16, 2011, 2001, 2012, 2000);
*/

////////////////////////////////////////////////////
/////           Default  Parameters            /////
////////////////////////////////////////////////////

/*
//ES5
function SmithPerson(firstName, yearOfBirth, lastName, nationality) {
  lastName === undefined ? (lastName = "Smith") : (this.lastName = lastName);
  nationality === undefined
    ? (nationality = "American")
    : (this.nationality = nationality);

  this.firstName = firstName;
  this.lastName = lastName;
  // this.yearOfBirth = yearOfBirth;
  // this.nationality = nationality;
}

var john = new SmithPerson("John", 1990);
// john's lastName and nationality will be assigned as undefined

console.log(john);
// SmithPerson {firstName: "John", lastName: "Smith", yearOfBirth: 1990, nationality: "American"}

var emily = new SmithPerson("Emily", 1983, "Diaz", "Spanish");
console.log(emily);
// SmithPerson {lastName: "Diaz", nationality: "Spanish", firstName: "Emily"}
*/

/*
// ES6
function SmithPerson(
  firstName,
  yearOfBirth,
  lastName = "Smith",
  nationality = "American"
) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.yearOfBirth = yearOfBirth;
  this.nationality = nationality;
}

var john = new SmithPerson("John", 1990);
console.log(john);
// SmithPerson {firstName: "John", lastName: "Smith", yearOfBirth: 1990, nationality: "American"}

var emily = new SmithPerson("Emily", 1983, "Diaz", "Spanish");
console.log(emily);
// SmithPerson {lastName: "Diaz", nationality: "Spanish", firstName: "Emily"}
*/

////////////////////////////////////////////////////
/////                   Maps                   /////
////////////////////////////////////////////////////

const question = new Map();

// Defining a new key-value pair
question.set(
  "question",
  "What is the official name of the latest major JavaScript Version"
);
question.set(1, "ES5");
question.set(2, "ES6");
question.set(3, "ES2015");
question.set(4, "ES57");
question.set("correct", 3);

question.set(true, "Correct Answer");
question.set(false, "Wrong, Please try again");

// console.log(question);

// console.log(question.size);
// 8

// question.forEach((value, key) =>
//   console.log(`This is ${key}, and it's set to ${value}`)
// );
console.log(question.get("question"));
// What is the official name of the latest major JavaScript Version

for (let [key, value] of question.entries()) {
  if (typeof key === "number") {
    console.log(`Answer ${key}: ${value}`);
  }
}

const ans = parseInt(prompt("Write the correct answer"));

console.log(question.get(ans === question.get("correct")));
