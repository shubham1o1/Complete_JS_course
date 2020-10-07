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
- create main.scss
- import bootstrap as :

```scss
@import "~bootstrap/scss/bootstrap";
```

- we'll use the sass-loader
- installing sass-loader with required dependencies: 
- `npm install --save-dev sass-loader node-sass `
- config:
```js
...
rules: [
    {
        test: /\.scss$/, 
        use: [
            'style-loader', // 3rd inject the css into dom.
            'css-loader', //2nd turns css into common js
            'sass-loader' // 1st turns scss into css
        ],
    }
]
```
- Import the main.scss in index.js


### Cache Busting and Plugins:

- How to protect assets such as main.js and css bundle
- How to command browsers to not cache certain files. 
- Hashing is done, where everytime a code is changed a new filename is given to that file. 

```js
//webpack.config.js
...

output: {
    // Specify filename
    filename: "main.[contentHash].js",

    // Specify output's folder.
    path: path.resolve(__dirname, "dist")
},
...
```

- Note the `[contenthash]` that is placed in output filename
- Each time something is changed, the new compiled file is present in the dist folder.
- Index.html is importing main.js but the filename is changing.
- Webpack will build html files by using plugins. 

### Plugins:

- While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.
- In order to use a plugin, you need to require() it and add it to the plugins array. 
- Most plugins are customizable through options. Since you can use a plugin multiple times in a configuration for different purposes, you need to create an instance of it by calling it with the new operator.

```js
//webpack.config.js example

const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm

module.exports = {
....
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ],
...
};
```

- In the example above, the html-webpack-plugin generates an HTML file for your application by injecting automatically all your generated bundles.

### HtmlWebpackPlugin
- The HtmlWebpackPlugin simplifies creation of HTML files to serve your webpack bundles. 
- This is especially useful for webpack bundles that include a hash in the filename which changes every compilation. 
- You can either let the plugin generate an HTML file for you, supply your own template using lodash templates, or use your own loader.

#### Installation
```bash
npm install --save-dev html-webpack-plugin
```
- on `npm start` the bundles are imported as : 

```html
<script src="main.ee67164b267a5ed33206.js"></script>
```

- new index.html is created in dist with all the bundles imported. 

## 7. Splitting Dev and Production:

- Three config files : 1 common, 1 prod, 1 dev 
- `npm start` for running live server and `npm run build` for prod's dist files compilation. 
- `npm install --save-dev webpack-merge` will install a package that will merge common with prod and dev webpack config file.
- package.json:

```js
  "scripts": {
    "start": "webpack --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
```

- importing merge and using it in webpack.prod and webpack.dev:

```js
...
const common = require("./webpack.common");
const {merge} = require("webpack-merge");

module.exports = merge(common, {
    // Output is readable and not minified
    mode:"development",
    ...

```

- run `npm start` and you'll see main.js being imported in dist's index.html. 
- running `npm run build` creates minified index.html with contenthash main.js's import

### Setting up a dev server:

- `npm install --save-dev webpack-dev-server` to install
- Configuring package.json:

```json
  "scripts": {
    "start": "webpack-dev-server --config webpack.dev.js --open",
    "build": "webpack --config webpack.prod.js"
  },
```

- run npm start and then the server open, now you dont have to refresh and build every time
- Delete dist and `npm start`, no dist is created. It is created in the memory of webpack live server.
- Run `npm run build` and dist folder appears. 

## Html-loader, File-loader, & Clean-webpack

- We want to copy assets into dist and import assets from index.html in the dist as "./assests/....."
- Each import of images, logos and such assets are now going to be inspected by these loaders and they import these files using ES6's require. 
- installing : `npm install --save-dev html-loader`
- config:

```js
// webpack.common.js

......
    module : {
        rules: [
            {
                test: /\.scss$/, 
                use: [
                    'style-loader',
                    'css-loader', 
                    'sass-loader'
                ],
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ]
.......
```

- we need file-loader to handle the import of these images
- installation : `npm install --save-dev file-loader`
- config:

```js
..........
{
    test: /\.(png|svg|jpg|gif)$/,
    use: {
        loader: "file-loader",
        options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs"  
        }
    }
}
.............
```

- Here use is an object, where we place the name of the file-loader
- and in options we supply name format as name, hash and extension which is used to name the copy of the assets while compiling
- output is where assests will be placed
- Running `npm run build` we can see a img directory in dist. And there is a svg file there which is imported in the compiled version of the index

### Clean-webpack plugin:

- To delete old dist directory and add a new one. 
- installation : `npm install --save-dev clean-webpack-plugin`
- config:

```js
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
...
    plugins: [
        new CleanWebpackPlugin(),
    ]
...
```
- This cleans the dist folder 

## Multiple Entrypoints & Vendor.js

- We might want to separate the app code from the vendor code.
- Bootstrap JS, Jquery and such libs and content wont change and we place them in vendor.js which will be upgradable
- Config:

```js

//prod
    output: {
        // Specify filename
        filename: "[name].[contentHash].bundle.js",
```

- common:

```js

    entry: {
        main : "./src/index.js",
        vendor : "./src/vendor.js",
    },
```

- run `npm start` and inspect and go to source, you'll see main.bundle and vendor.bundle.

### Running Bootstrap:

- install popper and jquery: `npm install --save-dev jquery popper.js`
- import bootstrap in vendor.js : `import "bootstrap";`
- place the bootstrap code in template.html.
- and now on `npm start` bootstap code will function normally.
- on `npm run build` we'll see bootstrap js code in vendor.js with jquery and pooper.js
- app code is in main.js and the css code is also there coming from import on scss. 

This pattern could be followed for other libraries too. 