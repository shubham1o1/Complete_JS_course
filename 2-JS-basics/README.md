# JS Basics

## Two ways to add JS to HTML:

1. Inline
2. Import

- Inline: (inside html file)

```html
<script>
  console.log("Hello World!)
</script>
```

- Import:

```html
<script src="script.js"></script>
```

## 2.5 Variables and Data Types:

### Data Type:

#### Primitive (Not Objects):

1. **Number**: **Floating** point numbers, for decimals and integers
2. **String**: Sequence of characters, used for text
3. **Boolean**: Logical data type that can only be `true` or `false`
4. **Undefined**: Data type of a variable that does not have a value yet
5. **Null**: Also means ‘non-existent’

```js
var firstName = "John";
console.log(firstName);

var lastName = "Smith";
var age = 28;

var fullAge = true; // or false for boolean
console.log(fullAge);

var job;
console.log(job); //undefined

job = "teacher";
console.log(job); //teacher

/*
multi line comments
*/
```

#### Rules:

- Variable name cant start with numbers or symbols except underscore or dollar sign
- Cannot use reserved keywords for var name

### Variable mutation and type coercion:

#### Type coercion

```js
var firstName = "john";
var age = 28;

// Type Coercion
console.log(firstName + " " + age);
```

- JS automatically converts types as needed this is known as type coercion. Even undefined and boolean is coerced into string if you try it out as:

`console.log(firstName + ' is a ' + age + ' year old? ' + isMarried);`

#### Variable Mutation:

```js
age = 28;
// Variable Mutation number to sting
age = "twenty eight";
```

### Basic Operators:

```js
var now, yearJohn, yearMark, ageJohn, ageMark;

now = 2020;
ageJohn = 28;
ageMark = 33;

//Math Operators
yearJohn = now - ageJohn;
yearMark = now - ageMark;

console.log(yearJohn);
console.log(now + 2);
console.log(now * 2);
console.log(now / 2);

// Logical Operators
var johnOlder = ageJohn > ageMark;
console.log(johnOlder);

//typeof operator
console.log(typeof johnOlder); // boolean
console.log(typeof now); //number
console.log(typeof " adsa"); //string
var a;
console.log(typeof a); // underfined
```

### [Operator Precedence and associativity](http://www-lia.deis.unibo.it/materiale/JS/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence.html)

4 + 6 (left to right)
a = b (right to left)

```js
x *= 2; // x = x * 2
console.log(x);

//same case with +, -, / a variation of assignment operator

x++; // x = x + 1
x--; // x =  x - 1
```

- ESCAPING: use \

## if else STATEMENTS:

```js
var firstName = "John";
var civilStatus = "single";

if (civilStatus === "married") {
  console.log(firstName + " is married");
} else {
  console.log(firstName + " is not married");
}

var isMarried = false;
if (isMarried) {
  console.log("married");
} else {
  console.log("not married");
}
```

## TERNARY and SWITCH

```js
// Terrnary Operator
var firstName = "John";
var age = 16;

age >= 18 ? console.log("can drink beer") : console.log("can drink juice");

var drink = age >= 18 ? "beer" : "juice";

console.log(drink); // juice

// Switch Statement
var job = "instructor";

switch (job) {
  case "teacher":
  case "instructor": // two case same outcome
    console.log(firstName + " teaches kids how to code");
    break;
  case "driver":
    console.log(firstName + " drives an uber in Jhapa");
    break;
  case "designer":
    console.log(firstName + " designs beautiful sites");
    break;
  default:
    console.log(firstName + " does something else");
}

age = 2;

switch (true) {
  case age < 13:
    console.log("boy");
    break;
  case age >= 13 && age < 20:
    console.log("teenager");
    break;
  case age >= 20 && age < 30:
    console.log(" young man");
    break;
  default:
    console.log("man");
}
```

## TRUTHY and FALSY VALUES and EQUALITY OPERATORS

- **Falsy** : Values that yeilds false when evaluated in if else statement condition. In JS falsy values are zero, null, undefined, empty string, not a number values. `(null, 0, NaN, undefined)` Not exactly false but will yeild false when evaluated in if else condition.

- **Truthy** : All the values that are considered true. _NOT falsy values_

```js
var height;

if (height) {
  console.log("Variable is defined");
} else {
  console.log("Variable is not defined");
}
```

- **Equality Operators**: == Does type coercion. 0 == '0' yeilds true.

