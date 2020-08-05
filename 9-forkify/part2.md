# Part 2: Modern JavaScript Using ES6, NPM, Babel and Webpack

## Building the Recipe Model:

- Model for a single recipe selected from the search results

### `recipe.js` (inside models):

- Use axios for ajax call
- Use class to hold the data (recipe object)
- Each recipe is identified by an ID and when we create a new recipe object we will pass in that exact ID. Based on this ID we can later to the ajax call to get the rest of the data for the recipe.

```js
import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      console.log(res);
    } catch (error) {
      alert(error);
    }
  }
}
```

```js
////////////////////////////////////
/// RECIPE CONTROLLER
let recipe = new Recipe(2658);
recipe.getRecipe();
```

- Output:

```json
{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
config: {url: "https://forkify-api.herokuapp.com/api/get?rId=2658", headers: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
data:
  recipe:
    image_url: "http://forkify-api.herokuapp.com/images/14573f089.jpg"
    ingredients: (8) ["1 pound dry ziti pasta", "1 onion, chopped", "1 pound lean ground beef", "2 (26 ounce) jars spaghetti sauce", "6 ounces provolone cheese, sliced", "1 1/2 cups sour cream", "6 ounces mozzarella cheese, shredded", "2 tablespoons grated Parmesan cheese"]
    publisher: "All Recipes"
    publisher_url: "http://allrecipes.com"
    recipe_id: "2658"
    social_rank: 99.99999999889937
    source_url: "http://allrecipes.com/Recipe/Baked-Ziti-I/Detail.aspx"
    title: "Baked Ziti I"
    __proto__: Object
    __proto__: Object
headers: {content-length: "550", content-type: "application/json; charset=utf-8"}
request: XMLHttpRequest {readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
status: 200
statusText: "OK"
__proto__: Object
```

- Inside the data we have all the properties we need such as title, publisher, image,...
- So, we read these property as :

```js
  ..........................
  async getRecipe() {
    try {
      const res = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
      // console.log(res);
    } catch (error) {
      alert(error);
    }
  }
  ..............
```

- Logging the recipe:

```js
////////////////////////////////////
/// RECIPE CONTROLLER
let recipe = new Recipe(2658);
recipe.getRecipe();

console.log(recipe);
```

- o/p

```json
Recipe {id: 2658}
  author: "All Recipes"
  id: 2658
  img: "http://forkify-api.herokuapp.com/images/14573f089.jpg"
  ingredients: Array(8)
    0: "1 pound dry ziti pasta"
    1: "1 onion, chopped"
    2: "1 pound lean ground beef"
    3: "2 (26 ounce) jars spaghetti sauce"
    4: "6 ounces provolone cheese, sliced"
    5: "1 1/2 cups sour cream"
    6: "6 ounces mozzarella cheese, shredded"
    7: "2 tablespoons grated Parmesan cheese"
    length: 8
  __proto__: Array(0)
  title: "Baked Ziti I"
  url: "http://allrecipes.com/Recipe/Baked-Ziti-I/Detail.aspx"
__proto__: Object
```

### Methods to calculate cooking time and serving:

```js
  ..................
  calcTime() {
    // Assuming that we need 15 mins for each 3 ingredients
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 2);
    this.time = periods * 15;
  }

  calcServings() {
    // set all servings to four
    this.serving = 4;
  }
  .............
```

## Building the Reciper Controller:

- Implement the controller for recipe

### Content:

- How to read data from the page URL.
- How to respond to the `hashchange` event to read data from the page url.
- How to add the same event listener to multiple events.

### hashchange event :

- `http://localhost:8080/#47025`
- There is an event that is called hash change that is fired off each time the hash in URL changes to something else.
- We'll add the event to the global window object

```js
const controlRecipe = () => {
  const id = window.location.hash;
  console.log(id);
  // #47275
};

window.addEventListener("hashchange", controlRecipe);
```

- hashchange event is triggered whenever we change the hash in the url
- we have added the id to url and logging it prints the ID.
- `window.location` is the entire url. We can extract the `hash` property from it.

#### Adding Hash:

- In the render recipe method we have passed the markup as follows.

```js
const renderRecipe = (recipe) => {
  const markup = `
  <li>
      <a class="results__link" href="#${recipe.recipe_id}">
        ........
