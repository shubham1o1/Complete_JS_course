# 6. Putting It All Together The Budget App Project

- JS features (When to use them, how to structure them)

## Project Setup and Details:

### About Project:

- Add income (title and amount)
- Add expenses (title and amount)
- Display list of income and expenses
- Display balance
- Delete from list
- Display percentage for each item

## Project Planning and Architecture:

### Planning:

![plan1](notes-images/plan1.png)

### Modules:

- For structuring our code.
- Cleanly separate code and organize them.
- Encapsulate some data into privacy and expose other data publicly.
- We can create code that are related to one another together inside a separate, independent, organized unit.

![modules arch](notes-images/modules_arch.png)

## Implementing the Module Pattern.

### Content:

- What is module patterns in JS
- How to use the module pattern
- More about private and public data, encapsulation and separate of concerns.

### Modules:

- It consists of variables that are private and accessible only within the module. We want that so that no other code can override our data. So, our data and code are going to be safe.
- Beside private variables and methods we are also going to have public methods, that can be used by other function and modules.
- This is called data encapsulation, which lets us hide the implementation details of a specific module from the outside scope so that we only expose a public interface which is sometimes called an API.

### Creating modules:

- Use the module pattern
- All we need to know are the concepts of closures and IIFEs.

#### A moodule that handles out budget data(budgetcontroller):

- We create a variable holding an object return by IIFEs (Immediately Invoked Function Expression) inside `app.js`
- IFFE gives data privacy because it creates a new scope that is not visible from the outside scope.

#### IIFE returning an object:

- An object that contains all the functions that we want to be public is returned
- Our Code for modules:

```js
var budgetController = (function () {
  var x = 23;
  var add = function (a) {
    return x + a;
  };

  return {
    publicTest: function (b) {
      console.log(add(b));
    },
  };
})();
```

- The output at the console:

```js
budgetController.x
  undefined
budgetController.publicTest()
  NaN
  undefined
budgetController.publicTest(2)
  25
  undefined
budgetController.add(2)
  VM274:1 Uncaught TypeError: budgetController.add is not a function
    at <anonymous>:1:18
```

- The intended demo: `add()` function and `x` is not accessible since it is not returned and the publicTest on the other hand is easily accessible. But the publicTest is able to access `add()` and `x`.
- When the JS runtime hit the line `var budgetController = (function () {`, an anonymous function is declared and immediately invoked.
- Then, variables and functions are declared and we returned an object with the method `publicTest()`.
- So the object that we returned is the one that gets assigned to the `budgetController`.
- `budgetController` is just a object containing `publicTest()` method.
- But the `publictest()` method can use the `x` variable and `add()` method even after the function is called. This is due to closure which allows inner function to access the outer function's property and method even after that outer function has been called.
- The x variable and add methods are in closure with inner publicTest method.

### UI Controller Module:

- We create these(UI and Budget) modules in the same file. But they are completely independent and bringing changes to one won't effect the other.

```js
var UIController = (function () {
  // Some Code
})();
```

### Connecting UI Controller and Budget Controller:

- So, that we can take data from UI and pass it to budgetcontroller
- We'll create the third module, called the `controller`

```js
var controller = (function () {
  //some code
})();
```

- Modules can also recieve an argument because they are simply a function expression.
- We are going to pass the other two modules as an argument to this controller so that this controller knows about the other two and can connect them.

```js
var controller = (function (budgetCtrl, UICtrl) {
  //some code
})(budgetController, UIController);
```

- Accessing publicTest() method:

```js
var controller = (function (budgetCtrl, UICtrl) {
  var z = budgetCtrl.publicTest(5);
  return {
    anotherPublic: function () {
      console.log(z);
    },
  };
})(budgetController, UIController);
// budgetController is in the outer scope and that could be used without passing // as an argument, but we want to make this module more independent
```

## Setting Up the first Event Listeners:

### Content:

- How to set up event listeners for keypress events.
- How to use event objects

#### Dummy Event Listener:

```js
// Global APP Controller
var controller = (function (budgetCtrl, UICtrl) {
  // Eventlistener for the input button, Decide what happens on each event and
  // delegate the task to other controllers

  // querySelector Uses same syntax as CSS selector
  document.querySelector(".add__btn").addEventListener("click", function () {
    console.log("Button was clicked");
  });
})(budgetController, UIController);
```

### Actual Task when the Button/Enter is pressed:

