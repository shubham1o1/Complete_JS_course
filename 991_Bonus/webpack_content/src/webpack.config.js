const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
        filename: "main.[contentHash].js",

        // Specify output's folder.
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: './src/template.html'
            }
        )
    ],
    module : {
        rules: [
            {
                test: /\.scss$/, 
                use: [
                    'style-loader',
                    'css-loader', 
                    'sass-loader'
                ],
            }
        ]
    }
};