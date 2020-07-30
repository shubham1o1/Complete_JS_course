import Search from "./models/Search";

////////////////////////////////////////
/** Global state of the app
 * - Search Object (Query + Result)
 * - Current Recipe Object
 * - Shopping List Object
 * - Liked Recipe
 */
const state = {};
////////////////////////////////////////

const controlSearch = async () => {
  // 1. Get the Query from the view
  const query = "pizza"; //TODO

  if (query) {
    // 2. New Search object and add to state
    state.search = new Search(query);

    // 3. Prepare UI (Clear Previous result, load spinner display)
    /** */

    // 4. Search for recipe
    await state.search.getResults();

    // 5. Render Results in UI
    console.log(state.search.result);
  }
};
// Selecting the form and passing event object to Callback function
document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault(); // To prevent from reloading when form is submitted
  controlSearch();
});

/**
 * (28) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
 */