1. Get the field Input Data
2. Add the item to the budget Controller
3. Add the item to the UI
4. Calculate the budget
5. Display the budget

### Return Key presses the button:

- We are going to use the keypress event
- We are not going to select anything, but we will add this event listener to **global document**.
- event reference: https://developer.mozilla.org/en-US/docs/Web/Events
- We are going to use the `keypress` events. Which works when ANY key (except Shift, Fn, or CapsLock) is in pressed position. (Fired continously.)

```js
document.addEventListener("keypress", function (event) {
  // some code
  console.log(event);
});
```

- The browser automatically sends the event object to the anonymous function of the eventListener. We we are accepting the event object and logging it to the console. Here is what we have in the console:

![keypress event](notes-images/keypress.png)

- Important thing to note here is the keycode, since we pressed a space the keycode is **32**. This can be used to identify the key that was pressed
- Similarly for enter it is 13
- Keycode ref: http://keycodes.atjayjo.com/#charcode
- Some older browsers use the which property instead of the keycode property.
- So here's the eventListener for pressing enter key:

```js
document.addEventListener("keypress", function (event) {
  if (event.keyCode === 13 || event.which === 13) {
    console.log("Enter Was Pressed");
  }
});
```

### Common function for Button press and Enter press:

```js
// Global APP Controller
var controller = (function (budgetCtrl, UICtrl) {
  var ctrlAddItem = function () {
    // 1. Get the field Input Data
    // 2. Add the item to the budget Controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  };

  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
```

- Instead of anonymous function we passed the ctrlAddItem in `add\_\_btn` querySelector
- And the same function is called from the keypress event listener's anonymous function

## Reading Input Data:

- We're going to read the income/user expense data from the UI

### Content:

- How to read data from different HTML input types.

### Logic:

- Controller is the place where we tell the other modules what to do.
- We write methods in the UI controller and in the budget controller to get some data for us or to calculate something and in the controller we call these methods.
- To get input From UI we are going to write method in the **UIController** and then call it from the **controller** and use the data further such as passing it to other controller and adding to the data structure.

### Methods in UIController:

- We are defining a method that returns an object of the input entry in UI
- This is catched by the controller when input is submitted by clicking a button or pressing enter.

```js
var UIController = (function () {
  return {
    // Method for returnig all of the inputs from UI
    getinput: function () {
      return {
        type: document.querySelector(".add__type").value,
        // + for inc, - for ex

        description: document.querySelector(".add__description").value,
        value: document.querySelector(".add__value").value,
      };
    },
  };
})();
```

- Method to catch an input in the app controller:

```js
// Global APP Controller
var controller = (function (budgetCtrl, UICtrl) {
  var ctrlAddItem = function () {
    // 1. Get the field Input Data
    var input = UICtrl.getinput();
    console.log(input);
  };

  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
```

- Now we have each of the modules talking to one another by calling each other's methods.

### Passing String Literal as querySelector is a bad idea:

- As we proceed with our app there is going to be tons of these selectors `'.btn'` sort of thing
- Changes in UI and class name would lead to tediousness in updating our files.
- We can easily create an object where we store all of these data
- Since it's about UI we'll create in the **UIController**.

```js
// UI Controller
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
  };

  return {
    // Method for returnig all of the inputs from UI
    getinput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        // + for inc, - for ex

        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
  };
})();
```

- Passing DOMString:

```js
//controller

// Global APP Controller
var controller = (function (budgetCtrl, UICtrl) {
  var DOM = UICtrl.getDOMstrings();
  ...

// UIController
var UIController = (function () {
  // Define DOMStrings
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
  };

  return {
    ...
    // method to return DOM strings
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
```

## Creating an Initialization Function

- Similar to the one we did in pig game.

### Content:

- How and why to create an initialization function

### Organizing:

- Just keep the functions in the controller

```js
// Global APP Controller
var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListeners = function () {
    // Function that sets up our event listeners
    var DOM = UICtrl.getDOMstrings();

    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };
  var ctrlAddItem = function () {
    var input = UICtrl.getinput();
  };

  return {
    // Initialization function
    init: function () {
      console.log("Application has been initialized");
      setupEventListeners();
    },
  };
})(budgetController, UIController);
```

- We set up the event listeners and DOM variables inside a setup function. Now we need to call that function using the `init()` function which is a public function.
- So our initialization function is the only way to setup the event listeners.