```

- So clicking on the recipe changes the hash, and hash is trigerred.

### Extractiing Hash with replace:

`const id = window.location.hash.replace("#", "");`

### Algorithm:

1. Prepare UI for Changes
2. Create new recipe object
3. Get recipe data
4. Calculate servings and time
5. Render the Recipe

```js
/// RECIPE CONTROLLER
// Async since we'll load recipe data in the background
const controlRecipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
    // Prepare UI for Changes

    // Create new recipe object
    state.recipe = new Recipe(id);

    // Get recipe data
    await state.recipe.getRecipe();

    // Calculate servings and time
    state.recipe.calcTime();
    state.recipe.calcServings();

    // Render the Recipe
    console.log(state.recipe);
  }
};
```

### Using same callback for more than one event.

- Just reloading the same hash url doesn't show the result. So, we add the `load` event with the same callback function as `hashchange` event.

```js
// window.addEventListener("hashchange", controlRecipe);
// window.addEventListener("load", controlRecipe);

//Shortcut:
["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);
```

- Above shortcut would be handy if there were more events with same listener.

### Error Proofing the async function

- The promise might be rejected.
- It is a good practice to always surround await expression with try catch.

```js
if (id) {
  // Prepare UI for Changes

  // Create new recipe object
  state.recipe = new Recipe(id);

  try {
    // Get recipe data
    await state.recipe.getRecipe();

    // Calculate servings and time
    state.recipe.calcTime();
    state.recipe.calcServings();

    // Render the Recipe
    console.log(state.recipe);
  } catch (error) {
    alert("Error Processing Recipe");
  }
}
```

- Handling Search Controller's Error:

```js
try {
  // 4. Search for recipe
  await state.search.getResults();

  // 5. Render Results in UI
  clearLoader();
  searchView.renderResults(state.search.result);
} catch (error) {
  alert("Something went wrong with the search");
  clearLoader();
}
```

## Building the Recipe Model Part 2:

- We'll write complex function to process ingredient list
- We'll read through a list of ingredients, and in each ingredient separate the quanity, the unit and the description.
- We can individually increase/decrease the number/quantity of the ingredient.

### Content:

- Use array methods like map slice, findIndex and includes.
- How and why to use eval()

### Cleaning Data:

- Standardize tbsp, tablespoons and cups
- Remove bracket's content.

#### Algorithm:

#### 1. Uniform Units:

- Create two arrays, one array will have original ingredient, other array will be written exactly like we want them

```js
  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoons",
      "ounce",
      "ounces",
      "teaspoon",
      "teaspoons",
      "cups",
      "pounds",
    ];
    const writShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];
    const newIngredients = this.ingredients.map((el) => {
      // 1. Uniform Units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShort[i]);
      });
      ........................
```

#### 2. Remove parenthesis

- Using REGEx:

**Creating a regular expression**

- You construct a regular expression in one of two ways:

- Using a regular expression literal, which consists of a pattern enclosed between slashes, as follows:

`let re = /ab+c/;`

- Regular expression literals provide compilation of the regular expression when the script is loaded. If the regular expression remains constant, using this can improve performance.

- Or calling the constructor function of the RegExp object, as follows:

`let re = new RegExp('ab+c');`

- Using the constructor function provides runtime compilation of the regular expression. Use the constructor function when you know the regular expression pattern will be changing, or you don't know the pattern and are getting it from another source, such as user input.

```js
.......................
  // 2. Remove parenthesis
  ingredient = ingredient.replace(/ *\([^)]*\) */g, "");
  // replaces parenthesis and everting inside with nothing

  // 3. Parse ingredients into count units and ingredient

  return ingredient;
});
this.ingredients = newIngredients;
..........
```

regex ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

#### 3. Parse ingredients into count units and ingredient

**Cases**:

- Number, Unit and the text
- Only Number
- No Number

**Algorithm:**:

1. Test if there are units and where it is located

   - Convert Ingredient into Array

   ```js
   const arrIng = ingredient.split(" ");
   ```

   - Return the index of the positioin where the test is true

   ```js
   const unitIndex = arrIng.findIndex((el2) => unitShort.includes(el2));
   ```

2. Use the above test to decide:

   ```js
      ...............................
      let objIng;

      if (unitIndex > -1) {
        // There is a unit

        // EX; 4 1/2  cups then count = ['4', '1/2']
        const arrCount = arrIng.slice(0, unitIndex);

        let count;
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
          // "4+1/2" = 4.5 thanks to eval()
        }

        objIng = {
          count, // count : count
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" "),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // There is no unit, but 1st element is number
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: "",
          ingredient: arrIng.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        // There is no unit
        objIng = {
          count: 1,
          unit: "",
          ingredient,
          // object's ingredient is assigned,
          // similar to ingredient: this.ingredient
        };
      }

      return objIng;
      .......................
   ```

   - Using parseInt as returning true/false

   ```js
   let a = "122";
   undefined;

   a;
   ("122");

   if (parseInt(a, 10)) console.log(true);
   true;
   ```

## Building the Recipe View:

- Rendering the recipe in the UI

### Setting Up:

```js
//base.js
.................
  recipe: document.querySelector(".recipe"),
