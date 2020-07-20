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
/*
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
*/

/////////////////////////////////////////////////////////////////
//    First Class Functions Passing Functions as Arguments     //
/////////////////////////////////////////////////////////////////

/*
var years = [1990, 1966, 1937, 2005, 1998];

// Generic Function
function arrayCalc(arr, fn) {
  var arrResult = [];
  for (var i = 0; i < arr.length; i++) {
    arrResult.push(fn(arr[i]));
  }
  return arrResult;
}

// Callback functions : passed as argument to general function
function calculateAge(el) {
  return 2020 - el;
}

function isFullAge(el) {
  return el >= 18;
}

function maxHeartRate(el) {
  if (el >= 18 && el <= 81) {
    return Math.round(206.9 - 0.67 * el);
  } else {
    return -1;
  }
}

console.log(years); // (5) [1990, 1966, 1937, 2005, 1998]

// Calculating the age with arrayCalc and calculateAge
ageArr = arrayCalc(years, calculateAge);
console.log(ageArr); // (5) [30, 54, 83, 15, 22]

// Calculating the age with arrayCalc and isFullAge
var fullAges = arrayCalc(ageArr, isFullAge);
console.log(fullAges); // (5) [true, true, true, false, true]

// Calculating the age with arrayCalc and maxHeartRate
var rates = arrayCalc(ageArr, maxHeartRate);
console.log(rates); // (5) [187, 171, -1, -1, 192]
*/

/////////////////////////////////////////////////////////////////
//         First Class Functions returning Functions           //
/////////////////////////////////////////////////////////////////
/*
function interviewQuestion(job) {
  if (job == "designer") {
    // anonynomous function (doesn't have name)
    return function (name) {
      console.log(name + ", can you please explain what UX design is?");
    };
  } else if (job == "teacher") {
    return function (name) {
      console.log("What subject do you teach " + name + " ?");
    };
  } else {
    return function (name) {
      console.log("Hello " + name + ", what do you do?");
    };
  }
}

// this variable is now a function, similar to function expression
var teacherQuestion = interviewQuestion("teacher");
teacherQuestion("john"); // What subject do you teach john ?

var designerQuestion = interviewQuestion("designer");
designerQuestion("john"); // john, can you please explain what UX design is?

interviewQuestion("teacher")("Mark"); //What subject do you teach Mark ?

*/

/////////////////////////////////////////////////////////////////
//      Immediately Invoked Function Expressioins (IIFE):      //
/////////////////////////////////////////////////////////////////
/*
function game() {
  var score = Math.random() * 10;
  console.log(score >= 5);
}
game(); //true

(function () {
  var score = Math.random() * 10;
  console.log(score >= 5);
})(); // true

// console.log(score);
// script.js:193 Uncaught ReferenceError: score is not defined

(function (goodluck) {
  var score = Math.random() * 10;
  console.log(score >= 5 - goodluck);
})(5); // true
*/

/////////////////////////////////////////////////////////////////
//                          CLOSURES                           //
/////////////////////////////////////////////////////////////////
/*
function retirement(retirementAge) {
  var a = " years left until retirement.";
  return function (yearOfBirth) {
    var age = 2020 - yearOfBirth;
    console.log(retirementAge - age + a);
  };
}

var retirementUS = retirement(66);
var retirementGermany = retirement(65);
var retirementIceland = retirement(67);

retirementUS(1990); // 36 years left until retirement.
retirementGermany(1990); // 35 years left until retirement.
retirementIceland(1990); // 37 years left until retirement.



///---ASSIGNMENT(Section 9's Function in new way, only one inner function)---///

function interviewQuestion(job) {
  return function (name) {
    if (job === "teacher") {
      console.log("What subject do you teach " + name + " ?");
    } else if (job === "designer") {
      console.log(name + ", can you please explain what UX design is?");
    } else {
      console.log("Hello " + name + ", what do you do?");
    }
  };
}

// this variable is now a function, similar to function expression
var designerQuestion = interviewQuestion("designer");
designerQuestion("john"); // john can you please explain what UX design is?

var teacherQuestion = interviewQuestion("teacher");
teacherQuestion("jane"); // What subject do you teach jane ?

interviewQuestion("designer")("mark"); //mark can you please explain what UX design is?
*/