## Functions:

```js
function yearsUntilRetirement(year, firstName) {
  var age = calculateAge(year);
  var retirement = 65 - age;

  if (retirement > 0) {
    console.log(firstName + " retires in " + retirement + " years");
  } else {
    console.log(firstName + " has already retired");
  }
}

yearsUntilRetirement(1996, "john");
yearsUntilRetirement(1992, "mike");
yearsUntilRetirement(1912, "jane");
```

## Function expression and declaration:

- To declare a function, it must start with `function name()`, just like a variable declaration must start with `var`.
- A function declaration tells the JavaScript engine about a function’s name, return type, and parameters.
- Expression always yeilds some value

```js
whatDoYouDo("teacher", "John");
// this function call is also an expression
// because some immediate value is yielded
("John teaches kids how to code");
```

```js
//function declaration
// function whatDoYouDo(jo, firstName) {...}

//function expression
var whatDoYouDo = function (job, firstName) {
  switch (job) {
    case "teacher":
      return firstName + " teaches kids how to code";
    case "driver":
      return firstName + " drives uber";
    case "designer":
      return firstName + " designs websites";
    default:
      return firstName + " does something else";
  }
};
```

- **Statements** : they perform action but do not produce immediate results. if else, while loop are some examples.

```js
if(true){console.log('if is statement')}
if is statement
undefined
```

- `if` does not produce immediate result, above line gives undefined result in console which also implies that it is a statement.

## ARRAYS:

- Collection of variable (even different data types)
- Zero indexed

```js
// Initialize new array
var names = ["John", "Mark", "Jane"];
var years = new Array(1990, 1969, 1948);

console.log(names[0]); // John

console.log(names); // Entire array

console.log(names.length); // no of elements

// mutating data in the array
names[1] = "Ben";
console.log(names[1]); // Ben no longer Mark

// adding data to the aray
names[5] = "Mary";
console.log(names);

names[names.length] = "Maria";
console.log(names[names.length - 1]); // Maria

// Different Data Types
var john = ["John", "Smith", 1990, "teacher", false];

john.push("blue"); // put to last position of array
john.unshift("Mr."); // Add  to beginning
console.log(john);

john.pop(); //removes  last element
john.pop();
john.shift(); // removes first element
console.log(john);

console.log(john.indexOf(1990)); //returns the position of argument in array
console.log(john.indexOf(23)); // returns -1 if the element is not in array
// useful method to test if the element in the array

var isDesigner =
  john.indexOf("designer") === -1
    ? "John is not a designer"
    : "John is a designer";
console.log(isDesigner);
```

## Objects and Properties:

- Access element by name instead of index
- Define key value pair, each value has keys
- Can be used to group different variable that belong together but have no order
- In array order matters but not in objects

```js
var john = {
  firstName: "John",
  lastName: "Smith",
  birthYear: 1990,
  family: ["Jane", "Mark", "Bob", "Emily"],
  job: "teacher",
  isMarried: "false",
  calcAge: function () {
    // return 2020 - this.birthYear;
    this.age = 2020 - this.birthYear; // adding new key when func is called
  },
};

// john.age = john.calcAge();
john.calcAge();
console.log(john);
```

## LOOPS And ITERATION:

- **break**: breaks out of loop
- **continue**: discard current iteration and go to next iteration

```js
// syntax intro
for (var i = 0; i < 10; i++) {
  console.log(i);
}

// iteration through arrays
var john = ["John", "Smith", 1990, "designer", false];
for (var i = 0; i < john.length; i++) {
  console.log(john[i]);
}

// while loop
var i = 0;
while (i < john.length) {
  console.log(john[i]);
  i++;
}

// continue and break
var john = ["John", "Smith", 1990, "designer", false];
for (var i = 0; i < john.length; i++) {
  // != and !==
  if (typeof john[i] !== "string") continue;
  console.log(john[i]); // only prints string values
}

for (var i = 0; i < john.length; i++) {
  // != and !==
  if (typeof john[i] !== "string") break;
  console.log(john[i]); // only prints string values
}

//reverse loop
var john = ["John", "Smith", 1990, "designer", false];
for (var i = john.length - 1; i >= 0; i--) {
  console.log(john[i]);
}
```

## Javascript versions (ES5, ES6/ES2015 and ES6+)

- ES 5 all browser support
- ES 6 and + not all browser support