.............
```

- Setting up the markup:

```js
//recipeView.js
import { elements } from "./base";

export const renderRecipe = (recipe) => {
  const markUp = `
  <figure class="recipe__fig">
      <img src="img/${recipe.img}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
          <span>${recipe.title}</span>
      </h1>
  </figure>
  ..............................
  ...............................
  .................................
  `;
  elements.recipe.insertAdjacentHTML("afterbegin", markUp);
};
```

### Programmatically putting markup(ingredient list) with loop:

```js
// callback function to create ingredient list
const createIngredient = (ingredient) => `
<li class="recipe__item">
  <svg class="recipe__icon">
      <use href="img/icons.svg#icon-check"></use>
  </svg>
  <div class="recipe__count">${ingredient.count}</div>
  <div class="recipe__ingredient">
      <span class="recipe__unit">${ingredient.unit}</span>
      ${ingredient.ingredient}
  </div>
</li>
`;
...........................
 const markUp = `
  <figure class="recipe__fig">
      <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
      <h1 class="recipe__title">
          <span>${recipe.title}</span>
      </h1>
  </figure>
  .......................
 <div class="recipe__ingredients">
      <ul class="recipe__ingredient-list">
      ${recipe.ingredients.map((el) => createIngredient(el)).join(""))}

      </ul>
```

- map returns array but we want string . So we join the arrays into strings

### Recipe Controller Added codes:

```js
const controlRecipe = async () => {
............

  if (id) {
    // Prepare UI for Changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    ...............................

    try {
      ..........................

      // Render the Recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
    } catch (error) {
      alert("Error Processing Recipe");
    }
  }
};
```

## Building the Recipe View Part 2:

- We are going to write a function that converts the decimal number into fraction.
- We are going to use external package: `fraction.js`
- You can plug in a number and get a numerator and a denominator.
- 0.75 => 3 num and 4 deno

`npm install fractional --save`

- `--save` saves to package.json file.

```json
  ...............
  "dependencies": {
  ............
    "regenerator-runtime": "^0.13.7"
  }
}
```

### Exporting the old fashion way (Node.js style):

```js
var function = require("fractional").fraction;
```

- Importing:

```js
import { Fraction } from "fractional";
```

### Formatting decimal into fraction and integer:

- We destructure the count string into two variables int and dec by using split by '.' and map function
- If dec is not present we simply return the count
- We int is not present we simply return the fractional part
- If both are present we extract the fractional part and append the integer and fractional part together.

```js
//recipeView.js

const formatCount = (count) => {
  if (count) {
    // 2.5 => 2 1/2
    const [int, dec] = count
      .toString()
      .split(".")
      .map((el) => parseInt(el, 10));

    if (!dec) return count;

    if (int === 0) {
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(count - int);
      return `${int} ${fr.numerator}/${fr.denominator}`;
    }
  }
  return "?";
};
```

### Putting into practice:

```js
const createIngredient = (ingredient) => `
.............
  <div class="recipe__count">${formatCount(ingredient.count)}</div>
.............
`;
```

### Adding Highlight to selected item:

```js
// searchView.js
export const highlightSelected = (id) => {
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));
  resultsArr.forEach((el) => el.classList.remove("results__link--active"));
  document
    .querySelector(`a[href="#${id}"]`)
    .classList.add("results__link--active");
};
```

- Clear the previously highlighted items first
- Add the highlight to the attribute of `<a></a>`

#### Putting into Practices:

```js
////////////////////////////////////
/// RECIPE CONTROLLER

const controlRecipe = async () => {
  // Get ID from URL
  const id = window.location.hash.replace("#", "");
  console.log(id);

  if (id) {
....................

    // highlight selected search item
    if (state.search) searchView.highlightSelected(id);
...............................
```

## Updating Recipe Servings:

- Updating the servings and the ingredients list whenever we click the increase or decrease buttons.
- Handling event delegation with `.matches`

### Method to update servings in Recipe model:

- pass the type argument which implies whether to increase or decrease the value
- calculate the new servings according to the type
- Update the count of ingredient with forEach method
- Finally update the servings

