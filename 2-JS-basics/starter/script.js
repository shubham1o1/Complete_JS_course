/*
var firstName = 'John';
console.log(firstName);

var lastName = 'Smith';
var age = 28;

var fullAge = true; // or false for boolean
console.log(fullAge);

var job;
console.log(job); //undefined

job = 'teacher';
console.log(job); //teacher
*/

/*************
 * VARIABLE MUTATION AND TYPE COERCION
 */

 /*
var firstName = 'john';
var age = 28;

// Type Coercion
console.log(firstName + ' ' + age);

var job, isMarried;
job = 'teacher';
isMarried = false;

console.log(firstName + ' is a ' + age + ' year old? ' + isMarried);

// Variable Mutation number to sting
age = 'twenty eight';
job = 'driver';

alert(firstName + ' is a ' + age + ' year old? ' + isMarried);
var lastName = prompt('What is his last Name?');
console.log(lastName);
*/

/*************
 * BASIC OPERATORS
 */

/*
var now, yearJohn, yearMark, ageJohn, ageMark;


now = 2020;
ageJohn = 28;
ageMark = 33;

//Math Operators
yearJohn = now -ageJohn;
yearMark = now - ageMark;

console.log(yearJohn);
console.log(now + 2);
console.log(now * 2);
console.log(now/2);


 // Logical Operators
var johnOlder = ageJohn > ageMark;
console.log(johnOlder);

//typeof operator
console.log(typeof johnOlder); // boolean
console.log(typeof now); //number
console.log(typeof ' adsa' ); //string
var a;
console.log(typeof a); // underfined

*/

/*************
 * OPERATOR PRECEDENCE
 */
/*
var now = 2020;
var yearJohn = 1989;
var fullAge = 18;

// multiple operators
var isFullAge = now - yearJohn >= fullAge; //true
console.log(isFullAge);

// grouping
var ageJohn = now - yearJohn;
var ageMark = 35;
var average = (ageJohn + ageMark) / 2;

// multiple assignments
var x,y;
x = y = (3 + 5) * 4 - 6 ; 
console.log(x, y); // (26, 26)

// 2 + 4 + 5 left to right
// a = b right to left

x *= 2 ; // x = x * 2
console.log(x);

// x+=2; 
// x ++; x = x + 1 ; x --  ; x = x + 1; 

*/

/*************
 * IF ELSE STATEMENT
 */
/*
var firstName = 'John';
var civilStatus = 'single';

if(civilStatus === 'married'){
    console.log(firstName + ' is married');
} else {
    console.log(firstName + ' is not married');
    
}

var isMarried = false;
if(isMarried){
    console.log('married');
} else{
    console.log('not married');
}
*/

/*************
 * BOOLEAN LOGIC
 */
/*
var firstName = 'John';
var age = 20;

if (age < 13){
    console.log(firstName + ' is a boy');
    
} else if(13<=age && age<20){
    console.log(firstName + ' is a teenager.');
    
} else if (age >= 20 && age < 30){
    console.log(firstName + ' is a young man');
    
} else {
    console.log(firstName + ' is a man.');
    
}
*/

/*************
 * TERNARY OPERATOR AND SWITCH STATEMENTS
 */

 /*

 // Terrnary Operator
 var firstName = 'John';
 var age = 16 ;

 age >= 18 ? console.log('can drink beer'): console.log('can drink juice');
 
 var drink = age >= 18 ? 'beer' : 'juice';

 console.log(drink); // juice
 
 // Switch Statement
 var job = 'instructor';

 switch(job){
     case 'teacher':
     case 'instructor': // two case same outcome
         console.log(firstName + ' teaches kids how to code');
         break;
     case 'driver':
         console.log(firstName + ' drives an uber in Jhapa');
         break;
     case 'designer':
         console.log(firstName + ' designs beautiful sites');
         break;
     default:
         console.log(firstName + ' does something else');         
 }

 age = 2;

 switch (true){
     case age < 13 :
         console.log('boy');
         break;
     case age >=13 && age < 20 :
         console.log('teenager');
         break;
     case age >=20 && age < 30:
         console.log(' young man');
         break;
     default:
         console.log('man');
 }

 */

