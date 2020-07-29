# Modern JavaScript Using ES6, NPM, Babel and Webpack

- Real life API consuming App
- **Webpack** to bundle JS modules
- **Babel** to transpile ES6 to ES5
- Modern Workflow for JS

## Project Overview:

- Recipe Searching App (Uses Api to fetch recipe)
- Recipe List
- Like Recipe
- View Recipe
- Add to Cart
- Local Storage

## An Overview of Modern Javascript:

- We compile ES6 and newer versions to ES5, use module bundlers, task runners, external packages and other dev tools

### A brief overview:

- More than language, also the environment where we run the code.
- Tools to make it easier and better to work with
- Foundation of these tools are node js and npm ecosystem, where we can find all sorts of third party open source tools, libraries and frameworks.
- Libs and Frames : Angular, React, Loadash, Jquery
- Tools : Task Automations, Automatic Browser reloading, Compile ES5 to ES6
- NPM helps us to manage these packages.
- NPM is a simple CLI that manages these tools and libs and it also allows us to write scripts to use our dev tools .

### Babel:

- ES5/ESNext --------> ES5

### Webpack:

- ES6 Modules ----------> Bundle
- We can separate different parts of our app to different files.
- ES6's modules is not supported by Browsers so we use the module bundler to bundle the modules together into a single file.
- Can do more than bundling:

#### Task:

- Codesplitting
- Loading many types of assets like SASS or Images
- Decreasing JS bundle Size using the treeshaking algorithm

### Conclusion

These are NPM packages and the easiest way to run them is by using NPM script. Which allows us to run all these tools automatically and easily in our CLI.

![Tools and Lib](notes-images/toolsandlibsoview.png)