/////////////////////////////////////////////////////////////////
//                   Bind, Call and Apply                      //
/////////////////////////////////////////////////////////////////
/*
var john = {
  name: "John",
  age: 28,
  job: "teacher",
  presentation: function (style, timeOfDay) {
    if (style === "formal") {
      console.log(
        "Good " +
          timeOfDay +
          ", Ladies and gentlemen! I'm " +
          this.name +
          ", I'm a " +
          this.job +
          " and I'm " +
          this.age +
          " years old."
      );
    } else if (style === "friendly") {
      console.log(
        "Hey! What's up? I'm " +
          this.name +
          ", I'm a " +
          this.job +
          " and I'm " +
          this.age +
          " years old. Have a nice " +
          timeOfDay +
          "."
      );
    }
  },
};

var emily = {
  name: "Emily",
  age: 35,
  job: "designer",
};

john.presentation("formal", "morning"); // Good morning, Ladies and gentlemen! I'm John, I'm a teacher and I'm 28 years old.

john.presentation.call(emily, "friendly", "afternoon"); // Hey! What's up? I'm Emily, I'm a designer and I'm 35 years old. Have a nice afternoon.

john.presentation("formal", "evening"); // Good evening, Ladies and gentlemen! I'm John, I'm a teacher and I'm 28 years old.

john.presentation.apply(emily, ["friendly", "afternoon"]); // Hey! What's up? I'm Emily, I'm a designer and I'm 35 years old. Have a nice afternoon.

// bind method:

// Not setting timeofday
var johnFriendly = john.presentation.bind(john, "friendly");

// setting the remaining argument:
johnFriendly("morning"); // Hey! What's up? I'm John, I'm a teacher and I'm 28 years old. Have a nice morning.

johnFriendly("night"); // Hey! What's up? I'm John, I'm a teacher and I'm 28 years old. Have a nice night.

var emilyFormal = john.presentation.bind(emily, "formal");
emilyFormal("evening"); // Good evening, Ladies and gentlemen! I'm Emily, I'm a designer and I'm 35 years old.

//
//
////
//////
////////
///////////
//////////

// Real life eg for bind:
var years = [1990, 1966, 1937, 2005, 1998];

// Generic Function
function arrayCalc(arr, fn) {
  var arrResult = [];
  for (var i = 0; i < arr.length; i++) {
    arrResult.push(fn(arr[i]));
  }
  return arrResult;
}

// Callback functions : passed as argument to general function
function calculateAge(el) {
  return 2020 - el;
}

// function isFullAge(el) {
//   return el >= 18;
// }

// we want to create a variable full age
function isFullAge(limit, el) {
  return el >= limit;
}

var ages = arrayCalc(years, calculateAge);

// isFullAge has two arguments but arrayCalc can use it with only one argument as fn function is called with only one argument.

// soln: pass fullAge with limit already preset using bind

var fullAgeJapan = arrayCalc(ages, isFullAge.bind(this, 20));
// arrayCalc gets a copy of the fullAge function with this as this and 20 as limit
console.log(ages); // (5) [30, 54, 83, 15, 22]
console.log(fullAgeJapan); //(5) [true, true, true, false, true]
*/

/////////////////////////////////////////////////////////////////
//                    Coding Challenge 7                       //
/////////////////////////////////////////////////////////////////
/*
(function () {
  var score = 0;
  var Question = function (question, answer, correctanswer) {
    this.question = question;
    this.answer = answer;
    this.correctanswer = correctanswer;
    this.logQuestions = function () {
      console.log(question);
      for (var i = 0; i < this.answer.length; i++) {
        console.log(i + 1 + ". " + this.answer[i]);
      }
      var userchoice = parsInt(prompt("Enter the answer"));
      this.checkanswer(userchoice);
    };
    this.checkanswer = function (userchoice) {
      if (userchoice == this.correctanswer) {
        console.log("Correct!");
        score++;
        console.log("Score: " + score);
        askQuestion(questionset);
      } else if (userchoice === "exit") {
        console.log("thanks! your score : " + score);
        score = 0;
      } else {
        console.log("Wrong! your score : " + score);
        askQuestion(questionset);
      }
    };
  };

  var nameQuestion = new Question(
    "What is the teacher's name?",
    ["John", "Mary", "Jane", "Jonas"],
    4
  );

  var buddhaQuestion = new Question(
    "Where was buddha Born?",
    ["Lumbini", "Gaya", "Solu", "Deonia"],
    1
  );
  var everestQuestion = new Question(
    "Where is Mt. Everest?",
    ["Lumbini", "Gaya", "Solu", "Deonia"],
    3
  );
  var shubhamQuestion = new Question(
    "Where did shubham study?",
    ["Lumbini", "Gaya", "Solu", "Deonia"],
    4
  );

  var questionset = [
    nameQuestion,
    buddhaQuestion,
    everestQuestion,
    shubhamQuestion,
  ];

  function askQuestion(questionset) {
    rand = Math.floor(Math.random() * 4) + 1;
    questionset[rand].logQuestions();
  }

  askQuestion(questionset);
})();
*/
