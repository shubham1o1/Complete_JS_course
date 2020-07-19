// Function Constructor
/*
var john = {
  name: "John",
  yearOfBirth: 1990,
  job: "teacher",
};

var Person = function (name, yearOfBirth, job) {
  this.name = name;
  this.yearOfBirth = yearOfBirth;
  this.job = job;
  // this.calculateAge = function () {
  //   console.log(2020 - this.yearOfBirth);
  // };
};

Person.prototype.lastName = "Smith";

Person.prototype.calculateAge = function () {
  console.log(2020 - this.yearOfBirth);
};

//object instantiation
var john = new Person("John", 1990, "teacher");
var jane = new Person("Jane", 1969, "Designer");
var mark = new Person("Mark", 1948, "retired");

john.calculateAge();
jane.calculateAge();
mark.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);
console.log(mark.lastName);
*/

/////////////////////////////////////////////////////////////////
//////////////////////   Object.create   ////////////////////////
/*
var personProto = {
  calculateAge: function () {
    console.log(2020 - this.yearOfBirth);
  },
};

// var john = Object.create(personProto);
// john.name = "John";
// john.yearOfBirth = 2001;
// john.job = "teacher";

var jane = Object.create(personProto, {
  name: { value: "Jane" },
  yearOfBirth: { value: 1969 },
  job: { value: "designer" },
});
*/

/////////////////////////////////////////////////////////////////
//////////////////   Primitives vs objects   ////////////////////

// Primitives
var a = 23;
var b = a;

a = 46;
console.log(a, b); // 46 23

// Objects
var obj1 = {
  name: "john",
  age: 26,
};

var obj2 = obj1;

obj1.age = 30;

console.log(obj1.age + " " + obj2.age); // 30 30

// Functions
var age = 27;
var obj = {
  name: "Jonas",
  city: "Lisbon",
};

function change(a, b) {
  a = 30;
  b.city = "San Fransisco";
}

change(age, obj);
console.log(age); // 27
console.log(obj.city); // San Francisco
