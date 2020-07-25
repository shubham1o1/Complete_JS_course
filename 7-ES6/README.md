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
