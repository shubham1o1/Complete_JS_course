import Search from "./models/Search";

const search = new Search("pizza");
console.log(search);

/*
Search {query: "pizza"}
query: "pizza"
__proto__:
constructor: ƒ Search(query)
getResults: ƒ getResults()
__proto__: Object
*/

search.getResults();

/*
(28) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
*/
