# Next Generation JavaScript Intro to ES6 ES2015

- We'll move from ES5 to ES6 + now
- Few syntax may have changed and few feature have been added but how the language works is the same

## What's new in ES6 ES2015:

- Major changes was introduced in ES6 and this section is devoted to ES6.
- Although other version ES7-8 will also be discussed

![quick-recap](notes-images/quickrecap.png)

## Content:

- Variable Declarations with `let` and `const`
- Blocks and IIFEs
- Strings
- Arrow Functions
- Destucturing
- Arrays (method)
- The Spread Operator
- Rest and Default Parameters
- Maps
- Classes and Subclasses

### Later Content:

- Promises (Async Stuff)
- Native Modules (To separate codes)

## Variable Declarations with `let` and `const`:

- Let : similar to var
- Const: For constant

```js
// ES6
const name6 = "Jane Smith";
let age6 = 23;
name6 = "Jane Miller";
console.log(name6);

// Uncaught TypeError: Assignment to constant variable.
```

- Variable declared with `var` is **function** scoped but the variable declared with `let` and `const` are **block**(if elwse, for, while, switch, function, ... ) scoped.

### Demo:

```js
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
// John, born in 1990 is now officially allowd to deive a car

// ES6
function driverLicence6(passedTest) {
  if (passedTest) {
    let firstName = "John";
    const yearOfBirth = 1990;
  }
  console.log(
    firstName +
      ", born in " +
      yearOfBirth +
      " is now officially allowd to deive a car"
  );
}

driverLicence6(true);
// Uncaught ReferenceError: firstName is not defined
    at driverLicence6
```

### Block:

- has a scope
- `let` and `const` has a scope within these blocks

### Solving the code:

```js
// ES6
function driverLicence6(passedTest) {
  let firstName = "John";
  const yearOfBirth = 1990;
  if (passedTest) {
    console.log(
      firstName +
        ", born in " +
        yearOfBirth +
        " is now officially allowd to deive a car"
    );
  }
}

driverLicence6(true);
//John, born in 1990 is now officially allowd to deive a car
```

### Declaring and Defining Constant :

- Uncaught SyntaxError: Missing initializer in const declaration

```js

// ES6
function driverLicence6(passedTest) {
  let firstName ;
  const yearOfBirth;
  // Replace with const yearOfBirth = 1990;
  if (passedTest) {
    firstName = "John";
    yearOfBirth = 1990;
    //Uncaught SyntaxError: Missing initializer in const declaration
    console.log(
      firstName +
        ", born in " +
        yearOfBirth +
        " is now officially allowd to deive a car"
    );
  }
}

driverLicence6(true);
```

### Hoisting the `let` variables:

- We have log the `firstName` variable before assigning the value.
- But it is logged as undefined that is because variables are hoisted before the line of execution where the variable is declared is reached but they are assigned only when the line of assignment is reached in the program excution.

```js
// ES6
function driverLicence6(passedTest) {
  let firstName;
  const yearOfBirth = 1990;
  if (passedTest) {
    console.log(firstName); // undefined
    firstName = "John";

    //Uncaught SyntaxError: Missing initializer in const declaration
    console.log(
      firstName +
        ", born in " +
        yearOfBirth +
        " is now officially allowd to deive a car"
    );
  }
}

driverLicence6(true);
// undefned
// John, born in 1990 is now officially allowd to deive a car
```

- Although we can use them and see their value is undefined before the value assignment, we cannot use the variable before declaration with `let` and `const`

```js
function driverLicence6(passedTest) {
  console.log(firstName); // error
  let firstName;
}
driverLicence6(true);
// Uncaught ReferenceError: Cannot access 'firstName' before initialization
```

### Temporal dead Zone:

- Although variables are hoisted we still cannot accessed them before they are declared.
- We can only use a variable after we declared and define them.

### The i conundrum: (Self Mafde name):

- i outside for and inside for are two completely different VARIABLES.

```js
let i = 23;
for (let i = 0; i < 5; i++) {
  console.log(i);
}

console.log(i);
```

- O/P:

```console
    0
    1
    2
    3
    4
    23
```

```js
driverLicence6(true);

let j = 23;
for (let i = 0; i < 5; i++) {
  console.log(j * i);
}

console.log(j);

/*
 0
 23
 46
 69
 92
 23
 */
```

- Using `var` on similar setting:

```js
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
```

- `i` is not block scoped with var

## Blocks and IIFEs:

- New way of creating IIFEs will be discussed
- Block scope gives us a data privacy, for which we relied on IIFEs before

### A New Way to Create Block in ES6:

```js
{
  const a = 1;
  let b = 2;
}

console.log(a + b);
// Uncaught ReferenceError: a is not defined
```

- Somewhat like IIFEs

### With var though :

```js
{
  var c = 3;
}

console.log(c); // 3
```

## Strings in ES6:

### Template Literals:

- Use the **\$ { }** for variables and expression inside **\` \`**, which is the backtick

```js
let firstName = "john";
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
```

### New Methods:

```js
const n = `${firstName} ${lastName}`;
console.log(n.startsWith("J")); //true ( because n = John Smith starts with J)
console.log(n.endsWith("h")); //true
console.log(n.includes(" ")); //true (Ther is a space in string)
console.log(firstName.repeat(5)); // JohnJohnJohnJohnJohn
console.log(`${firstName} `.repeat(5)); // John John John John John
```

## Arrow Functions:

An arrow function expression is a syntactically compact alternative to a regular function expression, although without its own bindings to the `this`, arguments, super, or new.target keywords. Arrow function expressions are ill suited as methods, and they cannot be used as constructors.

```js
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
```

#### Syntax:

```js
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
// equivalent to: => { return expression; }

