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