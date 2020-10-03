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