// Function Constructor

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

// john object instantiation
var john = new Person("John", 1990, "teacher");
console.log(john.lastName);

john.calculateAge();

var jane = new Person("Jane", 1969, "Designer");
var mark = new Person("Mark", 1948, "retired");