// Parentheses are optional when there's only one parameter name:
(singleParam) => { statements }
singleParam => { statements }

// The parameter list for a function with no parameters should be written with a pair of parentheses.
() => { statements }
```

### Arrow functions variations:

- **One argument**, **a line of code** (parenthesis not needed surroundning an argument)
- `const ages6 = years.map((el) => 2020 - el);` here, el is the argument and `2020 - el` is the **return** expression.

```js
//ES6:
const ages6 = years.map((el) => 2020 - el);
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
```

- **Two arguments** (or more) in an parenthesis

```js
let ages6 = years.map((el, index) => `Age element ${index + 1}: ${2020 - el}`);
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
```

- More lines of code and a return statement with return keyword and curly braces

```js
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
```

## Arrow Function Lexical 'this' Keyword:

- The biggest advantage of using the arrow function might be that they share the surrounding this keyword.
- Unlike normal functions, arrow functions don't get their this keyword.
- They simply use the `this` keyword of the function they are written in. So, we say they have a lexical this variable.

```js
//ES5
var box5 = {
  color: "green",
  position: 1,
  clickMe: function () {
    document.querySelector(".green").addEventListener("click", function () {
      var str =
        "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    });
  },
};

box5.clickMe();
```

- here the `this.position` and `this.color` is read as undefined. This happens because only in a method call the `this` keyword actually points to the object.
- But in the regular function (or a callback function) call the `this` keyword will point to the global objects i.e the window object.
- Solution in ES5:

```js
//ES5
var box5 = {
  color: "green",
  position: 1,
  clickMe: function () {
    self = this;
    document.querySelector(".green").addEventListener("click", function () {
      var str =
        "This is box number " + self.position + " and it is " + self.color;
      alert(str);
    });
  },
};

box5.clickMe();
```

- We assign this variable to some other variable and later use that variable. `self` in our case.
- it is a workaround, or a hack.

### Arrow function and `this`:

- No hack required, the arrow function shares the lexical this keyword.
- Arrow function can access the this variable of its surrounding function.

```js
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
```

- Arrow functions are useful when you have to preserve the value of `this` keyword.

### `clickMe()` as arrow function is not a good idea:

```js
//ES6
const box6 = {
  color: "green",
  position: 1,
  clickMe: () => {
    document.querySelector(".green").addEventListener("click", () => {
      var str =
        "This is box number " + this.position + " and it is " + this.color;
      alert(str);
    });
  },
};

box6.clickMe();
```

- here again we get the `undefined` for `this.position` and `this.color` since `clickMe()`'s surrounding is global object and its child arrow function will also have global object where `position` and `color` are `undefined`.

### Arrow function with constructor:

```js
function Person(name) {
  this.name = name;
}

// ES5
Person.prototype.myFriends5 = function (friends) {
  var arr = friends.map(function (el) {
    return this.name + " is friends with " + el;
  });
  console.log(arr);
};

var friends = ["Bob", "Jane", "Mark"];
new Person("John").myFriends5(friends);
/*
(3) [" is friends with Bob", " is friends with Jane", " is friends with Mark"]
0: " is friends with Bob"
1: " is friends with Jane"
2: " is friends with Mark"
length: 3
__proto__: Array(0)
*/
```

- The name is not defined
- The anonymous callback function is not going to have access to the `this` variable so the `name` is not displayed here too.
- We can use the **call**, **bind** and **apply** as they allow us to define the `this` variable manually.
- **bind** method creates a copy of the function.
- Making the following modification will make the function work

```js
..............
  var arr = friends.map(
    function (el) {
      return this.name + " is friends with " + el;
    }.bind(this)
  );
.....................
/*
(3) ["John is friends with Bob", "John is friends with Jane", "John is friends with Mark"]
0: "John is friends with Bob"
1: "John is friends with Jane"
2: "John is friends with Mark"
length: 3
__proto__: Array(0)
*/
```

- In ES6:

```js
// ES6

function Person(name) {
  this.name = name;
}

Person.prototype.myFriends6 = function (friends) {
  var arr = friends.map((el) => `${this.name} is friends with ${el}`);
  console.log(arr);
};

var friends = ["Bob", "Jane", "Mark"];
new Person("Mike").myFriends6(friends);

/*
(3) ["Mike is friends with Bob", "Mike is friends with Jane", "Mike is friends with Mark"]
0: "Mike is friends with Bob"
1: "Mike is friends with Jane"
2: "Mike is friends with Mark"
length: 3
__proto__: Array(0)
*/
```

## Destructuring:

- It is a very convenient way to extract data from data structure such as object or an array.

### Storing Array's item in a single variable:

- Here `name` and `age` constant variables are created and they are assigned the value of `"John"` and `26`

```js
//ES5
// var john = ["John", 26];
// var name = john[0];
// var age = john[1];

// ES6
const [name, age] = ["John", 26];
console.log(name); // John
console.log(age); // 26
```

- We destructured `["John", 26];` using the syntax : `const [name, age] =`
- It is like opposite of constructing a data structure

### Destructuring with Objects:

- Use curly braces surrounding the variable
- Use the variable name, same as the key in the object

```js
//With Objects
const obj = {
  firstName: "John",
  lastName: "Smith",
};

const { firstName, lastName } = obj;

console.log(firstName); // John
console.log(lastName); // Smith
```

### If we want to set a different variable name:

```js
const { firstName: a, lastName: b } = obj;
console.log(a); // john
console.log(b); // smith
```

### Use Cases:

#### Returning Multiple Values from a Function:

- In ES5 we used objects to return multiple values

```js
function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}

const [age2, retirement] = calcAgeRetirement(1990);
console.log(age2); // 30
console.log(retirement); // 35
```
