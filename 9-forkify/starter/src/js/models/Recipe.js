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
      this.title = res.data.recipe.title;
      this.author = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url;
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
      // console.log(res);
      // this.parseIngredients();
    } catch (error) {
      console.log(error);
      alert("Something Went Wrong!!");
    }
  }

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

  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounce",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const unitShort = [
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

      // 2. Remove parenthesis
      ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");
      // replaces parenthesis and everting inside with nothing

      // 3. Parse ingredients into count units and ingredient
      const arrIng = ingredient.split(" ");

      // Return the index of the  positioin where the test is true
      const unitIndex = arrIng.findIndex((el2) => unitShort.includes(el2));

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
        // There is no unit, but 1stt element is number
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
          ingredient, // object's ingredient is assigned
        };
      }

      return objIng;
    });
    this.ingredients = newIngredients;
  }
}