```js
  updateServings(type) {
    // type implies increase or decrease

    //servings
    const newServings = type === "dec" ? this.serving - 1 : this.serving + 1;

    //ingredients
    this.ingredients.forEach((ing) => {
      ing.count *= newServings / this.serving;
    });

    this.servings = newServings;
  }
```

### Implementing the event handlers for the + and - buttons:

- We have to use event delegation since the button are not there initially.
- Only thing that is there is the recipe element, that is where we'll have to attach the event listeners and use the target property of the event in order to figure out where the click actually happened.
- We cannot use `.closest` since there are more than one thing we'd like to select. (There are +, -, heart, add to list buttons). So, it is impossible to target these elements.
- We'll test what was click and react accordingly.
- We'll use the `.matches` methods

```js
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) console.log(123);
});
```

- We can pass CSS selector inside matches.
- `btn-decrease *` implies any child of `btn-decrease`.
- If the event matches these classes then the consequent statement will be executed.

```js
// index.js
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    // Decrease Button is clicked
    if (state.recipe.serving > 1) {
      // Stop from making serving a negative value.
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  }
  if (e.target.matches(".btn-increase, .btn-increase *")) {
    // increase button is clicked
    state.recipe.updateServings("inc");
    recipeView.updateServingsIngredients(state.recipe);
  }
  console.log(state.recipe);
});
```

- Displaying the changes on the UI:
- select the serving element and update the serving
- select the ingredient array and update the ingredient counts by looping through the ingredient.

```js
//recipeView.js

export const updateServingsIngredients = (recipe) => {
  // Update servings
  document.querySelector(".recipe__info-data--people").textContent =
    recipe.serving;

  // Update ingredients
  const countElements = Array.from(document.querySelectorAll(".recipe__count"));
  countElements.forEach((el, i) => {
    el.textContent = formatCount(recipe.ingredients[i].count);
  });
};
```

## Building the Shopping List Model:

### Content:

- How and why to create uniquye IDs using an external packages;
- Difference between `Array.slice` and `Array.splice`
- More uses cases for `Array.findIndex` and `Array.find`

### Model Design:

- We are not passing any argument to the constructor, we` are just initializing the a property which is an array

```js
import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient,
    };
  }
}
```

#### Adding unique ID:

`npm install uniqid`

- Third party package
- Create a new ID based on current time, process and machine name.

### Delete an item:

- In `splice()` method we pass in start index and how many positions we want to take. It will then return these elements and delete them from the original array. It mutates the original one
- `slice()` accepts start and end position and return the portion of the array. It does not mutate the original array. Excludes the last index.

```js
  deleteItem(id) {
    const index = this.items.findIndex((el) => el.id === id);
    this.items.splice(index, 1);
  }
```

- findIndex finds the index of the element
- We splice the the item at the index

### Updating Items:

```js
  updateCount(id, newCount) {
    this.items.find((el) => el.id === id).count = newCount;
  }
```

- We loop through all the elements and select the one that has the id equal to the id that we passed into the function. We get an object and then update the count property on it.

### Importing in the controller:

```js
import List from "./models/List";

window.l = new List();

// console codes

// Adding
> l.addItem(2,'tbsp','salt');
> {id: "kdg6dx0a", count: 2, unit: "tbsp", ingredient: "salt"}
> l.addItem(2,'tbsp','salt');
{id: "kdg6dx0a", count: 2, unit: "tbsp", ingredient: "salt"}
> l.addItem(2,'cup','oliveoil');
{id: "kdg6ggm1", count: 2, unit: "cup", ingredient: "oliveoil"}

// deleting
> l.deleteItem("kdg6dx0a");
undefined
> l
> List {items: Array(1)}
> items: Array(1)
> 0: {id: "kdg6ggm1", count: 2, unit: "cup", ingredient: "oliveoil"}
> length: 1
> __proto__: Array(0)
> __proto__: Object

// Updating:
> l.updateCount("kdg6ggm1", 10);
undefined
> l
> List {items: Array(1)}
> items: Array(1)
> 0: {id: "kdg6ggm1", count: 10, unit: "cup", ingredient: "oliveoil"}
> length: 1
> __proto__: Array(0)
> __proto__: Object
```

## Building the Shopping List View:

- Setting the elements:

```js
// base.js
export const elements = {
............
  shopping: document.querySelector(".shopping__list"),
};
```

- Rendering the list markup:

```js
//listView.js

