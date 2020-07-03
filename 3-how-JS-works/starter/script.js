///////////////////////////////////////
// Lecture: Hoisting
/*
calculateAge(1965); // works because of hoisting

function calculateAge(year){
    console.log(2020 - year);
}


// retirement(1990); // cant use before declaring


var retirement = function(year){
    console.log(65 - (2020-year));
}


// Variables hoistings

console.log(age);
//UNDEFINED because hoisting sets variables to undefined
// if variable was not declared then youll see an error

var age = 23;
console.log(age);


function foo(){
    // console.log(age); // undefined
    var age = 65 ;
    console.log(age);
}

foo();
console.log(age); //23 from global execution context's age

*/



///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}

*/


// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third()
    }
}

function third() {
    var d = 'John';
    console.log(a + d);
}

*/


///////////////////////////////////////
// Lecture: The this keyword

// console.log(this); // window object the default object
/*
function calculateAge(year){
    console.log(2020 - year);
    console.log(this); // windows object for regular(not method) function call

}


calculateAge(1996); 
*/

var john = {
    name : 'John',
    yearOfBirth: 1990,
    calculateAge : function(){
        console.log(this); // john object
        console.log(2020-this.yearOfBirth);
        
        /*
        function innerFunction(){
            console.log(this); 
            //window object since it is regular(not method) function
        }
        innerFunction();
        */
    }
}
john.calculateAge();

var mike = {
    name : 'Mike',
    yearOfBirth : 1984
};

//method borrowing:
mike.calculateAge = john.calculateAge ;
mike.calculateAge(); 
// mike object is this and mike age is logged
// this variable is only assigned a value when 
// function is called, else borrowing wouldnt be
// possible, calculateAge would always be john's