# Webpack youtube:

ref_video : https://www.youtube.com/watch?v=3On5Z0gjf4U&list=PLblA84xge2_zwxh3XJqy6UVxS60YdusY8

- Webpack bundles our code/assets together
- It also manages dependencies, loads code in the sequence required. 

## Installing and running webpack and webpack-cli

- Import the script(js) also import all of the file's dependencies in index.js

```js
  <script src="./src/app/alert.service.js"></script>
  <script src="./src/app/component.service.js"></script>
  <script src="./src/app/utils/inputs-are-valid.js"></script>
  <script src="./src/app/utils/parse-inputs.js"></script>
  <script src="./src/app/app.js"></script>
```

- Here we want to import **app.js** only but the other files are just its dependencies. 
- Order of import also matters
- Doing this manually for a project with tons of dependencies will suck. So we'll use the webpack

### Setting up Webpack

- Need `package.json` so do : `npm init`
- `npm install --save-dev webpack`
- `npm install --save-dev webpack-cli`
- or : `npm install --save-dev webpack webpack-cli`
- Package.json : 
```json
  "scripts": {
    "start": "webpack"
  },
```
- `npm start`:
- `ERROR in Entry module not found: Error: Can't resolve './src' `

- Error appears because in node when your require an entire directory you'll need index.js by default
- We made an `index.js` file inside of source folder. 
- On running `npm start` dist folder with main.js is created.
- Importing in index.html:

```js
<script src="./dist/main.js"></script>
```

- Added dist directory to gitignore

## Imports, Exports, & Webpack Modules:

- Use ES6 imports exports.
- Only importing main.js in index.html is sufficient 
- Put the main program execution code in index.js

## Configuring Webpack:

- To change default webpack behavior such as running index.js, creating main.js in dist, specifying loaders and plugins and so on, we need a config file to tell it what to do. 
- Config file : one for development, one for production

```js
//webpack.config.js

const path = require("path");

module.exports = {
    // Output is readable and not minified
    mode:"development",

    // to remove eval in output and make
    // the code more readable:
    devtool : "none",

    // First file to execute
    entry: "./src/index.js",


    output: {
        // Specify filename
        filename: "main.js",

        // Specify output's folder.
        path: path.resolve(__dirname, "dist")
    }
};
```

- Webpack manages the import with webpack_require. 

## Loaders, CSS, & SASS:

### Loaders:

ref: https://webpack.js.org/loaders/

- Dictate how certain files must be pre-processed.
- At a high level, loaders have two properties in your webpack configuration:
- The **test property** identifies which file or files should be transformed.
- The **use property** indicates which loader should be used to do the transforming.
- Styling loaders:
    - **style-loader** Add exports of a module as style to DOM
    - **css-loader** Loads CSS file with resolved imports and returns CSS code

```js
// webpack.config.js

const path = require('path');

module.exports = {
......
  module: {
    rules: [
        {
            test: /\.css$/, 
            use: ['style-loader', 'css-loader'],
        }
    ]
  }
};
```

-  This tells webpack's compiler the following:

``` "Hey webpack compiler, when you come across a path that resolves to a '.css' file inside of a require()/import statement, use the style-loader and css-loader to transform it before you add it to the bundle." ```

- Installing the loaders : ` npm install --save-dev style-loader css-loader `
- Import the css file in index.js

- running npm start will show that the Loader converts css into js code this is the work of css loader. 
- Still the style is not applied, for which we need style loaders. 
- style-loaders will take the js (converted css) and inject it into the DOM.
- The use array has an order:

```js
...
rules: [
    {
        test: /\.css$/, 
        use: ['style-loader','css-loader',],
```

- We put in reverse order, css-loader is loaded before the style-loader but it is written after. 
- running `npm start` puts the main.css style. But the style is not imported in html file. 
- style-loader injected style element as a css in the `<head>` section which can be seen if we inspect from the browser.


### SASS :

- first install bootstrap locally: `npm install --save-dev bootstrap`
- 