export const renderItem = (item) => {
  const markUp = `
  <li class="shopping__item data-itemid=${item.id}">
    <div class="shopping__count">
        <input type="number" value="${item.count}" step="${item.count}" class = "shopping__count-value">
        <p>${item.unit}</p>
    </div>
    <p class="shopping__description">${item.ingredient}</p>
    <button class="shopping__delete btn-tiny">
        <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
        </svg>
    </button>
  </li>
  `;
  elements.shopping.insertAdjacentElement("beforeend", markUp);
};
```

- Deleting Item from list:

```js
export const deleteItem = (id) => {
  const item = document.querySelector(`[data-itemid="${id}"]`);
  item.parentElement.removeChild(item);
};
```

- Note the usage of data attribute with css attribute (`[data-itemid="${id}"]`)

## BUILDING THE SHOPPING LIST CONTROLLER:

```js
// index.js
import * as listView from "./views/listView";


////////////////////////////////////
/// List CONTROLLER
const controlList = () => {
  // Create a new list if there is none yet
  if (!state.list) state.list = new List();

  // Add each ingredients to the list and UI
  state.recipe.ingredients.forEach((el) => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};



// handling recipe button clicks:
elements.recipe.addEventListener("click", (e) => {
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    ...................................
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    controlList();
  }
});
```

- We use the event delegation since they are not in the list initially.
- We add `e.target.matches(".recipe__btn--add, .recipe__btn--add *")` to listener to the add to shopping list button(and all of its child's) click event
- On the firing of this event, we call the `controlList()` function. Where we create an object if the list is empty else add the item to the state list
- Then we call the `renderItem()` function which displays the shopping list to the UI one by one following the `forEach()` loop.

### The Delete List Button:

- We select the following data attribute: `<li class="shopping__item" data-itemid=${item.id}>`
- We'll use the closest method.
- The `closest()` method traverses the Element and its parents (heading toward the document root) until it finds a node that matches the provided selector string. Will return itself or the matching ancestor. If no such element exists, it returns null.
- Using closest with data attribute: `const id = e.target.closest(".shopping__item").dataset.itemid;`
- We are selecting the shopping\_\_item event delegation since the buttons are not present originally.
- Then we use the matches method to select the shopping\_\_delete element and its child and on the event trigerred case we delete an item from state and UI

```js
// index.js

// Handle Delete and update list item event
elements.shopping.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.itemid;

  // Handle the delete button
  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    // Delete from state
    state.list.deleteItem(id);

    // Delete from UI
    listView.deleteItem(id);
  }
});
```

### Handling the update:

```js
// Handle Delete and update list item event
elements.shopping.addEventListener("click", (e) => {
  const id = e.target.closest(".shopping__item").dataset.itemid;

  ...............................

  // Handle the count update
  else if (e.target.matches(".shopping__count-value")) {
    const val = parseFloat(e.target.value);
    state.list.updateCount(id, val);
  }
});
```

- The target event property returns the element that triggered the event.
- When we click on the input value the event is trigerred and it's value is assigned to `val` and the list is updated.

## BUILDING THE LIKES MODEL:

- You click the heart, it gets selected and it is added to the liked list above.

```js
export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);
    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }
}
```

- Constructor is without argument, we just initialize the likes array
- We Like list with recipe's id, title, author and image
- we delete the likes by passing an id and splicing the array
- We implemented isliked method to find where the item is liked or not so that we can decide whether to highlight the liked heart.
- We implemented the isLiked() by returning true or false based on whether we find the index of the item in the likes array
- For the number of like we simply return the length.

## BUILDING THE LIKES CONTROLLER:

- When we click on the like button there are two possible scenario:
  1. We have to un-highlight the button if it is already liked and remove from the list
  2. We have to highlight the button and add to the list if it is not yet liked.

### We first add the event delegation as follows:

```js
// handling recipe button clicks:
elements.recipe.addEventListener("click", (e) => {
.......................................
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    // Like Controller
    controlLike();
  }
});
```

### Coding the controller:

```js
////////////////////////////////////
/// LIKES CONTROLLER
const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;

  // user has not yet liked current recipe
  if (!state.likes.isLiked(currentID)) {
    // Add like to the state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    // Toggle the like button

    // Add Like to the UI list
    console.log(state.likes);
  }

  // use has liked the current recipe
  else {
    // remove like from the state
    state.likes.deleteLike(currentID);

    // Toggle the like button

    // Remove like from the UI list
    console.log(state.likes);
  }
};
```

- We create a new array if it isn't already present else we append to existing
- We read the event delegated (opened item) id and check if it is in the liked list
- If the recipe isn't in the liked list then we add its id, title, author and img using `addLike()` method
- If the recipe is in the liked list then we delete the item from the liked list using `deleteLike()` method.
