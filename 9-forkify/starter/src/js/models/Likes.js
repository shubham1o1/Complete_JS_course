export default class Likes {
  constructor() {
    this.likes = [];
  }

  addLike(id, title, author, img) {
    const like = { id, title, author, img };
    this.likes.push(like);

    //persist data in localStorage
    this.persistData();

    return like;
  }

  deleteLike(id) {
    const index = this.likes.findIndex((el) => el.id === id);
    this.likes.splice(index, 1);

    // Persist data in localstorage
    this.persistData();
  }

  isLiked(id) {
    return this.likes.findIndex((el) => el.id === id) !== -1;
  }

  getNumLikes() {
    return this.likes.length;
  }

  persistData() {
    localStorage.setItem("likes", JSON.stringify(this.likes));
    /**
     * localStorage
Storage {likes: "[{"id":"47025","title":"Pasta with Pesto Cream Sau…forkify-api.herokuapp.com/images/pestoa0e7.jpg"}]", loglevel:webpack-dev-server: "INFO", length: 2}

localStorage.likes
"[{"id":"47746","title":"Best Pizza Dough Ever","author":"101 Cookbooks","img":"http://forkify-api.herokuapp.com/images/best_pizza_dough_recipe1b20.jpg"},{"id":"35478","title":"Pizza Quesadillas (aka Pizzadillas)","author":"Closet Cooking","img":"http://forkify-api.herokuapp.com/images/Pizza2BQuesadillas2B2528aka2BPizzadillas25292B5002B834037bf306b.jpg"},{"id":"41470","title":"Cauliflower Pizza Crust (with BBQ Chicken Pizza)","author":"Closet Cooking","img":"http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg"}]"
     */
  }

  readStorage() {
    // read json like data from string
    const storage = JSON.parse(localStorage.getItem("likes"));

    // Restore likes from the localStorage
    if (storage) this.likes = storage;
  }
}