/*************
* TRUTHY AND FALSY VALUES AND EQUALITY OPERATORS
*/
/*
// Truthy and Falsy
var height;
height = 0;

if(height){
    console.log('Variable is not falsy value');  
} else {
    console.log('Variable is falsy');
}

// Equality Operator == 
if (height == '0'){
    console.log('the == operator does type coercion');
}
*/

/*************
* CODING CHALLENGE 2
*/

/* 
var johnAvg = (89 + 120 + 103) / 3;
var mikeAvg = 1000
var mary = 104

console.log(johnAvg , mikeAvg, mary);


if (johnAvg > mikeAvg && johnAvg > mary){
    console.log('The winner is John and the average score is '+ johnAvg);
}else if (mikeAvg > johnAvg && mikeAvg > mary) {
    console.log('the winner is mike and the score is ' + mikeAvg);
} else if(mary > johnAvg && mary > mikeAvg ){
    console.log('the winner is mary and the core is ' + mary);
    
} else if(johnAvg === mikeAvg && johnAvg > mary) {
    console.log("john and mike equal and greater than mary and john and mike score is " + johnAvg);
        
} else if (johnAvg === mikeAvg && johnAvg === mary){
    console.log('john mary and mike have same score: '+ mary);
} else if(johnAvg === mikeAvg && johnAvg < mary) {
    console.log("john and mike equal and less than mary and score is " + mary);      
} else if (johnAvg === mary && johnAvg > mikeAvg){
    console.log('johnAvg === mary && johnAvg > mikeAvg ' + johnAvg);
    
} else if (johnAvg === mary && johnAvg < mikeAvg){
    console.log('johnAvg === mary && johnAvg > mikeAvg ' + mikeAvg);
    
} else if (mikeAvg === mary && johnAvg < mikeAvg){
    console.log('mike === mary && johnAvg > mikeAvg ' + mikeAvg);
    
} else if (mikeAvg === mary && johnAvg > mikeAvg){
    console.log('mike === mary && johnAvg > mikeAvg ' + johnAvg);
    
}
*/
/*************
* FUNCTIONS
*/
/*
function calculateAge (birthYear){
    return 2020 - birthYear;
}

var ageJohn = calculateAge(1996);
var ageMike = calculateAge(1926);
var ageJane = calculateAge(1936);

console.log(ageJohn, ageMike, ageJane);

function yearsUntilRetirement(year, firstName){
    var age = calculateAge(year);
    var retirement = 65 - age ;

    if (retirement > 0 ){
        console.log(firstName + ' retires in ' + retirement + ' years');
    } else {
        console.log(firstName + ' has already retired');
    }
}

yearsUntilRetirement(1996, 'john');
yearsUntilRetirement(1992, 'mike');
yearsUntilRetirement(1912, 'jane');
*/

/************************************
* FUNCTION STATEMENTS AND EXPRESSIONS
*/

/*
//function declaration
// function whatDoYouDo(jo, firstName) {}

//function expression
var whatDoYouDo = function (job, firstName){
    switch(job){
        case 'teacher':
            return firstName + ' teaches kids how to code';
        case 'driver':
            return firstName + ' drives uber';
        case 'designer':
            return firstName + ' designs websites';
        default:
            return firstName + ' does something else';
    }
}

// this function call is also an expression:
// 


console.log(whatDoYouDo('teacher', 'John'));
console.log(whatDoYouDo('designer', 'jane'));
console.log(whatDoYouDo('retired', 'mark'));

*/

/***********
* ARRAYS
*/

/*

// Initialize new array 
var names = ['John', 'Mark', 'Jane'];
var years = new Array(1990, 1969, 1948);

console.log(names[0]); // John

console.log(names); // Entire array

console.log(names.length); // no of elements

// mutating data in the array
names[1] = 'Ben';
console.log(names[1]); // Ben no longer Mark

// adding data to the aray
names[5] = 'Mary';
console.log(names);

names[names.length] = 'Maria';
console.log(names[names.length - 1]); // Maria

// Different Data Types
var john = ['John', 'Smith', 1990, 'teacher', false];

john.push('blue'); // put to last position of array
john.unshift('Mr.'); // Add  to beginning
console.log(john);

john.pop() ; //removes  last element
john.pop();
john.shift(); // removes first element
console.log(john);


console.log(john.indexOf(1990)); //returns the position of argument in array
console.log(john.indexOf(23)); // returns -1 if the element is not in array
// useful method to test if the element in the array

var isDesigner = john.indexOf('designer') === -1 ? 'John is not a designer' : 'John is a designer'
console.log(isDesigner);

*/

