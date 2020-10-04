const path = require("path");
const common = require("./webpack.common");
const {merge} = require('webpack-merge');

module.exports = merge(common, {
    // Output is readable and not minified
    mode:"production",

    // to remove eval in output and make
    // the code more readable:
    devtool : "none",


    output: {
        // Specify filename
        filename: "main.[contentHash].js",

        // Specify output's folder.
        path: path.resolve(__dirname, "dist")
    },
});