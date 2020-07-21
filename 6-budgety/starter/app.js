var budgetController = (function () {
  var x = 23;
  var add = function (a) {
    return x + a;
  };

  return {
    publicTest: function (b) {
      return add(b);
    },
  };
})();

var UIController = (function () {
  // Some Code
})();

var controller = (function (budgetCtrl, UICtrl) {
  var z = budgetCtrl.publicTest(5);
  return {
    anotherPublic: function () {
      console.log(z);
    },
  };
})(budgetController, UIController);
// budgetController is in the outer scope and that could be used without passing // as an argument, but we want to make this module more independent
