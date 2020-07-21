// BUDGET
var budgetController = (function () {
  //some code
})();

/*



*/

// UI Controller
var UIController = (function () {
  // Some Code
})();

/*



*/

// Global APP Controller
var controller = (function (budgetCtrl, UICtrl) {
  var ctrlAddItem = function () {
    // 1. Get the field Input Data
    // 2. Add the item to the budget Controller
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI

    console.log("It Works");
  };

  // Eventlistener for the input button, Decide what happens on each event and
  // delegate the task to other controllers

  // querySelector Uses same syntax as CSS selector
  document.querySelector(".add__btn").addEventListener("click", ctrlAddItem);

  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(budgetController, UIController);
