const path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    // to remove eval in output and make
    // the code more readable:
    devtool : "none",

    // First file to execute
    entry: "./src/index.js",
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