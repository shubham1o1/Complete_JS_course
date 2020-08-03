import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = "";
};

export const clearResults = () => {
  elements.searchResultList.innerHTML = "";
  elements.searchResPages.innerHTML = "";
};

const limitRecipeTitle = (title, limit = 17) => {
  /** Algorithm
   * - Split the title into its word
   * - Use the reduce method on the resulting array
   * - Accumulate the words by looping until length < 17
   * - Test if current title + next word < 17
   */
  const newTitle = []; // we can mutate const arrays and objects
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")} ...`; // join is opposite of split
  }
  return title;
};

export const highlightSelected = (id) => {
  const resultsArr = Array.from(document.querySelectorAll(".results__link"));
  resultsArr.forEach((el) => el.classList.remove("results__link--active"));
  document
    .querySelector(`a[href="#${id}"]`)
    .classList.add("results__link--active");
};

const renderRecipe = (recipe) => {
  const markup = `
  <li>
      <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" 
              alt= "${recipe.title}">
          </figure>
          <div class="results__data">
              <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
  </li>
  `;
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

// pass number of page and type (prev/next)
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${
  type === "prev" ? page - 1 : page + 1
}>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${
              type === "prev" ? "left" : "right"
            }"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numOfResults, resPerPage) => {
  const pages = Math.ceil(numOfResults / resPerPage); // round up

  let button;
  if (page === 1 && pages > 1) {
    // button to go to next
    button = createButton(page, "next");
  } else if (page < pages) {
    // both buttons
    button = `
      ${createButton(page, "prev")}
      ${createButton(page, "next")}
    `;
  } else if (page === pages && pages > 1) {
    // button to go to prev
    button = createButton(page, "prev");
  }

  elements.searchResPages.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // Render Results of Current Page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);
  // we pass a callback function to forEach

  // render the pagination buttons
  renderButtons(page, recipes.length, resPerPage);
};
