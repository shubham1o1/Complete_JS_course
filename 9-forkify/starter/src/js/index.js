import Search from "./models/Search";
import Recipe from "./models/Recipe";
import * as searchView from "./views/searchView";
import { elements, renderLoader, clearLoader } from "./views/base";

////////////////////////////////////////
/** Global state of the app
 * - Search Object (Query + Result)
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipe
 */
const state = {};
////////////////////////////////////////

/////////////////////////////////////
/// SEARCH CONTROLLER
const controlSearch = async () => {
  // 1. Get the Query from the view
  const query = searchView.getInput();

  if (query) {
    // 2. New Search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI (Clear Previous result, load spinner display)
    /** */
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    // 4. Search for recipe
    await state.search.getResults();

    // 5. Render Results in UI
    clearLoader();
    searchView.renderResults(state.search.result);
  }
};
// Selecting the form and passing event object to Callback function
elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // To prevent from reloading when form is submitted
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
    // 3
  }
});

////////////////////////////////////
/// RECIPE CONTROLLER
let recipe = new Recipe(2658);
recipe.getRecipe();

console.log(recipe);
