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