/***********
* Coding Challenge 2
*/

/*

var bills = [124, 48, 268];

function tipAmount(amount){
    if (amount < 50){
        return 0.2*amount;
    } else if(50 <= amount && amount <= 200){
        return 0.15*amount;
    } else {
        return 0.1*amount;
    }
}


var tips = [tipAmount(bills[0]), 
            tipAmount(bills[1]),
            tipAmount(bills[2])
            ];
var finalAmount = [bills[0]+tips[0], bills[1]+tips[1], bills[2]+tips[2]];

console.log('bills:  ' + bills);
console.log('tips: ' + tips);
console.log('new amount: ' + newAmount);

*/

/*******************************
* Objects and Properties
*/

/*
// object literal
var john = {
    firstName : 'John',
    lastName : 'Smith',
    birthYear: 1990,
    family : ['Jane', 'Mark', 'Bob', 'Emily'],
    job: 'teacher',
    isMarried: 'false'
};
console.log(john.firstName);
console.log(john['lastName']); //Smith
var x = 'birthYear';
console.log(john[x]); // 1990

// Mutation:
john.job = 'Driver';
john['isMarried'] = true;
console.log(john);

// new Object syntax
var jane = new Object();
jane.name = 'Jane';
jane.birthYear = 1969;
jane['lastName'] = 'Smith';
console.log(jane);

*/

/*******************************
* Objects and Methods
*/

/*
var john = {
    firstName : 'John',
    lastName : 'Smith',
    birthYear: 1990,
    family : ['Jane', 'Mark', 'Bob', 'Emily'],
    job: 'teacher',
    isMarried: 'false',
    calcAge: function(){
        // return 2020 - this.birthYear;
        this.age = 2020 - this.birthYear; // adding new key when func is called
    }
};

// console.log(john.calcAge());

// john.age = john.calcAge();
john.calcAge();
console.log(john);
*/



/*******************************
* CODING CHALLENGE 4
*/
/*
var mark = {
    fullName : "Mark Smith",
    mass : 70,
    height: 6.2,
    calcBMI : function(mass, height){
        this.bmi = this.mass / (this.height*this.height);
        return this.bmi;
    }
};

var john = {
    fullName : "John Frey",
    mass : 85,
    height: 5.7,
    calcBMI : function(mass, height){
        this.bmi = this.mass / (this.height*this.height);
        return this.bmi;
    }
};

// console.log(mark.calcBMI(), john.calcBMI());

if (john.calcBMI() > mark.calcBMI()){
    console.log(john.fullName + ' has larger bmi than ' + mark.fullName +' '+ john.bmi);    
} else if(john.bmi < mark.bmi){
    console.log(mark.fullName + ' has larger bmi than '+ john.fullName + mark.fullName);
    
} else {
    console.log('both of them have equal bmi: ' + john.bmi);
}

*/

/*******************************
* LOOPS AND ITERATION
*/
/*
// syntax intro
for (var i = 0; i < 10; i++ ){
    console.log(i);
}

// iteration through arrays
var john = ['John', 'Smith', 1990, 'designer', false];
for ( var i = 0; i< john.length; i++){
    console.log(john[i]);
}


// while loop
var i = 0;
while(i < john.length){
    console.log(john[i]);
    i++;
}

// continue and break
var john = ['John', 'Smith', 1990, 'designer', false];
for ( var i = 0; i< john.length; i++){
    // != and !==
    if(typeof john[i]!== 'string') continue;
    console.log(john[i]); // only prints string values
}

for ( var i = 0; i< john.length; i++){
    // != and !==
    if(typeof john[i]!== 'string') break;
    console.log(john[i]); // only prints string values
}


//reverse loop
var john = ['John', 'Smith', 1990, 'designer', false];
for (var i = john.length - 1 ; i>= 0 ; i--){
    console.log(john[i]);
}
*/