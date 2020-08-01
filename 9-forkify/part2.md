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
